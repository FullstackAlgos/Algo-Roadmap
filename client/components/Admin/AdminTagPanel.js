import React, { Component } from "react";
import { connect } from "react-redux";
import AdminTag from "./AdminTag";

class AdminTagPanel extends Component {
  matchedQuests = tagId => {
    return this.props.questions.filter(q => q.tagId === tagId);
  };

  render() {
    const { tags } = this.props;

    return (
      <div className="adminContentDiv">
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

export default connect(mapState)(AdminTagPanel);
