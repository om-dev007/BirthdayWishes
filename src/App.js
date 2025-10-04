import React, { useState, useEffect, useRef } from 'react';
import './App.css';

const App = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTwin, setActiveTwin] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [currentShayari, setCurrentShayari] = useState({ text: '', twin: '' });
  const [quizActive, setQuizActive] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const twins = [
    {
      name: 'Twin A',
      color: '#FF6B9D', // Pink
      description: 'The adventurous spirit with a heart of gold, always ready for a new journey.',
      image: 'https://wallpapercave.com/wp/wp12093686.jpg',
      fallbackImage: 'https://via.placeholder.com/200x200?text=Twin+A',
      funFact: 'Loves stargazing and dreaming big!',
      shayaris: [
        "Happy Birthday! May your dreams shine bright like stars, and every step you take be filled with joy. 🌟",
        "Today's your day, a canvas of cheer, painting memories that linger through the year. 🎉",
        "Your smile's a gift, lighting up the day, may happiness follow you in every way. 😊",
        "A new chapter begins, write it bold and free, with love and courage for all to see. 📖",
        "May every path you tread bring delight, happy birthday, may your heart take flight. 🗺️",
        "Your laughter outshines the sun's warm glow, keep shining, let your happiness grow. ☀️",
        "No grand gift, just a wish so true, for a life as radiant as you. 💫",
        "Your eyes hold dreams that soar so high, may they never fade beneath the sky. ✨"
      ]
    },
    {
      name: 'Twin B',
      color: '#4ECDC4', // Teal
      description: 'The creative soul who paints the world with laughter and kindness.',
      image: 'https://static.vecteezy.com/system/resources/previews/031/612/039/non_2x/cute-pink-doll-ai-generative-free-png.png',
      fallbackImage: 'https://via.placeholder.com/200x200?text=Twin+B',
      funFact: 'Secret talent: Baking the best cupcakes ever!',
      shayaris: [
        "Happy Birthday! Your creativity lights up the world, may your heart's colors forever unfurl. 🎨",
        "Double the joy, like a perfect pair, may this day bring love beyond compare. 🎈",
        "Your art paints life with vibrant hues, may your birthday be a masterpiece too. 🌈",
        "A new year dawns, uniquely you, may your creations inspire all you do. ✨",
        "With a pen in hand and a heart so bright, craft a birthday filled with pure delight. ✏️",
        "Your ideas spark wonders untold, may this year bring dreams of gold. 💡",
        "Your kindness makes the world more fair, happy birthday, with love to spare. 🌺",
        "Your laughter's a palette, never to fade, may joy color your birthday parade. 😘"
      ]
    }
  ];

  const birthdayMessages = [
    "Happy Birthday to the amazing twins next door! Hope your day is full of fun.",
    "Wishing you both a fantastic birthday – may it be as bright as your smiles.",
    "Double the celebration for double the awesomeness today!",
    "Have an awesome birthday, neighbors! Looking forward to more sunny days.",
    "Cheers to another year of great vibes and good times.",
    "Happy Birthday! Thanks for being the coolest duo around."
  ];

  const quizQuestions = [
    {
      question: "What's Twin A's favorite hobby?",
      options: ["Stargazing", "Painting", "Baking", "Dancing"],
      answer: 0
    },
    {
      question: "What color represents Twin B?",
      options: ["Pink", "Teal", "Blue", "Green"],
      answer: 1
    },
    {
      question: "What's a fun fact about Twin A?",
      options: ["Loves adventures", "Bakes cupcakes", "Paints rainbows", "Reads books"],
      answer: 0
    }
  ];

  const CAKE_IMAGE = 'https://cdn.pixabay.com/photo/2014/06/30/11/40/birthday-cake-380178_1280.jpg';

  // Custom easing function for smooth scrolling
  const easeInOutQuad = (t) => {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
  };

  // Custom scroll function with easing
  const smoothScrollTo = (elementId, duration = 800) => {
    const target = document.getElementById(elementId);
    const targetY = target ? target.getBoundingClientRect().top + window.scrollY : 0;
    const startY = window.scrollY;
    const distance = targetY - startY;
    let startTime = null;

    const animation = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      window.scrollTo(0, startY + distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  };

  useEffect(() => {
    // Trigger confetti immediately on load
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);

    // Auto-cycle messages
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % birthdayMessages.length);
    }, 4000);

    // Setup audio with Hindi happy birthday song
    audioRef.current = new Audio('https://www.itsbirthdayy.com/wp-content/uploads/2023/02/Hindi-happy-birthday-song.mp3');
    audioRef.current.loop = true;

    // Debug log for twins rendering
    console.log('Rendering twins:', twins.length, 'items'); // Should log 2

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleTwinClick = (index) => {
    const twin = twins[index];
    const randomShayari = twin.shayaris[Math.floor(Math.random() * twin.shayaris.length)];
    setCurrentShayari({ text: randomShayari, twin: twin.name });
    setActiveTwin(index);
    setMessages((prev) => [...prev, `Unlocked a fun note for ${twin.name}! 📝`]);
  };

  const startQuiz = () => {
    setQuizActive(true);
    setQuizScore(0);
    setCurrentQuestion(0);
    setMessages((prev) => [...prev, 'Started the Twin Trivia Quiz! 🧠']);
  };

  const handleQuizAnswer = (selectedIndex) => {
    if (selectedIndex === quizQuestions[currentQuestion].answer) {
      setQuizScore((prev) => prev + 1);
    }
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      setQuizActive(false);
      setMessages((prev) => [
        ...prev,
        `Quiz complete! Score: ${quizScore + (selectedIndex === quizQuestions[currentQuestion].answer ? 1 : 0)}/3 🎊`,
      ]);
    }
  };

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((error) => {
        console.error('Audio play failed:', error);
        setMessages((prev) => [...prev, "Oops, couldn't play the tune. Try refreshing! 🔄"]);
      });
    }
    setIsPlaying(!isPlaying);
    setMessages((prev) => [...prev, `${isPlaying ? 'Paused' : 'Playing'} the birthday tune! 🎶`]);
  };

  const handleRestart = () => {
    setActiveTwin(null);
    setMessages([]);
    setCurrentShayari({ text: '', twin: '' });
    setQuizActive(false);
    setQuizScore(0);
    setCurrentQuestion(0);
    setCurrentMessageIndex(0);
    setIsPlaying(false);
    if (audioRef.current) {
      audioRef.current.pause();
    }
    smoothScrollTo('home', 800); // Smooth scroll with 800ms duration
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const Confetti = () => {
    if (!showConfetti) return null;
    return (
      <div className="confetti">
        {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="confetti-piece flower-petal"
            style={{
              '--random-x': Math.random() * 2 - 1,
              left: `${Math.random() * 100}vw`,
              top: `${Math.random() * -100}vh`,
              backgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
              animationDelay: `${Math.random() * 0.5}s`,
              animationDuration: `${Math.random() * 4 + 3}s`,
              fontSize: `${Math.random() * 10 + 15}px`,
            }}
          >
            <span role="img" aria-label="flower">
              🌸
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <Confetti />
      <header className="header" id="home">
        <div className="title-container">
          <img src={CAKE_IMAGE} alt="Birthday Cake" className="cake-icon" />
          <h1 className="title">Happy Birthday, Amazing Twins!</h1>
          <img src={CAKE_IMAGE} alt="Birthday Cake" className="cake-icon" />
        </div>
        <p className="subtitle">A fun surprise from your neighbor down the street 😊</p>
      </header>

      <section className="messages-section" id="messages">
        <div className="message-container">
          <p className="current-message">{birthdayMessages[currentMessageIndex]}</p>
        </div>
      </section>

      <section className="twins-section" id="twins">
        <h2>Spotlight on You Two ✨</h2>
        <div className="twins-grid">
          {twins.map((twin, index) => (
            <div
              key={twin.name + '-' + index}
              className={`twin-card ${activeTwin === index ? 'active' : ''}`}
              style={{ borderColor: twin.color }}
              onClick={() => handleTwinClick(index)}
            >
              <img
                src={twin.image}
                alt={twin.name}
                className="twin-image"
                onError={(e) => {
                  console.log(`Failed to load image for ${twin.name}: ${twin.image}`);
                  e.target.src = twin.fallbackImage;
                }}
              />
              <h3 style={{ color: twin.color }}>{twin.name}</h3>
              <p>{twin.description}</p>
              <small className="fun-fact">Fun Fact: {twin.funFact}</small>
            </div>
          ))}
        </div>
      </section>

      <section className="shayari-section" id="shayari">
        {currentShayari.text && (
          <div className="shayari-container">
            <h3>📝 A Fun Birthday Note for {currentShayari.twin}</h3>
            <p className="shayari-text">{currentShayari.text}</p>
            <button
              className="new-shayari-btn"
              onClick={() => {
                const twinIndex = twins.findIndex((t) => t.name === currentShayari.twin);
                if (twinIndex !== -1) {
                  const newShayari = twins[twinIndex].shayaris[Math.floor(Math.random() * twins[twinIndex].shayaris.length)];
                  setCurrentShayari({ text: newShayari, twin: currentShayari.twin });
                }
              }}
            >
              Another One? 😄
            </button>
          </div>
        )}
      </section>

      <section className="quiz-section" id="quiz">
        <h2>Twin Trivia Quiz 🧠</h2>
        {!quizActive ? (
          <button className="start-quiz-btn" onClick={startQuiz}>
            Start the Quiz!
          </button>
        ) : (
          <div className="quiz-container">
            <p className="quiz-question">{quizQuestions[currentQuestion].question}</p>
            <div className="quiz-options">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <button key={index} className="quiz-option-btn" onClick={() => handleQuizAnswer(index)}>
                  {option}
                </button>
              ))}
            </div>
            <p className="quiz-score">
              Score so far: {quizScore}/{currentQuestion + 1}
            </p>
          </div>
        )}
      </section>

      <section className="music-section" id="music">
        <h2>Birthday Tunes 🎵</h2>
        <button className="music-btn" onClick={togglePlay}>
          {isPlaying ? '⏸️ Pause' : '▶️ Play Fun Hindi Birthday Song'}
        </button>
        <p className="music-note">A cheerful Hindi tune to celebrate the day!</p>
      </section>

      <section className="interactive-section" id="interactions">
        <h2>What's Happening 🎈</h2>
        <div className="messages-log">
          <h3>Your Interactions:</h3>
          {messages.length > 0 ? (
            <ul>
              {messages.map((msg, i) => (
                <li key={i}>{msg}</li>
              ))}
            </ul>
          ) : (
            <p>Click around to see some fun stuff!</p>
          )}
        </div>
        <div className="neighbor-note">
          <h3>A Quick Note:</h3>
          <p>Happy Birthday! Hope you both have a great day. Always nice seeing you around the neighborhood. 😊</p>
        </div>
      </section>

      <footer className="footer" id="footer">
        <p>Made with fun for the awesome twins next door. October 4, 2025</p>
        <button className="restart-btn" onClick={handleRestart}>
          Surprise Again! 🔄
        </button>
      </footer>
    </div>
  );
};

export default App;