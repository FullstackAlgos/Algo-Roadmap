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

  postLike = evt => {
    evt.preventDefault();

    // SEND TO BACKEND THE STATUS
  };

  render() {
    console.log("render -", this.props, this.state);

    return (
      <div className="questPopFullDiv">
        <div className="questSurveyFullDiv">
          <p className="questSurveyText">
            Click "Finish" if you were able to complete the problem and can
            provide feedback. Otherwise, please click "Later".
          </p>

          {!this.state.survey ? (
            <div className="questBtnDiv">
              <button
                type="button"
                className="questBtn gBtn"
                onClick={this.showSurvey}
              >
                Finish
              </button>

              <button
                type="button"
                className="questBtn gBtn"
                onClick={this.props.switchUserActive}
              >
                Later
              </button>
            </div>
          ) : null}

          {this.state.survey ? (
            <form className="questForm" onSubmit={this.postLike}>
              <div className="questSurveyRadioDiv">
                <div className="questSurveyPair">
                  <label htmlFor="name" className="questSurveyLabels">
                    Like
                  </label>
                  <input
                    type="radio"
                    name="status"
                    value="like"
                    onChange={this.handleChange}
                    className="surveyRadio"
                  />
                </div>

                <div className="questSurveyPair">
                  <label htmlFor="name" className="questSurveyLabels">
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

const mapState = state => {
  return { user: state.user };
};

const mapDispatch = dispatch => {
  return {
    switchUserActive: () => dispatch(switchUserActive())
  };
};

export default connect(mapState, mapDispatch)(QuestionSurvey);
