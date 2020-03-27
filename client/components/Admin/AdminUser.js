import React, { Component } from "react";
import { connect } from "react-redux";

class AdminUser extends Component {
  changeAdmin = update => {
    console.log("ADMIN");
  };

  removeUser = () => {
    console.log("REMOVE");
  };

  render() {
    const { u } = this.props;

    return (
      <div className="adminUserDiv">
        <div className="adminUserRow">
          <h3 className="adminQuestName">{u.name}</h3>

          {u.isAdmin ? (
            <button
              type="button"
              onClick={() => this.changeAdmin(false)}
              className="adminQuestBtn gBtn"
            >
              Remove Admin
            </button>
          ) : (
            <button
              type="button"
              onClick={() => this.changeAdmin(true)}
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

        <div className="adminUserRow">
          <p className="adminUserText">Admin: {u.isAdmin ? "Yes" : "No"}</p>

          <p className="adminUserText">
            Completed Questions: {u.questions.length}
          </p>
        </div>
      </div>
    );
  }
}

export default connect()(AdminUser);
