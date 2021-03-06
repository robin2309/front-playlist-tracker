import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import styled from "styled-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const Wrapper = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: center;
`;

const StyledTextField = styled(TextField)`
  && {
    margin-bottom: 10px;
    margin-right: 20px;
  }
`;

const SearchForm = ({ onSearch, loading }) => {
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
        disabled={loading || (!artistSearch && !songSearch)}
        onClick={() => {
          onSearch(artistSearch, songSearch);
        }}
      >
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <Typography variant="body1">Rechercher</Typography>
        )}
      </Button>
    </Wrapper>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default React.memo(SearchForm);
