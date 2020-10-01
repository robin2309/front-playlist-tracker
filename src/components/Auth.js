import React, { useState } from "react";
import PropTypes from "prop-types";

const defaultAuth = {
  id: null,
  email: null,
};

const AuthContext = React.createContext(defaultAuth);

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(defaultAuth);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AuthContext };

export default AuthProvider;
