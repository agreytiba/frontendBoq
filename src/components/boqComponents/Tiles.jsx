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

// const tilesRows = [
//   {
//     material: "40x40 floor tiles(1.92sqm)",
//     unit: "Box",
//     quantity: 4,
//     rate: 4000,
//     amount: 160000,
//   },
//   {
//     material: "25x40 wall tiles(kitchen & Toil)",
//     unit: "Box",
//     quantity: 1,
//     rate: 1,
//     amount: 1,
//   },
//   {
//     material: "Skirting tiles",
//     unit: "Box",
//     quantity: 4,
//     rate: 3500,
//     amount: 14000,
//   },
//   {
//     material: "Cement",
//     unit: "Bags",
//     quantity: 2,
//     rate: 20000,
//     amount: 40000,
//   },
//   {
//     material: "Grout",
//     unit: "Kg",
//     quantity: 2,
//     rate: 20000,
//     amount: 40000,
//   },
//   {
//     material: "sand",
//     unit: "Trips",
//     quantity: 2,
//     rate: 20000,
//     amount: 40000,
//   },

// ];
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

const Tiles = () => {
  //  use state to get data
  const [tilesRows, setTilesRows] = useState([]);
  // edit rate useState
  const [editingRate, setEditingRate] = useState(null);
  const [newRate, setNewRate] = useState(null);
// use state to get savedpre data
  const [savedData, setSavedData] = useState(null);
  // get  quantity
  const [editingQuantity, setEditingQuantity] = useState(null); // Add state for editing quantity
  const [quantity, setQuantity] = useState(""); // Add state for new quantity
  //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));

  // useEffect to enable fetching  of data
  useEffect(() => {
    // Fetch data using axios
    axios
      .get("https://backendboq.onrender.com/api/tiles")
      .then((response) => {
        setTilesRows(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching data:", error);
        toast.error("Error fetching data from the server");
      });
  }, []);
  // get data after success
  const fetchUpdatedData = async () => {
    try {
      const response = await axios.get("https://backendboq.onrender.com/api/tiles");
      setTilesRows(response.data);
    } catch (error) {
      toast.error("Failed to fetch updated data");
    }
  };

  // handle update rate
  const handleRateUpdate = async (materialId) => {
    if (newRate !== null) {
      try {
        const response = await axios.put(
          `https://backendboq.onrender.com/api/tiles/${materialId}`,
          { newRate: newRate }
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
          `https://backendboq.onrender.com/api/savedtiles/${savedInfo.savedPreId}`
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
          `https://backendboq.onrender.com/api/savedtiles/${savedInfo.savedPreId}`,
          {
            quantity: Number(quantity), // Convert to number
            materialId,
          }
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
  const totalAmount = savedData?.tileData.reduce((total, data) => {
    const material = tilesRows.find((row) => row._id === data.materialId);
    if (material) {
      const amount = material.rate * data.quantity;
      return total + amount;
    }
    return total;
  }, 0);


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
                M.TILES
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
            {tilesRows.map((row) => (
              <StyledTableRow
                key={row.material}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <StyledTableCell component="th" scope="row">
                  {row.material}
                </StyledTableCell>
                <StyledTableCell align="right">{row.unit}</StyledTableCell>
                 <StyledTableCell align="right">
                  {savedData?.tileData !== null ? (
                    <Box>
          
                      {savedData?.tileData.map((data) => {
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
                  ) :  (<>{(user?.accessLevel === "admin" || user?.accessLevel === "boq") &&
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
                  {savedData?.tileData.map((data) => {
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
      </TableContainer>
    </Box>
  );
};

export default Tiles;
