import React, { Component } from "react";
import { connect } from "react-redux";
import AdminUser from "./AdminUser";
import { allUsers } from "../../store";

const options = ["Update", "Join", "Activity"];

class AdminUserPanel extends Component {
  constructor() {
    super();
    this.state = {
      mode: options[0],
    };
  }

  componentDidMount() {
    this.props.allUsers();
  }

  resetMode = (mode) => {
    this.setState({ mode });
  };

  sortUsers = (mode, users) => {
    const updateUser = users.reduce((a, v) => {
      const newUser = {
        ...v,
        last: -Infinity,
        join: Date.parse(v.createdAt),
        count: v.likes.length,
      };
      newUser.likes.forEach(
        (l) => (newUser.last = Math.max(newUser.last, new Date(l.updatedAt)))
      );

      a.push(newUser);
      return a;
    }, []);

    return updateUser.sort((a, b) => {
      if (mode === "Update") return b.last - a.last;
      if (mode === "Join") return b.join - a.join;
      if (mode === "Activity") {
        if (b.count !== a.count) return b.count - a.count;
        return b.last - a.last;
      }
    });
  };

  render() {
    const { users, user } = this.props,
      userList = this.sortUsers(this.state.mode, users);
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
                options={options}
                resetMode={this.resetMode}
              />

              {userList.map((u, i) => {
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
