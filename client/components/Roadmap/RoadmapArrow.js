import React from "react";

const RoadmapArrow = (props) => {
  const { currQ, nextQ } = props;

  if (!nextQ || !currQ) return null;
  else if (currQ.tag.name !== nextQ.tag.name) {
    return <img src="/nextTopicArrow.png" className="roadmapArrow" />;
  }

  return <img src="/nextQuestionArrow.png" className="roadmapArrow" />;
};

export default RoadmapArrow;
