import React, { Component } from "react";
import { connect } from "react-redux";
import { switchUserActive } from "../../store";
import { difficultMap } from "../../utils/utilities";

class SingleQuestion extends Component {
  numLikes = (likesArr, like) => {
    return likesArr.reduce((a, v) => {
      if (like) {
        if (v.status === "like") a++;
      } else if (v.status === "dislike") a++;

      return a;
    }, 0);
  };

  likedQuest = (user, likes, status) => {
    if (!user.id || !likes) return false;

    for (const q of likes) {
      if (q.userId === user.id && q.status === status) return true;
    }

    return false;
  };

  render() {
    const { show, setActive, done, switchUserActive, q, user } = this.props,
      { name, description, difficulty, link, likes } = q,
      liked = this.likedQuest(user, likes, "like"),
      disliked = this.likedQuest(user, likes, "dislike");

    return (
      <div className={`questionFullDiv qFullDiv${!!link}`}>
        <div className="questNameDiv">
          <h3
            className={`questionName qName${show} qNameHover${!!link} difficulty${difficulty}`}
            onClick={link ? setActive : null}
          >
            {name}
          </h3>

          {done ? <span className="questNameSymbol">&#10004;</span> : null}
        </div>

        {show ? (
          <div className="questionContent">
            <h4 className="questionDesc">{description}</h4>

            <div className="questionRateDiv">
              <p className="questionRate">
                Completed: <strong>{done ? "Yes" : "No"}</strong>
              </p>

              <p className="questionRate">
                Difficulty:{" "}
                <strong className={`difficulty${difficulty}`}>
                  {difficultMap[difficulty]}
                </strong>
              </p>

              <p className={`questionRate qRate${liked}`}>
                Likes: <strong>{this.numLikes(likes, true)}</strong>
              </p>

              <p className={`questionRate qRate${disliked}`}>
                Dislikes: <strong>{this.numLikes(likes, false)}</strong>
              </p>
            </div>

            <a
              href={link}
              target="_blank"
              className="questionLink linkText"
              onClick={() => switchUserActive(q.id, name)}
            >
              Explore the Question
            </a>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapState = (state) => {
  return { user: state.user };
};

const mapDispatch = (dispatch) => {
  return {
    switchUserActive: (qId, qName) => dispatch(switchUserActive(qId, qName)),
  };
};

export default connect(mapState, mapDispatch)(SingleQuestion);
