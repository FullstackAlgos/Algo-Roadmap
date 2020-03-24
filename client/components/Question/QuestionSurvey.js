import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionSurvey extends Component {
  render() {
    return <div className="questSurveyFullDiv"></div>;
  }
}

export default connect()(QuestionSurvey);
