import React, { Component } from "react";
import { connect } from "react-redux";

import NavBar from "./Global/NavBar";
import Routes from "./Routes";
import QuestionForm from "./User/QuestionForm";
import QuestionSurvey from "./Question/QuestionSurvey";

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
    const { user } = this.props;

    return (
      <div className="fullAppDiv">
        <NavBar />

        <Routes formFlip={this.showFormFlip} />

        {this.state.showForm ? (
          <QuestionForm formFlip={this.showFormFlip} />
        ) : null}

        {user && user.activeId ? <QuestionSurvey /> : null}
      </div>
    );
  }
}

const mapState = state => {
  return { user: state.user };
};

export default connect(mapState)(App);
