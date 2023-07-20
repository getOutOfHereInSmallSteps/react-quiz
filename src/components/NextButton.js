import React from 'react';

const NextButton = ({ dispatch, answer }) => {
  if (answer === null) return;

  return (
    <button
      onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
      className="btn btn-ui"
    >
      Next
    </button>
  );
};

export default NextButton;
