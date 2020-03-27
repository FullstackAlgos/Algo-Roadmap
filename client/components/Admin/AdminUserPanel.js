import React, { Component } from "react";
import { connect } from "react-redux";
import AdminUser from "./AdminUser";

class AdminUserPanel extends Component {
  render() {
    const { users, user } = this.props;

    return (
      <div className="adminContentDiv">
        <div className="adminPropPanelDiv">
          {users.length
            ? users.map((u, i) => {
                if (u.id !== user.id) return <AdminUser key={i} u={u} />;
              })
            : null}
        </div>
      </div>
    );
  }
}

const mapState = state => {
  return {
    user: state.user,
    users: state.users
  };
};

export default connect(mapState)(AdminUserPanel);
