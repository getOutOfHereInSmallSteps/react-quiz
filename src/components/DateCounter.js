import { useReducer, useState } from 'react';

function DateCounter() {
  // const [count, setCount] = useState(0);
  // const [step , setStep] = useState(1);

  const initialState = {
    count: 0,
    step: 1,
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case 'DEC': {
        return {
          ...state,
          count: state.count - state.step,
        };
      }
      case 'INC': {
        return {
          ...state,
          count: state.count + state.step,
        };
      }
      case 'SET_COUNT': {
        return {
          ...state,
          count: action.payload,
        };
      }
      case 'SET_STEP': {
        return {
          ...state,
          step: action.payload,
        };
      }
      case 'RESET': {
        return initialState;
      }
      default: {
        return state;
      }
    }

    // if (action.type === 'DEC') {
    //   // return state - 1;
    //   return {
    //     ...state,
    //     count: state.count - state.step,
    //   };
    // }

    // if (action.type === 'INC') {
    //   // return state + 1;
    //   return {
    //     ...state,
    //     count: state.count + state.step,
    //   };
    // }

    // if (action.type === 'SET_COUNT') {
    //   // return action.payload;
    //   return {
    //     ...state,
    //     count: action.payload,
    //   };
    // }

    // if (action.type === 'SET_STEP') {
    //   return {
    //     ...state,
    //     step: action.payload,
    //   };
    // }

    // if (action.type === 'RESET') {
    //   // return 0;
    //   return {
    //     count: 0,
    //     step: 1,
    //   };
    // }
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { count, step } = state;

  // This mutates the date object.
  const date = new Date('june 21 2027');
  date.setDate(date.getDate() + count);

  const dec = function () {
    // setCount((count) => count - 1);
    // setCount(count => count - step);
    dispatch({ type: 'DEC' });
  };

  const inc = function () {
    // setCount((count) => count + 1);
    // setCount(count => count + step);
    dispatch({ type: 'INC' });
  };

  const defineCount = function (e) {
    // setCount(Number(e.target.value));
    dispatch({ type: 'SET_COUNT', payload: +e.target.value });
  };

  const defineStep = function (e) {
    // setStep(Number(e.target.value));
    dispatch({ type: 'SET_STEP', payload: +e.target.value });
  };

  const reset = function () {
    // setCount(0);
    // setStep(1);
    dispatch({ type: 'RESET' });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={defineStep}
        />
        <span>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
