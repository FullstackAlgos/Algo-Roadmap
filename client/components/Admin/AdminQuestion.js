import React, { Component } from "react";
import { connect } from "react-redux";
import { updateQuestion, deleteQuestion } from "../../store";

class AdminQuestion extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      name: "",
      description: "",
      tag: ""
    };
  }

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  deleteQuest = () => {
    const { q, deleteQuestion } = this.props;
    deleteQuestion(q.id);
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { q, updateQuestion, tags } = this.props,
      { name, description, tag } = this.state,
      submitObj = { id: q.id };

    if (name.length || description.length || tag.length) {
      submitObj.name = name.length ? name : q.name;
      submitObj.description = description.length ? description : q.description;
      submitObj.tagId =
        tag.length && tag !== "--"
          ? tags.filter(t => t.name === tag)[0].id
          : q.tag.id;

      updateQuestion(submitObj);
    }

    this.setState({ showEdit: false, name: "", description: "", tag: "" });
  };

  render() {
    const { q, tags } = this.props;

    return (
      <div className="adminQuestionDiv">
        <div className="adminQuestRow1">
          <h3 className="adminQuestName">
            {q.name}&nbsp;&nbsp;&nbsp;({q.tag.name})
          </h3>

          <button
            type="button"
            onClick={this.showEdit}
            className="adminQuestBtn gBtn"
          >
            {this.state.showEdit ? "Stop Editting" : "Edit Question"}
          </button>

          <button
            type="button"
            onClick={this.deleteQuest}
            className="adminQuestBtn gBtn"
          >
            Delete Question
          </button>
        </div>

        <p className="adminQuestDesc">{q.description}</p>

        {this.state.showEdit ? (
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

            <button type="submit" className="adminQuestFormBtn gBtn">
              Post New Info
            </button>
          </form>
        ) : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    tags: state.tags
  };
};

const mapDispatch = dispatch => {
  return {
    updateQuestion: qObj => dispatch(updateQuestion(qObj)),
    deleteQuestion: qId => dispatch(deleteQuestion(qId))
  };
};

export default connect(mapState, mapDispatch)(AdminQuestion);
