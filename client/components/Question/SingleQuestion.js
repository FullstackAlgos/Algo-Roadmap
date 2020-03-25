import React, { Component } from "react";
import { connect } from "react-redux";
import { switchUserActive } from "../../store";
import { difficultMap } from "../../utils/utilities";

class SingleQuestion extends Component {
  constructor() {
    super();
  }

  componentDidMount() {}

  numLikes = (likesArr, like) => {
    return likesArr.reduce((a, v) => {
      if (like) {
        if (v.status === "like") a++;
      } else if (v.status === "dislike") a++;

      return a;
    }, 0);
  };

  render() {
    const { show, setActive, done, switchUserActive, q } = this.props,
      { name, description, difficulty, link, ratedDifficulty, tags, likes } = q;

    return (
      <div className={`questionFullDiv qFullDiv${!!link}`}>
        <div className="questNameDiv">
          <h3
            className={`questionName qName${show} qNameHover${!!link}`}
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
                Difficult: <strong>{difficultMap[difficulty]}</strong>
              </p>

              <p className="questionRate">
                Likes: <strong>{this.numLikes(likes, true)}</strong>
              </p>

              <p className="questionRate">
                Dislikes: <strong>{this.numLikes(likes, false)}</strong>
              </p>

              <p className="questionRate">
                Rated Difficulty: <strong>{Number(ratedDifficulty)}</strong>
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

const mapDispatch = dispatch => {
  return {
    switchUserActive: (qId, qName) => dispatch(switchUserActive(qId, qName))
  };
};

export default connect(null, mapDispatch)(SingleQuestion);
