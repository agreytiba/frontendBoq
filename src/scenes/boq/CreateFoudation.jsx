import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography, Box} from '@mui/material';

const data = [
  { sn: 1, material: 'Material A', unit: 'kg', rate: 10, quantity: 5 },
  { sn: 2, material: 'Material B', unit: 'm', rate: 8, quantity: 10 },
  // Add more data rows as needed
];

const CreateFoundation = () => {
  return (
    <Box m="20px" display="flex" justifyContent="center"  minHeight="100vh">
    <Box width={"80%"}>
      <Typography variant='h5' fontWeight={"700"} align='center'>A. PRELIMINARIES</Typography>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="Material Table">
        <TableHead>
          <TableRow>
            <TableCell>S/N</TableCell>
            <TableCell>Material</TableCell>
            <TableCell align="right">Unit</TableCell>
            <TableCell align="right">Rate</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Total</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.sn}>
              <TableCell component="th" scope="row">
                {row.sn}
              </TableCell>
              <TableCell>{row.material}</TableCell>
              <TableCell align="right">{row.unit}</TableCell>
              <TableCell align="right">{row.rate}</TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.rate * row.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </TableContainer>
    </Box></Box>
  );
};

export default CreateFoundation;
