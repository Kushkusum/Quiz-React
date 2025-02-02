import React, { useState } from "react";
import Quiz from "./components/Quiz.js";
import QuestionPage from './components/Question.js';
import ResultsPage from './components/Result.js';

function App() {
  const [currentPage, setCurrentPage] = useState('quiz');
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questions, setQuestions] = useState([]); // Questions fetched from the API
  const [userAnswers, setUserAnswers] = useState([]); // Track answers for review

  const startQuiz = async () => {
    try {
      const response = await fetch("https://api.jsonserve.com/Uw5CrX");
      const data = await response.json();
      setQuestions(data);
      setTotalQuestions(data.length);
      setUserAnswers([]); // Reset userAnswers for a new quiz
      setScore(0); // Reset score for a new quiz
      setCurrentPage('question');
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
      alert("Failed to load questions. Please try again later.");
    }
  };

  const updateScore = (correctAnswers) => {
    setScore(correctAnswers);
  };

  const updateUserAnswers = (questionId, isCorrect, questionText) => {
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { questionId, questionText, isCorrect },
    ]);
  };

  const finishQuiz = () => {
    setCurrentPage('results');
  };

  

  return (
    <div className="app">
      {currentPage === 'quiz' && <Quiz startQuiz={startQuiz} />}
      {currentPage === 'question' && (
        <QuestionPage
          questions={questions}
          updateScore={updateScore}
          updateUserAnswers={updateUserAnswers}
          finishQuiz={finishQuiz}
        />
      )}
      {currentPage === 'results' && (
        <ResultsPage
          score={score}
          totalQuestions={totalQuestions}
          userAnswers={userAnswers}
        />
      )}
    </div>
  );
}

export default App;
