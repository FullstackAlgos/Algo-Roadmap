import React, { Component } from "react";
import { connect } from "react-redux";
import AdminQuestion from "./AdminQuestion";

class AdminQuestPanel extends Component {
  render() {
    const { questions } = this.props;

    return (
      <div className="adminContentDiv">
        <div className="adminQuestPanelDiv">
          {questions.length
            ? questions.map((q, i) => <AdminQuestion key={i} q={q} />)
            : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    questions: state.questions
  };
};

export default connect(mapState)(AdminQuestPanel);
