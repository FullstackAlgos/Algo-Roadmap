import React, { Component } from "react";
import { connect } from "react-redux";
import { convertPropQuest, deletePropQuest } from "../../store";
import { difficultMap } from "../../utils/utilities";

class AdminPropQuest extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      name: "",
      description: "",
      difficulty: "",
      tag: "",
    };
  }

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  handleChange = (evt) => {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  };

  addQuest = () => {
    const { q, deletePropQuest, convertPropQuest, tags } = this.props,
      { name, description, difficulty, tag } = this.state,
      selectTag = tags.filter((t) => t.name === tag)[0],
      questObj = {};

    questObj.name = name.length ? name : q.name;
    questObj.description = description.length ? description : q.description;
    questObj.difficulty =
      difficulty.length && difficultMap !== "--" ? difficulty : q.difficulty;
    questObj.tagId = tag.length && tag !== "--" ? selectTag.id : q.tagId;
    questObj.tag = tag.length && tag !== "--" ? selectTag : q.tag;
    questObj.link = q.link;

    convertPropQuest(questObj);
    deletePropQuest(q.id);
  };

  deleteQuest = () => {
    const { q, deletePropQuest } = this.props;
    deletePropQuest(q.id);
  };

  render() {
    const { q, tags } = this.props,
      { name, tag, difficulty, description, user } = q;

    return (
      <div className="adminSingleDiv">
        <div className="adminPropQRow">
          <h3 className="adminPropQName">
            {name}&nbsp;&nbsp;&nbsp;({tag.name})
          </h3>

          <button
            type="button"
            onClick={this.addQuest}
            className="adminQuestBtn gBtn"
          >
            Approve Question
          </button>

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

        <p className="adminPropQText">
          <u>Description</u>: {description}
        </p>

        <div className="adminPropQRow">
          <p className="adminPropQText">
            <u>Proposed By</u>: {user.name}
          </p>
          <p className="adminPropQText">
            <u>Difficulty</u>: {difficulty}
          </p>
        </div>

        {this.state.showEdit ? (
          <form className="adminQuestForm">
            <div className="adminQuestFormDiv">
              <label htmlFor="name" className="adminQuestLabel">
                Edit Name:
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
                Edit Description:
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
              <label htmlFor="difficulty" className="adminQuestLabel">
                Edit Difficulty:
              </label>

              <select
                name="difficulty"
                value={this.state.difficulty}
                onChange={this.handleChange}
                className="adminQuestSelect"
              >
                <option>--</option>
                {Object.keys(difficultMap).map((x) => (
                  <option key={x}>{x}</option>
                ))}
              </select>
            </div>

            <div className="adminQuestFormDiv">
              <label htmlFor="tag" className="adminQuestLabel">
                Edit Tag:
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
          </form>
        ) : null}
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    tags: state.tags,
  };
};

const mapDispatch = (dispatch) => {
  return {
    convertPropQuest: (questObj) => dispatch(convertPropQuest(questObj)),
    deletePropQuest: (qId) => dispatch(deletePropQuest(qId)),
  };
};

export default connect(mapState, mapDispatch)(AdminPropQuest);
