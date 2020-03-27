import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getAllQuestions, getAllTags, getAllPropQuests } from "../../store";

class AdminSidebar extends Component {
  componentDidMount() {
    const { getAllQuestions, getAllTags, getAllPropQuests } = this.props;
    getAllQuestions();
    getAllTags();
    getAllPropQuests();
  }

  render() {
    return (
      <div className="adminPanelSideBar">
        <NavLink
          to="/Admin/ProposedQuestions"
          className="linkText sideBarLink"
          activeClassName="selectedNavLink"
        >
          Proposed Questions
        </NavLink>

        <NavLink
          to="/Admin/Questions"
          className="linkText sideBarLink"
          activeClassName="selectedNavLink"
        >
          Current Questions
        </NavLink>

        <NavLink
          to="/Admin/Tags"
          className="linkText sideBarLink"
          activeClassName="selectedNavLink"
        >
          Tags
        </NavLink>
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    getAllTags: () => dispatch(getAllTags()),
    getAllPropQuests: () => dispatch(getAllPropQuests())
  };
};

export default connect(null, mapDispatch)(AdminSidebar);
