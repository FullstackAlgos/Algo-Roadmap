import React, { Component } from "react";
import { connect } from "react-redux";
import { addTag } from "../../store";
import AdminTag from "./AdminTag";

class AdminTagPanel extends Component {
  constructor() {
    super();
    this.state = {
      showAdd: false,
      name: "",
      ranking: "1"
    };
  }

  showAdd = () => {
    this.setState({ showAdd: !this.state.showAdd });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { tags, addTag } = this.props,
      { name, ranking } = this.state;

    if (tags.some(t => t.name === name)) alert("Tag Already Exists");
    else if (name.length) {
      addTag({ name, ranking });
      this.setState({ showAdd: false, name: "", ranking: "1" });
    }
  };

  matchedQuests = tagId => {
    return this.props.questions.filter(q => q.tagId === tagId);
  };

  render() {
    const { tags } = this.props;

    return (
      <div className="adminContentDiv">
        <div className="adminTagAddDiv">
          <button
            type="button"
            onClick={this.showAdd}
            className="adminTagBtn gBtn"
          >
            {this.state.showAdd ? "Finished" : "Add New Tag"}
          </button>

          {this.state.showAdd ? (
            <form className="adminTagForm" onSubmit={this.handleSubmit}>
              <div className="adminTagFormDiv">
                <label htmlFor="name" className="adminQuestLabel">
                  Name:
                </label>

                <textarea
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  className="adminQuestTextArea"
                />
              </div>

              <div className="adminTagFormDiv">
                <label htmlFor="ranking" className="adminQuestLabel">
                  Ranking:
                </label>

                <select
                  name="ranking"
                  value={this.state.ranking}
                  onChange={this.handleChange}
                  className="adminQuestSelect"
                >
                  {Array(10)
                    .fill()
                    .map((x, i) => (
                      <option key={i}>{i + 1}</option>
                    ))}
                </select>
              </div>

              <button type="submit" className="adminTagBtn gBtn">
                Submit New Tag
              </button>
            </form>
          ) : null}
        </div>

        <div className="adminTagPanelDiv">
          {tags.length
            ? tags.map((t, i) => (
                <AdminTag key={i} t={t} q={this.matchedQuests(t.id)} />
              ))
            : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    questions: state.questions,
    tags: state.tags
  };
};

const mapDispatch = dispatch => {
  return {
    addTag: newTag => dispatch(addTag(newTag))
  };
};

export default connect(mapState, mapDispatch)(AdminTagPanel);
