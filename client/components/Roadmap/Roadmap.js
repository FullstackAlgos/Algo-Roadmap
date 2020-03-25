import React, { Component } from "react";
import { connect } from "react-redux";
import SingleQuestion from "../Question/SingleQuestion";
import { switchUserActive } from "../../store";

class Roadmap extends Component {
  constructor() {
    super();
    this.state = {
      activeQ: "--",
      selectedQs: []
    };
  }

  formatQualifyingQs = (questions, userQs) => {
    const doneQs = new Set();
    userQs.forEach(q => doneQs.add(q.id));

    const output = questions.filter(q => !doneQs.has(q.id));

    output.sort((a, b) => {
      if (a.tags[0].ranking === b.tags[0].ranking) {
        return a.ratedDifficulty - b.ratedDifficulty;
      }
      return a.tags[0].ranking - b.tags[0].ranking;
    });

    return output.slice(0, 3);
  };

  componentDidMount() {}

  componentDidUpdate() {
    // if(this.props.selectedQs.length && this.state.activeQ === "--") {
    // 	this.setState({activeQ: this.state.selectedQs[0].name});
    // }
    if (this.state.activeQ === "--" && this.props.userQuestions.length) {
      this.setState({
        activeQ: this.formatQualifyingQs(
          this.props.questions,
          this.props.userQuestions
        )[0].name
      });
    }
  }

  setActive = evt => {
    const activeName = evt.target.innerText;
    evt.persist();

    if (activeName === this.state.activeQ) this.setState({ activeQ: "--" });
    else this.setState({ activeQ: activeName });
  };

  render() {
    const orderedQs = this.formatQualifyingQs(
      this.props.questions,
      this.props.userQuestions
    );

    return (
      <div className="roadmapFullDiv">
        <h3>Roadmap Time</h3>
        {orderedQs
          ? orderedQs.map((q, i) => (
              <SingleQuestion
                key={i}
                q={q}
                show={q.name === this.state.activeQ}
                setActive={this.setActive}
                switchUserActive={switchUserActive}
              />
            ))
          : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    questions: state.questions,
    userQuestions: state.userQuestions
  };
};

const mapDispatchToProps = dispatch => {
  return {
    switchUserActive: () => dispatch(switchUserActive())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Roadmap);
