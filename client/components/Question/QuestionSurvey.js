import React, { Component } from "react";
import { connect } from "react-redux";

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
    const { surveyFlip } = this.props;
    // SEND TO BACKEND THE STATUS
    surveyFlip();
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
              onClick={this.props.surveyFlip}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default connect()(QuestionSurvey);
