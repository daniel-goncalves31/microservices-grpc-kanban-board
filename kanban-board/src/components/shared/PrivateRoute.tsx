import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";

interface Props {
  path: string;
  component: React.FunctionComponent<any>;
  exact?: boolean;
}

const PrivateRoute: React.FC<Props> = ({
  path,
  component: Component,
  exact,
}) => {
  const { isAuthenticated } = useUserContext();
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/auth/login" />
        )
      }
    />
  );
};

export default PrivateRoute;
