import React, { useState } from "react";
import './questionStyles.css';

const Question = ({ data, onAnswer, showHint }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (option) => {
    setSelectedOption(option.id);
    onAnswer(option.is_correct, option.description);
  };

  return (
    <div className="question-container">
      <h2 className="question-text">{data.description}</h2>
      {showHint && (
        <div className="hint">
          <p><strong>Hint:</strong> The correct answer is: {data.correct_answer}</p>
        </div>
      )}
      <ul className="options-list">
        {data.options.map((option) => (
          <li
            key={option.id}
            className={`option-item ${selectedOption === option.id ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option)}
          >
            {option.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Question;
