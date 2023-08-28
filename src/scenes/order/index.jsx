import { useEffect, useState } from "react";
import {toast} from "react-toastify"
import { Box, Typography,Button, useTheme } from "@mui/material";
import { DataGrid,GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { getAllUsers,reset} from "../../redux/auth/authSlice";
import { useDispatch , useSelector} from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { getAllorders } from "../../redux/order/orderSlice";


const Orders = () => {

 
  //colors themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const location = useLocation()
  const purchId = location.state

  // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

  //useSelector  containe properties from authSlice
  const { orders, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.order
  )
  // filter data to get all maps upload by the user


  
const filtereData = orders?.filter((order) => {
    let myid = order.purchaseId?._id
    return myid=== purchId
    
})


  //useEffect to fetch all users
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // firing get all users
    dispatch(getAllorders())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])
  
   // get user from local
  const user = JSON.parse(sessionStorage.getItem("user"));

  // header arrangement in data grid
  const columns = [
   
    {
      field: "userName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 1,
    },
   {
      field: 'purchaseId',
      headerName: 'Material',
      flex: 1,
      valueGetter: (params) => params.row.purchaseId.material,
    },
    {
      field: "quantity",
      headerName: "quantity",
      flex: 1,
    },
    
  ];


  // define unique id 
  const getRowId =(row) => row._id
// when on loadind state show this spinner
if (isLoading) {
  return <Spinner/>
  }
  if (orders === null) {
    return <Typography>no orders</Typography>
  }
  return (
    <Box display="flex" justifyContent="center" alignItems="center" py="50px">
    <Box width="90%" p="15px" boxShadow="0 0 5px #333" borderRadius="10px">
        <Box textAlign={"center"}>
        <Header title="Orders" />
        </Box>
     
      <Box
        m="40px 0 0 0"
        height="80vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[400],
            color:"#fff",
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor:"none",
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
         {purchId ? (
          <DataGrid rows={filtereData} columns={columns} getRowId={getRowId} />
        ) : (
          <DataGrid rows={orders} columns={columns} getRowId={getRowId} />
        )}
      </Box>
 
    </Box></Box>
  );
};

export default  Orders;
