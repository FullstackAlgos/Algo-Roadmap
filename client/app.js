import React, { Component } from "react";
import User from "./components/User/User";
import Roadmap from "./components/Roadmap/Roadmap";
import QuestionList from "./components/Question/QuestionList";
import QuestionForm from "./components/User/QuestionForm";

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
        <div className="navBarDiv">
          <h4>App</h4>
        </div>

        <div className="belowNavDiv">
          <User formFlip={this.showFormFlip} />

          <div className="rightContentDiv">
            <Roadmap />

            <QuestionList />
          </div>
        </div>

        {this.state.showForm ? (
          <QuestionForm formFlip={this.showFormFlip} />
        ) : null}
      </div>
    );
  }
}

export default App;
