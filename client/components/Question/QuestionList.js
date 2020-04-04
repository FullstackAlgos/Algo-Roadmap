import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllQuestions, getAllTags, getUserLikes } from "../../store";
import SingleQuestion from "./SingleQuestion";

class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
      activeQ: "--",
    };
  }

  componentDidMount() {
    const { getAllQuestions, getAllTags, user, getUserLikes } = this.props;
    getAllQuestions();
    getAllTags();
    if (user.id) getUserLikes(user.id);
  }

  componentDidUpdate(prevProps) {
    const { user, getUserLikes } = this.props;
    if (user.id && user.id !== prevProps.user.id) getUserLikes(user.id);
  }

  setActive = (evt) => {
    const activeName = evt.target.innerText;
    evt.persist();

    if (activeName === this.state.activeQ) this.setState({ activeQ: "--" });
    else this.setState({ activeQ: activeName });
  };

  doneQuests = (userQuestions) => {
    return userQuestions.reduce((a, b) => {
      a[b.id] = true;
      return a;
    }, {});
  };

  questionTag = (questions, tag, completed) => {
    console.log("hm -", questions);
    const output = questions.filter((x) => x.tag.id === tag.id);
    if (completed) return output.length;
    return output.length ? output : [{ name: "Currently Not Available" }];
  };

  render() {
    const { questions, userQuestions, tags } = this.props,
      doneIds = this.doneQuests(userQuestions);

    return (
      <div className="probListFullDiv">
        {tags.length
          ? tags.map((tag, idx) => {
              const curateQuestions = this.questionTag(questions, tag, false),
                userTagQuestions = this.questionTag(userQuestions, tag, true);

              return (
                <div key={idx} className="tagFullDiv">
                  <h2 className="tagHeader">
                    {tag.name} ({userTagQuestions.length}/
                    {curateQuestions.length})
                  </h2>

                  {curateQuestions
                    .sort((a, b) => a.difficulty - b.difficulty)
                    .map((q, i) => (
                      <SingleQuestion
                        key={i}
                        q={q}
                        done={doneIds[q.id]}
                        show={q.name === this.state.activeQ}
                        setActive={this.setActive}
                      />
                    ))}
                </div>
              );
            })
          : null}
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
    getAllQuestions: () => dispatch(getAllQuestions()),
    getAllTags: () => dispatch(getAllTags()),
    getUserLikes: (userId) => dispatch(getUserLikes(userId)),
  };
};

export default connect(mapState, mapDispatch)(QuestionList);
