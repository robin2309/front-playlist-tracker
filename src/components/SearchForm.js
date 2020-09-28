import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 350px;
  padding: 15px;
  align-items: center;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 10px;
  }
`;

const SearchForm = ({ onSearch }) => {
  const [artistSearch, setArtist] = useState("");
  const [songSearch, setSong] = useState("");

  const onArtistChange = (e) => {
    setArtist(e.target.value);
  };
  const onSongChange = (e) => {
    setSong(e.target.value);
  };

  return (
    <Wrapper>
      <StyledTextField
        id="artistSearch"
        name="artistSearch"
        value={artistSearch}
        onChange={onArtistChange}
        label="Artiste"
      />
      <StyledTextField
        id="songSearch"
        name="songSearch"
        value={songSearch}
        onChange={onSongChange}
        label="Chanson"
      />
      <Button
        color="primary"
        variant="contained"
        disabled={!artistSearch && !songSearch}
        onClick={() => {
          onSearch(artistSearch, songSearch);
        }}
      >
        Rechercher
      </Button>
    </Wrapper>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default React.memo(SearchForm);
