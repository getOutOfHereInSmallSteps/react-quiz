import React from 'react';

const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null;

  return (
    <div className="options">
      {question.options.map((option, i) => {
        const isChosenAnswer = i === answer;
        const isAnswerCorrect = i === question.correctOption;

        const optionButtonClasses = `btn btn-option 
          ${hasAnswered && isChosenAnswer ? 'answer' : ''} 
          ${hasAnswered ? (isAnswerCorrect ? 'correct' : 'wrong') : ''}
          `;

        return (
          <button
            onClick={() => dispatch({ type: 'NEW_ANSWER', payload: i })}
            className={optionButtonClasses}
            disabled={hasAnswered}
            key={option}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
};

export default Options;
