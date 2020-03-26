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
    this.setState({ showEdit: true });
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

          <button type="button" onClick={this.showEdit}>
            Edit
          </button>
        </div>

        <p className="adminQuestDesc">{q.description}</p>

        {this.state.showEdit ? (
          <form className="adminQuestForm">
            <div className="adminQuestFormDiv">
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
            </div>

            <div className="adminQuestFormDiv">
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
            </div>
          </form>
        ) : null}
      </div>
    );
  }
}

export default connect()(AdminQuestion);
