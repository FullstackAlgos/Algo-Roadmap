import React, { Component } from "react";
import { connect } from "react-redux";
import AdminUser from "./AdminUser";
import { allUsers } from "../../store";

class AdminUserPanel extends Component {
  componentDidMount() {
    this.props.allUsers();
  }

  sortUsers = (users) => {
    const updateUser = users.reduce((a, v) => {
      let max = -Infinity;

      v.likes.forEach((l) => (max = Math.max(max, new Date(l.updatedAt))));

      const newUser = { ...v };
      newUser.last = max;

      a.push(newUser);
      return a;
    }, []);

    return updateUser.sort((a, b) => b.last - a.last);
  };

  render() {
    const { users, user } = this.props;
    let count = 1;

    return (
      <div className="adminContentDiv">
        <div className="adminPropPanelDiv">
          {users.length ? (
            <>
              <AdminUser
                u={users.filter((x) => x.id === user.id)[0]}
                self={true}
                idx={count++}
              />

              {this.sortUsers(users).map((u, i) => {
                if (u.id !== user.id) {
                  return <AdminUser key={i} u={u} self={false} idx={count++} />;
                }
              })}
            </>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  user: state.user,
  users: state.users,
});

const mapDispatch = (dispatch) => ({
  allUsers: () => dispatch(allUsers()),
});

export default connect(mapState, mapDispatch)(AdminUserPanel);
