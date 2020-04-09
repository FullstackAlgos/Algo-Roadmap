import React, { Component } from "react";
import { connect } from "react-redux";
import { getUserQuestThunk } from "../../store";
import AllQuestPie from "../Chart/AllQuestPie";
import TagBar from "../Chart/TagBar";

class User extends Component {
  componentDidMount() {
    const { getUserQuestThunk, user } = this.props;
    if (user && user.id) getUserQuestThunk(user.id);
  }

  componentDidUpdate(prevProps) {
    const { getUserQuestThunk, user } = this.props;
    if (user.id && user.id !== prevProps.user.id) getUserQuestThunk(user.id);
  }

  render() {
    const { user, questions, userQuestions, formFlip, tags } = this.props;

    return (
      <div className="userFullDiv mainDiv">
        <div className="userInsideDiv">
          {user.id ? (
            <>
              <h2 className="userHeader">
                Welcome,{" "}
                <span style={{ color: "rgba(0, 152, 195,1)" }}>
                  {user.name}
                </span>
                !
              </h2>

              <AllQuestPie
                userLen={userQuestions.length}
                questLen={questions.length}
              />

              <TagBar userQ={userQuestions} allQ={questions} tags={tags} />

              <button
                type="button"
                className="questionAddBtn gBtn"
                onClick={formFlip}
              >
                Suggest New Question
              </button>
            </>
          ) : (
            <h2 className="userHeader">
              <a href="/SignIn" className="userSignInLink">
                Sign In
              </a>{" "}
              to track your progress!
            </h2>
          )}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    user: state.user,
    questions: state.questions,
    userQuestions: state.userQuestions,
    tags: state.tags,
  };
};

const mapDispatch = (dispatch) => {
  return {
    getUserQuestThunk: (userId) => dispatch(getUserQuestThunk(userId)),
  };
};

export default connect(mapState, mapDispatch)(User);
