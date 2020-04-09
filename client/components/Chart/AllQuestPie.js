import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class AllQuestPie extends Component {
  constructor() {
    super();
    this.state = {
      data: [0, 1],
    };
  }

  componentDidMount() {
    const { questLen, userLen } = this.props,
      adjQuestLen = questLen || 1;

    this.setState({
      data: [userLen, adjQuestLen - userLen],
    });
  }

  componentDidUpdate(prevProps) {
    const { questLen, userLen } = this.props;

    if (questLen !== prevProps.questLen || userLen !== prevProps.userLen) {
      this.setState({
        data: [userLen, questLen - userLen],
      });
    }
  }

  render() {
    const { questLen, userLen } = this.props,
      percent = Math.round((userLen / questLen) * 100);

    return (
      <div className="allQuestPieDiv">
        <div className="pieInsideDiv">
          <Pie
            options={{
              title: {
                display: false,
                text: `Total Question Progress: ${percent}%`,
                fontSize: 17,
                fontColor: "black",
                position: "right",
              },
              legend: { display: false },
              cutoutPercentage: 25,
              responsive: true,
              maintainAspectRatio: false,
            }}
            id="questPieId"
            data={{
              labels: ["Solved", "Remaining"],
              datasets: [
                {
                  backgroundColor: [
                    "rgba(0, 152, 195, 0.9)",
                    "rgba(165, 165, 165, 0.8)",
                  ],
                  data: this.state.data,
                },
              ],
            }}
          />
        </div>

        <div className="pieStatsDiv">
          <h3 className="pieStatHeader pieStatText">Progress Summary: </h3>

          <span className="pieStatText">
            # Completed: <strong>{userLen}</strong>
          </span>

          <span className="pieStatText">
            % Completed: <strong>{percent}%</strong>
          </span>
        </div>
      </div>
    );
  }
}

export default AllQuestPie;
