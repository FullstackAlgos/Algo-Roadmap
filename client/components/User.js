import React, { Component } from "react";

class User extends Component {
  render() {
    return (
      <div className="userFullDiv">
        <h2>Name</h2>

        <h4>Status</h4>

        <h4>Progress</h4>

        <button type="button" onClick={this.props.formFlip}>
          Add Question
        </button>
      </div>
    );
  }
}

export default User;
