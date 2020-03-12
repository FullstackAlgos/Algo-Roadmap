import React, { Component } from "react";
import { connect } from "react-redux";
import { getAllProblems } from "../../store";
import SingleQuestion from "./SingleQuestion";

class QuestionList extends Component {
  constructor() {
    super();
    this.state = {
      activeQ: "--"
    };
  }

  componentDidMount() {
    this.props.getAllProblems();
  }

  setActive = evt => {
    const activeName = evt.target.innerText;
    evt.persist();

    if (activeName === this.state.activeQ) this.setState({ activeQ: "--" });
    else this.setState({ activeQ: activeName });
  };

  render() {
    const { questions } = this.props;

    return (
      <div className="probListFullDiv">
        {questions.length
          ? questions.map((q, i) => (
              <SingleQuestion
                key={i}
                q={q}
                show={q.name === this.state.activeQ}
                setActive={this.setActive}
              />
            ))
          : null}
      </div>
    );
  }
}

const mapState = state => {
  return {
    questions: state.questions
  };
};

const mapDispatch = dispatch => {
  return {
    getAllProblems: () => dispatch(getAllProblems())
  };
};

export default connect(mapState, mapDispatch)(QuestionList);
