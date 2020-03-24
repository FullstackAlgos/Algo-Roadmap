import React, { Component } from "react";
import { connect } from "react-redux";

class Roadmap extends Component {

	formatQualifyingQs = (questions, userQs, tags) => {
		const doneQs = new Set();
		userQs.forEach(q => doneQs.add(q.id));

		const output = questions.filter(q => !doneQs.has(q.id));

		output.sort((a,b) => {
			if(a.tags[0].ranking == b.tags[0].ranking) {
				return a.ratedDifficulty - b.ratedDifficulty;
			}
			return a.tags[0].ranking - b.tags[0].ranking;
		});

		return output;
	}

	render() {
		const orderedQs = this.formatQualifyingQs(
			this.props.questions,
			this.props.userQuestions
		)

		return (
			<div className="roadMapFullDiv">

				<h3>Roadmap Time</h3>
				{
					orderedQs ? orderedQs.map((q, i) => q.name) 
					: null
				}

			</div>
		)
	}
}



const mapStateToProps = state => {
	return {
		questions: state.questions,
		userQuestions: state.userQuestions
	}
}

const mapDispatchToProps = dispatch => {
	return {

	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Roadmap);
