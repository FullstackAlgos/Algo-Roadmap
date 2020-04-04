import React from "react";
import { connect } from "react-redux";
import { switchUserActive } from "../../store";

const RoadmapQuestion = ({ question, questionNum }) => {
  return (
    <span className={`roadmapQuestion roadmapQuestion${questionNum}`}>
      <h3 className="roadMapQuestTag">{question.tag.name}</h3>

      <a href={question.link} target="_blank" className="questionLink linkText">
        <h3
          className={`difficulty${question.difficulty}`}
          onClick={() => switchUserActive(q.id, name)}
        >
          {question.name}
        </h3>
      </a>
    </span>
  );
};

const mapDispatch = (dispatch) => {
  return {
    switchUserActive: (qId, qName) => dispatch(switchUserActive(qId, qName)),
  };
};

export default connect(null, mapDispatch)(RoadmapQuestion);
