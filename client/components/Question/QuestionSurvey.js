import React, { Component } from "react";
import { connect } from "react-redux";
import { switchUserActive, newLike } from "../../store";

class QuestionSurvey extends Component {
  constructor() {
    super();
    this.state = {
      survey: false,
      status: "like",
    };
  }

  showSurvey = () => {
    this.setState({ survey: true });
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  postLike = (evt) => {
    evt.preventDefault();
    const { user, switchUserActive, newLike, likes } = this.props;
    let update = false;

    for (const q of likes) {
      if (q.questionId === user.activeId) {
        update = true;
        break;
      }
    }

    newLike(user.id, user.activeId, this.state.status, update);
    this.setState({ survey: false, status: "" });
    switchUserActive();
  };

  render() {
    const { user, switchUserActive } = this.props;

    return (
      <div className="questPopFullDiv">
        <div className="questSurveyFullDiv">
          <h3 className="questSurveyHeader">{user.activeName}</h3>

          <p className="questSurveyText">
            Click "<strong>Next</strong>" if you were able to complete the
            problem and can provide feedback. Otherwise, please click "
            <strong>Later</strong>".
          </p>

          {!this.state.survey ? (
            <div className="questBtnDiv">
              <button
                type="button"
                className="questBtn gBtn"
                onClick={this.showSurvey}
              >
                Next
              </button>

              <button
                type="button"
                className="questBtn gBtn"
                onClick={switchUserActive}
              >
                Later
              </button>
            </div>
          ) : null}

          {this.state.survey ? (
            <form className="questSurveyForm" onSubmit={this.postLike}>
              <div className="questSurveyRadioDiv">
                <div className="questSurveyPair">
                  <label htmlFor="name" className="questSurveyLabels">
                    Like
                  </label>
                  <input
                    type="radio"
                    name="status"
                    value="like"
                    checked
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
                  onClick={switchUserActive}
                >
                  Later
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapState = (state) => {
  return { user: state.user, likes: state.likes };
};

const mapDispatch = (dispatch) => {
  return {
    switchUserActive: () => dispatch(switchUserActive()),
    newLike: (userId, qId, status, update) =>
      dispatch(newLike(userId, qId, status, update)),
  };
};

export default connect(mapState, mapDispatch)(QuestionSurvey);
