import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllQuestions, getAllTags, switchUserActive } from "../../store";
import SingleQuestion from "./SingleQuestion";

class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
      activeQ: "--"
    };
  }

  componentDidMount() {
    const { getAllQuestions, getAllTags } = this.props;
    getAllQuestions();
    getAllTags();
  }

  setActive = evt => {
    const activeName = evt.target.innerText;
    evt.persist();

    if (activeName === this.state.activeQ) this.setState({ activeQ: "--" });
    else this.setState({ activeQ: activeName });
  };

  doneQuests = userQuestions => {
    return userQuestions.reduce((a, b) => {
      a[b.id] = true;
      return a;
    }, {});
  };

  questionTag = (questions, tag) => {
    const output = questions.filter(x => x.tags[0].id === tag.id);
    return output.length ? output : [{ name: "Currently Not Available" }];
  };

  render() {
    const { questions, userQuestions, tags, switchUserActive } = this.props,
      doneIds = this.doneQuests(userQuestions);

    return (
      <div className="probListFullDiv">
        {tags.length
          ? tags.map((tag, idx) => {
              const curateQuestions = this.questionTag(questions, tag);

              return (
                <div key={idx} className="tagFullDiv">
                  <h2 className="tagHeader">{tag.name}</h2>

                  {curateQuestions.map((q, i) => (
                    <SingleQuestion
                      key={i}
                      q={q}
                      done={doneIds[q.id]}
                      show={q.name === this.state.activeQ}
                      setActive={this.setActive}
                      switchUserActive={switchUserActive}
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

const mapState = state => {
  return {
    questions: state.questions,
    userQuestions: state.userQuestions,
    tags: state.tags
  };
};

const mapDispatch = dispatch => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    getAllTags: () => dispatch(getAllTags()),
    switchUserActive: questionId => dispatch(switchUserActive(questionId))
  };
};

export default connect(mapState, mapDispatch)(QuestionList);
