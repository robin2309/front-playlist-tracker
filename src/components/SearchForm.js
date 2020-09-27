import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";

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
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        maxWidth: "350px",
        padding: "15px",
        alignItems: "center",
      }}
    >
      <TextField
        id="artistSearch"
        name="artistSearch"
        value={artistSearch}
        onChange={onArtistChange}
        label="Artiste"
      />
      <TextField
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
    </div>
  );
};

SearchForm.propTypes = {
  onSearch: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

export default React.memo(SearchForm);
