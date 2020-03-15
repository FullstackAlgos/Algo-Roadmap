import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class AllQuestPie extends Component {
  constructor() {
    super();
    this.state = {
      data: [0, 10]
    };
  }

  componentDidMount() {
    const { questLen, userLen } = this.props,
      adjQuestLen = questLen || 1;

    this.setState({
      data: [userLen.toFixed(2), adjQuestLen - userLen.toFixed(2)]
    });
  }

  componentDidUpdate(prevProps) {
    const { questLen, userLen } = this.props;
  }

  render() {
    return (
      <Pie
        options={{
          // title: { display: true, text: "Question Progress" },
          responsive: true
        }}
        data={{
          labels: ["Solved", "Total"],
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
    );
  }
}

export default AllQuestPie;
