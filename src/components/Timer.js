import React, { useEffect } from 'react';

const Timer = ({ dispatch, secondsRemaining }) => {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    const quizTimer = () => {
      dispatch({ type: 'TICK' });
    };
    const quizInterval = setInterval(quizTimer, 1_000);

    return () => clearInterval(quizInterval);
  }, []);

  return (
    <div className="timer">
      {minutes < 10 ? '0' : ''}
      {minutes}:{seconds < 10 ? '0' : ''}
      {seconds}
    </div>
  );
};

export default Timer;
