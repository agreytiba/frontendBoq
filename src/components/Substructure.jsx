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

const bindingRows = [
  {
    material: "Sande cushion(18Tucks",
    unit: "Trips",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },
  {
    material: "Sand-18T",
    unit: "Trips",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },
  {
    material: "Coarse aggregate(18T trucks",
    unit: "Trips",
    quantity: 4,
    rate: 60000,
    amount: 240000,
  },
  {
    material: "cement",
    unit: "Bags",
    quantity: 2,
    rate: 20000,
    amount: 40000,
  },
];
const stripRows = [  {
    material: "cement",
    unit: "Bags",
    quantity: 2,
    rate: 20000,
    amount: 40000,
  },
    {
    material: "Sand(w8Trucks)",
    unit: "Trips",
    quantity: 4,
    rate: 4000,
    amount: 160000,
    },
   {
    material: "Coarse aggregate(18T trucks",
    unit: "Trips",
    quantity: 4,
    rate: 60000,
    amount: 240000,
  },
  {
    material: "Y8 Reinforcements",
    unit: "Pcs",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },

]
const padRows = [  {
    material: "Sand-18T",
    unit: "Trip",
    quantity: 2,
    rate: 20000,
    amount: 40000,
  },
    {
    material: "Cement",
    unit: "Bags",
    quantity: 4,
    rate: 4000,
    amount: 160000,
    },
   {
    material: "Coarse aggregates (18T)",
    unit: "Trip",
    quantity: 4,
    rate: 60000,
    amount: 240000,
  },
  {
    material: "Reinforcement 16mm-high tensile",
    unit: "Pcs",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },
  {
    material: "Reinforcement 8mm-high tensile",
    unit: "Pcs",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },

]
const wallRows= [  {
    material: "Walls :230mm thick",
    unit: "Blocks",
    quantity: 2,
    rate: 20000,
    amount: 40000,
  },
    {
    material: "Cement",
    unit: "Bags",
    quantity: 4,
    rate: 4000,
    amount: 160000,
    },
   {
    material: "Sand (18T trucks)",
    unit: "Trip",
    quantity: 4,
    rate: 60000,
    amount: 240000,
  },
  {
    material: "Fill(kifusi), 18T trucks",
    unit: "Trip",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },
  {
    material: "Hard core(mawe): 150mm bed(18T)",
    unit: "Trip",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },

]
const groundbeamRows= [  {
    material: "Reinforcements 16mm",
    unit: "Pcs",
    quantity: 2,
    rate: 20000,
    amount: 40000,
  },
    {
    material: "Reinforcements 8mm",
    unit: "Pcs",
    quantity: 4,
    rate: 4000,
    amount: 160000,
    },
  

]
const siteConcreteRows= [  {
    material: "Cement",
    unit: "Bags",
    quantity: 2,
    rate: 20000,
    amount: 40000,
  },
    {
    material: "Sand(18T trucks)",
    unit: "Trip",
    quantity: 4,
    rate: 4000,
    amount: 160000,
    },
   {
    material: "Coarse aggregate(18T trucks)",
    unit: "Trip",
    quantity: 4,
    rate: 60000,
    amount: 240000,
  },
  {
    material: "Shuttering's(mbao) 2 X 2",
    unit: "Pc",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },
  {
    material: "An termite: gladiator solutions",
    unit: "lts",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },
  {
    material: "Marine boards",
    unit: "Pcs",
    quantity: 3,
    rate: 200000,
    amount: 600000,
  },
]
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
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

const Substructure = () => {
  return (
    <Box >
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
          
              <TableRow>
                <Typography
                 variant={"h3"} paddingY="10px" fontWeight="bold"
                  color={"primary"}
                >
                  B. SUBSTRUCTURE
                </Typography>
              </TableRow>
       
            
            <TableRow
              style={{
                fontWeight: "bold",
                border: "2px solid #333",
                marginBottom: "5px",
              }}
            >
              <StyledTableCell>material</StyledTableCell>
              <StyledTableCell align="right">unit</StyledTableCell>
              <StyledTableCell align="right">quantity</StyledTableCell>
              <StyledTableCell align="right">rate&nbsp;(tsh)</StyledTableCell>
              <StyledTableCell align="right">Amount&nbsp;(tsh)</StyledTableCell>
                          </TableRow>
                      
          </TableHead>
                  <TableBody>
                          <TableRow>
                <Typography
                  variant={"h5"}
                  fontWeight="bold"
                color={"primary"}
                paddingTop="10px"
                >
                  1. Blinding
                </Typography>
              </TableRow>
            {bindingRows.map((row) => (
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
                {/* strip foundation */}
            <TableRow>
                <Typography
                  variant={"h5"}
                  fontWeight="bold"
                color={"primary"}
                paddingTop={"10px"}
                >
                  2. Strip Foundation
                </Typography>
              </TableRow>
            {stripRows.map((row) => (
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
                      
             {/* PAD FOUNDATION AND COLUMNS */}
            <TableRow>
                <Typography
                    variant={"h5"}
                  fontWeight="bold"
                color={"primary"}
                paddingTop={"10px"}
                >
                  3. Pad foundation and columns
                </Typography>
              </TableRow>
            {padRows.map((row) => (
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
                <Typography
                   variant={"h5"}
                  fontWeight="bold"
                color={"primary"}
                paddingTop={"10px"}
                >
                  4. Foundations wall
                </Typography>
              </TableRow>
            {wallRows.map((row) => (
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
                <Typography
                  variant={"h5"}
                  fontWeight="bold"
                color={"primary"}
                paddingTop={"10px"}
                >
                  5. Ground beam
                </Typography>
              </TableRow>
            {groundbeamRows.map((row) => (
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
                <Typography
                  variant={"h5"}
                  fontWeight="bold"
                color={"primary"}
                paddingTop={"10px"}
                >
                  6. Over site concrete(jamvi)
                </Typography>
              </TableRow>
            {siteConcreteRows.map((row) => (
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

export default Substructure;
