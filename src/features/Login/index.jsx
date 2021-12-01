import React from "react";
import { Switch, useRouteMatch, Route } from "react-router";
import Login from "./components/Login";
function LoginFeature(props) {
  const match = useRouteMatch();
  return (
    <>
      <Switch>
        <Route path={match.path} exact component={Login} />
      </Switch>
    </>
  );
}

export default LoginFeature;
