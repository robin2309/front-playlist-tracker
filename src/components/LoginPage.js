import React, { useContext, useState } from "react";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import grey from "@material-ui/core/colors/grey";

import { AuthContext } from "./Auth";

const StyledPaper = styled(Paper)`
  && {
    display: flex;
    flex-direction: column;
    padding: 20px;
    align-items: center;
    max-width: 300px;
    margin: 30px;
    background-color: ${grey[100]};
  }
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 10px;
  }
`;

const Wrapper = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Img = styled.img`
  && {
    width: 200px;
  }
`;

const LoginPage = () => {
  const authContext = useContext(AuthContext);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const onLoginChange = (e) => {
    setLogin(e.target.value);
  };
  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  return (
    <Wrapper>
      <StyledPaper>
        <Img src="/logo.png" alt="Logo" />
        <StyledTextField
          id="login"
          name="login"
          value={login}
          onChange={onLoginChange}
          label="Email"
        />
        <StyledTextField
          id="password"
          name="password"
          value={password}
          onChange={onPasswordChange}
          label="Mot de passe"
          type="password"
        />
        <Button
          color="primary"
          variant="contained"
          disabled={authContext.isLogging || (!login && !password)}
          onClick={() => {
            authContext.login(login, password);
          }}
        >
          {authContext.isLogging ? (
            <CircularProgress size={20} />
          ) : (
            <Typography variant="body1">Se connecter</Typography>
          )}
        </Button>
      </StyledPaper>
    </Wrapper>
  );
};

export default LoginPage;
