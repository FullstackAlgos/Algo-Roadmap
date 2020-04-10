import React from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from "react-router-dom";
import { logout } from "../../store";

const NavBar = ({ user, logout, location }) => {
  const adminPath = location.pathname.split("/")[1] === "Admin";

  return (
    <div className="navBarDiv">
      <div className="navBarLeftDiv">
        <h4 className="navBarText">
          {user.name ? `${user.name}'s ` : null}Algo Roadmap
        </h4>
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

        {user.id ? (
          <>
            {user.isAdmin ? (
              <NavLink
                to="/Admin/Users"
                className={`linkText navBarLink ${
                  adminPath ? "selectedNavLink" : null
                }`}
                activeClassName="selectedNavLink"
              >
                Admin Panel
              </NavLink>
            ) : null}

            <a href="#" onClick={logout} className="linkText navBarLink">
              Logout
            </a>
          </>
        ) : (
          <NavLink
            to="/SignIn"
            className="linkText navBarLink"
            activeClassName="selectedNavLink"
            exact
          >
            Sign In
          </NavLink>
        )}
      </div>
    </div>
  );
};

const mapState = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
  };
};

export default withRouter(connect(mapState, mapDispatch)(NavBar));
