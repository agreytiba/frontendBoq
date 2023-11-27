import { useState, useEffect } from "react";
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
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../../confing.js/baseUrl";

const grillsRows = [
  {
    material: "Grills (1800x1700)",
    unit: "Number",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
  {
    material: "Grills (1800x2250)",
    unit: "Number",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },

  {
    material: "Grills (800x800)",
    unit: "Number",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },
];
const aluminiumRows = [
  {
    material: "aluminium (1800x1700)",
    unit: "Number",
    quantity: 1,
    rate: 10000,
    amount: 10000,
  },
  {
    material: "aluminium (1800x2250)",
    unit: "Number",
    quantity: 4,
    rate: 3500,
    amount: 14000,
  },

  {
    material: "aluminium (800x800)",
    unit: "Number",
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

const Windows = () => {
  const [grillsRows, setGrillsRows] = useState([]);
  const [aluminiumRows, setAluminiumRows] = useState([]);
  const [allData, setAllData] = useState([]);

  // edit rate useState
  const [editingRate, setEditingRate] = useState(null);
  const [newRate, setNewRate] = useState(null);

  //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));
     const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }
  //  useEffect to get data from database
  useEffect(() => {
    fetchData();
  }, []);

  //function to fetch data from the database
  const fetchData = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/api/windows",config);
      if (response.data && user.accessLevel !== "pricetag") {
        const filteredGrills = response.data.filter((entry) =>
          entry.type.includes("grill")
        );
        setGrillsRows(filteredGrills);
         const filteredAl = response.data.filter((entry) =>
          entry.type.includes("aluminium")
        );
        setAluminiumRows(filteredAl);
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
          API_BASE_URL + `/api/windows/${materialId}`,
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
      {user.accessLevel === "pricetag" ? (
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
                    WINDOWS MATERIALS
                  </Typography>
                </TableRow>

                <TableRow style={{ marginBottom: "5px" }}>
                  <StyledTableCell>material</StyledTableCell>
                  <StyledTableCell align="right">Unit</StyledTableCell>

                  <StyledTableCell align="right">
                    rate&nbsp;(tsh)
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allData.map((row) => (
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
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      ) : (
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
                    I.WINDOWS
                  </Typography>
                </TableRow>

                <TableRow style={{ marginBottom: "5px" }}>
                  <StyledTableCell>material</StyledTableCell>
                  <StyledTableCell align="right">unit</StyledTableCell>
                  <StyledTableCell align="right">quantity</StyledTableCell>
                  <StyledTableCell align="right">
                    rate&nbsp;(tsh)
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    Amount&nbsp;(tsh)
                  </StyledTableCell>
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
                    1. Window Grills
                  </Typography>
                </TableRow>
                {grillsRows.map((row) => (
                  <StyledTableRow
                    key={row.material}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.material}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.unit}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.quantity}
                    </StyledTableCell>
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
                    <StyledTableCell align="right">
                      {row.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <TableRow>
                  <Typography
                    variant={"h5"}
                    fontWeight="bold"
                    color={"primary"}
                    paddingTop="10px"
                  >
                    2. Aluminium Panels
                  </Typography>
                </TableRow>
                {aluminiumRows.map((row) => (
                  <StyledTableRow
                    key={row.material}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.material}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.unit}</StyledTableCell>
                    <StyledTableCell align="right">
                      {row.quantity}
                    </StyledTableCell>
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
                    <StyledTableCell align="right">
                      {row.amount}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default Windows;
