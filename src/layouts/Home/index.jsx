import Header from "components/Header";
import HomeFeature from "features/Home";
import TodoListCheckinFeature from "features/TodoListCheckin";
import React from "react";
import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

function HomeLayouts(props) {
  const match = useRouteMatch();
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route path={match.path} exact />
        <Route
          path={`${match.path}/CheckIn`}
          component={TodoListCheckinFeature}
        />
        <Route path={`${match.path}/Home`} component={HomeFeature} />
      </Switch>
    </div>
  );
}

export default HomeLayouts;
