import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";

import { HOST } from "../config";

const ENDPOINT = "/authentication";

const defaultAuth = {
  authenticated: false,
  login: () => {},
};

const AuthContext = React.createContext(defaultAuth);

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [auth, setAuth] = useState(false);
  const [isLogging, setIsLogging] = useState(false);

  const loginHandler = (email, password) => {
    console.log("logging in");
    setIsLogging(true);
    axios
      .post(`${HOST}${ENDPOINT}`, {
        strategy: "local",
        email,
        password,
      })
      .then((response) => {
        console.log(response);
        setIsLogging(false);
        setAuth(true);
        history.push("/search");
      })
      .catch((error) => {
        setIsLogging(false);
        // TODO: show error
      });
  };

  return (
    <AuthContext.Provider
      value={{ authenticated: auth, login: loginHandler, isLogging }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };

export default AuthProvider;
