import React, { Component } from "react";
import { connect } from "react-redux";
import AdminLike from "./AdminLike";
import { getEveryLike, getAllTags } from "../../store";

class AdminLikePanel extends Component {
  componentDidMount() {
    const { getEveryLike, getAllTags } = this.props;
    getEveryLike();
    getAllTags();
  }

  likesToQuest = (likes) => {
    return likes.reduce((a, v) => {
      const qId = v.question.id,
        statusObj = { ...v.user, status: v.status, likeId: v.id };

      if (qId in a) a[qId].statuses.push(statusObj);
      else a[qId] = { question: v.question, statuses: [statusObj] };

      return a;
    }, {});
  };

  render() {
    const { allLikes } = this.props,
      questLike = this.likesToQuest(allLikes),
      questValues = [...Object.values(questLike)].sort(
        (a, b) => b.statuses.length - a.statuses.length
      );

    return (
      <div className="adminContentDiv">
        <div className="adminSingleDiv aSLD">
          <h3>
            <u>Total Activity</u>: {allLikes.length}
          </h3>
        </div>

        {allLikes.length
          ? questValues.map((like, i) => (
              <AdminLike
                key={i}
                question={like.question}
                status={like.statuses}
              />
            ))
          : null}
      </div>
    );
  }
}

const mapState = (state) => ({ allLikes: state.allLikes });

const mapDispatch = (dispatch) => ({
  getEveryLike: () => dispatch(getEveryLike()),
  getAllTags: () => dispatch(getAllTags()),
});

export default connect(mapState, mapDispatch)(AdminLikePanel);
