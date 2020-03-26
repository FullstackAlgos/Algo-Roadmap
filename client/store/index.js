import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import history from "../utils/history";

// -------------------- INITIAL STATE --------------------
const initialState = {
  user: {},
  questions: [],
  userQuestions: [],
  tags: [],
  likes: []
};

// -------------------- ACTION TYPES --------------------
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const GET_QUESTIONS = "GET_QUESTIONS";
const ADD_QUESTION = "ADD_QUESTION";
const GET_USER_QUESTIONS = "GET_USER_QUESTIONS";
const GET_TAGS = "GET_TAGS";
const GET_LIKES = "GET_LIKES";
const ADD_LIKES = "ADD_LIKES";

// -------------------- ACTION CREATORS --------------------
export const getUser = user => ({ type: GET_USER, user });
export const removeUser = () => ({ type: REMOVE_USER });
export const getTags = tags => ({ type: GET_TAGS, tags });
export const getLikes = likes => ({ type: GET_LIKES, likes });
export const addLike = like => ({ type: ADD_LIKES, like });
export const getQuestions = questions => {
  return {
    type: GET_QUESTIONS,
    questions
  };
};
export const addQuestion = question => {
  return {
    type: ADD_QUESTION,
    question
  };
};
export const getUserQuests = userQuestions => {
  return {
    type: GET_USER_QUESTIONS,
    userQuestions
  };
};

// -------------------- THUNKY THUNKS --------------------
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

export const getAllQuestions = () => async dispatch => {
  try {
    const { data: allQuestions } = await axios.get("/api/questions");
    dispatch(getQuestions(allQuestions));
  } catch (error) {
    console.log("Redux Error -", error);
  }
};

export const addQuestThunk = questObj => async dispatch => {
  try {
    await axios.post("/api/questions", questObj);
    dispatch(addQuestion(questObj));
  } catch (error) {
    console.log("Redux Error -", error);
  }
};

export const getUserQuestThunk = userId => async dispatch => {
  try {
    const { data: userQuestions } = await axios.get(
      `/api/userQuestions/${userId}`
    );
    dispatch(getUserQuests(userQuestions));
  } catch (error) {
    console.log("Redux Error -", error);
  }
};

export const getAllTags = () => async dispatch => {
  try {
    const { data: tags } = await axios.get("/api/tags");
    dispatch(getTags(tags));
  } catch (error) {
    console.log("Redux Error -", error);
  }
};

export const getUserLikes = userId => async dispatch => {
  try {
    const { data: likes } = await axios.get(`/api/likes/${userId}`);
    dispatch(getLikes(likes));
  } catch (error) {
    console.log("Redux Error -", error);
  }
};

export const switchUserActive = (qId, qName) => async dispatch => {
  try {
    const user = Object.assign({}, store.getState().user);

    if (user.id) {
      await axios.put("/api/users/active", {
        userId: user.id,
        activeId: qId || 0,
        activeName: qName || ""
      });
      user.activeId = qId || 0;
      user.activeName = qName || "";
      dispatch(getUser(user));
      window.scrollTo(0, 0);
    }
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const newLike = (userId, qId, status, update) => async dispatch => {
  try {
    const likes = [...store.getState().likes];

    if (update) {
      await axios.put("/api/likes", { userId, qId, status });
      for (let i = 0; i < likes.length; i++) {
        if (likes[i].questionId === qId) {
          likes[i].status = status;
          break;
        }
      }
      dispatch(getLikes(likes));
    } else {
      await axios.post("/api/likes", { userId, qId, status });
      dispatch(addLike({ userId, questionId: qId, status }));
    }

    const questions = [...store.getState().questions];

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].id === qId) {
        const qLikes = questions[i].likes;
        let add = true;
        for (let j = 0; j < qLikes.length; j++) {
          if (userId === qLikes[j].userId) {
            qLikes[j].status = status;
            add = false;
            break;
          }
        }
        if (add) qLikes.push({ status, userId, questionId: qId });
        break;
      }
    }

    dispatch(getQuestions(questions));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const updateQuestion = questionObj => async dispatch => {
  try {
    await axios.put(`/api/questions/${questionObj.id}`, questionObj);
    const questions = [...store.getState().questions],
      tags = [...store.getState().tags];

    questions.forEach((q, i) => {
      if (q.id === questionObj.id) {
        const newQuestObj = Object.assign({}, q);

        newQuestObj.name = questionObj.name;
        newQuestObj.description = questionObj.description;
        newQuestObj.tagId = questionObj.tagId;
        newQuestObj.tag = tags.filter(t => t.id === questionObj.tagId)[0];

        questions[i] = newQuestObj;
      }
    });

    dispatch(getQuestions(questions));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

// -------------------- REDUCERS --------------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    case REMOVE_USER:
      return { ...state, user: {} };
    case GET_QUESTIONS:
      return { ...state, questions: action.questions };
    case ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.question] };
    case GET_USER_QUESTIONS:
      return { ...state, userQuestions: action.userQuestions };
    case GET_TAGS:
      return { ...state, tags: action.tags };
    case GET_LIKES:
      return { ...state, likes: action.likes };
    case ADD_LIKES:
      return { ...state, likes: [...state.likes, action.like] };
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
