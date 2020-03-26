import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { me } from "../store";

import { Login, Signup } from "./Global/AuthForm";
import HomePage from "./Global/HomePage";
import AdminPanel from "./Admin/AdminPanel";
import AdminQuestion from "./Admin/AdminQuestion";

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
          render={props => <HomePage {...props} formFlip={formFlip} />}
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

        {/* <Route path="/Admin" component={AdminPanel} /> */}
        <Route
          path="/Admin"
          render={({ match: { url } }) => (
            <>
              <Route path={`${url}/`} component={AdminPanel} />
              <Route
                exact
                path={`${url}/Questions`}
                component={AdminQuestion}
              />
            </>
          )}
        />
      </Switch>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    me: () => dispatch(me())
  };
};

export default withRouter(connect(null, mapDispatch)(Routes));
