import React, { useState } from "react";
import axios from "axios";

import Playlists from "./components/Playlists";
import SearchForm from "./components/SearchForm";
import { HOST } from "./config";
import "./App.css";

const ENDPOINT = "/tracker";

const initialPlaylistsState = {
  loading: false,
  error: null,
  data: [],
};

const App = () => {
  const [playlists, setPlaylists] = useState(initialPlaylistsState);
  const searchPlasylists = (artist, song) => {
    setPlaylists({
      ...playlists,
      loading: true,
    });
    axios
      .get(`${HOST}${ENDPOINT}`, {
        params: {
          ...(song ? { song } : { artist }),
        },
      })
      .then((response) => {
        setPlaylists({
          ...initialPlaylistsState,
          data: response.data,
        });
      });
  };

  return (
    <div
      className="app"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <SearchForm onSearch={searchPlasylists} loading={playlists.loading} />
      <Playlists playlistsResult={playlists.data} />
    </div>
  );
};

export default App;
