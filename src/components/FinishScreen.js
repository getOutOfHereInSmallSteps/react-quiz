import React from 'react';

const FinishScreen = ({ points, totalPoints, highscore, dispatch }) => {
  const correctPercentage = Math.floor((points / totalPoints) * 100);

  return (
    <React.Fragment>
      <p className="result">
        You scored <strong>{points}</strong> out of {totalPoints} (
        {correctPercentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button
        onClick={() => dispatch({ type: 'RESTART' })}
        className="btn btn-ui"
      >
        Restart quiz
      </button>
    </React.Fragment>
  );
};

export default FinishScreen;
