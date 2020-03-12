import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";

// INITIAL STATE
const initialState = {
  user: [],
  questions: []
};

// ACTION TYPES
const GET_PROBLEMS = "GET_PROBLEMS";
const ADD_QUESTION = "ADD_QUESTION";

// ACTION CREATORS
export const getProblems = questions => {
  return {
    type: GET_PROBLEMS,
    questions
  };
};

export const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};

// THUNKY THUNKS
export const getAllProblems = () => {
  return async dispatch => {
    try {
      const { data: allProblems } = await axios.get("/api/problems");
      dispatch(getProblems(allProblems));
    } catch (error) {
      console.log("Redux Error -", error);
    }
  };
};

export const addQuestThunk = questObj => {
  return async dispatch => {
    try {
      await axios.post("/api/problems", questObj);
      dispatch(addQuestion(questObj));
    } catch (error) {
      console.log("Redux Error -", error);
    }
  };
};

// REDUCERS
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROBLEMS:
      return { ...state, questions: action.questions };
    case ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.question] };
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
