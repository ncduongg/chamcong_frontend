import Header from "components/Header";
import HeaderAdmin from "components/HeaderAdmin";
import AdminFeature from "features/Admin";
import AdminCheckinPage from "features/Admin/pages/AdminListPage";
import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";

function AdminLayout(props) {
  const match = useRouteMatch();
  return (
    <div className="app">
      <HeaderAdmin />
      <Switch>
        <Route path={`${match.path}`} component={AdminFeature} />
      </Switch>
    </div>
  );
}

export default AdminLayout;
