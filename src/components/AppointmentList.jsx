import { useEffect,useContext,useMemo } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { useDispatch,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import { getAppointments, reset } from "../redux/appointment/appointSlice";
import Spinner from "./Spinner"
import { AppContext } from "../useContextApi/AppContext";

const AppointmentsList = () => {

  // color themes
   const theme = useTheme();
  const colors = tokens(theme.palette.mode);


   // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate()

//  useSelector  containe properties from authSlice
  const { appointments, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.appoint
  )

  // useEffect to fetch all the patients
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }


    dispatch(getAppointments())

    return () => {
      dispatch(reset())
    }
  }, [navigate, isError, message, dispatch])
  

  // use context api
  const { setTotalAppoints } = useContext(AppContext);
  
// use Memo to get the length of the patient array of objects
  const countP = useMemo(() => {
    return appointments.length;
  }, [appointments]);
  setTotalAppoints(countP);

  // onLoading show the spinner
if (isLoading) {
  return <Spinner/>
}

 
  const columns = [
    { field: "_id", headerName: "ID", flex: 0.5 },

    {
      field: "patientName",
      headerName: "patient Id",
      flex: 1,
      cellClassName: "name-column--cell",
    },
   
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
     {
      field: "appointDate",
      headerName: "Appointment Date",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "appointTime",
      headerName: "appointment Time",
      flex: 1,
    },
    {
      field: "description",
      headerName: "reasons",
      flex: 1
    },
  
  ];
  // define unique id 
  const getRowId =(row) => row._id

  return (
    <Box >

     <Box
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
            backgroundColor: colors.grey[400],
            borderBottom: "none",
            color: "#fff"
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
          rows={appointments}
            columns={columns}
            getRowId={getRowId}
          components={{ Toolbar: GridToolbar }}
                 responsiveLayout={['xs','sm']}
        />
      </Box>
        
      </Box>
    
   
  );
};



export default AppointmentsList;