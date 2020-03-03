import React, { Component } from "react";
import { connect } from "react-redux";
import { addQuestThunk } from "../store";

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      url: "",
      image: ""
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

          <label htmlFor="url" className="questLabels">
            Link:
          </label>
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            className="inputBox"
          />

          <label htmlFor="image" className="questLabels">
            Image:
          </label>
          <input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
            className="inputBox"
          />

          <button type="submit" className="questSubmitBtn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

const mapState = state => {
  return {};
};

const mapDispatch = dispatch => {
  return {
    addQuest: questObj => dispatch(addQuestThunk(questObj))
  };
};

export default connect(mapState, mapDispatch)(QuestionForm);
