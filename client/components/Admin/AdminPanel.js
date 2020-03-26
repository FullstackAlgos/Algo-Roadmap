import React, { Component } from "react";
import { NavLink, Route } from "react-router-dom";
import { connect } from "react-redux";
import { getAllQuestions, getAllTags } from "../../store";

import AdminRoutes from "./AdminRoutes";
import AdminQuestion from "./AdminQuestion";

class AdminPanel extends Component {
  componentDidMount() {
    const { getAllQuestions, getAllTags } = this.props;
    getAllQuestions();
    getAllTags();
  }

  render() {
    const { questions, match } = this.props;
    console.log("match -", match);

    return (
      <div className="adminPanelFullDiv">
        <div className="adminPanelSideBar">
          <NavLink to="/Admin/Questions">Questions 1</NavLink>
          {/* <NavLink to={`${match.url}/Questions`}>Questions</NavLink>
          <Route path={`${mathc.url}/Questions`} component={AdminQuestion} /> */}
        </div>

        {/* <div className="adminRoutesDiv"> */}
        {/* <AdminRoutes /> */}

        {/* {questions.length
            ? questions.map((q, i) => <AdminQuestion key={i} q={q} />)
            : null} */}
        {/* </div> */}
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    questions: state.questions,
    tags: state.tags
  };
};

const mapDispatch = dispatch => {
  return {
    getAllQuestions: () => dispatch(getAllQuestions()),
    getAllTags: () => dispatch(getAllTags())
  };
};

export default connect(mapState, mapDispatch)(AdminPanel);
