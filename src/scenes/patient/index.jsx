import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {  mockDataPatient } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPatients,reset } from "../../redux/patient/patientSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import AddNewPatient from "../../components/AddNewPatient";

const Patients = () => {

//  useState to show  add patient form
  const [showAddForm, setShowAddForm] = useState(false)
  // colors themes 
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate()

//  useSelector  containe properties from authSlice
  const { patients, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.patient
  )

  // useEffect to fetch all the patients
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }


    dispatch(getPatients())

    return () => {
      dispatch(reset())
    }
  }, [ navigate, isError, message, dispatch])
  
 
//header data grid arrangement
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },
    { field: "registerId", headerName: "Registrar ID" },
    {
      field: "patientName",
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
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "appointments",
      headerName: "appointments",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "registed date",
      flex: 1,
    },
  ];

// define unique id 
  const getRowId =(row) => row._id

  if (isLoading) {
       return <Spinner/>
  }
  return (
    <Box m="20px" position="relative">
      <Header
        title="patient"
        subtitle="List Of  Patient Details"
      />
      <Box display="center" justifyContent="flex-end" alignItems="center" mt="20px" >
        <Button style={{backgroundColor:"rgb(0,0,255)", color:"#fff"}} onClick={()=>setShowAddForm(true)}>New</Button>
      </Box>

      <Box>
        <Typography variant="h4"> appointments history </Typography>
        <p>lists of appointments made by the user</p>
      </Box>
      <Box
        m="40px 0 0 0"
        minHeight="100%"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[200],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.greenAccent[700],
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
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={patients}
          columns={columns}
          getRowId={getRowId}
          components={{ Toolbar: GridToolbar }}

        />
      </Box>{
        showAddForm &&
        <Box position="absolute" top="0" left="0" p="20px" right="0" backgroundColor="rgba(0,0,0,0.5)" minHeight="100vh">
          
              <AddNewPatient setShowAddForm={setShowAddForm} />
            
      </Box>
      }
      
    </Box>
  );
};

export default Patients;
