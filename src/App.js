import React, { useEffect, useReducer } from 'react';

// import data from './data/questions.json';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Progress from './components/Progress';
import Question from './components/Question';
import NextButton from './components/NextButton';
import FinishScreen from './components/FinishScreen';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'DATA_RECEIVED': {
      return {
        ...state,
        questions: action.payload,
        status: 'ready',
      };
    }
    case 'DATA_FAILED': {
      return {
        state,
        status: 'error',
      };
    }
    case 'START': {
      return {
        ...state,
        status: 'active',
      };
    }
    case 'NEW_ANSWER': {
      const currentQuestion = state.questions.at(state.index);
      const isCorrectAnswer = action.payload === currentQuestion.correctOption;

      return {
        ...state,
        answer: action.payload,
        points: isCorrectAnswer
          ? state.points + currentQuestion.points
          : state.points,
      };
    }

    case 'NEXT_QUESTION': {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }

    case 'FINISH_QUIZ': {
      return {
        ...state,
        status: 'finished',
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }

    default: {
      throw new Error('Action unknown');
    }
  }
};

const App = () => {
  const [{ questions, status, index, answer, points, highscore }, dispatch] =
    useReducer(reducer, initialState);

  const questionsNum = questions.length;
  const totalPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'DATA_RECEIVED', payload: data }))
      .catch(err => dispatch({ type: 'DATA_FAILED' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === 'loading' && <Loader />}
        {status === 'error' && <Error />}
        {status === 'ready' && (
          <StartScreen numQuestions={questionsNum} dispatch={dispatch} />
        )}
        {status === 'active' && (
          <React.Fragment>
            <Progress
              index={index}
              numQuestions={questionsNum}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              activeQuestion={questions[index]}
              answer={answer}
            />
            <NextButton
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={questionsNum}
            />
          </React.Fragment>
        )}
        {status === 'finished' && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highscore={highscore}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
