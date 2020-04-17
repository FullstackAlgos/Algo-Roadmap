import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteLike } from "../..//store";
import { difficultMap } from "../../utils/utilities";

class AdminLike extends Component {
  constructor() {
    super();
    this.state = {
      showDelete: { status: false, name: "", likeId: "", userId: "" },
    };
  }

  deleteLike = (update, likeId = "", userId = "", name = "") => {
    if (update) {
      this.props.deleteLike(likeId, userId);
      this.setState({
        showDelete: {
          status: !this.state.showDelete.status,
          name: "",
          likeId: "",
          userId: "",
        },
      });
    } else {
      this.setState({
        showDelete: {
          status: !this.state.showDelete.status,
          name,
          likeId,
          userId,
        },
      });
    }
    window.scrollTo(0, 0);
  };

  changeJSX = () => {
    const { name, likeId, userId } = this.state.showDelete;
    return (
      <div className="questPopFullDiv">
        <div className="questSurveyFullDiv">
          <h3 className="adminUserPopUpText">
            Are you sure you want to delete <u>{name}</u>'s like?
          </h3>

          <div className="questBtnDiv">
            <button
              type="button"
              className="questBtn gBtn"
              onClick={() => this.deleteLike(true, likeId, userId)}
            >
              Yes
            </button>

            <button
              type="button"
              className="questBtn gBtn"
              onClick={() => this.deleteLike(false)}
            >
              No
            </button>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { question, status, tags } = this.props,
      { id, name, tagId, difficulty, description: desc } = question,
      descLen = 75;

    return (
      <div className="adminSingleDiv">
        {this.state.showDelete.status ? this.changeJSX() : null}

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
              onClick={() =>
                this.deleteLike(
                  false,
                  stat.likeId,
                  stat.id,
                  stat.name || "*Former User*"
                )
              }
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
