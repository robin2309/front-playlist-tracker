import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import React, { useContext } from "react";
import styled from "styled-components";
import grey from "@material-ui/core/colors/grey";
import IconButton from "@material-ui/core/IconButton";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

import { AuthContext } from "./Auth";

const StyledAppBar = styled(AppBar)`
  && {
    padding: 10px;
    background-color: ${grey[800]};
    justify-content: space-between;
    flex-direction: row;
  }
`;

const Img = styled.img`
  && {
    height: 32px;
    width: 56px;
  }
`;

const LogoutIcon = styled(IconButton)`
  && {
    height: 32px;
    width: 32px;
  }
`;

const Menu = () => {
  const authContext = useContext(AuthContext);
  return (
    <StyledAppBar>
      <Img src="/logo.png" alt="Jo&co" />
        <Typography variant="h6" color="inherit">
            Jo & Co - Playlist Radar
        </Typography>
      <LogoutIcon
        aria-label="logout"
        color="inherit"
        onClick={authContext.logout}
      >
        <ExitToAppIcon />
      </LogoutIcon>
    </StyledAppBar>
  );
};

export default React.memo(Menu);
