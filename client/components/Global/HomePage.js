import React from "react";

import User from "../User/User";
import Roadmap from "../Roadmap/Roadmap";
import QuestionList from "../Question/QuestionList";

const HomePage = ({ formFlip }) => {
  return (
    <>
      <User formFlip={formFlip} />

      <div className="rightContentDiv">
        <Roadmap />

        <QuestionList />
      </div>
    </>
  );
};

export default HomePage;
