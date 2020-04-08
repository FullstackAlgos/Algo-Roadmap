import React, { Component } from "react";
import { HorizontalBar } from "react-chartjs-2";

class TagBar extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  generateTagNames = () => {
    return this.props.tags.reduce((a, v) => {
      a.push(v.name);
      return a;
    }, []);
  };

  componentDidMount() {
    const { userQ, allQ, tags } = this.props,
      barData = tags.reduce((a, v) => {
        const userQuests = userQ.filter((x) => x.tagId === v.id).length,
          allQuests = allQ.filter((x) => x.tagId === v.id).length,
          percent = Math.floor((userQuests / allQuests) * 100) / 100;

        a.push(percent);
        return a;
      }, []);
    console.log(barData);
  }

  componentDidUpdate() {}

  render() {
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
            labels: this.generateTagNames(),
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
