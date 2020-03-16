import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllQuestions } from "../../store";
import SingleQuestion from "./SingleQuestion";

class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
      activeQ: "--"
    };
  }

  componentDidMount() {
    this.props.getAllQuestions();
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

  render() {
    const { questions, userQuestions } = this.props,
      doneIds = this.doneQuests(userQuestions);
    // console.log("render -", doneIds, questions, userQuestions);

    return (
      <div className="probListFullDiv">
        {questions.length
          ? questions.map((q, i) => (
              <SingleQuestion
                key={i}
                q={q}
                done={doneIds[q.id]}
                show={q.name === this.state.activeQ}
                setActive={this.setActive}
              />
            ))
          : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    questions: state.questions,
    userQuestions: state.userQuestions
  };
};

const mapDispatch = dispatch => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions())
  };
};

export default connect(mapState, mapDispatch)(QuestionList);
