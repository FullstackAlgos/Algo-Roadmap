import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllQuestions,
  getAllTags,
  getAllPropQuests,
  allUsers,
} from "../../store";

class AdminSidebar extends Component {
  componentDidMount() {
    const {
      getAllQuestions,
      getAllTags,
      getAllPropQuests,
      allUsers,
    } = this.props;
    allUsers();
    getAllQuestions();
    getAllPropQuests();
    getAllTags();
  }

  render() {
    return (
      <div className="adminPanelSideBar">
        <NavLink
          to="/Admin/Users"
          className="linkText sideBarLink"
          activeClassName="selectedNavLink"
        >
          Registered Users
        </NavLink>

        <NavLink
          to="/Admin/Questions"
          className="linkText sideBarLink"
          activeClassName="selectedNavLink"
        >
          Current Questions
        </NavLink>

        <NavLink
          to="/Admin/ProposedQuestions"
          className="linkText sideBarLink"
          activeClassName="selectedNavLink"
        >
          Proposed Questions ({this.props.propLen})
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

const mapState = (state) => ({
  propLen: state.proposeQuestions.length,
});

const mapDispatch = (dispatch) => ({
  allUsers: () => dispatch(allUsers()),
  getAllQuestions: () => dispatch(getAllQuestions()),
  getAllPropQuests: () => dispatch(getAllPropQuests()),
  getAllTags: () => dispatch(getAllTags()),
});

export default connect(mapState, mapDispatch)(AdminSidebar);
