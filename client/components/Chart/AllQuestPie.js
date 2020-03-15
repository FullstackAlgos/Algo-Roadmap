import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class AllQuestPie extends Component {
  constructor() {
    super();
    this.state = {
      data: [0, 1]
    };
  }

  componentDidMount() {
    const { questLen, userLen } = this.props,
      adjQuestLen = questLen || 1;

    this.setState({
      data: [userLen, adjQuestLen - userLen]
    });
  }

  componentDidUpdate(prevProps) {
    const { questLen, userLen } = this.props;

    if (questLen !== prevProps.questLen || userLen !== prevProps.userLen) {
      this.setState({
        data: [userLen, questLen - userLen]
      });
    }
  }

  render() {
    return (
      <div className="allQuestPieDiv">
        <Pie
          options={{
            title: {
              display: true,
              text: "Question Progress",
              fontSize: 15,
              fontColor: "black"
            },
            legend: { display: false },
            cutoutPercentage: 25,
            responsive: true
          }}
          data={{
            labels: ["Solved", "Remaining"],
            datasets: [
              {
                backgroundColor: [
                  "rgba(0, 255, 0, 0.75)",
                  "rgba(255, 0, 255, 0.75)"
                ],
                data: this.state.data
              }
            ]
          }}
        />
      </div>
    );
  }
}

export default AllQuestPie;
