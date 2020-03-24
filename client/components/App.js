import React, { Component } from "react";

import NavBar from "./Global/NavBar";
import Routes from "./Routes";
import QuestionForm from "./User/QuestionForm";
import QuestionSurvey from "./Question/QuestionSurvey";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false,
      showSurvey: false
    };
  }

  showFormFlip = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  showSurveyFlip = () => {
    this.setState({ showSurvey: !this.state.showSurvey });
  };

  render() {
    return (
      <div className="fullAppDiv">
        <NavBar />

        <Routes formFlip={this.showFormFlip} />

        {this.state.showForm ? (
          <QuestionForm formFlip={this.showFormFlip} />
        ) : null}

        {this.state.showSurvey ? (
          <QuestionSurvey surveyFlip={this.showSurveyFlip} />
        ) : null}
      </div>
    );
  }
}

export default App;
