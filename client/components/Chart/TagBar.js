import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

class TagBar extends Component {
  constructor() {
    super();
    this.state = {
      data: [0, 1],
    };
  }

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    const { userQ, allQ, tags } = this.props,
      tagName = tags.reduce((a, v) => {
        a.push(v.name);
        return a;
      }, []);

    return (
      <div className="tagBarDiv">
        <HorizontalBar
          options={{
            title: {
              display: true,
              text: `Question Progress: %`,
              fontSize: 15,
              fontColor: "black",
            },
            legend: { display: false },
            responsive: true,
            maintainAspectRatio: false,
          }}
          id="tagBarId"
          data={{
            labels: tagName,
            datasets: [
              {
                backgroundColor: [
                  "rgba(0, 255, 0, 0.75)",
                  "rgba(255, 0, 255, 0.75)",
                ],
                data: this.state.data,
              },
            ],
          }}
        />
      </div>
    );
  }
}

export default TagBar;
