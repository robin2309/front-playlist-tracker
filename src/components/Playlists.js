import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import CircularProgress from "@material-ui/core/CircularProgress";
import React from "react";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import red from "@material-ui/core/colors/red";

import Origin from "./Origin";

const StyledTableHead = styled(TableHead)`
  && {
    background-color: ${red[500]};
  }
`;

const StyledHeadCell = styled(TableCell)`
  && {
    color: white;
    & > span {
      color: white;
    }
  }
`;

const StyledTabelRow = styled(TableRow)`
  && {
    &:nth-child(even) {
      background-color: ${red[50]};
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
    padding: 10px;
    margin: 10px;
    background-color: ghostwhite;
  }
`;

const Text = styled(Typography)`
  margin: 0;
`;

const headCells = [
  { id: "origin", numeric: false, disablePadding: false, label: "Origine" },
  {
    id: "playlistName",
    numeric: false,
    disablePadding: true,
    label: "Playlist",
  },
  { id: "name", numeric: false, disablePadding: false, label: "Titre" },
  {
    id: "artists",
    numeric: false,
    isArray: true,
    disablePadding: false,
    label: "Artiste",
  },
  { id: "album", numeric: false, disablePadding: false, label: "Album" },
  { id: "position", numeric: true, disablePadding: false, label: "Position" },
  { id: "playlistFans", numeric: true, disablePadding: false, label: "Fans" },
];

function descendingComparator(a, b, orderBy) {
  const aValue = headCells.find(({ id }) => id === orderBy).isArray
    ? a[orderBy].join()
    : a[orderBy];
  const bValue = headCells.find(({ id }) => id === orderBy).isArray
    ? b[orderBy].join()
    : b[orderBy];
  if (bValue < aValue) {
    return -1;
  }
  if (bValue > aValue) {
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

const Playlists = ({ playlistsResult, loading }) => {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("playlistName");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

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

  if (loading) {
    return (
      <EmptyWrapper>
        <CircularProgress />
      </EmptyWrapper>
    );
  }

  if (playlistsResult.length === 0) {
    return (
      <EmptyWrapper>
        <StyledPaper elevation={1}>
          <Text variant="body1">Aucun résultats</Text>
        </StyledPaper>
      </EmptyWrapper>
    );
  }

  return (
    <StyledPaper elevation={3}>
      <TablePagination
        rowsPerPageOptions={[10, 20, 30, 50]}
        component="div"
        count={playlistsResult.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
      <TableContainer>
        <Table
          aria-labelledby="tableTitle"
          size={"small"}
          aria-label="enhanced table"
        >
          <StyledTableHead>
            <TableRow>
              {headCells.map((headCell) => (
                <StyledHeadCell
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
                  </TableSortLabel>
                </StyledHeadCell>
              ))}
            </TableRow>
          </StyledTableHead>
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
                    key={`${row.playlistUrl}-${index}`}
                  >
                    <TableCell>
                      <Origin name={row.origin} />
                    </TableCell>
                    <TableCell
                      component="th"
                      id={labelId}
                      scope="row"
                      padding="none"
                      align="left"
                    >
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={row.playlistUrl}
                      >
                        {row.playlistName}
                      </a>
                    </TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">{row.artists}</TableCell>
                    <TableCell align="left">{row.album}</TableCell>
                    <TableCell align="right">
                      {row.position.split("/").map((pos, index) =>
                        index === 0 ? (
                          <span>
                            <b>{`${pos} `}</b>
                          </span>
                        ) : (
                          <>
                            / <span>{pos}</span>
                          </>
                        )
                      )}
                    </TableCell>
                    <TableCell align="right">
                      {row.playlistFans ? row.playlistFans : null}
                    </TableCell>
                  </StyledTabelRow>
                );
              })}
            {/*{emptyRows > 0 && (*/}
            {/*  <TableRow style={{ height: 33 * emptyRows }}>*/}
            {/*    <TableCell colSpan={7} />*/}
            {/*  </TableRow>*/}
            {/*)}*/}
          </TableBody>
        </Table>
      </TableContainer>
    </StyledPaper>
  );
};

Playlists.propTypes = {
  playlistsResult: PropTypes.array.isRequired,
  loading: PropTypes.bool,
};

export default Playlists;
