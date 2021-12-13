import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import AdminCheckinPage from "./pages/AdminListPage";
import AdminPage from "./pages/AdminPage";
import AdminUploadFile from "./pages/AdminUploadFile";
import AdminQuanLyNhanVien from "./pages/AdminQuanLyNhanVien";
import AdminVanPhong from "./pages/AdminVanPhong";
function AdminFeature(props) {
  const match = useRouteMatch();
  return (
    <React.Fragment>
      <Switch>
        <Route path={match.path} component={AdminPage} exact />
        <Route
          path={`${match.path}/Checkin`}
          component={AdminCheckinPage}
          exact
        />
        <Route
          path={`${match.path}/Upload`}
          component={AdminUploadFile}
          exact
        />
        <Route
          path={`${match.path}/ListNhanVien`}
          component={AdminQuanLyNhanVien}
          exact
        />
        <Route
          path={`${match.path}/ListVanPhong`}
          component={AdminVanPhong}
          exact
        />
      </Switch>
    </React.Fragment>
  );
}
export default AdminFeature;
