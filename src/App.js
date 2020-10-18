import React from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "./components/PublicRoute";
import LoginPage from "./components/LoginPage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import PlaylistPage from "./components/PlaylistPage";

const App = () => {
  return (
    <Switch>
      <AuthenticatedRoute path="/search">
        <PlaylistPage />
      </AuthenticatedRoute>
      <PublicRoute path="/">
        <LoginPage />
      </PublicRoute>
    </Switch>
  );
};

export default App;
