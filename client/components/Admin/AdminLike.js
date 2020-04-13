import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteLike } from "../..//store";

class AdminLike extends Component {
  deleteLike = (likeId, userId) => {
    this.props.deleteLike(likeId, userId);
  };

  render() {
    const { question, status } = this.props;

    return (
      <div className="adminSingleDiv">
        <h3 className="adminLikeHeader">
          {question.name}&nbsp;&nbsp;&nbsp;(Total: {status.length})
        </h3>

        {status.map((stat, i) => (
          <div key={i} className="adminLikeStatDiv">
            <h4 className="adminLikeStatText">
              {i + 1}. {stat.name || "n/a"}{" "}
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

const mapDispatch = (dispatch) => ({
  deleteLike: (likeId, userId) => dispatch(deleteLike(likeId, userId)),
});

export default connect(null, mapDispatch)(AdminLike);
