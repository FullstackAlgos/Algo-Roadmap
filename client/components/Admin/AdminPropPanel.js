import React, { Component } from "react";
import { connect } from "react-redux";
import AdminPropQuest from "./AdminPropQuest";

class AdminPropPanel extends Component {
  render() {
    const { propose } = this.props;

    return (
      <div className="adminContentDiv">
        <div className="adminPropPanelDiv">
          {propose.length
            ? propose.map((q, i) => <AdminPropQuest key={i} q={q} />)
            : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    propose: state.proposeQuestions
  };
};

export default connect(mapState)(AdminPropPanel);
