import React from "react";
import { connect } from "react-redux";
import { switchUserActive } from "../../store";

const RoadmapQuestion = ({ question, questionNum, switchUserActive }) => {
  const { id, name, tag, link, difficulty } = question;

  return (
    <span className={`roadmapQuestion roadmapQuestion${questionNum}`}>
      <div className="roadMapQuestTag">
        <h3 className="roadMapQuestHeader">{tag.name}</h3>
        <span className={`diffMarker difficulty${difficulty}`}>&#9673;</span>
      </div>

      <a
        href={link}
        target="_blank"
        className="roadmapQuestLink linkText"
        onClick={() => switchUserActive(id, name)}
      >
        {name}
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
