// import {useState,useEffect} from "react";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { Box, Typography } from "@mui/material";
// import axios from "axios";
// import { toast } from "react-toastify"
// import { Edit } from "@mui/icons-material";
// import { API_BASE_URL } from "../../confing.js/baseUrl";
// // const blanderingInsideRows = [
// //   {
// //     material: "2x2 Treated Timber",
// //     unit: "Pcs",
// //     quantity: 4,
// //     rate: 4000,
// //     amount: 160000,
// //   },
// //   {
// //     material: "4'nails",
// //     unit: "Kg",
// //     quantity: 1,
// //     rate: 1,
// //     amount: 1,
// //   },
// //   {
// //     material: "3' nails",
// //     unit: "Kg",
// //     quantity: 4,
// //     rate: 3500,
// //     amount: 14000,
// //   },
// // ];

// // const blanderingOutsideRows = [
// //   {
// //     material: "2x2 Treated Timber",
// //     unit: "Pcs",
// //     quantity: 4,
// //     rate: 4000,
// //     amount: 160000,
// //   },
// //   {
// //     material: "4'nails",
// //     unit: "Kg",
// //     quantity: 1,
// //     rate: 1,
// //     amount: 1,
// //   },
// //   {
// //     material: "3' nails",
// //     unit: "Kg",
// //     quantity: 4,
// //     rate: 3500,
// //     amount: 14000,
// //   },
// // ];
// const StyledTableCell = styled(TableCell)(({ theme }) => ({
//   [`&.${tableCellClasses.head}`]: {
//     backgroundColor: theme.palette.common.black,
//     color: theme.palette.common.white,
//     fontWeight: "bolder",
//     fontSize: "14px",
//   },
//   [`&.${tableCellClasses.body}`]: {
//     fontSize: 14,
//   },
// }));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   "&:nth-of-type(odd)": {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   "&:last-child td, &:last-child th": {
//     border: 0,
//   },
// }));

// const Blandering = () => {
//   // get data from database
//   const [blanderRows, setBlanderRows] = useState([])
//    // edit rate useState
//   const [editingRate, setEditingRate] = useState(null);
//   const [newRate, setNewRate] = useState(null);

//     //  get user from session store
//   const user = JSON.parse(sessionStorage.getItem("user"));

//    const config = {
// 	    headers: {
// 	      Authorization: `Bearer ${user?.token}`,
// 	    },
// 	  }
//     // useEffect to enable fetching  of data
//   useEffect(() => {
//     // Fetch data using axios
//   fetchUpdatedData()
//   }, []);
//   // get data after success
//   const fetchUpdatedData = async () => {
//     try {
//       const response = await axios.get(API_BASE_URL + "/api/blandering",config);
//       setBlanderRows(response.data);
//     } catch (error) {
//       toast.error("Failed to fetch updated data");
//     }
//   };

//     // handle update rate
//   const handleRateUpdate = async (materialId) => {
//     if (newRate !== null) {
//       try {
//         const response = await axios.put(
//          API_BASE_URL +  `/api/blandering/${materialId}`,
//           { newRate: newRate }
//         );
//         setNewRate(null);
//         if (response.data) {
//           setEditingRate(null);
//           await fetchUpdatedData();
//         } else {
//           toast.error("Failed to update rate in the backend");
//         }
//       } catch (error) {
//         toast.error(`kuna matatizo katika kubadilisha bei, ${error}`);
//       }
//       setEditingRate(null);
//     }
//   };

//   // format number int currency format
//   const formatCurrency = (value) => {
//     const formattedValue = new Intl.NumberFormat( {
//       style: 'currency',
//       currency: 'TZS', // Tanzanian Shillings
//       minimumFractionDigits: 0, // Display whole numbers
//     }).format(value);

//     return `${formattedValue}`; // Concatenate the "TSh" sign
//   };
//   return (
//     <Box mt={"2rem"}>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <Typography
//                 variant={"h3"}
//                 paddingY="10px"
//                 fontWeight="bold"
//                 color={"primary"}
//               >
//                E.BLANDERING
//               </Typography>
//             </TableRow>
//             <TableRow style={{ marginBottom: "5px" }}>
//               <StyledTableCell>material</StyledTableCell>
//               <StyledTableCell align="right">unit</StyledTableCell>
//               <StyledTableCell align="right">quantity</StyledTableCell>
//               <StyledTableCell align="right">rate&nbsp;(tsh)</StyledTableCell>
//               <StyledTableCell align="right">Amount&nbsp;(tsh)</StyledTableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             <TableRow>
//               <Typography
//                 variant={"h5"}
//                 fontWeight="bold"
//                 color={"primary"}
//                 paddingTop="10px"
//               >
//                 1. Blandering Inside
//               </Typography>
//             </TableRow>
//             {blanderRows.map((row) => (
//               <StyledTableRow
//                 key={row.material}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <StyledTableCell component="th" scope="row">
//                   {row.material}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.unit}</StyledTableCell>
//                 <StyledTableCell align="right">{row.quantity}</StyledTableCell>
//                     <StyledTableCell align="right">
//                   {editingRate === row.material ? (
//                     <div>
//                       <input
//                         type="number"
//                         value={newRate}
//                         onChange={(e) => setNewRate(e.target.value)}
//                         style={{ height: "50px", width: "50px" }}
//                       />
//                       {row.quantity}
//                       <button onClick={() => handleRateUpdate(row._id)}>
//                         Submit
//                       </button>
//                     </div>
//                   ) : (
//                     <span
//                       style={{
//                         display: "flex",
//                         justifyContent: "right",
//                         columnGap: "10px",
//                       }}
//                     >
//                       {formatCurrency(row.rate)}
//                       {(user?.accessLevel === "admin" ||
//                         user?.accessLevel === "pricetag") && (
//                         <Edit onClick={() => setEditingRate(row.material)} />
//                       )}
//                     </span>
//                   )}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.amount}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//             <TableRow>
//               <Typography
//                 variant={"h5"}
//                 fontWeight="bold"
//                 color={"primary"}
//                 paddingTop="10px"
//               >
//                 2. Blandering Outside
//               </Typography>
//             </TableRow>
//             {blanderRows.map((row) => (
//               <StyledTableRow
//                 key={row.material}
//                 sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//               >
//                 <StyledTableCell component="th" scope="row">
//                   {row.material}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.unit}</StyledTableCell>
//                 <StyledTableCell align="right">{row.quantity}</StyledTableCell>
//                   <StyledTableCell align="right">
//                   {editingRate === row.material ? (
//                     <div>
//                       <input
//                         type="number"
//                         value={newRate}
//                         onChange={(e) => setNewRate(e.target.value)}
//                         style={{ height: "50px", width: "50px" }}
//                       />
//                       {row.quantity}
//                       <button onClick={() => handleRateUpdate(row._id)}>
//                       Save
//                       </button>
//                     </div>
//                   ) : (
//                     <span
//                       style={{
//                         display: "flex",
//                         justifyContent: "right",
//                         columnGap: "10px",
//                       }}
//                     >
//                       {formatCurrency(row.rate)}
//                       {(user?.accessLevel === "admin" ||
//                         user?.accessLevel === "pricetag") && (
//                         <Edit onClick={() => setEditingRate(row.material)} />
//                       )}
//                     </span>
//                   )}
//                 </StyledTableCell>
//                 <StyledTableCell align="right">{row.amount}</StyledTableCell>
//               </StyledTableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Box>
//   );
// };

// export default Blandering;
