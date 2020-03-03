import React, { Component } from "react";
import User from "./components/User";
import Roadmap from "./components/Roadmap";
import ProblemList from "./components/ProblemList";
import QuestionForm from "./components/QuestionForm";

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

            <ProblemList />
          </div>
        </div>

        {this.state.showForm ? <QuestionForm /> : null}
      </div>
    );
  }
}

export default App;
