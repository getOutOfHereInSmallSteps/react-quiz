import React from 'react';

const FinishScreen = ({ points, totalPoints }) => {
  const correctPercentage = Math.floor((points / totalPoints) * 100);

  return (
    <p>
      You scored <strong>{points}</strong> out of {totalPoints} (
      {correctPercentage} %)
    </p>
  );
};

export default FinishScreen;
