import React, { useState, useContext } from "react";
import axios from "axios";
import styled from "styled-components";

import { AuthContext } from "./Auth";
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
  const authContext = useContext(AuthContext);

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
        headers: {
          Authorization: `Bearer ${authContext.getAuth()}`,
        },
      })
      .then((response) => {
        setPlaylists({
          ...initialPlaylistsState,
          loading: false,
          data: response.data,
        });
      })
      .catch((error) => {
        if (error.response.status === 401) {
          authContext.logout();
        }
      });
  };

  return (
    <>
      <Menu />
      <Wrapper>
        <SearchForm onSearch={searchPlasylists} loading={playlists.loading} />
        <Playlists
          playlistsResult={playlists.data}
          loading={playlists.loading}
        />
      </Wrapper>
    </>
  );
};

export default App;
