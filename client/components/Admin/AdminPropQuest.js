import React, { Component } from "react";
import { connect } from "react-redux";

class AdminPropQuest extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false
    };
  }

  addQuest = () => {
    console.log("ADD"); // FIX
  };

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  deleteQuest = () => {
    console.log("DELETE"); // FIX
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

const mapDispatch = dispatch => {
  return {};
};

export default connect(null, mapDispatch)(AdminPropQuest);
