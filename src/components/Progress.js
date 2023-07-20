import React from 'react';

const Progress = ({ index, numQuestions, points, totalPoints, answer }) => {
  return (
    <header className="progress">
      <progress
        className="progress-bar"
        max={numQuestions}
        value={index + Number(answer !== null)}
      />

      <p>
        Question <strong>{index + 1}</strong> / {numQuestions}
      </p>
      <p>
        <strong>{points}</strong> / {totalPoints} points
      </p>
    </header>
  );
};

export default Progress;
