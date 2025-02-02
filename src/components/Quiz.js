/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';  // Import CSSTransition for transitions
import Question from './Question.js';
import Result from './Result.js';
import './quizStyles.css';  // Ensure this CSS file includes animations

const Quiz = () => {
  const [quizData, setQuizData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [timer, setTimer] = useState(30);  // Timer for each question
  const [progress, setProgress] = useState(0);  // Progress bar percentage
  const [userRank, setUserRank] = useState('');
  const [badges, setBadges] = useState([]);
  const [timeOut, setTimeOut] = useState(false);  // To track if time is up

  // Helper function to shuffle an array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];  // Swap elements
    }
    return array;
  };

  // Shuffle quiz data
  const shuffleQuizData = (data) => {
    const shuffledQuestions = shuffleArray(data.questions.map(question => {
      return {
        ...question,
        options: shuffleArray(question.options)  // Shuffle the options for each question
      };
    }));

    return {
      ...data,
      questions: shuffledQuestions,
    };
  };

  // Fetch quiz data and shuffle questions and options
  useEffect(() => {
    axios.get('/Uw5CrX')
      .then(response => {
        const shuffledData = shuffleQuizData(response.data);  // Shuffle questions and options
        setQuizData(shuffledData);
      })
      .catch(error => console.error('Error fetching quiz data:', error));
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !completed) {
      const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !completed) {
      handleAnswer(false, null); // Automatically mark question as incorrect
    }
  }, [timer, completed]);

  // Update progress bar
  useEffect(() => {
    setProgress((currentQuestionIndex / quizData?.questions.length) * 100);
  }, [currentQuestionIndex, quizData]);

  // Play sound for correct/incorrect/completion
  const playSound = (type) => {
    const soundMap = {
      correct: './sounds/correct.mp3',
      incorrect: './sounds/incorrect.mp3',
      completion: './sounds/completion.mp3',
    };
    const audio = new Audio(soundMap[type]);
    audio.play();
  };

  // Handle answer submission
  const handleAnswer = (isCorrect, selectedOption) => {
    const currentQuestion = quizData.questions[currentQuestionIndex];

    setAnswers(prev => [
      ...prev,
      {
        questionText: currentQuestion.question,  // Store question text
        selectedOption,
        correctAnswer: currentQuestion.correct_answer, // Store correct answer
        isCorrect
      }
    ]);

    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('correct');
    } else {
      playSound('incorrect');
    }

    if (currentQuestionIndex + 1 < quizData.questions.length) {
      setCurrentQuestionIndex(prev => prev + 1);
      setTimer(30); // Reset timer
    } else {
      setCompleted(true);
      calculateRank();
      setBadges(assignBadges());
      playSound('completion');
    }
  };

  // Calculate the user rank based on score
  const calculateRank = () => {
    const percentage = (score / quizData.questions.length) * 100;

    // Adjusted rank calculation based on the updated ranges
    if (percentage >= 75) {
      setUserRank('Platinum');
    } else if (percentage >= 50) {
      setUserRank('Gold');
    } else if (percentage >= 25) {
      setUserRank('Silver');
    } else {
      setUserRank('Bronze');
    }
  };

  // Assign badges based on score percentage
  const assignBadges = () => {
    const percentage = (score / quizData.questions.length) * 100;

    // Adjusted badge logic based on the updated ranges
    if (percentage >= 75) {
      return ['Platinum Badge'];
    } else if (percentage >= 50) {
      return ['Gold Badge'];
    } else if (percentage >= 25) {
      return ['Silver Badge'];
    } else {
      return ['Bronze Badge'];
    }
  };

  if (!quizData) return <p>Loading...</p>;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz Game</h1>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <div className="timer">{timer}s</div>

      {completed ? (
        <Result
          score={score}
          totalQuestions={quizData.questions.length}
          badges={badges}
          userRank={userRank}
          userAnswers={answers}
          progress={progress}  // Pass the progress as a prop to the Result component
        />
      ) : (
        <CSSTransition
          key={currentQuestionIndex}
          timeout={300}  // Time duration of the transition
          classNames="question"  // Apply the question animation class
        >
          <Question
            data={quizData.questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
          />
        </CSSTransition>
      )}
    </div>
  );
};

export default Quiz;
