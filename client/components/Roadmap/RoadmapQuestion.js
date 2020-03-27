import React from "react";

const RoadmapQuestion = (props) => {
	const { question, questionNum } = props;


	return (<span className={`roadmapQuestion roadmapQuestion${questionNum}`}>
				<h3>{question.tag.name}</h3>
				<a
					href={question.link}
					target="_blank"
					className="questionLink linkText"
				>
					<h3 className={`difficulty${question.difficulty}`}>
						{question.name}
					</h3>
				</a>
			</span>
	);
}

export default RoadmapQuestion;