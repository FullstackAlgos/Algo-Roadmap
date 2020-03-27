import React, { Component } from "react";
import { connect } from "react-redux";

class AdminUser extends Component {
  makeAdmin = () => {
    console.log("ADMIN");
  };

  removeAdmin = () => {
    console.log("REMOVE ADMIN");
  };

  removeUser = () => {
    console.log("REMOVE");
  };

  render() {
    const { u } = this.props;

    return (
      <div className="adminUserDiv">
        <div className="adminQuestRow1">
          <h3 className="adminQuestName">{u.name}</h3>

          {u.isAdmin ? (
            <button
              type="button"
              onClick={this.removeAdmin}
              className="adminQuestBtn gBtn"
            >
              Remove Admin
            </button>
          ) : (
            <button
              type="button"
              onClick={this.makeAdmin}
              className="adminQuestBtn gBtn"
            >
              Grant Admin
            </button>
          )}

          <button
            type="button"
            onClick={this.removeUser}
            className="adminQuestBtn gBtn"
          >
            Remove User
          </button>
        </div>

        <p className="adminUserText">
          Completed Questions: {u.questions.length}
        </p>
      </div>
    );
  }
}

export default connect()(AdminUser);
