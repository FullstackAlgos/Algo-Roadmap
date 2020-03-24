import React, { Component } from "react";
import { connect } from "react-redux";

class QuestionSurvey extends Component {
  constructor() {
    super();
    this.state = {
      like: ""
    };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleNewQuest = evt => {
    evt.preventDefault();
    const { formFlip, addQuest } = this.props;
    addQuest(this.state);
    formFlip();
  };

  render() {
    return (
      <div className="questPopFullDiv">
        <form className="questForm" onSubmit={this.handleNewQuest}>
          <label htmlFor="name" className="questLabels">
            Question Name:
          </label>
          <input
            type="text"
            name="name"
            value={this.state.name}
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
              onClick={this.props.formFlip}
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
