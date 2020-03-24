import React from "react";
import { difficultMap } from "../../utils/utilities";

const SingleQuestion = ({ q, show, setActive, done, switchUserActive }) => {
  const {
    name,
    description,
    difficulty,
    link,
    ratedDifficulty,
    tags,
    likes
  } = q;

  const numLikes = (likesArr, like) => {
    return likesArr.reduce((a, v) => {
      if (like) {
        if (v.status === "like") a++;
      } else if (v.status === "dislike") a++;

      return a;
    }, 0);
  };

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
              Likes: <strong>{numLikes(likes, true)}</strong>
            </p>

            <p className="questionRate">
              Dislikes: <strong>{numLikes(likes, false)}</strong>
            </p>

            <p className="questionRate">
              Rated Difficulty: <strong>{Number(ratedDifficulty)}</strong>
            </p>
          </div>

          <a
            href={link}
            target="_blank"
            className="questionLink linkText"
            onClick={switchUserActive}
          >
            Explore the Question
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default SingleQuestion;
