import React, { Component } from "react";
import { Bar } from "react-chartjs-2";

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
    return <div className="tagBarDiv"></div>;
  }
}

export default TagBar;
