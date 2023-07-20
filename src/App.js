import React, { useEffect, useReducer } from 'react';

import data from './data/questions.json';

import Header from './components/Header';
import Main from './components/Main';

const initialState = {
  questions: [],
  // loading, error, ready, active, finished
  status: 'loading',
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
    case '': {
      return;
    }

    default: {
      throw new Error('Action unknown');
    }
  }
};

const App = () => {
  const [{ questions, status }, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then(res => res.json())
      .then(data => dispatch({ type: 'DATA_RECEIVED', payload: data }))
      .catch(err => dispatch({ type: 'DATA_FAILED' }));
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>{status}</Main>
    </div>
  );
};

export default App;
