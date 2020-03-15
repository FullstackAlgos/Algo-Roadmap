import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import history from "../utils/history";

// INITIAL STATE
const initialState = {
  user: {},
  questions: []
};

// ACTION TYPES
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const GET_PROBLEMS = "GET_PROBLEMS";
const ADD_QUESTION = "ADD_QUESTION";

// ACTION CREATORS
export const getUser = user => ({ type: GET_USER, user });

export const removeUser = () => ({ type: REMOVE_USER });

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
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/api/users/me");
    dispatch(getUser(res.data || {}));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const auth = userObj => async dispatch => {
  let res;
  try {
    // formName HELPS PINPOINT LOGIN VS. SIGNUP
    const { formName } = userObj;
    res = await axios.post(`/api/users/${formName}`, userObj);
  } catch (authError) {
    return dispatch(getUser({ error: authError }));
  }

  try {
    dispatch(getUser(res.data));
    history.push("/");
  } catch (dispatchOrHistoryErr) {
    console.error(dispatchOrHistoryErr);
  }
};

export const logout = () => async dispatch => {
  try {
    await axios.post("/api/users/logout");
    dispatch(removeUser());
    history.push("/SignIn");
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

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
    case GET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: {} };
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
