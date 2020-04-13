import React, { Component } from "react";
import { connect } from "react-redux";
import { adminChange, deleteUser } from "../../store";
import { difficultMap } from "../../utils/utilities";

class AdminUser extends Component {
  constructor() {
    super();
    this.state = {
      showQuest: false,
    };
  }

  changeAdmin = (update) => {
    const { u, adminChange } = this.props;
    adminChange(u.id, update);
  };

  removeUser = () => {
    const { u, deleteUser } = this.props;
    deleteUser(u.id);
  };

  show = () => {
    this.setState({ showQuest: !this.state.showQuest });
  };

  render() {
    const { u, self, tags } = this.props,
      { showQuest } = this.state;
    console.log(u);

    return (
      <div className={`adminSingleDiv adminSingle${self}`}>
        {u ? (
          <>
            <div className="adminUserRow">
              <h3 className="adminQuestName">
                {u.name} ({u.email})
              </h3>

              {u.isAdmin ? (
                <button
                  type="button"
                  onClick={() => this.changeAdmin(false)}
                  className="adminQuestBtn gBtn"
                >
                  Remove Admin
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => this.changeAdmin(true)}
                  className="adminQuestBtn gBtn"
                >
                  Grant Admin
                </button>
              )}

              <button
                type="button"
                onClick={this.removeUser}
                className="adminQuestBtn gBtn"
              >
                Remove User
              </button>
            </div>

            <div className="adminUserRow">
              <p className="adminUserText">
                <u>Admin</u>: {u.isAdmin ? "Yes" : "No"}
              </p>

              <p className="adminUserText">
                <u>Completed Questions</u>: {u.questions.length}
              </p>
            </div>

            <div className="adminUserQuestFullDiv">
              <h3 className="adminUserQuestHeader" onClick={this.show}>
                {showQuest ? "Hide" : "Show"} Question Detail
              </h3>

              {showQuest
                ? u.questions.map((q, i) => (
                    <div key={i} className="adminUserQuestDiv">
                      <h4 className="adminUserQuestText">
                        {i + 1}. {q.name} (
                        {tags.filter((t) => t.id === q.tagId)[0].name})
                      </h4>
                      <h4 className="adminUserQuestText">
                        <u>Level</u>: {difficultMap[q.difficulty]}
                      </h4>
                      <h4 className="adminUserQuestText">
                        <u>Action</u>:{" "}
                        {u.likes
                          .filter((q) => q.questionId === q.id)[0]
                          .status.slice(0, 1)
                          .toUpperCase() +
                          u.likes
                            .filter((q) => q.questionId === q.id)[0]
                            .status.slice(1)}
                        d
                      </h4>
                    </div>
                  ))
                : null}
            </div>
          </>
        ) : (
          <h3>Loading</h3>
        )}
      </div>
    );
  }
}

const mapState = (state) => ({
  tags: state.tags,
});

const mapDispatch = (dispatch) => ({
  adminChange: (userId, update) => dispatch(adminChange(userId, update)),
  deleteUser: (userId) => dispatch(deleteUser(userId)),
});

export default connect(mapState, mapDispatch)(AdminUser);
