import { ACTIONS } from "./App";
const OperatorButton = ({ operator, dispatch }) => {
  return (
    <button
      onClick={() =>
        dispatch({ type: ACTIONS.CHOOSE_OPERATOR, payload: { operator } })
      }
    >
      {operator}
    </button>
  );
};
export default OperatorButton;
