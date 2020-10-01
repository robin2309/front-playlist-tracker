import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

import Menu from "./Menu";
import Playlists from "./Playlists";
import SearchForm from "./SearchForm";
import { HOST } from "../config";

const ENDPOINT = "/tracker";

const initialPlaylistsState = {
  loading: false,
  error: null,
  data: [],
};

const Wrapper = styled.div`
  margin-top: 52px;
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
    <>
      <Menu />
      <Wrapper>
        <SearchForm onSearch={searchPlasylists} loading={playlists.loading} />
        <Playlists playlistsResult={playlists.data} />
      </Wrapper>
    </>
  );
};

export default App;
