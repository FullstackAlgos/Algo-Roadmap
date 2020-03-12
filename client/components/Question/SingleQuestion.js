import React from "react";

const SingleQuestion = ({ q }) => {
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
      <h2 className="questionName">{name}</h2>

      <div className="questionContent">
        <h4 className="questionDesc">{description}</h4>

        <div className="questionRateDiv">
          <p className="questionRate">Difficult: {difficultMap[difficulty]}</p>

          <p className="questionRate">Likes: {Number(likes)}</p>

          <p className="questionRate">Dislikes: {Number(dislikes)}</p>

          <p className="questionRate">
            Rated Difficulty: {Number(ratedDifficulty)}
          </p>
        </div>

        <a href={link} className="questionLink">
          Link to Leetcode
        </a>
      </div>
    </div>
  );
};

const difficultMap = {
  1: "Easy",
  2: "Challenge Easy",
  3: "Medium",
  4: "Challenge Medium",
  5: "Hard"
};

export default SingleQuestion;
