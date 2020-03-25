import React, { Component } from "react";
import { difficultMap } from "../../utils/utilities";


class Roadmap extends Component {
	constructor() {
		super();
	}

	
	render () {
		const { name, difficulty, likes, dislikes, ratedDifficulty } = this.props.question;

		    const show = this.props.show;
    		const setActive = this.props.setActive;
    		const switchUserActive = this.props.switchUserActive;

		return (
			<div className="questNameDiv">
				<h3 
					className={`questionName qNameHover${!!link}`}
					onClick={}
				>
					{name}
				</h3>
				{show ? (
		          <div className="questionContent">
					<h4 className="questionDesc">{description}</h4>

					<div className="questionRateDiv">
					<p className="questionRate">
					Difficult: <strong>{difficultMap[difficulty]}</strong>
					</p>

					<p className="questionRate">
					Likes: <strong>{this.numLikes(likes, true)}</strong>
					</p>

					<p className="questionRate">
					Dislikes: <strong>{this.numLikes(likes, false)}</strong>
					</p>

					<p className="questionRate">
					Rated Difficulty: <strong>{Number(ratedDifficulty)}</strong>
					</p>
					</div>

					<a
					href={link}
					target="_blank"
					className="questionLink linkText"
					onClick={switchUserActive}
					>
					Explore the Question
					</a>
		          	</div>
        		) : null}
			</div>
		)
	}

}