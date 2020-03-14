import React, { Component } from "react";

import NavBar from "./Global/NavBar";
import QuestionForm from "./User/QuestionForm";
import HomePage from "./Global/HomePage";
import Routes from "./Routes";

class App extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    };
  }

  showFormFlip = () => {
    this.setState({ showForm: !this.state.showForm });
  };

  render() {
    return (
      <div className="fullAppDiv">
        <NavBar />

        {/* <HomePage formFlip={this.showFormFlip} /> */}
        <Routes formFlip={this.showFormFlip} />

        {this.state.showForm ? (
          <QuestionForm formFlip={this.showFormFlip} />
        ) : null}
      </div>
    );
  }
}

export default App;
