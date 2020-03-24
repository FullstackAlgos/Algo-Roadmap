import React, { Component } from "react";
import { connect } from "react-redux";
import { switchUserActive } from "../../store";

class QuestionSurvey extends Component {
  constructor() {
    super();
    this.state = {
      survey: false,
      status: ""
    };
  }

  showSurvey = () => {
    this.setState({ survey: true });
  };

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
    console.log("render -", this.state);

    return (
      <div className="questPopFullDiv">
        <div className="questSurveyFullDiv">
          <p className="questSurveyText">
            Click "Finish" if you were able to complete the problem and can
            provide feedback. Otherwise, please click "Later".
          </p>

          <div className="questBtnDiv">
            <button
              type="button"
              className="questBtn gBtn"
              onClick={this.showSurvey}
            >
              Finished
            </button>

            {!this.state.survey ? (
              <button
                type="button"
                className="questBtn gBtn"
                onClick={this.props.switchUserActive}
              >
                Later
              </button>
            ) : null}
          </div>

          {this.state.survey ? (
            <form className="questForm" onSubmit={this.handleNewQuest}>
              <div className="questSurveyRadioDiv">
                <label htmlFor="name" className="questLabels">
                  Like
                </label>
                <input
                  type="radio"
                  name="status"
                  value="like"
                  onChange={this.handleChange}
                  className="surveyRadio"
                />

                <label htmlFor="name" className="questLabels">
                  Dislike
                </label>
                <input
                  type="radio"
                  name="status"
                  value="dislike"
                  onChange={this.handleChange}
                  className="surveyRadio"
                />
              </div>

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
          ) : null}
        </div>
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
