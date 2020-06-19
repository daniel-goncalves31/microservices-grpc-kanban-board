import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";
import Home from "./components/home/Home";
import PrivateRoute from "./components/shared/PrivateRoute";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
      <PrivateRoute path="/" component={Home} />
    </Switch>
  );
};

export default Routes;
