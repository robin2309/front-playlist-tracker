import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { useHistory } from "react-router-dom";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import { HOST } from "../config";

const ENDPOINT = "/authentication";
const ACCESS_TOKEN = "accessToken";
const noop = () => {};

const defaultAuth = {
  isAuthenticated: noop,
  login: noop,
  isLogging: false,
  getAuth: noop,
  logout: noop,
};

const AuthContext = React.createContext(defaultAuth);

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [error, setError] = useState(null);
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
        localStorage.setItem(ACCESS_TOKEN, response.data.accessToken);
        history.push("/search");
      })
      .catch((error) => {
        setIsLogging(false);
        setError("Login ou mot de passe invalide");
      });
  };

  const isAuthenticated = () => {
    return Boolean(localStorage.getItem(ACCESS_TOKEN));
  };

  const getAuth = () => {
    return localStorage.getItem(ACCESS_TOKEN);
  };

  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    history.push("/");
  };

  const handleSnackbarClose = () => {
    setError(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: isAuthenticated,
        login: loginHandler,
        isLogging,
        getAuth,
        logout,
      }}
    >
      {children}
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        ContentProps={{
          "aria-describedby": "message-id",
        }}
        message={<span id="message-id">{error}</span>}
        action={
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleSnackbarClose}
          >
            <CloseIcon />
          </IconButton>
        }
      />
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };

export default AuthProvider;
