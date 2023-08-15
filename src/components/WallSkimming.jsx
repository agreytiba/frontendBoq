import React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";

const skimmingInsideRows = [
  {
    material: "Wall Putty",
    unit: "Bags",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },
  {
    material: "Emulsion Paint(20 ltrs)",
    unit: "Buckets",
    quantity: 1,
    rate: 1000,
    amount: 1000,
  },
  {
    material: "Alcali paint",
    unit: "Buckets",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Sandpaper No.120",
    unit: "Meters",
    quantity: 2,
    rate: 20000,
    amount: 40000,
  },
  {
    material: "Scraper",
    unit: "Pcs",
    quantity: 1,
    rate: 50000,
    amount: 50000,
  },
];
const skimmingOutsideRows = [
  {
    material: "Wall Putty",
    unit: "Bags",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },
  {
    material: "Emulsion Paint(20 ltrs)",
    unit: "Buckets",
    quantity: 1,
    rate: 1000,
    amount: 1000,
  },
  {
    material: "Sandpaper No.120",
    unit: "Meters",
    quantity: 2,
    rate: 20000,
    amount: 40000,
  },
];
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontWeight: "bolder",
    fontSize: "14px",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const WallSkimming = () => {
  return (
    <Box mt={"2rem"}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <Typography
                variant={"h3"}
                paddingY="10px"
                fontWeight="bold"
                color={"primary"}
              >
                G. WALL SKIMMING
              </Typography>
            </TableRow>
            <TableRow style={{ marginBottom: "5px" }}>
              <StyledTableCell>material</StyledTableCell>
              <StyledTableCell align="right">unit</StyledTableCell>
              <StyledTableCell align="right">quantity</StyledTableCell>
              <StyledTableCell align="right">rate&nbsp;(tsh)</StyledTableCell>
              <StyledTableCell align="right">Amount&nbsp;(tsh)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Typography  variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px">
                1. Wall Skimming Inside
              </Typography>
            </TableRow>
            {skimmingInsideRows.map((row) => (
              <StyledTableRow
                key={row.material}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.material}
                </StyledTableCell>
                <StyledTableCell align="right">{row.unit}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                <StyledTableCell align="right">{row.rate}</StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
              </StyledTableRow>
            ))}
            <TableRow>
              <Typography   variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px">
                2. Wall Skimming Outside
              </Typography>
            </TableRow>
            {skimmingOutsideRows.map((row) => (
              <StyledTableRow
                key={row.material}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.material}
                </StyledTableCell>
                <StyledTableCell align="right">{row.unit}</StyledTableCell>
                <StyledTableCell align="right">{row.quantity}</StyledTableCell>
                <StyledTableCell align="right">{row.rate}</StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default WallSkimming;