import React, { useState, useEffect } from 'react';
import './Timer.css';  // For styling the animation

const Timer = ({ initialTime, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(initialTime); // Time left in seconds
  const [progress, setProgress] = useState(100); // Percentage progress

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeUp();  // Trigger the callback when time is up
      return;
    }

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
      setProgress((prev) => (prev - 100 / initialTime));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft, initialTime, onTimeUp]);

  return (
    <div className="timer-container">
      <div className="timer-progress" style={{ width: `${progress}%` }}></div>
      <div className="timer-text">{timeLeft}s</div>
    </div>
  );
};

export default Timer;
