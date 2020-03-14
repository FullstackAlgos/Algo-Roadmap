import React, { Component } from "react";
import { connect } from "react-redux";

class User extends Component {
  render() {
    const { user } = this.props;

    return (
      <div className="userFullDiv">
        <h2 className="userHeader">Welcome, {user.name}!</h2>

        <h4 className="userProgress">Progress</h4>

        <button
          type="button"
          className="questionAddBtn"
          onClick={this.props.formFlip}
        >
          Add Question
        </button>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

export default connect(mapState)(User);
