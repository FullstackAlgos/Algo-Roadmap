import React, { Component } from "react";
import { connect } from "react-redux";
import { convertPropQuest, deletePropQuest } from "../../store";

class AdminPropQuest extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      name: "",
      description: "",
      difficulty: "",
      tag: ""
    };
  }

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  addQuest = () => {
    console.log("ADD"); // FIX
    const { q, deletePropQuest, convertPropQuest, tags } = this.props,
      { name, description, difficulty, tag } = this.state,
      questObj = {};

    questObj.name = name.length ? name : q.name;
    questObj.description = description.length ? description : q.description;
    questObj.difficulty = difficulty.length ? difficulty : q.difficulty;
    questObj.tagId = tag.length
      ? tags.filter(t => t.name === tag)[0].id
      : q.tag.id;
    questObj.link = q.link;

    convertPropQuest(questObj);
    deletePropQuest(q.id);
  };

  deleteQuest = () => {
    const { q, deletePropQuest } = this.props;
    deletePropQuest(q.id);
  };

  render() {
    const { name, tag, difficulty, description, user } = this.props.q;

    return (
      <div className="adminPropQDiv">
        <div className="adminQuestRow1">
          <h3 className="adminPropQName">
            {name}&nbsp;&nbsp;&nbsp;({tag.name})
          </h3>

          <button
            type="button"
            onClick={this.addQuest}
            className="adminQuestBtn gBtn"
          >
            Add Question
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

        <p className="adminPropQText">Proposed By: {user.name}</p>
        <p className="adminPropQText">Difficulty: {difficulty}</p>
        <p className="adminPropQText">Description: {description}</p>
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
    convertPropQuest: questObj => dispatch(convertPropQuest(questObj)),
    deletePropQuest: qId => dispatch(deletePropQuest(qId))
  };
};

export default connect(mapState, mapDispatch)(AdminPropQuest);
