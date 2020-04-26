import React, { Component } from "react";
import { SMTPEmail } from "../../utils/utilities";

const invalidMsg = "Please input valid email!",
  blankName = "Please input your name!",
  blankBody = "Please input a message!",
  successMsg = "Thanks for the message! We'll try to get back shortly!";

class Email extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      body: "",
      msg: "",
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
    this.setState({ msg: "" });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, body } = this.state;

    if (!this.validateEmail(email)) this.setState({ msg: invalidMsg });
    else if (!name.length) this.setState({ msg: blankName });
    else if (!body.length) this.setState({ msg: blankBody });
    else {
      SMTPEmail.sendEmail(email, name, body);

      this.setState({
        name: "",
        body: "",
        email: "",
        msg: successMsg,
      });
    }
  };

  render() {
    const { msg } = this.state,
      invalidEmail = msg === invalidMsg,
      missingName = msg === blankName,
      missingBody = msg === blankBody,
      successEmail = msg === successMsg;

    return (
      <div className="emailFullDiv">
        <div className="emailInnerDiv">
          <div className="emailIptDiv">
            <input
              className="emailEmailIpt emailIpt"
              type="text"
              name="email"
              value={this.state.email}
              required
              placeholder="Email"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Email")}
              onChange={this.handleChange}
            />

            <input
              className="emailNameIpt emailIpt"
              type="text"
              name="name"
              value={this.state.name}
              required
              placeholder="Name"
              onFocus={(e) => (e.target.placeholder = "")}
              onBlur={(e) => (e.target.placeholder = "Name")}
              onChange={this.handleChange}
            />
          </div>

          {invalidEmail ? <p className="emailMsg emailError">{msg}</p> : null}
          {missingName ? <p className="emailMsg emailError">{msg}</p> : null}

          <textarea
            className="emailBodyIpt"
            name="body"
            value={this.state.body}
            required
            placeholder="Message"
            onFocus={(e) => (e.target.placeholder = "")}
            onBlur={(e) => (e.target.placeholder = "Message")}
            onChange={this.handleChange}
          />

          {missingBody ? <p className="emailMsg emailError">{msg}</p> : null}

          <button
            type="button"
            className="emailSubmitBtn gBtn"
            onClick={this.handleSubmit}
          >
            Send
          </button>

          {successEmail ? <p className="emailMsg">{msg}</p> : null}
        </div>
      </div>
    );
  }
}

export default Email;
