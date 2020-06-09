import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import loginImage from "../../assets/login_image.svg";
import Login from "./Login";

interface Props {}

const Auth: React.FC<Props> = () => {
  return (
    <div className="h-full flex">
      <div className="h-full w-3/5 flex justify-center items-center">
        <img src={loginImage} alt="login" className="max-w-xl" />
      </div>
      <div className="w-2/5 flex justify-center items-center">
        <Switch>
          <Route exact path="/auth/login" component={Login} />
          <Redirect exact from="/auth" to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
