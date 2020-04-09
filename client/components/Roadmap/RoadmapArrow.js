import React from "react";

const RoadmapArrow = (props) => {
  const { currQ, nextQ } = props;

  if (!nextQ || !currQ) return null;
  else if (currQ.tag.name !== nextQ.tag.name) {
    return <img src="/images/nextTopicArrow.png" className="roadmapArrow" />;
  }

  return <img src="/images/nextQuestionArrow.png" className="roadmapArrow" />;
};

export default RoadmapArrow;
