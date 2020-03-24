import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionSurvey extends Component {
  render() {
    return (
      <div className="questSurveyFullDiv">
        <h3>HOLA SURVEY</h3>
      </div>
    );
  }
}

export default connect()(QuestionSurvey);
