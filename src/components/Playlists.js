import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import React from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import styled from "styled-components";

import Origin from "./Origin";

const StyledTabelRow = styled(TableRow)`
  && {
    &:nth-child(even) {
      background-color: #d0d0d0;
    }
  }
`;

const EmptyWrapper = styled.div`
  && {
    display: flex;
    justify-content: center;
  }
`;

const StyledPaper = styled(Paper)`
  && {
    padding: 20px;
    margin: 20px;
  }
`;

const Text = styled.p`
  margin: 0;
`;

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const Playlists = ({ playlistsResult }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("calories");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);

  const headCells = [
    { id: "origin", numeric: false, disablePadding: false, label: "Origine" },
    { id: "playlist", numeric: false, disablePadding: true, label: "Playlist" },
    { id: "title", numeric: false, disablePadding: false, label: "Titre" },
    { id: "artist", numeric: false, disablePadding: false, label: "Artiste" },
    { id: "album", numeric: false, disablePadding: false, label: "Album" },
    { id: "position", numeric: true, disablePadding: false, label: "Position" },
    { id: "fans", numeric: true, disablePadding: false, label: "Fans" },
  ];

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    rowsPerPage -
    Math.min(rowsPerPage, playlistsResult.length - page * rowsPerPage);

  if (playlistsResult.length === 0) {
    return (
      <EmptyWrapper>
        <StyledPaper elevation={1}>
          <Text>Aucun résultats</Text>
        </StyledPaper>
      </EmptyWrapper>
    );
  }

  return (
    <StyledPaper elevation={1}>
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size={"small"}
          aria-label="enhanced table"
        >
          <TableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? "right" : "left"}
                  padding={headCell.disablePadding ? "none" : "default"}
                  sortDirection={orderBy === headCell.id ? order : false}
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : "asc"}
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <span>
                        {order === "desc"
                          ? "sorted descending"
                          : "sorted ascending"}
                      </span>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {stableSort(playlistsResult, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <StyledTabelRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={row.playlistUrl}
                  >
                    <TableCell>
                      <Origin name={row.origin} />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={row.playlistUrl}
                      >
                        {row.playlistName}
                      </a>
                    </TableCell>
                    <TableCell align="right">{row.name}</TableCell>
                    <TableCell align="right">{row.artists}</TableCell>
                    <TableCell align="right">{row.album}</TableCell>
                    <TableCell align="right">{row.position}</TableCell>
                    <TableCell align="right">
                      {row.playlistFans ? row.playlistFans : null}
                    </TableCell>
                  </StyledTabelRow>
                );
              })}
            {emptyRows > 0 && (
              <TableRow style={{ height: 33 * emptyRows }}>
                <TableCell colSpan={7} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 20, 25]}
        component="div"
        count={playlistsResult.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </StyledPaper>
  );
};

Playlists.propTypes = {
  playlistsResult: PropTypes.array.isRequired,
};

export default Playlists;
