import React, { Component } from "react";

import NavBar from "./Global/NavBar";
import QuestionForm from "./User/QuestionForm";
import Routes from "./Routes";

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

  render() {
    return (
      <div className="fullAppDiv">
        <NavBar />

        <Routes formFlip={this.showFormFlip} />

        {this.state.showForm ? (
          <QuestionForm formFlip={this.showFormFlip} />
        ) : null}
      </div>
    );
  }
}

export default App;
