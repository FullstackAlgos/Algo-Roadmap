import React, { Component } from "react";
import { connect } from "react-redux";

class AdminQuestion extends Component {
  render() {
    const { questions } = this.props;

    return (
      <div className="adminContentDiv">
        <div className="adminQuestFullDiv">
          {questions.length
            ? questions.map((q, i) => <h3 key={i}>{q.name}</h3>)
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

export default connect(mapState)(AdminQuestion);
