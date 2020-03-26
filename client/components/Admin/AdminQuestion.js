import React, { Component } from "react";
import { connect } from "react-redux";

class AdminQuestion extends Component {
  render() {
    const { questions, match } = this.props;
    console.log("quest -", match);

    return (
      <div className="adminQuestFullDiv">
        {questions.length
          ? questions.map((q, i) => <h3 key={i}>{q.name}</h3>)
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

export default connect(mapState)(AdminQuestion);
