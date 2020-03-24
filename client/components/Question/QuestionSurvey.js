import React, { Component } from "react";
import { connect } from "react-redux";
import { switchUserActive } from "../../store";

class QuestionSurvey extends Component {
  constructor() {
    super();
    this.state = {
      showSurvey: false,
      status: ""
    };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleNewQuest = evt => {
    evt.preventDefault();

    // SEND TO BACKEND THE STATUS
  };

  render() {
    return (
      <div className="questPopFullDiv">
        <form className="questForm" onSubmit={this.handleNewQuest}>
          <label htmlFor="name" className="questLabels">
            Like / Dislike:
          </label>
          <input
            type="text"
            name="name"
            value={this.state.status}
            onChange={this.handleChange}
            className="inputBox"
          />

          <div className="questBtnDiv">
            <button type="submit" className="questBtn gBtn">
              Submit
            </button>

            <button
              type="button"
              className="questBtn gBtn"
              onClick={this.props.switchUserActive}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    switchUserActive: () => dispatch(switchUserActive())
  };
};

export default connect(null, mapDispatch)(QuestionSurvey);
