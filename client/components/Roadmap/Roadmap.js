import React, { Component } from "react";
import { connect } from "react-redux";
import SingleQuestion from "../Question/SingleQuestion";
import RoadmapArrow from "./RoadmapArrow";
import RoadmapQuestion from "./RoadmapQuestion";
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
      if (a.tag.ranking === b.tag.ranking) {
        return a.difficulty - b.difficulty;
      }
      return a.tag.ranking - b.tag.ranking;
    });

    return output.slice(0, 3);
  };

  getTopics = questions => {
  	const topics = new Set();

  	questions.forEach(q => topics.add(q.tag.name));

  	return [...topics];
  }

  componentDidMount() {}

  componentDidUpdate() {
    const { questions, userQuestions } = this.props;
    if (
      this.state.activeQ === "--" &&
      questions.length &&
      userQuestions.length
    ) {
      const input = this.formatQualifyingQs(questions, userQuestions);
      this.setState({
        activeQ: input[0].name
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

    const topics = this.getTopics(orderedQs);

    return (
      <div className="roadmapFullDiv">
        <h3>Your next topics: <span> </span>
        {topics.length === 0 ? <span>None. You're done with every topic!</span> : 
        	topics.map((t,i) => (
        		<span key={i}>
        			{i === topics.length -1 ? t : `${t}, `}
        		</span>
        		)
        	)
    	}
        </h3>
        <br />
        {orderedQs
          ? orderedQs.map((q, i) => (
              <span>
             	<RoadmapQuestion key={i} question={q} questionNum={i+1} />
              	<RoadmapArrow key={i+orderedQs.length} currQ={q} nextQ={orderedQs[i+1]} />
              </span>
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
