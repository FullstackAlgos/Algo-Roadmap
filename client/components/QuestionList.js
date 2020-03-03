import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProblems } from "../store";
import Question from "./Question";

class QuestionList extends Component {
  componentDidMount() {
    this.props.getAllProblems();
  }

  render() {
    const { questions } = this.props;

    return (
      <div className="probListFullDiv">
        {questions.length
          ? questions.map((q, i) => <Question key={i} q={q} />)
          : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    questions: state.questions
  };
};

const mapDispatch = dispatch => {
  return {
    getAllProblems: () => dispatch(getAllProblems())
  };
};

export default connect(mapState, mapDispatch)(QuestionList);
