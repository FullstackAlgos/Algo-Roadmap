import React, { Component } from "react";
import { connect } from "react-redux";
import AdminQuestion from "./AdminQuestion";

class AdminPanel extends Component {
  render() {
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

export default connect(mapState)(AdminPanel);
