import React, { Component } from "react";
import { connect } from "react-redux";

class AdminTag extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      name: ""
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
    const { t, q } = this.props;

    return (
      <div className="adminSingleDiv">
        <div className="adminTagRow">
          <h3 className="adminTagName">
            {t.name}&nbsp;&nbsp;&nbsp;({q.length})
          </h3>

          <button
            type="button"
            onClick={this.showEdit}
            className="adminQuestBtn gBtn"
          >
            {this.state.showEdit ? "Finish Editing" : "Edit Tag Name"}
          </button>
        </div>

        {this.state.showEdit ? (
          <form className="adminTagForm">
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
          </form>
        ) : null}

        {q.map((quest, i) => (
          <p key={i} className="adminTagQuest">
            {i + 1}.&nbsp;&nbsp;{quest.name}
          </p>
        ))}
      </div>
    );
  }
}

export default connect()(AdminTag);
