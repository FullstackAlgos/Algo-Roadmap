import React, { Component } from "react";
import { connect } from "react-redux";

class AdminTag extends Component {
  render() {
    const { t, q } = this.props;

    return (
      <div className="adminSingleDiv">
        <div className="adminTagRow">
          <h3 className="adminTagName">
            {t.name}&nbsp;&nbsp;&nbsp;({q.length})
          </h3>
        </div>

        {q.map((quest, i) => (
          <p key={i} className="adminTagQuest">
            {i + 1}.&nbsp;&nbsp;{quest.name}
          </p>
        ))}
      </div>
    );
  }
}

export default connect()(AdminTag);
