import React, { Component } from "react";
import { connect } from "react-redux";
import AdminPropQuest from "./AdminPropQuest";
import { getAllPropQuests } from "../../store";

class AdminPropPanel extends Component {
  componentDidMount() {
    this.props.getAllPropQuests();
  }

  render() {
    const { propose } = this.props;

    return (
      <div className="adminContentDiv">
        <div className="adminPropPanelDiv">
          {propose.length
            ? propose.map((q, i) => <AdminPropQuest key={i} q={q} />)
            : null}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  propose: state.proposeQuestions,
});

const mapDispatch = (dispatch) => ({
  getAllPropQuests: () => dispatch(getAllPropQuests()),
});

export default connect(mapState, mapDispatch)(AdminPropPanel);
