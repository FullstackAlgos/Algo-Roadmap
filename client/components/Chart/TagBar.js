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
    const { tags } = this.props,
      sorted = [...tags].sort((a, b) => a.ranking - b.ranking);

    return sorted.reduce((a, v) => {
      a.push(v.name);
      return a;
    }, []);
  };

  calcBarData = () => {
    const { userQ, allQ, tags } = this.props,
      sorted = [...tags].sort((a, b) => a.ranking - b.ranking);

    return sorted.reduce((a, v) => {
      const userQuests = userQ.filter((x) => x.question.tagId === v.id).length,
        allQuests = allQ.filter((x) => x.tagId === v.id).length,
        percent = Math.round((userQuests / allQuests) * 100);

      a.push(percent);
      return a;
    }, []);
  };

  componentDidMount() {
    this.setState({ data: this.calcBarData() });
  }

  componentDidUpdate(prevProps) {
    const { userQ, allQ, tags } = this.props;

    if (
      userQ.length !== prevProps.userQ.length ||
      allQ.length !== prevProps.allQ.length ||
      tags.length !== prevProps.tags.length
    ) {
      this.setState({ data: this.calcBarData() });
    }
  }

  render() {
    const { tags } = this.props,
      backColors = new Array(tags.length).fill("rgba(0, 152, 195, 0.9)");

    return (
      <div className="tagBarDiv">
        <HorizontalBar
          options={{
            layout: {
              padding: {
                left: 25,
              },
            },
            legend: { display: false },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              xAxes: [
                {
                  ticks: {
                    max: 100,
                    stepSize: 50,
                    display: false,
                  },
                },
              ],
            },
            tooltips: {
              callbacks: {
                label: function (item, data) {
                  return (
                    data["datasets"][0]["data"][item["index"]] + "% Completed"
                  );
                },
              },
            },
          }}
          id="tagBarId"
          data={{
            labels: this.generateTagNames(),
            datasets: [
              {
                backgroundColor: backColors,
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
