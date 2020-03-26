import React, { Component } from "react";
import { connect } from "react-redux";

class AdminQuestion extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      name: "",
      description: ""
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

  render() {
    const { q } = this.props;

    return (
      <div className="adminQuestionDiv">
        <div className="adminQuestRow1">
          <h3 className="adminQuestName">{q.name}</h3>

          <button
            type="button"
            onClick={this.showEdit}
            className="adminQuestBtn gBtn"
          >
            {this.state.showEdit ? "Stop Editting" : "Edit Question"}
          </button>
        </div>

        <p className="adminQuestDesc">{q.description}</p>

        {this.state.showEdit ? (
          <form className="adminQuestForm">
            <div className="adminQuestFormDiv">
              <label htmlFor="name" className="questLabels">
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
              <label htmlFor="description" className="questLabels">
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
          </form>
        ) : null}
      </div>
    );
  }
}

export default connect()(AdminQuestion);
