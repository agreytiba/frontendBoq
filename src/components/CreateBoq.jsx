import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";
import { API_BASE_URL } from "../confing.js/baseUrl";

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

const CreateBoq = ({ infoData }) => {
  const [dataRows, setDataRows] = useState([]);
  const [editingRate, setEditingRate] = useState(null);
  const [newRate, setNewRate] = useState(null);
  const [savedData, setSavedData] = useState(null);
  const [collectionData, setCollectionData] = useState(null);
  const [editingQuantity, setEditingQuantity] = useState(null);
  const [quantity, setQuantity] = useState("");
  const user = JSON.parse(sessionStorage.getItem("user"));

  const { mainUrl, filterData, savedUrl, collectionName,TITLE } = infoData;
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
      const response = await axios.get(
        API_BASE_URL + `/api/${mainUrl}`,
        config
      );
      if (response.data) {
        if (filterData === "" ) {
          setDataRows(response.data)
        }
        else {
           const filteredInside = response.data.filter((entry) =>
            entry.type.includes(filterData)
          );
          setDataRows(filteredInside);
        }
         
        
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
          `${API_BASE_URL}/api/${savedUrl}/${savedInfo.savedPreId}`,
          config
        );
        if (response.data) {
          setSavedData(response.data);
          // const collectionsMap = {
          //   waterInsideData: "waterInsideData",
          //   waterOutData: "waterOutData",
          //   pretData: "preData",
          //   stripData: "stripData",
          //   padData: "padData",
          //   wallData: "padData", // Assuming wallData uses the same collection as padData
          //   beamData: "beamData"
          // };
          // const selectedCollection = collectionsMap[collectionName];
          if (collectionName) {
            setCollectionData(response.data[collectionName]);
          } else {
            // Handle case when collectionName doesn't match any known collection
            console.error("Unknown collection:", collectionName);
          }
        }
      }
    } catch (error) {
      toast.error("Error fetching savedData:", error);
    }
  };

  const handleRateUpdate = async (materialId) => {
    if (newRate !== null) {
      try {
        const response = await axios.put(
          API_BASE_URL + `/api/${mainUrl}/${materialId}`,
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
          API_BASE_URL + `/api/${savedUrl}/${savedData._id}`,
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
 

//     const handleComplete = async(data) => {
//     try {

//         const response = await axios.post(
//           `${API_BASE_URL}/api/${savedUrl}/status/${savedInfo.savedPreId}`, {boqStatus:data},
//           config
//         );
//         if (response.status === 200) {
//           toast.success(response.data.message)
//           fetchData()
//         }
//     } catch (error) {
//       toast.error("Error fetching Data:", error);
//     }
   
//  }
  const totalAmount = collectionData?.reduce((total, data) => {
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
    <Box
      mt={"2rem"}
      boxShadow={`0 4px 12px rgba(0,0,0,0.3)`}
      p={`20px`}
      borderRadius={`10px`}
    >
      {user.accessLevel === "pricetag" ? (
        <Box>
            <Typography
                    variant={"h3"}
                    paddingY="15px"
                    fontWeight="bold"
                      color={"primary"}
              textTransform={`uppercase`}
              textAlign={`center`}
                  >
                    Add rate page
              </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <Typography
                    variant={"h5"}
                    paddingY="10px"
                    fontWeight="bold"
                    color={"primary"}
                    textTransform={`uppercase`}
                  >
                  {TITLE}
                  </Typography>
                </TableRow>
                <TableRow style={{ marginBottom: "5px" }}>
                  <StyledTableCell>material</StyledTableCell>
                  <StyledTableCell align="right">unit</StyledTableCell>
                  <StyledTableCell align="right">
                    rate&nbsp;(tsh)
                  </StyledTableCell>
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
            <Typography
                    variant={"h3"}
                    paddingY="15px"
                    fontWeight="bold"
                      color={"primary"}
              textTransform={`uppercase`}
              textAlign={`center`}
                  >
                    Create Boq page
              </Typography>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <Typography
                    variant={"h4"}
                    paddingY="10px"
                    fontWeight="bold"
                      color={"primary"}
                      textTransform={`capitalize`}
                  >
                     {TITLE}
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
                      {collectionData !== null ? (
                        <Box>
                          {collectionData?.map((data) => {
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
                            Submit
                          </button>
                        </div>
                      ) : (
                        <>
                          {(user?.accessLevel === "admin" ||
                            user?.accessLevel === "boq") && (
                            <Box
                              onClick={() => setEditingQuantity(row.material)}
                            >
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
                            <Edit
                              onClick={() => setEditingRate(row.material)}
                            />
                          )}
                        </span>
                      )}
                    </StyledTableCell>
                    <StyledTableCell align="right">
                      {collectionData?.map((data) => {
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
                <StyledTableRow
                  style={{ borderBlock: "2px solid #333", marginBlock: "10px" }}
                >
                  <StyledTableCell variant="dark" sx={{ fontWeight:"bold",fontSize:`18px`}}> 
                      Total Amount
                  </StyledTableCell>
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell />
                  <StyledTableCell sx={{ fontWeight:"bold"}}align="right" >
                    {formatCurrency(totalAmount)}
                  </StyledTableCell>
                </StyledTableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}
      {/* <Box marginY={`10px`} display={`flex`} justifyContent={`space-between`}>
       
        {
          (dataRows[0]?.isSaved ||dataRows?.isSaved  )&&
          <Button variant="contained" width={`100px`} color="success" onClick={() => handleComplete("yes")}>Completed</Button>
        }

            <Button variant="contained"  sx={{width:`100px`, backgroundColor:`#3498db`}} onClick={() => handleComplete("no")} >Edit</Button>
          
        
      </Box> */}
    </Box>
  );
};

export default CreateBoq;
