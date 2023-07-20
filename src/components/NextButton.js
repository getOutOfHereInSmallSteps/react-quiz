import React from 'react';

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return;

  if (index < numQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
        className="btn btn-ui"
      >
        Next
      </button>
    );
  }

  if (index === numQuestions - 1) {
    return (
      <button
        onClick={() => dispatch({ type: 'FINISH_QUIZ' })}
        className="btn btn-ui"
      >
        Finish
      </button>
    );
  }
};

export default NextButton;
