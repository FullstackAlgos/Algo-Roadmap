import React, { Component } from "react";
import { connect } from "react-redux";
import AdminTag from "./AdminTag";

class AdminTagPanel extends Component {
  render() {
    const { tags } = this.props;

    return (
      <div className="adminContentDiv">
        <div className="adminTagPanelDiv">
          {tags.length ? tags.map((t, i) => <AdminTag key={i} t={t} />) : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    tags: state.tags
  };
};

export default connect(mapState)(AdminTagPanel);
