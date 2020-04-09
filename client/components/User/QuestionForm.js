import React, { Component } from "react";
import { connect } from "react-redux";
import { proposeQuest } from "../../store";
import { difficultMap } from "../../utils/utilities";

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      difficulty: "1",
      link: "",
      tag: "Array",
    };
  }

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleNewQuest = (evt) => {
    evt.preventDefault();
    const { formFlip, proposeQuest, tags, user } = this.props,
      { name, description, difficulty, link, tag } = this.state,
      tagId = tags.filter((t) => t.name === tag)[0].id;

    proposeQuest({
      userId: user.id,
      name,
      description,
      difficulty,
      link,
      tagId,
    });
    formFlip();
  };

  render() {
    const { tags } = this.props;

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
          <select
            name="difficulty"
            value={this.state.difficulty}
            onChange={this.handleChange}
            className="questSelect"
          >
            {Object.keys(difficultMap).map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>

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

          <label htmlFor="tag" className="questLabels">
            New Tag:
          </label>
          <select
            name="tag"
            value={this.state.tag}
            onChange={this.handleChange}
            className="questSelect"
          >
            {tags.length
              ? tags.map((t, i) => <option key={i}>{t.name}</option>)
              : null}
          </select>

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

const mapState = (state) => {
  return {
    user: state.user,
    tags: state.tags,
  };
};

const mapDispatch = (dispatch) => {
  return {
    proposeQuest: (questObj) => dispatch(proposeQuest(questObj)),
  };
};

export default connect(mapState, mapDispatch)(QuestionForm);
