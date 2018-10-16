import { ADD_NUMBER } from "../constants/action-types";

const initialState = {
  cells: []
};
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NUMBER:
    return { ...state, cells: state.cells.concat(action.payload) };
    default:
      return state;
  }
};

export default rootReducer;
