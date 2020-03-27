import React, { Component } from "react";
import { connect } from "react-redux";

class AdminTag extends Component {
  render() {
    const { t } = this.props;

    return (
      <div className="adminTagDiv">
        <h3 className="adminTagName">{t.name}</h3>
      </div>
    );
  }
}

const mapState = state => {
  return {
    questions: state.questions
  };
};

export default connect(mapState)(AdminTag);
