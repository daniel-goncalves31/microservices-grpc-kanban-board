import { motion } from "framer-motion";
import React from "react";
import { Redirect, Switch } from "react-router-dom";
import LoginImage from "../../assets/login_image.svg";
import AuthRoute from "../shared/AuthRoute";
import Login from "./Login";
import SignUp from "./SignUp";

interface Props {}

const Auth: React.FC<Props> = () => {
  return (
    <div className="h-full flex overflow-hidden">
      <div className="h-full w-3/5 flex justify-center items-center">
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          src={LoginImage}
          alt="login"
          className="max-w-xl"
        />
      </div>
      <div className="w-2/5 flex justify-center items-center">
        <Switch>
          <AuthRoute exact path="/auth/login" component={Login} />
          <AuthRoute exact path="/auth/signup" component={SignUp} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </div>
  );
};

export default Auth;
