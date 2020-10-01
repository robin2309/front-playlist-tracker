import React from "react";
import { Switch, Route } from "react-router-dom";

import PlaylistPage from "./components/PlaylistPage";

const App = () => {
  return (
    <Switch>
      <Route path="/">
        <PlaylistPage />
      </Route>
    </Switch>
  );
};

export default App;
