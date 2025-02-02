import React, { useState, useEffect } from 'react';
import './resultStyles.css'; // Ensure you have the CSS imported for styling
import Confetti from 'react-confetti'; // Import Confetti

const Result = ({ score, totalQuestions, badges, userRank, userAnswers = [] }) => {
  const [showSummary, setShowSummary] = useState(false); // Track if the summary is visible
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  // Update window dimensions for confetti animation
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Function to handle the Replay button
  const handleReplay = () => {
    window.location.reload(); // Reload the page to reset the quiz
  };

  // Function to handle the "Review Questions" button click
  const handleReview = () => {
    setShowSummary((prev) => !prev); // Toggle answer summary visibility
  };

  // Determine the badge image source based on the badge name
  const badgeImage = badges[0] ? `./images/${badges[0].toLowerCase().replace(' ', '-')}.png` : '';

  return (
    <div className="result-page">
      <div className="result-header">
        <h2>Quiz Results</h2>

        {/* Display Confetti when score is positive */}
        {score > 0 && (
          <Confetti
            width={windowWidth}
            height={windowHeight}
            numberOfPieces={score > totalQuestions / 2 ? 300 : 150} // More confetti for higher score
          />
        )}

        {/* Display Score */}
        <div className="score-container">
          <h3>Your Score: <span className="score">{score}</span> / {totalQuestions}</h3>
        </div>

        {/* Progress Bar */}
        <div className="progress-bar-container">
          <div
            className="progress-bar"
            style={{
              width: `${(score / totalQuestions) * 100}%`,
            }}
          >
            <span>{((score / totalQuestions) * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Display Rank */}
        <div className="rank-container">
          <h3>Your Rank: <span className="rank">{userRank}</span></h3>
        </div>

        {/* Display Badge Image */}
        {badgeImage && (
          <div className="badge-container">
            <img src={badgeImage} alt={`${badges[0]} Badge`} className="badge-image" />
          </div>
        )}

        {/* Display message */}
        <p className="result-message">We’re getting closer to the finish line!</p>

        {/* Show Answer Summary Only When "Review Questions" Button is Clicked */}
        {showSummary && (
          <div className="result-overview">
            <h3>Answer Summary</h3>
            {userAnswers.length > 0 ? (
              <ul className="answer-list">
                {userAnswers.map((answer, index) => (
                  <li
                    key={index}
                    className={`summary-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                  >
                    <p><strong>Q{index + 1}: {answer.questionText}</strong></p>
                    <p>✅ Correct Answer: <strong>{answer.correctAnswer}</strong></p>
                    <p>📝 Your Answer: <strong>{answer.selectedOption || 'No Answer'}</strong></p>
                    <p className={answer.isCorrect ? 'correct-tag' : 'incorrect-tag'}>
                      {answer.isCorrect ? '✔️ Correct' : '❌ Incorrect'}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No answers to display.</p>
            )}
          </div>
        )}

        {/* Buttons */}
        <div className="result-actions">
          <button className="btn replay-btn" onClick={handleReplay}>
            Replay
          </button>
          <button className="btn review-btn" onClick={handleReview}>
            {showSummary ? 'Hide Review' : 'Review Questions'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Result;
