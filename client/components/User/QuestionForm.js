import React, { Component } from "react";
import { connect } from "react-redux";
import { addQuestThunk } from "../../store";

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      difficulty: "",
      link: ""
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
      <div className="questFormFullDiv">
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

          <label htmlFor="description" className="questLabels">
            Description:
          </label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            className="inputBox"
          />

          <label htmlFor="difficulty" className="questLabels">
            Difficulty:
          </label>
          <input
            type="text"
            name="difficulty"
            value={this.state.difficulty}
            onChange={this.handleChange}
            className="inputBox"
          />

          <label htmlFor="link" className="questLabels">
            Link:
          </label>
          <input
            type="text"
            name="link"
            value={this.state.link}
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

const mapDispatch = dispatch => {
  return {
    addQuest: questObj => dispatch(addQuestThunk(questObj))
  };
};

export default connect(null, mapDispatch)(QuestionForm);
