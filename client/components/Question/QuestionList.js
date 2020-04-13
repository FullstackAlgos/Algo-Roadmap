import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllQuestions, getAllTags, getUserLikes } from "../../store";
import SingleQuestion from "./SingleQuestion";

class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
      activeT: "--",
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

  setTagActive = (evt) => {
    const activeName = evt.target.innerText.split(/[.()]+/)[1].trim();

    if (activeName === this.state.activeT) this.setState({ activeT: "--" });
    else this.setState({ activeT: activeName });
  };

  setQuestActive = (evt) => {
    const activeName = evt.target.innerText;
    evt.persist();

    if (activeName === this.state.activeQ) this.setState({ activeQ: "--" });
    else this.setState({ activeQ: activeName });
  };

  doneQuests = (userQ) => {
    return userQ.reduce((a, b) => {
      a[b.question.id] = true;
      return a;
    }, {});
  };

  questionTag = (questions, tag, completed) => {
    if (completed) {
      const output = questions.filter((x) => x.question.tagId === tag.id);
      return output.length;
    } else {
      const output = questions.filter((x) => x.tag.id === tag.id);
      return output.length ? output : [{ name: "Currently Not Available" }];
    }
  };

  render() {
    const { questions, likes, tags } = this.props,
      sorted = [...tags].sort((a, b) => a.ranking - b.ranking),
      doneIds = this.doneQuests(likes);

    return (
      <div className="probListFullDiv mainDiv">
        <h3 className="probListHeader">Full Curated Question List</h3>

        {sorted.length
          ? sorted.map((tag, idx) => {
              const curateQuestions = this.questionTag(questions, tag, false),
                allQuestLen = curateQuestions.filter(
                  (x) => x.name !== "Currently Not Available"
                ).length,
                userTagQuestions = this.questionTag(likes, tag, true);

              return (
                <div key={idx} className="tagFullDiv">
                  <h2
                    className="tagHeader"
                    key={idx}
                    onClick={this.setTagActive}
                  >
                    {idx + 1}. {tag.name}&nbsp;&nbsp;&nbsp;&nbsp;(
                    {userTagQuestions} / {allQuestLen})
                  </h2>

                  {tag.name === this.state.activeT
                    ? curateQuestions
                        .sort((a, b) => a.difficulty - b.difficulty)
                        .map((q, i) => (
                          <SingleQuestion
                            key={i}
                            q={q}
                            done={doneIds[q.id]}
                            show={q.name === this.state.activeQ}
                            setActive={this.setQuestActive}
                          />
                        ))
                    : null}
                </div>
              );
            })
          : null}
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

const mapDispatch = (dispatch) => ({
  getAllQuestions: () => dispatch(getAllQuestions()),
  getAllTags: () => dispatch(getAllTags()),
  getUserLikes: (userId) => dispatch(getUserLikes(userId)),
});

export default connect(mapState, mapDispatch)(QuestionList);
