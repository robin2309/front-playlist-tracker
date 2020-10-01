import AppBar from "@material-ui/core/AppBar";
import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const StyledAppBar = styled(AppBar)`
  && {
    padding: 10px;
  }
`;

const Menu = () => (
  <StyledAppBar>
    <Typography variant="h6">Jo And Co</Typography>
  </StyledAppBar>
);

export default React.memo(Menu);
