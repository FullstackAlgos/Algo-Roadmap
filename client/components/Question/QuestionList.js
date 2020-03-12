import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProblems } from "../../store";
import SingleQuestion from "./SingleQuestion";

class QuestionList extends Component {
  componentDidMount() {
    this.props.getAllProblems();
  }

  render() {
    const { questions } = this.props;

    return (
      <div className="probListFullDiv">
        {questions.length
          ? questions.map((q, i) => <SingleQuestion key={i} q={q} />)
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
