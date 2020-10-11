import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "./Auth";

const AuthenticatedRoute = ({ children, ...otherProps }) => {
  return (
    <Route {...otherProps}>
      <AuthContext.Consumer>
        {(context) =>
          context.isAuthenticated() ? children : <Redirect to="/" />
        }
      </AuthContext.Consumer>
    </Route>
  );
};

AuthenticatedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthenticatedRoute;
