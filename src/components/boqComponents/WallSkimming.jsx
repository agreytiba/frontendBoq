import React, { useState,useEffect} from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify"
import axios from "axios";

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
// get data from response
  const [skimmingInsideRows, setSkimmingInsideRows] = useState([])
  const [skimmingOutsideRows, setSkimmingOutsideRows] = useState([])
   const[allData, setAllData] = useState([])
   // edit rate useState
  const [editingRate, setEditingRate] = useState(null);
  const [newRate, setNewRate] = useState(null);

    //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));
//  useEffect to get data from database
  useEffect(() => {
    fetchData();
  }, []);

  //function to fetch data from the database
  const fetchData = async () => {
    try {
      const response = await axios.get('https://backendboq.onrender.com/api/skimming'); 
      if (response.data) {
        setAllData(response.data)
        //  file data according to property  of "type" from data
         const filteredInside = response.data.filter((entry) => entry.type.includes('inside'));
        setSkimmingInsideRows(filteredInside)
         const filteredOutside = response.data.filter((entry) => entry.type.includes('outside'));
        setSkimmingOutsideRows(filteredOutside)
   
      }
     
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

   // handle update rate
  const handleRateUpdate = async (materialId) => {
    if (newRate !== null) {
      try {
        const response = await axios.put(
          `https://backendboq.onrender.com/api/skimming/${materialId}`,
          { newRate: newRate }
        );
        setNewRate(null);
        if (response.data) {
          setEditingRate(null);
          await fetchData();
        } else {
          toast.error("Failed to update rate in the backend");
        }
      } catch (error) {
        toast.error(`kuna matatizo katika kubadilisha bei, ${error}`);
      }
      setEditingRate(null);
    }
  };

  // currency format
 const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat( {
      style: 'currency',
      currency: 'TZS', // Tanzanian Shillings
      minimumFractionDigits: 0, // Display whole numbers
    }).format(value);

    return `${formattedValue}`; // Concatenate the "TSh" sign
  };
  return (
    <Box mt={"2rem"}>
      {user.accessLevel === "pricetag" ? <Box>
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
                 WALL SKIMMING
              </Typography>
            </TableRow>
            <TableRow style={{ marginBottom: "5px" }}>
              <StyledTableCell>material</StyledTableCell>
              <StyledTableCell align="right">unit</StyledTableCell>
              <StyledTableCell align="right">rate&nbsp;(tsh)</StyledTableCell>
            
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <Typography  variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px">
                Wall skimming materials
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
                 <StyledTableCell align="right">
                  {editingRate === row.material ? (
                    <div>
                      <input
                        type="number"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        style={{ height: "50px", width: "50px" }}
                      />
                      {row.quantity}
                      <button onClick={() => handleRateUpdate(row._id)}>
                        Submit
                      </button>
                    </div>
                  ) : (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        columnGap: "10px",
                      }}
                    >
                      {formatCurrency(row.rate)}
                      {(user?.accessLevel === "admin" ||
                        user?.accessLevel === "pricetag") && (
                        <Edit onClick={() => setEditingRate(row.material)} />
                      )}
                    </span>
                  )}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
</Box> :
      <Box>
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
                 <StyledTableCell align="right">
                  {editingRate === row.material ? (
                    <div>
                      <input
                        type="number"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        style={{ height: "50px", width: "50px" }}
                      />
                      {row.quantity}
                      <button onClick={() => handleRateUpdate(row._id)}>
                        Submit
                      </button>
                    </div>
                  ) : (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        columnGap: "10px",
                      }}
                    >
                      {formatCurrency(row.rate)}
                      {(user?.accessLevel === "admin" ||
                        user?.accessLevel === "pricetag") && (
                        <Edit onClick={() => setEditingRate(row.material)} />
                      )}
                    </span>
                  )}
                </StyledTableCell>
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
                 <StyledTableCell align="right">
                  {editingRate === row.material ? (
                    <div>
                      <input
                        type="number"
                        value={newRate}
                        onChange={(e) => setNewRate(e.target.value)}
                        style={{ height: "50px", width: "50px" }}
                      />
                      {row.quantity}
                      <button onClick={() => handleRateUpdate(row._id)}>
                        Submit
                      </button>
                    </div>
                  ) : (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "right",
                        columnGap: "10px",
                      }}
                    >
                      {formatCurrency(row.rate)}
                      {(user?.accessLevel === "admin" ||
                        user?.accessLevel === "pricetag") && (
                        <Edit onClick={() => setEditingRate(row.material)} />
                      )}
                    </span>
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer></Box>}
    </Box>
  );
};

export default WallSkimming;
