import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "./components/auth/Auth";

interface Props {}

const Routes: React.FC<Props> = () => {
  return (
    <Switch>
      <Route path="/auth" component={Auth} />
    </Switch>
  );
};

export default Routes;
