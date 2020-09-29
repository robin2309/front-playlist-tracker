import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

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

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

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
          loading: false,
          data: response.data,
        });
      });
  };

  return (
    <Wrapper>
      <SearchForm onSearch={searchPlasylists} loading={playlists.loading} />
      <Playlists playlistsResult={playlists.data} />
    </Wrapper>
  );
};

export default App;
