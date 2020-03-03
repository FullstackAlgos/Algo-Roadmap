import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// INITIAL STATE
const initialState = {
  user: [],
  questions: []
};

// ACTION TYPES
const ADD_QUESTION = "ADD_QUESTION";

// ACTION CREATORS
export const addQuestion = questions => {
  return {
    type: ADD_QUESTION,
    questions
  };
};

// THUNKY THUNKS
export const addQuestThunk = questObj => {
  return async dispatch => {
    try {
      console.log("thunky -", questObj);
    } catch (error) {
      console.log("Redux Error -", error);
    }
  };
};

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return { ...state };
    default:
      return state;
  }
};

// STORE CREATION
const middleware = composeWithDevTools(
  // applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
