import React, { Component } from "react";
import { Pie } from "react-chartjs-2";

class AllQuestPie extends Component {
  constructor() {
    super();
    this.state = {
      data: {
        labels: [
          `Hours Worked: ${(this.props.todaysScreenHours / 60).toFixed(2)}`,
          "Today"
        ],
        datasets: [
          {
            backgroundColor: [
              "rgba(0, 255, 0, 0.75)",
              "rgba(255, 0, 255, 0.75)"
            ],
            data: [
              (this.props.todaysScreenHours / 60).toFixed(2),
              24 - (this.props.todaysScreenHours / 60).toFixed(2)
            ]
          }
        ]
      }
    };
  }

  componentDidMount() {
    this.setState({
      data: {
        labels: [
          `Hours Worked: ${(this.props.todaysScreenHours / 60).toFixed(2)}`,
          "Today"
        ],
        datasets: [
          {
            backgroundColor: [
              "rgba(0, 255, 0, 0.75)",
              "rgba(255, 0, 255, 0.75)"
            ],
            data: [
              (this.props.todaysScreenHours / 60).toFixed(2),
              24 - (this.props.todaysScreenHours / 60).toFixed(2)
            ]
          }
        ]
      }
    });
  }

  render() {
    <Pie data={this.state.data} />;
  }
}

export default AllQuestPie;
