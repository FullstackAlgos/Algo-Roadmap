import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { me } from "../store";

import { Login, Signup } from "./Global/AuthForm";
import HomePage from "./Global/HomePage";
import AdminSidebar from "./Admin/AdminSidebar";
import AdminPropPanel from "./Admin/AdminPropPanel";
import AdminQuestPanel from "./Admin/AdminQuestPanel";
import AdminTagPanel from "./Admin/AdminTagPanel";
import AdminUserPanel from "./Admin/AdminUserPanel";
import AdminLikePanel from "./Admin/AdminLikePanel";

class Routes extends Component {
  componentDidMount() {
    this.props.me();
  }

  render() {
    const { formFlip } = this.props;

    return (
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => <HomePage {...props} formFlip={formFlip} />}
        />

        <Route
          exact
          path="/SignIn"
          render={() => (
            <div className="signInFullDiv">
              <Login />
              <Signup />
            </div>
          )}
        />

        <Route
          path="/Admin"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={AdminSidebar} />
              <Route exact path={`${url}/Users`} component={AdminUserPanel} />
              <Route
                exact
                path={`${url}/ProposedQuestions`}
                component={AdminPropPanel}
              />
              <Route
                exact
                path={`${url}/Questions`}
                component={AdminQuestPanel}
              />
              <Route exact path={`${url}/Likes`} component={AdminLikePanel} />
              <Route exact path={`${url}/Tags`} component={AdminTagPanel} />
            </>
          )}
        />
      </Switch>
    );
  }
}

const mapDispatch = (dispatch) => ({
  me: () => dispatch(me()),
});

export default withRouter(connect(null, mapDispatch)(Routes));
