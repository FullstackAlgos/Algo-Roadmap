import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { me } from "../store";

import { Login, Signup } from "./Global/AuthForm";
import HomePage from "./Global/HomePage";

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
        <Route exact path="/LogIn" component={Login} />
        <Route exact path="/SignUp" component={Signup} />
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
