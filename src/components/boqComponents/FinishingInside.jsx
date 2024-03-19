import React, { useState, useEffect } from "react";
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

// Styled components
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
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const FinishingIn = () => {
  const [dataRows, setDataRows] = useState([]);
  const [editingRate, setEditingRate] = useState(null);
  const [newRate, setNewRate] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [quantity, setQuantity] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  };

  useEffect(() => {
    fetchData();
    fetchSavedData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_BASE_URL + "/api/plumbing", config);
      if (response.data) {
        const filteredInside = response.data.filter((entry) =>
          entry.type.includes("finishIn")
        );
        setDataRows(filteredInside);
      }
    } catch (error) {
      toast.error("Error fetching data:", error);
    }
  };

const savedInfo = JSON.parse(localStorage.getItem("savedData"));
   
  const fetchSavedData = async () => {
    try {
      
      if (savedInfo.savedPreId) {
        const response = await axios.get(
          API_BASE_URL + `/api/savedfinishIn/${savedInfo.savedPreId}`,
          config
        );
        setSavedData(response.data);
        console.log(response.data)
      }
    } catch (error) {
      toast.error("Error fetching savedData:", error);
    }
  };

  const handleRateUpdate = async (materialId) => {
    if (newRate !== null) {
      try {
        const response = await axios.put(
          API_BASE_URL + `/api/plumbing/${materialId}`,
          { newRate: newRate },
          config
        );
        setNewRate(null);
        if (response.data) {
          setEditingRate(null);
          fetchData();
        } else {
          toast.error("Failed to update rate in the backend");
        }
      } catch (error) {
        toast.error(`Error updating rate: ${error}`);
      }
    }
  };

  const handleQuantityUpdate = async (materialId) => {
    if (quantity !== "") {
      try {
        const response = await axios.put(
          API_BASE_URL + `/api/savedfinishIn/${savedData._id}`,
          {
            quantity: Number(quantity),
            materialId,
          },
          config
        );

        if (response.data) {
          setQuantity("");
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

  const totalAmount = savedData?.finishInData.reduce((total, data) => {
    const material = dataRows.find((row) => row._id === data.materialId);
    if (material) {
      const amount = material.rate * data.quantity;
      return total + amount;
    }
    return total;
  }, 0);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "TZS",
      minimumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Box mt={"2rem"} boxShadow={`0 4px 12px rgba(0,0,0,0.3)`} p={`20px`} borderRadius={`10px`}>
      {user.accessLevel === "pricetag" ? (
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <Typography variant={"h5"} paddingY="10px" fontWeight="bold" color={"primary"}>
                     Finishings Inside
                  </Typography>
                </TableRow>
                <TableRow style={{ marginBottom: "5px" }}>
                  <StyledTableCell>material</StyledTableCell>
                  <StyledTableCell align="right">unit</StyledTableCell>
                  <StyledTableCell align="right">rate&nbsp;(tsh)</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataRows?.map((row) => (
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
                          <button onClick={() => handleRateUpdate(row._id)}>Submit</button>
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
                          {(user?.accessLevel === "admin" || user?.accessLevel === "pricetag") && (
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
        </Box>
      ) : (
        <Box>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <Typography variant={"h4"} paddingY="10px" fontWeight="bold" color={"primary"}>
                 Finishings Inside
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
                {dataRows?.map((row) => (
                  <StyledTableRow
                    key={row.material}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <StyledTableCell component="th" scope="row">
                      {row.material}
                    </StyledTableCell>
                    <StyledTableCell align="right">{row.unit}</StyledTableCell>
                    <StyledTableCell align="right">
                      {savedData?.finishInData !== null ? (
                        <Box>
                          {savedData?.finishInData.map((data) => {
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
                          <button onClick={() => handleQuantityUpdate(row._id)}>Submit</button>
                        </div>
                      ) : (
                        <>
                          {(user?.accessLevel === "admin" || user?.accessLevel === "boq") && (
                            <Box onClick={() => setEditingQuantity(row.material)}>
                              <Edit />
                            </Box>
                          )}
                        </>
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
                          <button onClick={() => handleRateUpdate(row._id)}>Submit</button>
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
                          {(user?.accessLevel === "admin" || user?.accessLevel === "pricetag") && (
                            <Edit onClick={() => setEditingRate(row.material)} />
                          )}
                        </span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {savedData?.finishInData.map((data) => {
                        if (row._id === data.materialId) {
                          return (
                            <span key={data.materialId}>
                              {formatCurrency(row.rate * data.quantity)}
                            </span>
                          );
                        }
                        return null;
                      })}
                    </StyledTableCell>
                  </StyledTableRow>
                ))}
                <StyledTableRow style={{ border: "4px solid #333", marginBlock: "10px" }}>
                  <StyledTableCell variant="dark">
                    <Typography variant="h4" color={"primary"}>
                      Total Amount
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell align="center"></StyledTableCell>
                  <StyledTableCell fontWeight="800">{formatCurrency(totalAmount)}</StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
    </Box>
  );
};

export default FinishingIn;
