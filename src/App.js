import React, { useEffect, useReducer } from 'react';

// import data from './data/questions.json';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
  index: 0,
  answer: null,
  points: 0,
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

    case '': {
      return;
    }

    default: {
      throw new Error('Action unknown');
    }
  }
};

const App = () => {
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const questionsNum = questions.length;

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
            <Question
              dispatch={dispatch}
              activeQuestion={questions[index]}
              answer={answer}
            />
            <NextButton dispatch={dispatch} answer={answer} />
          </React.Fragment>
        )}
      </Main>
    </div>
  );
};

export default App;
