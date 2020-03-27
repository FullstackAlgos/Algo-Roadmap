import React, { Component } from "react";
import { connect } from "react-redux";

class AdminPropQuest extends Component {
  render() {
    const { q } = this.props;

    return (
      <div className="adminPropQDiv">
        <h3 className="adminPropQName">{q.name}</h3>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {};
};

export default connect(null, mapDispatch)(AdminPropQuest);
