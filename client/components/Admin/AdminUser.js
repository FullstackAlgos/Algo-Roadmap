import React, { Component } from "react";
import { connect } from "react-redux";
import { adminChange, deleteUser } from "../../store";
import { difficultMap } from "../../utils/utilities";

class AdminUser extends Component {
  constructor() {
    super();
    this.state = {
      showQuest: false,
      showDelete: false,
      showAdmin: false,
    };
  }

  changeAdmin = (update) => {
    if (update) {
      const { u, adminChange } = this.props;
      adminChange(u.id, !u.isAdmin);
    }

    this.setState({ showAdmin: !this.state.showAdmin });
    window.scrollTo(0, 0);
  };

  removeUser = (update) => {
    if (update) {
      const { u, deleteUser } = this.props;
      deleteUser(u.id);
    }

    this.setState({ showDelete: !this.state.showDelete });
    window.scrollTo(0, 0);
  };

  changeJSX = (name, deleteUser, admin) => (
    <div className="questPopFullDiv">
      <div className="questSurveyFullDiv">
        <h3 className="adminUserPopUpText">
          Are you sure you want to{" "}
          {deleteUser ? <u>DELETE</u> : <u>{admin ? "REMOVE" : "GRANT"}</u>}{" "}
          {!deleteUser ? "admin rights for " : null}
          <u>{name.toUpperCase()}</u>?
        </h3>

        <div className="questBtnDiv">
          <button
            type="button"
            className="questBtn gBtn"
            onClick={
              deleteUser
                ? () => this.removeUser(true)
                : () => this.changeAdmin(true)
            }
          >
            Yes
          </button>

          <button
            type="button"
            className="questBtn gBtn"
            onClick={
              deleteUser
                ? () => this.removeUser(false)
                : () => this.changeAdmin(false)
            }
          >
            No
          </button>
        </div>
      </div>
    </div>
  );

  show = () => {
    this.setState({ showQuest: !this.state.showQuest });
  };

  lastDate = (likes) => {
    let max = -Infinity;

    for (const l of likes) {
      max = Math.max(max, new Date(l.updatedAt));
    }

    return this.dateFormat(max);
  };

  dateFormat = (date) => {
    const dateOpt = new Date(date).toLocaleString(),
      formatDate = dateOpt.slice(0, -6) + dateOpt.slice(-3);

    return formatDate;
  };

  render() {
    const { u, self, tags, idx, options, resetMode } = this.props,
      { showQuest, showDelete, showAdmin } = this.state;

    return (
      <div className={`adminSingleDiv adminSingle${self}`}>
        {u ? (
          <>
            {showDelete ? this.changeJSX(u.name, true) : null}
            {showAdmin ? this.changeJSX(u.name, false, u.isAdmin) : null}

            <div className="adminUserRow">
              <h3 className="adminQuestName">
                {idx}. {u.name} ({u.email})
              </h3>

              <button
                type="button"
                onClick={() => this.changeAdmin(false)}
                className={`adminQuestBtn gBtn aQB${u.isAdmin}`}
              >
                {u.isAdmin ? "Remove" : "Grant"} Admin
              </button>

              <button
                type="button"
                onClick={() => this.removeUser(false)}
                className="adminQuestBtn gBtn"
              >
                Remove User
              </button>

              {self ? (
                <>
                  <p className="adminUserListText">Sort List: </p>

                  <select
                    className="adminUserSelect"
                    onChange={(evt) => resetMode(evt.target.value)}
                  >
                    {options.map((x, i) => (
                      <option key={i}>{x}</option>
                    ))}
                  </select>
                </>
              ) : null}
            </div>

            <div className="adminUserRow">
              <p className="adminUserText">
                <u>Admin</u>: {u.isAdmin ? "Yes" : "No"}
              </p>

              <p className="adminUserText">
                <u>Completed Questions</u>: {u.likes.length}
              </p>

              <p className="adminUserText">
                <u>Joined</u>: {this.dateFormat(u.createdAt)}
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
                        .sort(
                          (a, b) =>
                            Date.parse(a.updatedAt) - Date.parse(b.updatedAt)
                        )
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
                                <u>Update</u>: {this.dateFormat(q.updatedAt)}
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
