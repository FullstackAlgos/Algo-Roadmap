import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteLike } from "../..//store";
import { difficultMap } from "../../utils/utilities";

class AdminLike extends Component {
  deleteLike = (likeId, userId) => {
    this.props.deleteLike(likeId, userId);
  };

  render() {
    const { question, status, tags } = this.props,
      { id, name, tagId, difficulty, description: desc } = question,
      descLen = 75;

    return (
      <div className="adminSingleDiv">
        <h3 className="adminLikeHeader">
          {name}&nbsp;&nbsp;&nbsp;(Total: {status.length})
        </h3>

        <div className="adminLikeStatDiv">
          <h4 className="adminLikeStatText">
            <u>ID</u>: {id}
          </h4>

          <h4 className="adminLikeStatText">
            <u>Tag</u>:{" "}
            {tags.length
              ? tags.filter((t) => t.id === tagId)[0].name
              : "Loading!"}
          </h4>

          <h4 className="adminLikeStatText">
            <u>Level</u>: {difficultMap[difficulty]}
          </h4>

          <h4 className="adminLikeStatText">
            <u>Description</u>:{" "}
            {desc.length > descLen ? desc.slice(0, descLen) + "..." : desc}
          </h4>
        </div>

        {status.map((stat, i) => (
          <div key={i} className="adminLikeStatDiv">
            <h4 className="adminLikeStatText">
              {i + 1}. {stat.name || "*Former User*"}{" "}
              {stat.email ? `(${stat.email})` : null}
            </h4>

            <h4 className="adminLikeStatText">
              <u>Activity</u>:{" "}
              {stat.status.slice(0, 1).toUpperCase() + stat.status.slice(1)}
            </h4>

            <button
              type="button"
              className="adminLikeStatBtn gBtn"
              onClick={() => this.deleteLike(stat.likeId, stat.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
  }
}

const mapState = (state) => ({ tags: state.tags });

const mapDispatch = (dispatch) => ({
  deleteLike: (likeId, userId) => dispatch(deleteLike(likeId, userId)),
});

export default connect(mapState, mapDispatch)(AdminLike);
