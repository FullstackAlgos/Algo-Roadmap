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
      <h2>{name}</h2>

      <h4>
        {description} {difficulty}
      </h4>

      <span>
        Likes: {Number(likes)} Dislikes: {Number(dislikes)}
      </span>

      <span>{Number(ratedDifficulty)}</span>

      <a href={link}>Link to Leetcode</a>
    </div>
  );
};

export default SingleQuestion;
