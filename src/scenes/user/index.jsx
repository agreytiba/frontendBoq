import { useEffect } from "react";
import {toast} from "react-toastify"
import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { getAllUsers,reset} from "../../redux/auth/authSlice";
import { useDispatch , useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Register from "../../components/RegisterForm";

const User = () => {
  //colors themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);


  // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch()
  const navigate = useNavigate()

//  useSelector  containe properties from authSlice
  const {users, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  // useEffect to fetch all users
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }
    // firing get all users
    dispatch(getAllUsers())

    return () => {
      dispatch(reset())
    }
  }, [ navigate, isError, message, dispatch])

  // header arrangement in data grid
  const columns = [
    { field: "_id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
  
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Access Level",
      flex: 1,
      renderCell: ({ row:{accessLevel} }) => {
        return (
          <Box
            width="60%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              accessLevel === "admin"
                ? colors.redAccent[600]
                : accessLevel === "doctor"
                ? colors.blueAccent[500]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {accessLevel === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {accessLevel === "doctor" && <SecurityOutlinedIcon />}
            {accessLevel === "user" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {accessLevel}
            </Typography>
          </Box>
        );
      },
    },
  ];


  // define unique id 
  const getRowId =(row) => row._id
// when on loadind state show this spinner
if (isLoading) {
  return <Spinner/>
}
  return (
    <Box m="20px">
      <Header title="User" subtitle="user access level" />
     
      <Box
        m="40px 0 0 0"
        height="100%"
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
            backgroundColor: colors.blueAccent[300],
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
        <DataGrid checkboxSelection rows={users} columns={columns} getRowId={getRowId}/>
      </Box>
    </Box>
  );
};

export default  User;
