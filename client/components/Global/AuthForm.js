import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { auth, removeUser } from "../../store";

class AuthForm extends Component {
  componentDidMount() {
    // ABLE TO REFRESH USER ERROR MESSAGE
    this.props.removeUser();
  }

  componentDidUpdate() {
    const { user, history } = this.props;
    if (user.id) history.push("/");
  }

  handleSignIn = (evt) => {
    evt.preventDefault();
    const { name, email, password, userName } = evt.target,
      userObj = {
        formName: name,
        email: email.value,
        password: password.value,
      };

    // SIGN UP FUNCTION NEEDS TO ALSO INCLUDE NAME
    if (name === "signup") {
      userObj.name = userName.value;
      this.props.auth(userObj);
    } else this.props.auth(userObj);
  };

  render() {
    const { formName, displayName, error } = this.props;

    return (
      <div className={`${formName}-authFormDiv authFormDiv`}>
        <h3 className="authFormHeader">{displayName.toUpperCase()}</h3>

        <form onSubmit={this.handleSignIn} name={formName} className="authForm">
          <div className="authPreBtnDiv">
            <div className="authInputDiv">
              <label htmlFor="email" className="authFormLabel">
                Email:
              </label>

              <input name="email" type="email" className="authInputBox" />
            </div>

            {formName === "signup" ? (
              <div className="authInputDiv">
                <label htmlFor="userName" className="authFormLabel">
                  First Name:
                </label>

                <input
                  name="userName"
                  type="userName"
                  className="authInputBox"
                />
              </div>
            ) : null}

            <div className="authInputDiv">
              <label htmlFor="password" className="authFormLabel">
                Password:
              </label>
              <input name="password" type="password" className="authInputBox" />
            </div>

            {error && error.response && (
              <span className="authErrorMessage">
                {error.response.data.split("Validation error: ")}
              </span>
            )}
          </div>

          <div className="authBtnDiv">
            <button type="submit" className="authSignInBtn gBtn">
              {displayName}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapLogin = (state) => ({
  formName: "login",
  displayName: "Login",
  user: state.user,
  error: state.user.error,
});

const mapSignup = (state) => ({
  formName: "signup",
  displayName: "Sign Up",
  user: state.user,
  error: state.user.error,
});

const mapDispatch = (dispatch) => ({
  auth: (userObj) => dispatch(auth(userObj)),
  removeUser: () => dispatch(removeUser()),
});

// ABLE TO CREATE BOTH LOGIN AND SIGNUP FUNCTION WITH SAME COMPONENT
export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));

export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm));
