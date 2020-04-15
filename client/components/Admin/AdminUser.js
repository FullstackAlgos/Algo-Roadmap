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

  lastDate = (likes) => {
    let max = -Infinity;

    for (const l of likes) {
      max = math.max(max, l.updatedAt);
    }

    const date = new Date(max);

    return date.toLocaleString();
  };

  render() {
    const { u, self, tags, idx } = this.props,
      { showQuest } = this.state;

    return (
      <div className={`adminSingleDiv adminSingle${self}`}>
        {u ? (
          <>
            <div className="adminUserRow">
              <h3 className="adminQuestName">
                {idx}. {u.name} ({u.email})
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
                <u>Completed Questions</u>: {u.likes.length}
              </p>

              <p className="adminUserText">
                <u>Last Update</u>:{" "}
                {u.likes.length ? this.lastDate(u.likes) : "None"}
              </p>
            </div>

            <div className="adminUserQuestFullDiv">
              {!u.likes.length ? (
                <h3 className="adminUserQuestHeader">
                  Currently No Completed Questions
                </h3>
              ) : (
                <>
                  <h3 className="adminUserQuestHeader aUQH" onClick={this.show}>
                    {showQuest ? "Hide" : "Show"} Question Detail
                  </h3>

                  {showQuest
                    ? [...u.likes]
                        .sort((a, b) => a.updatedAt - b.updatedAt)
                        .map((q, i) => {
                          const { name, tagId, difficulty } = q.question;

                          return (
                            <div key={i} className="adminUserQuestDiv">
                              <h4 className="adminUserQuestText aUQT1">
                                {i + 1}. {name} (
                                {tags.filter((t) => t.id === tagId)[0].name})
                              </h4>

                              <h4 className="adminUserQuestText aUQT2">
                                <u>Level</u>: {difficultMap[difficulty]}
                              </h4>

                              <h4 className="adminUserQuestText aUQT3">
                                <u>Action</u>:{" "}
                                {q.status.slice(0, 1).toUpperCase() +
                                  q.status.slice(1)}
                                d
                              </h4>

                              <h4 className="adminUserQuestText aUQT4">
                                <u>Update</u>:{" "}
                                {new Date(q.updatedAt).toLocaleString()}
                              </h4>
                            </div>
                          );
                        })
                    : null}
                </>
              )}
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
