import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import { AuthContext } from "./Auth";

const PublicRoute = ({ children, ...otherProps }) => {
  return (
    <Route {...otherProps}>
      <AuthContext.Consumer>
        {(context) =>
          !context.isAuthenticated() ? children : <Redirect to="/search" />
        }
      </AuthContext.Consumer>
    </Route>
  );
};

PublicRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PublicRoute;
