import React, { Component } from "react";

class QuestionForm extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      description: "",
      url: "",
      image: ""
    };
  }

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleNewQuest = evt => {
    evt.preventDefault();
    console.log("hello");
  };

  render() {
    return (
      <div className="questFormFullDiv">
        Form
        <form className="questForm" onSubmit={this.handleNewQuest}>
          <label htmlFor="name">Question Name:</label>
          <input
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            className="inputBox"
          />

          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
            className="inputBox"
          />

          <label htmlFor="url">Link:</label>
          <input
            type="text"
            name="url"
            value={this.state.url}
            onChange={this.handleChange}
            className="inputBox"
          />

          <label htmlFor="image">Image:</label>
          <input
            type="text"
            name="image"
            value={this.state.image}
            onChange={this.handleChange}
            className="inputBox"
          />

          <button type="submit" className="questSubmitBtn">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default QuestionForm;
