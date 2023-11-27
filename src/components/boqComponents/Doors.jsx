import {useState,useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import { API_BASE_URL } from "../../confing.js/baseUrl";

const doorFramesRows = [
  {
    material: "frames (900x2500)",
    unit: "Number",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },
  {
    material: "frames (1300x2500)",
    unit: "Number",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
  {
    material: "frames (800x800)",
    unit: "Number",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
];
const doorShutterRows = [
  {
    material: "shutter (900 x2500)",
    unit: "Number",
    quantity: 4,
    rate: 4000,
    amount: 160000,
  },
  {
    material: "shutter (1300x2500)",
    unit: "Number",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
  {
    material: "shutter (800x800)",
    unit: "Number",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
  {
    material: "Hinges",
    unit: "Box",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },

  {
    material: "Mortice Locks",
    unit: "Pcs",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
  {
    material: "Barrel Bolts",
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

const Doors = () => {

  const [doorFramesRows, setDoorFramesRows] = useState([]);
  const [doorShutterRows, setDoorShutterRows] = useState([]);
  const [allData, setAllData] = useState([]);

  // edit rate useState
  const [editingRate, setEditingRate] = useState(null);
  const [newRate, setNewRate] = useState(null);

  //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));
  //  useEffect to get data from database
  useEffect(() => {
    fetchData();
  }, []);

   const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }
  //function to fetch data from the database
  const fetchData = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/api/doors",config);
      if (response.data && user.accessLevel !== "pricetag") {
        const filteredframes = response.data.filter((entry) =>
          entry.type.includes("frame")
        );
        setDoorFramesRows(filteredframes);
         const filteredAl = response.data.filter((entry) =>
          entry.type.includes("shutter")
        );
        setDoorShutterRows(filteredAl);
      }
     
      setAllData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // handle update rate
  const handleRateUpdate = async (materialId) => {
    if (newRate !== null) {
      try {
        const response = await axios.put(
          API_BASE_URL + `/doors/${materialId}`,
          { newRate: newRate },config
        );
        setNewRate(null);
        if (response.data) {
          setEditingRate(null);
          await fetchData();
        } else {
          toast.error("Failed to update rate in the backend");
        }
      } catch (error) {
        toast.error(`kuna matatizo katika kubadilisha bei`);
      }
      setEditingRate(null);
    }
  };

  // currency format
  const formatCurrency = (value) => {
    const formattedValue = new Intl.NumberFormat({
      style: "currency",
      currency: "TZS", // Tanzanian Shillings
      minimumFractionDigits: 0, // Display whole numbers
    }).format(value);

    return `${formattedValue}`; // Concatenate the "TSh" sign
  };
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
                DOORS
              </Typography>
            </TableRow>

            <TableRow style={{ marginBottom: "5px" }}>
              <StyledTableCell>Material</StyledTableCell>
              <StyledTableCell align="right">Unit</StyledTableCell>
              <StyledTableCell align="right">Quantity</StyledTableCell>
              <StyledTableCell align="right">Rate</StyledTableCell>
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
                1. Door Frames
              </Typography>
            </TableRow>
            {doorFramesRows.map((row) => (
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
                            Save
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
                            <Edit
                              onClick={() => setEditingRate(row.material)}
                            />
                          )}
                        </span>
                      )}
                    </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
              </StyledTableRow>
            ))}
            <TableRow>
              <Typography
                variant={"h5"}
                fontWeight="bold"
                color={"primary"}
                paddingTop="10px"
              >
                2. Door Shutter
              </Typography>
            </TableRow>
            {doorShutterRows.map((row) => (
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
                            Save
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
                            <Edit
                              onClick={() => setEditingRate(row.material)}
                            />
                          )}
                        </span>
                      )}
                    </StyledTableCell>
                <StyledTableCell align="right">{row.amount}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Doors;
