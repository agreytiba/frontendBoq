import { useEffect, useMemo,useContext } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { getPatients,reset } from "../redux/patient/patientSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { AppContext } from "../useContextApi/AppContext";


const PatientList = () => {


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
  

  // use context api
  const { setTotalPatients } = useContext(AppContext);
  
// use Memo to get the length of the patient array of objects
  const countP = useMemo(() => {
    return patients.length;
  }, [patients]);
  setTotalPatients(countP);
  
 
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
    <Box>
   

      <Box
     
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
          responsiveLayout={['xs','sm']}

        />
      </Box>
      
    </Box>
  );
};

export default PatientList;
