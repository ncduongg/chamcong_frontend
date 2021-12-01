import React from "react";
import { Route, Switch, useRouteMatch } from "react-router-dom";
import HonePage from "./pages/HonePage";

function HomeFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={HonePage} />
      </Switch>
    </div>
  );
}

export default HomeFeature;
