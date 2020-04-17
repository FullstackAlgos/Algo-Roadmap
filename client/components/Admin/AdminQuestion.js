import React, { Component } from "react";
import { connect } from "react-redux";
import { updateQuestion, deleteQuestion } from "../../store";
import { difficultMap } from "../../utils/utilities";

class AdminQuestion extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      showDelete: false,
      name: "",
      description: "",
      tag: "--",
      difficulty: "--",
    };
  }

  deleteQuest = (update) => {
    if (update) {
      const { q, deleteQuestion } = this.props;
      deleteQuestion(q.id);
    }

    this.setState({ showDelete: !this.state.showDelete });
    window.scrollTo(0, 0);
  };

  changeJSX = (name) => (
    <div className="questPopFullDiv">
      <div className="questSurveyFullDiv">
        <h3 className="adminUserPopUpText">
          Are you sure you want to delete <u>{name}</u>?
        </h3>

        <div className="questBtnDiv">
          <button
            type="button"
            className="questBtn gBtn"
            onClick={() => this.deleteQuest(true)}
          >
            Yes
          </button>

          <button
            type="button"
            className="questBtn gBtn"
            onClick={() => this.deleteQuest(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );

  showEditFlip = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { q, updateQuestion, tags } = this.props,
      { name, description, tag, difficulty } = this.state,
      submitObj = { id: q.id };

    if (name.length || description.length || tag.length) {
      submitObj.name = name.length ? name : q.name;
      submitObj.description = description.length ? description : q.description;
      submitObj.tagId =
        tag !== "--" ? tags.filter((t) => t.name === tag)[0].id : q.tag.id;
      submitObj.difficulty = difficulty !== "--" ? difficulty : q.difficulty;

      updateQuestion(submitObj);
    }

    this.setState({
      showEdit: false,
      name: "",
      description: "",
      tag: "--",
      difficulty: "--",
    });
  };

  render() {
    const { q, tags } = this.props,
      { showEdit, showDelete } = this.state;

    return (
      <div className="adminSingleDiv">
        {showDelete ? this.changeJSX(q.name) : null}

        <div className="adminQuestRow1">
          <h3 className="adminQuestName">
            {q.id}. {q.name}&nbsp;&nbsp;&nbsp;({q.tag.name})
          </h3>

          <button
            type="button"
            onClick={this.showEditFlip}
            className="adminQuestBtn gBtn"
          >
            {showEdit ? "Stop Editting" : "Edit Question"}
          </button>

          <button
            type="button"
            onClick={() => this.deleteQuest(false)}
            className="adminQuestBtn gBtn"
          >
            Delete Question
          </button>
        </div>

        <p className="adminQuestDesc">
          <u>Difficulty</u>: {q.difficulty} ({difficultMap[q.difficulty]})
        </p>
        <p className="adminQuestDesc">{q.description}</p>

        {showEdit ? (
          <form className="adminQuestForm" onSubmit={this.handleSubmit}>
            <div className="adminQuestFormDiv">
              <label htmlFor="name" className="adminQuestLabel">
                New Name:
              </label>

              <textarea
                type="text"
                name="name"
                value={this.state.name}
                onChange={this.handleChange}
                className="adminQuestTextArea"
              />
            </div>

            <div className="adminQuestFormDiv">
              <label htmlFor="description" className="adminQuestLabel">
                New Description:
              </label>

              <textarea
                type="text"
                name="description"
                value={this.state.description}
                onChange={this.handleChange}
                className="adminQuestTextArea"
              />
            </div>

            <div className="adminQuestFormDiv">
              <label htmlFor="tag" className="adminQuestLabel">
                New Tag:
              </label>

              <select
                name="tag"
                value={this.state.tag}
                onChange={this.handleChange}
                className="adminQuestSelect"
              >
                <option>--</option>
                {tags.length
                  ? tags.map((t, i) => <option key={i}>{t.name}</option>)
                  : null}
              </select>
            </div>

            <div className="adminQuestFormDiv">
              <label htmlFor="difficulty" className="adminQuestLabel">
                New Difficulty:
              </label>

              <select
                name="difficulty"
                value={this.state.difficulty}
                onChange={this.handleChange}
                className="adminQuestSelect"
              >
                <option>--</option>
                {Object.keys(difficultMap).map((t, i) => (
                  <option key={i}>{t}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="adminQuestFormBtn gBtn">
              Post New Info
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

const mapState = (state) => ({
  tags: state.tags,
});

const mapDispatch = (dispatch) => ({
  updateQuestion: (qObj) => dispatch(updateQuestion(qObj)),
  deleteQuestion: (qId) => dispatch(deleteQuestion(qId)),
});

export default connect(mapState, mapDispatch)(AdminQuestion);
