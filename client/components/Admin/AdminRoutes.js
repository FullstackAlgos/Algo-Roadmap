import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";

import AdminQuestion from "./AdminQuestion";

const AdminRoutes = () => (
  <Switch>
    <Route exact path="/Admin/Questions" component={AdminQuestion} />
  </Switch>
);

export default withRouter(AdminRoutes);
