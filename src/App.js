import React from "react";
import { Switch, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";
import AuthenticatedRoute from "./components/AuthenticatedRoute";
import PlaylistPage from "./components/PlaylistPage";

const App = () => {
  return (
    <Switch>
      <AuthenticatedRoute path="/search">
        <PlaylistPage />
      </AuthenticatedRoute>
      <Route path="/">
        <LoginPage />
      </Route>
    </Switch>
  );
};

export default App;
