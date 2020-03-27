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
    const { q } = this.props;
    console.log("propose -", q);

    return (
      <div className="adminPropQDiv">
        <div className="adminQuestRow1">
          <h3 className="adminPropQName">
            {q.name}&nbsp;&nbsp;&nbsp;({q.tag.name})
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

        <p className="adminPropQDesc">{q.description}</p>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {};
};

export default connect(null, mapDispatch)(AdminPropQuest);
