import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const getImage = (name) => {
  switch (name) {
    case "spotify":
      return "/img/spotify.png";
    case "deezer":
      return "/img/deezer.png";
    case "itunes":
      return "/img/itunes.png";
    default:
      return "";
  }
};

const Img = styled.img`
  && {
    max-width: 50px;
    max-height: 50px;
  }
`;

const Origin = ({ name }) => <Img src={getImage(name)} alt={name} />;

Origin.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Origin;
