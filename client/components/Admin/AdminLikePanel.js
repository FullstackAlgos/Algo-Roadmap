import React, { Component } from "react";
import { connect } from "react-redux";
import AdminLike from "./AdminLike";

class AdminLikePanel extends Component {
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
      questLike = this.likesToQuest(allLikes);

    return (
      <div className="adminContentDiv">
        {allLikes.length
          ? Object.values(questLike).map((like, i) => (
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

export default connect(mapState)(AdminLikePanel);
