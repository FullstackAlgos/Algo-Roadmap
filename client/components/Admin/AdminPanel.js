import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllQuestions, getAllTags } from "../../store";
import AdminQuestion from "./AdminQuestion";

class AdminPanel extends Component {
  componentDidMount() {
    const { getAllQuestions, getAllTags } = this.props;
    getAllQuestions();
    getAllTags();
  }

  render() {
    const { questions } = this.props;

    return (
      <div className="adminPanelFullDiv">
        {questions.length
          ? questions.map((q, i) => <AdminQuestion key={i} q={q} />)
          : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    questions: state.questions,
    tags: state.tags
  };
};

const mapDispatch = dispatch => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    getAllTags: () => dispatch(getAllTags())
  };
};

export default connect(mapState, mapDispatch)(AdminPanel);
