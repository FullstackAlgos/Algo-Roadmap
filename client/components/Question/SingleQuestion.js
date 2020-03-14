import React from "react";
import { difficultMap } from "../../utils/utilities";

const SingleQuestion = ({ q, show, setActive }) => {
  const {
    name,
    description,
    difficulty,
    link,
    likes,
    dislikes,
    ratedDifficulty
  } = q;

  return (
    <div className="questionFullDiv">
      <div className="questNameDiv">
        <h2 className={`questionName qName${show}`} onClick={setActive}>
          {name}
        </h2>

        <span className="questNameArrow">
          {String.fromCharCode(arrow[show])}
        </span>
      </div>

      {show ? (
        <div className="questionContent">
          <h4 className="questionDesc">{description}</h4>

          <div className="questionRateDiv">
            <p className="questionRate">
              Difficult: <strong>{difficultMap[difficulty]}</strong>
            </p>

            <p className="questionRate">
              Likes: <strong>{Number(likes)}</strong>
            </p>

            <p className="questionRate">
              Dislikes: <strong>{Number(dislikes)}</strong>
            </p>

            <p className="questionRate">
              Rated Difficulty: <strong>{Number(ratedDifficulty)}</strong>
            </p>
          </div>

          <a href={link} className="questionLink">
            Link to Leetcode
          </a>
        </div>
      ) : null}
    </div>
  );
};

const arrow = {
  true: "8911",
  false: "8910"
};

export default SingleQuestion;