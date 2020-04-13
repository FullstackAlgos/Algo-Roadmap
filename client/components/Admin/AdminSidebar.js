import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  getAllQuestions,
  getAllTags,
  getAllPropQuests,
  allUsers,
  getEveryLike,
} from "../../store";

class AdminSidebar extends Component {
  componentDidMount() {
    const {
      getAllQuestions,
      getAllTags,
      getAllPropQuests,
      allUsers,
      getEveryLike,
    } = this.props;
    allUsers();
    getAllQuestions();
    getAllPropQuests();
    getAllTags();
    getEveryLike();
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
          to="/Admin/Likes"
          className="linkText sideBarLink"
          activeClassName="selectedNavLink"
        >
          Likes
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
  getEveryLike: () => dispatch(getEveryLike()),
});

export default connect(mapState, mapDispatch)(AdminSidebar);
