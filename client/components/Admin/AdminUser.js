import React, { Component } from "react";
import { connect } from "react-redux";

class AdminUser extends Component {
  render() {
    const { u } = this.props;

    return (
      <div className="adminQuestionDiv">
        <div className="adminQuestRow1">
          <h3 className="adminQuestName">{u.name}</h3>
        </div>
      </div>
    );
  }
}

export default connect()(AdminUser);
