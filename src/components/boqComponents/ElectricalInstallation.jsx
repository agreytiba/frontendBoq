import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Edit } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import { API_BASE_URL } from "../../confing.js/baseUrl";


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

const ElectricalInstallation = () => {
 //  use state to get data
  const [electricalRows, setElectricalRows] = useState([]);
  // edit rate useState
  const [editingRate, setEditingRate] = useState(null);
  const [newRate, setNewRate] = useState(null);
  const [savedData, setSavedData] = useState(null);
  // get  quantity
  const [editingQuantity, setEditingQuantity] = useState(null); // Add state for editing quantity
  const [quantity, setQuantity] = useState(""); // Add state for new quantity
  //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));
 const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }
  // useEffect to enable fetching  of data
  useEffect(() => {
    // Fetch data using axios
    axios
      .get(API_BASE_URL + "/api/electrical",config)
      .then((response) => {
        setElectricalRows(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching data:", error);
        toast.error("Error fetching data from the server");
      });
  }, []);
  // get data after success
  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/api/electrical",config);
      setElectricalRows(response.data);
    } catch (error) {
      toast.error("Failed to fetch updated data");
    }
  };

  // handle update rate
  const handleRateUpdate = async (materialId) => {
    if (newRate !== null) {
      try {
        const response = await axios.put(
          `/api/electrical/${materialId}`,
          { newRate: newRate },config
        );
        setNewRate(null);
        if (response.data) {
          setEditingRate(null);
          await fetchUpdatedData();
        } else {
          toast.error("Failed to update rate in the backend");
        }
      } catch (error) {
        toast.error(`kuna matatizo katika kubadilisha bei, ${error}`);
      }
      setEditingRate(null);
    }
  };

   const savedInfo = JSON.parse(localStorage.getItem("savedData"));
  // fetch SavedPre by Id
  const fetchSavedData = async () => {
    try {
      if (savedInfo.savedPreId) {
        const response = await axios.get(
         API_BASE_URL + `/api/savedelectrical/${savedInfo.savedPreId}`,config
        );
        setSavedData(response.data);
      }
    } catch (error) {
      toast.error("Error fetching savedData:", error);
    }
  };

  //  use effect to get savedData by id
  useEffect(() => {
    fetchSavedData();
  }, [savedInfo.savedPreId]);

  const handleQuantityUpdate = async (materialId) => {
    if (quantity !== "") {
      try {
        const response = await axios.put(
          API_BASE_URL + `/api/savedelectrical/${savedInfo?.savedPreId}`,
          {
            quantity: Number(quantity), // Convert to number
            materialId,
          },config
        );

        if (response.data) {
          setQuantity(""); // Reset the quantity input
          setEditingQuantity(false);
          fetchSavedData();
        } else {
          toast.error("Failed to update quantity in the backend");
        }
      } catch (error) {
        toast.error(`Error updating quantity: ${error}`);
      }
    }
  };

  // Calculate the total amount of the pre items
  const totalAmount = savedData?.electricData.reduce((total, data) => {
    const material = electricalRows.find((row) => row._id === data.materialId);
    if (material) {
      const amount = material.rate * data.quantity;
      return total + amount;
    }
    return total;
  }, 0);

  return (
    <Box mt={"2rem"}  boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} p={`20px`} borderRadius={`10px`}>
      {user?.accessLevel === "pricetag" ?
        <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <Typography
                variant={"h3"}
                paddingY="10px"
                fontWeight="bold"
                color={"primary"}
              >
                O. ELECTRICAL INSTALLATION
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
              
            </TableRow>
            {electricalRows.map((row) => (
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
                        justifyContent: "center",
                        columnGap: "10px",
                      }}
                    >
                      {row.rate}
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
        </TableContainer> :
        <TableContainer >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <Typography
                variant={"h3"}
                paddingY="10px"
                fontWeight="bold"
                color={"primary"}
              >
                O. ELECTRICAL INSTALLATION
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
              
            </TableRow>
            {electricalRows.map((row) => (
              <StyledTableRow
                key={row.material}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.material}
                </StyledTableCell>
                <StyledTableCell align="right">{row.unit}</StyledTableCell>
                <StyledTableCell align="center">
                  {savedData?.electricData !== null ? (
                    <Box>
          
                      {savedData?.electricData.map((data) => {
                        if (row._id === data.materialId) {
                          return (
                            <>
                              <span key={data._id}>{data.quantity}</span>
                            </>
                          );
                        }
                      })}
                    </Box>
                  ) : (
                    <span> 0 </span>
                  )}
                  {editingQuantity === row.material ? (
                    <div>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        style={{ height: "50px", width: "50px" }}
                      />
                      <button onClick={() => handleQuantityUpdate(row._id)}>
                        Save
                      </button>
                    </div>
                  ) : (<>{(user?.accessLevel === "admin" || user?.accessLevel === "boq") &&
                    <Box onClick={() => setEditingQuantity(row.material)}>
                      <Edit />
                     
                    </Box>}</>
                  )}
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
                        Submit
                      </button>
                    </div>
                  ) : (
                    <span
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        columnGap: "10px",
                      }}
                    >
                      {row.rate}
                      {(user?.accessLevel === "admin" ||
                        user?.accessLevel === "pricetag") && (
                          <Edit onClick={() => setEditingRate(row.material)} />
                        )}
                    </span>
                  )}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {savedData?.electricData.map((data) => {
                    if (row._id === data.materialId) {
                      return (
                        <span key={data.materialId}>
                          {row.rate * data.quantity}
                        </span>
                      );
                    }
                    return null; // Return null for non-matching rows
                  })}
                </StyledTableCell>
              </StyledTableRow>
            ))}
            <StyledTableRow
              style={{ border: "4px solid #333", marginBlock: "10px" }}
            >
              <StyledTableCell variant="dark">
                <Typography variant="h4" color={"primary"}>
                  {" "}
                  Total Amount
                </Typography>
              </StyledTableCell>

              <StyledTableCell align="center"></StyledTableCell>

              <StyledTableCell align="center"></StyledTableCell>

              <StyledTableCell align="center"></StyledTableCell>

              <StyledTableCell fontWeight="800" align="right">{totalAmount}</StyledTableCell>
            </StyledTableRow>
          </TableBody>
        </Table>
      </TableContainer>}
    </Box>
  );
};

export default ElectricalInstallation;
