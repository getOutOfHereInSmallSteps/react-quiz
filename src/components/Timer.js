import React, { useEffect } from 'react';

const Timer = ({ dispatch, secondsRemaining }) => {
  useEffect(() => {
    const quizTimer = () => {
      dispatch({ type: 'TICK' });
    };
    const quizInterval = setInterval(quizTimer, 1_000);

    return () => clearInterval(quizInterval);
  }, []);

  return <div className="timer">{secondsRemaining}</div>;
};

export default Timer;
