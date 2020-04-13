import React, { Component } from "react";
import { connect } from "react-redux";
import AdminQuestion from "./AdminQuestion";
import { getAllQuestions } from "../../store";

class AdminQuestPanel extends Component {
  componentDidMount() {
    this.props.getAllQuestions();
  }

  render() {
    const { questions } = this.props,
      sorted = [...questions].sort((a, b) => a.id - b.id);

    return (
      <div className="adminContentDiv">
        <div className="adminQuestPanelDiv">
          {sorted.length
            ? sorted.map((q, i) => <AdminQuestion key={i} q={q} />)
            : null}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  questions: state.questions,
});

const mapDispatch = (dispatch) => ({
  getAllQuestions: () => dispatch(getAllQuestions()),
});

export default connect(mapState, mapDispatch)(AdminQuestPanel);
