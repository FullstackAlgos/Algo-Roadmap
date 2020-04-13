import React, { Component } from "react";
import { connect } from "react-redux";
import AdminUser from "./AdminUser";

class AdminUserPanel extends Component {
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
                idx={1}
              />

              {users.map((u, i) => {
                if (u.id !== user.id) {
                  count++;
                  return <AdminUser key={i} u={u} self={false} idx={count} />;
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

export default connect(mapState)(AdminUserPanel);
