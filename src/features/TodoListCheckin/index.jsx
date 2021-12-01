import React from "react";
import PropTypes from "prop-types";
import { Route, Switch, useRouteMatch } from "react-router";
import TodoCheckinPage from "./pages/TodoCheckinPage";

TodoListCheckinFeature.propTypes = {};

function TodoListCheckinFeature(props) {
  const mactch = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={mactch.path} component={TodoCheckinPage} />
      </Switch>
    </div>
  );
}

export default TodoListCheckinFeature;
