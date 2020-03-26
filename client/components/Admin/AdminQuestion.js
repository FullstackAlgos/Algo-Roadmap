import React from "react";
import { connect } from "react-redux";

const AdminQuestion = ({ q }) => {
  return (
    <div className="adminQuestionDiv">
      <h3>{q.name}</h3>
    </div>
  );
};

export default connect()(AdminQuestion);
