import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import axios from "axios";
import history from "../utils/history";

// -------------------- INITIAL STATE --------------------
const initialState = {
  user: {},
  users: [],
  questions: [],
  userQuestions: [],
  tags: [],
  likes: [],
  proposeQuestions: []
};

// -------------------- ACTION TYPES --------------------
const GET_USER = "GET_USER";
const GET_ALL_USERS = "GET_ALL_USERS";
const REMOVE_USER = "REMOVE_USER";
const GET_QUESTIONS = "GET_QUESTIONS";
const ADD_QUESTION = "ADD_QUESTION";
const GET_USER_QUESTIONS = "GET_USER_QUESTIONS";
const GET_TAGS = "GET_TAGS";
const GET_LIKES = "GET_LIKES";
const ADD_LIKES = "ADD_LIKES";
const GET_PROP_QUESTS = "GET_PROP_QUESTS";
const ADD_PROP_QUEST = "ADD_PROP_QUEST";

// -------------------- ACTION CREATORS --------------------
export const getUser = user => ({ type: GET_USER, user });
export const getAllUsers = users => ({ type: GET_ALL_USERS, users });
export const removeUser = () => ({ type: REMOVE_USER });
export const getTags = tags => ({ type: GET_TAGS, tags });
export const getLikes = likes => ({ type: GET_LIKES, likes });
export const addLike = like => ({ type: ADD_LIKES, like });
export const getQuestions = questions => ({
  type: GET_QUESTIONS,
  questions
});
export const addQuestion = question => ({
  type: ADD_QUESTION,
  question
});
export const getUserQuests = userQuestions => ({
  type: GET_USER_QUESTIONS,
  userQuestions
});
export const getPropQuests = propQuestions => ({
  type: GET_PROP_QUESTS,
  propQuestions
});
export const addPropQuest = propQuest => ({
  type: ADD_PROP_QUEST,
  propQuest
});

// -------------------- THUNKY THUNKS --------------------
export const me = () => async dispatch => {
  try {
    const res = await axios.get("/api/users/me");
    dispatch(getUser(res.data || {}));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const allUsers = () => async dispatch => {
  try {
    const { data: users } = await axios.get("/api/users/all");
    dispatch(getAllUsers(users || []));
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

export const adminChange = (userId, update) => async dispatch => {
  try {
    await axios.put("/api/users/admin", { userId, update });

    const users = [...store.getState().users];
    users.forEach((u, i) => {
      if (u.id === userId) {
        const userObj = { ...u };
        userObj.isAdmin = update;
        users[i] = userObj;
      }
    });
    dispatch(getAllUsers(users));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const deleteUser = userId => async dispatch => {
  try {
    await axios.delete(`/api/users/${userId}`);

    const users = [...store.getState().users].filter(u => u.id !== userId);
    dispatch(getAllUsers(users));
  } catch (error) {
    console.error("Redux Error -", error);
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

export const getAllPropQuests = () => async dispatch => {
  try {
    const { data: allPropQuests } = await axios.get("/api/proposeQuestions");
    dispatch(getPropQuests(allPropQuests));
  } catch (error) {
    console.log("Redux Error -", error);
  }
};

export const proposeQuest = questObj => async dispatch => {
  try {
    await axios.post("/api/proposeQuestions", questObj);
    dispatch(addPropQuest(questObj));
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

export const changeTag = (tagId, tagName) => async dispatch => {
  try {
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
    const user = { ...store.getState().user };

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
    // UPDATING LIKES
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

    // UPDATING QUESTIONS
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

    // UPDATING USER QUESTIONS
    const userQuestions = [...store.getState().userQuestions],
      updateUserQ = !userQuestions.filter(q => q.id === qId).length;

    if (updateUserQ) {
      await axios.post("/api/userQuestions", { userId, questionId: qId });

      userQuestions.push({ ...questions.filter(q => q.id === qId)[0] });
      dispatch(getUserQuests(userQuestions));
    }
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const deleteQuestion = questionId => async dispatch => {
  try {
    await axios.delete(`/api/questions/${questionId}`);

    const questions = [...store.getState().questions].filter(
      q => q.id !== questionId
    );

    dispatch(getQuestions(questions));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const updateQuestion = questionObj => async dispatch => {
  try {
    await axios.put("/api/questions", questionObj);

    const questions = [...store.getState().questions],
      tags = [...store.getState().tags];

    questions.forEach((q, i) => {
      if (q.id === questionObj.id) {
        const newQuestObj = { ...q };

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

export const convertPropQuest = questObj => async dispatch => {
  try {
    await axios.post("/api/questions", questObj);

    dispatch(addQuestion(questObj));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

export const deletePropQuest = questId => async dispatch => {
  try {
    await axios.delete(`/api/proposeQuestions/${questId}`);

    const propQuestions = [...store.getState().proposeQuestions].filter(
      q => q.id !== questId
    );

    dispatch(getAllPropQuests(propQuestions));
  } catch (error) {
    console.error("Redux Error -", error);
  }
};

// -------------------- REDUCERS --------------------
const reducer = (state = initialState, action) => {
  switch (action.type) {
    // ------- USER -------
    case GET_USER:
      return { ...state, user: action.user };
    case GET_ALL_USERS:
      return { ...state, users: action.users };
    case REMOVE_USER:
      return { ...state, user: {} };
    // ------- QUESTIONS -------
    case GET_QUESTIONS:
      return { ...state, questions: action.questions };
    case ADD_QUESTION:
      return { ...state, questions: [...state.questions, action.question] };
    case GET_USER_QUESTIONS:
      return { ...state, userQuestions: action.userQuestions };
    // ------- TAGS -------
    case GET_TAGS:
      return { ...state, tags: action.tags };
    // ------- LIKES -------
    case GET_LIKES:
      return { ...state, likes: action.likes };
    case ADD_LIKES:
      return { ...state, likes: [...state.likes, action.like] };
    // ------- PROPOSE QUESTIONS -------
    case GET_PROP_QUESTS:
      return { ...state, proposeQuestions: action.propQuestions };
    case ADD_PROP_QUEST:
      return {
        ...state,
        proposeQuestions: [...state.proposeQuestions, action.propQuest]
      };
    default:
      return state;
  }
};

// -------------------- STORE CREATION --------------------
const middleware = composeWithDevTools(
  // applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
  applyMiddleware(thunkMiddleware)
);

const store = createStore(reducer, middleware);

export default store;
