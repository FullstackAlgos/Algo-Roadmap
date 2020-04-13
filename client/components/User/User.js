import React, { Component } from "react";
import { connect } from "react-redux";
import AllQuestPie from "../Chart/AllQuestPie";
import TagBar from "../Chart/TagBar";

class User extends Component {
  addQuest = () => {
    this.props.formFlip();
    window.scrollTo(0, 0);
  };

  render() {
    const { user, questions, likes, tags } = this.props;

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

              <AllQuestPie userLen={likes.length} questLen={questions.length} />

              <TagBar userQ={likes} allQ={questions} tags={tags} />

              <button
                type="button"
                className="questionAddBtn gBtn"
                onClick={this.addQuest}
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

const mapState = (state) => ({
  user: state.user,
  questions: state.questions,
  likes: state.likes,
  tags: state.tags,
});

export default connect(mapState)(User);
