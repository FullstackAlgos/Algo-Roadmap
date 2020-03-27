import React, { Component } from "react";
import { connect } from "react-redux";
import { changeTag } from "../../store";

class AdminTag extends Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      name: "",
      ranking: "--"
    };
  }

  showEdit = () => {
    this.setState({ showEdit: !this.state.showEdit });
  };

  handleChange = evt => {
    this.setState({
      [evt.target.name]: evt.target.value
    });
  };

  handleSubmit = evt => {
    evt.preventDefault();
    const { t, changeTag } = this.props,
      { name, ranking } = this.state;

    if (name.length || ranking !== "--") {
      const newTag = {};

      newTag.name = name.length ? name : t.name;
      newTag.ranking = ranking !== "--" ? ranking : t.ranking;

      changeTag(t.id, newTag);
    }

    this.setState({ showEdit: false, name: "", ranking: "" });
  };

  render() {
    const { t, q } = this.props;

    return (
      <div className="adminSingleDiv">
        <div className="adminTagRow">
          <h3 className="adminTagName">
            {t.name}&nbsp;&nbsp;&nbsp;(Ranking: {t.ranking})
          </h3>

          <button
            type="button"
            onClick={this.showEdit}
            className="adminQuestBtn gBtn"
          >
            {this.state.showEdit ? "Finish Editing" : "Edit Tag"}
          </button>
        </div>

        {this.state.showEdit ? (
          <form className="adminTagForm" onSubmit={this.handleSubmit}>
            <div className="adminTagFormDiv">
              <label htmlFor="name" className="adminQuestLabel">
                Edit Name:
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
                <option>--</option>
                {Array(10)
                  .fill()
                  .map((x, i) => (
                    <option key={i}>{i + 1}</option>
                  ))}
              </select>
            </div>

            <button type="submit" className="adminTagBtn gBtn">
              Submit Tag Name
            </button>
          </form>
        ) : null}

        {q.map((quest, i) => (
          <p key={i} className="adminTagQuest">
            {i + 1}.&nbsp;&nbsp;{quest.name}
          </p>
        ))}
      </div>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    changeTag: (tagId, tagName) => dispatch(changeTag(tagId, tagName))
  };
};

export default connect(null, mapDispatch)(AdminTag);
