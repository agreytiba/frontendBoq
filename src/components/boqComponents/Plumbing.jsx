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

const cleanWaterRows = [
  {
    material: "PPR pipe 3/4",
    unit: "Pcs",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },
  {
    material: "PPR FM Elbow 3/4 x 1/2",
    unit: "Pcs",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
  {
    material: "PPR FM TEE 3/4 x 1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "PPR FM SOCKET 3/4 x 1/2",
    unit: "Number",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PPR MIXER POINT 3/4 X 1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },
  {
    material: "PPR Elbow 3/4 ",
    unit: "Pcs",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
  {
    material: "PPR TEE 3/4 ",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "PPR  Socket 3/4 ",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PPR  Cross Over 3/4 ",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PPR  Plug 1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PPR Gate Valve 3/4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  
];
const sewarageWaterRows = [
  {
    material: "PVC Pipe Class B 4",
    unit: "Pcs",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },
  {
    material: "PVC Pipe Class B 1.1/2",
    unit: "Pcs",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
  {
    material: "PVC Eblow 1.1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "PVC Tee 1.1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "PVC 45 degree 1.1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "PVC Y Tee 1.1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PVC R.Bush 2x 1.1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PVC Plug 1.1/2",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "4 ways Trup",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "Non Truo",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "Tangit glue",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  
];
const waterOutsideRows = [
  {
    material: "PPR pipe 3/4",
    unit: "Pcs",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },

  {
    material: "PPR TEE 3/4 ",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },  {
    material: "PPR Elbow 3/4  ",
    unit: "Pcs",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
 
  {
    material: "PPR  Socket 3/4 ",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },

  {
    material: "PVC Pipe Class B 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PVC Elbow 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PVC Y Tee 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "PVC 45 degree 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Expansion Elbow 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "Expansion Elbow 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "Vant Cape 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "G Trup 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "P Trup 4",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Tangit Glue Gm 800",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  
];

const finishingRows = [
  {
    material: "W.C Toilet",
    unit: "Pcs",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },

  {
    material: "W.C.B Complete",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },  {
    material: "Kitchen sink complete",
    unit: "Pcs",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
 
  {
    material: "Ashton Heater",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },

  {
    material: "Shower Mixer",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Shatak",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Flash Tank",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Angle Valve PEX",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Flexible Pipe",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "Towel Rack",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "Toilet Holders",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  {
    material: "Soap Dish",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Basin Bolt pare",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Band Connector 4",
    unit: "Bottle",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Thread tape",
    unit: "Bottle",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
 
  
];
const septicTankRows = [
  {
    material: "Excavation",
    unit: "Holes",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },

  {
    material: "Walling",
    unit: "Holes",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },  {
    material: "Sand(4T)",
    unit: "Trips",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
 
  {
    material: "Blocks",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },

  {
    material: "Cement",
    unit: "Bags",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Plywood",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "2X4 wood",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Reinforcement Y12",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "1x8 Wood",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
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

const Plumbing = () => {
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
                L. PLUMBING 
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
              <Typography variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px">
                1. Clean Water Inside
              </Typography>
            </TableRow>
            {cleanWaterRows.map((row) => (
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
              <Typography variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px">
                2.Sewarage water Inside
              </Typography>
            </TableRow>
            {sewarageWaterRows.map((row) => (
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
              <Typography variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px">
                3. Clean and Sewarage water Outside
              </Typography>
            </TableRow>
            {waterOutsideRows.map((row) => (
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
              <Typography variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px">
                4. Finishing Inside
              </Typography>
            </TableRow>
            {finishingRows.map((row) => (
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
              <Typography variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px">
                5. Septic Tank and Soak Away Pit
              </Typography>
            </TableRow>
            {septicTankRows.map((row) => (
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

export default Plumbing;
