import React, { Component } from "react";
import User from "./components/User";
import Roadmap from "./components/Roadmap";
import ProblemList from "./components/ProblemList";

class App extends Component {
  render() {
    return (
      <div>
        <div className="navBarDiv">
          <h4>App</h4>
        </div>

        <div className="belowNavDiv">
          <User />

          <div className="rightContentDiv">
            <Roadmap />

            <ProblemList />
          </div>
        </div>
      </div>
    );
  }
}

export default App;