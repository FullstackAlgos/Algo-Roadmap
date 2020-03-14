import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../../store";

class NavBar extends Component {
  loggingOut = () => {
    this.props.logout();
  };

  render() {
    const userId = this.props.user.id;

    return (
      <div className="navBarDiv">
        <div className="navBarLeftDiv">
          <h4 className="navBarText">Algo Roadmap</h4>
        </div>

        <div className="navBarRightDiv">
          <NavLink
            to="/"
            className="linkText navBarLink"
            activeClassName="selectedNavLink"
            exact
          >
            Home Page
          </NavLink>

          {userId ? (
            <a
              href="#"
              onClick={this.loggingOut}
              className="linkText navBarLink"
            >
              Logout
            </a>
          ) : (
            <>
              <NavLink
                to="/SignIn"
                className="linkText navBarLink"
                activeClassName="selectedNavLink"
                exact
              >
                Log In / Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  };
};

export default connect(mapState, mapDispatch)(NavBar);
