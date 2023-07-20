import React from 'react';

import Options from './Options';

const Question = ({ activeQuestion: question }) => {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} />
    </div>
  );
};

export default Question;
