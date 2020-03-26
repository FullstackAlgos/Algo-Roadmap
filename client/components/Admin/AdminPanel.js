import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getAllQuestions, getAllTags } from "../../store";

class AdminPanel extends Component {
  componentDidMount() {
    const { getAllQuestions, getAllTags } = this.props;
    getAllQuestions();
    getAllTags();
  }

  render() {
    return (
      <div className="adminPanelSideBar">
        <NavLink to="/Admin/Questions">Questions</NavLink>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    getAllTags: () => dispatch(getAllTags())
  };
};

export default connect(null, mapDispatch)(AdminPanel);
