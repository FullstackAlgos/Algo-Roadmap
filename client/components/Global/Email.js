import React, { Component } from "react";
import { SMTPEmail } from "../../utils/utilities";

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

  componentDidUpdate() {}

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  };

  validateEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  handleSubmit = (evt) => {
    evt.preventDefault();
    const { name, email, body } = this.state;

    if (!this.validateEmail(email)) {
      this.setState({ msg: "Please input valid email!" });
      return;
    }

    console.log("email -", name, body, email);
    SMTPEmail.sendEmail(email, name, body);

    this.setState({
      name: "",
      body: "",
      email: "",
      msg: "Message successfully sent!",
    });
  };

  render() {
    const { msg } = this.state;

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
              onBlur={(e) => (e.target.placeholder = "Email")}
              onChange={this.handleChange}
            />
          </div>

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

          <button
            type="button"
            className="emailSubmitBtn gBtn"
            onClick={this.handleSubmit}
          >
            Send
          </button>

          {msg.length ? <p className="emailMsg">{msg}</p> : null}
        </div>
      </div>
    );
  }
}

export default Email;
