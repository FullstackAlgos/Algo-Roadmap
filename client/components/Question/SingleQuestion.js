import React from "react";
import { difficultMap } from "../../utils/utilities";

const SingleQuestion = ({ q, show, setActive, done }) => {
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
              Likes: <strong>{Number(likes)}</strong>
            </p>

            <p className="questionRate">
              Dislikes: <strong>{Number(dislikes)}</strong>
            </p>

            <p className="questionRate">
              Rated Difficulty: <strong>{Number(ratedDifficulty)}</strong>
            </p>
          </div>

          <a href={link} className="questionLink linkText">
            Explore the Question
          </a>
        </div>
      ) : null}
    </div>
  );
};

export default SingleQuestion;
