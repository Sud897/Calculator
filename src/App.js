import "./App.css";
import React, { useReducer } from "react";
import DigitButton from "./DigitButton";
import OperatorButton from "./OperatorButton";
export const ACTIONS = {
  ADD_DIGIT: "add_digit",
  DELETE_DIGIT: "delete_digit",
  CLEAR: "clear",
  CHOOSE_OPERATOR: "choose_operator",
  EVALUATE: "evaluate",
};
const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && state.currentOperand.includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.CHOOSE_OPERATOR:
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }
      if (state.previousOperand === null) {
        return {
          // ...state,
          operator: payload.operator,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        operator: payload.operator,
        previousOperand: evaluate(state),
        currentOperand: null,
      };
    case ACTIONS.CLEAR:
      return {};
    case ACTIONS.DELETE_DIGIT:
      if (state.currentOperand === null) {
        return state;
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
  }
};

const evaluate = ({ operator, previousOperand, currentOperand }) => {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) {
    return "";
  }
  let computation = "";
  switch (operator) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  }
  return computation.toString;
};
const App = () => {
  const [{ currentOperand, previousOperand, operator }, dispatch] = useReducer(
    reducer,
    {}
  );

  return (
    <div className="container">
      {/* <form>
        <input type="text" value={result} onChange={changeHandler} />
      </form> */}
      <div className="output">
        <div className="previous-operand">
          {previousOperand}
          {operator}
        </div>
        <div className="current-operand">{currentOperand}</div>
      </div>
      <div className="keyboard">
        <button onClick={() => dispatch({ type: ACTIONS.CLEAR })} id="clear">
          Clear
        </button>
        <button
          onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
          id="backspace"
        >
          C
        </button>
        <OperatorButton operator="÷" dispatch={dispatch} />

        <DigitButton digit="7" dispatch={dispatch} />
        <DigitButton digit="8" dispatch={dispatch} />
        <DigitButton digit="9" dispatch={dispatch} />

        <OperatorButton operator="*" dispatch={dispatch} />

        <DigitButton digit="4" dispatch={dispatch} />
        <DigitButton digit="5" dispatch={dispatch} />
        <DigitButton digit="6" dispatch={dispatch} />

        <OperatorButton operator="+" dispatch={dispatch} />

        <DigitButton digit="1" dispatch={dispatch} />
        <DigitButton digit="2" dispatch={dispatch} />
        <DigitButton digit="3" dispatch={dispatch} />

        <OperatorButton operator="-" dispatch={dispatch} />

        <DigitButton digit="." dispatch={dispatch} />
        <DigitButton digit="0" dispatch={dispatch} />
        <button onClick={() => dispatch()} id="result">
          =
        </button>
      </div>
    </div>
  );
};

export default App;
