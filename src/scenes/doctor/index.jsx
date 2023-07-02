import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import {toast} from "react-toastify"
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlineOutlined"
import EditOutlined from "@mui/icons-material/Edit"
import { useDispatch, useSelector } from "react-redux"
import {useNavigate} from "react-router-dom"
import { getDoctors, reset } from "../../redux/doctor/doctorSlices";
import Spinner from "../../components/Spinner";
import AddNewDoctor from "../../components/AddNewDoctor";
const Doctor = () => {
  //  useState for display add doctor form
  const [showAddForm, setShowAddForm] = useState(false)
  
  // color themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

    // initiliaze useDispatch && useNavigate
  const dispatch = useDispatch();
  const navigate = useNavigate()

//  useSelector  containe properties from authSlice
  const { doctors, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.doctor
  )

  // useEffect to fetch all the doctors
  useEffect(() => {
    if (isError) {
      toast.error(message)
    }


    dispatch(getDoctors())

    return () => {
      dispatch(reset())
    }
  }, [ navigate, isError, message, dispatch])
  

  const columns = [
    { field: "registerId", headerName: "ID No", flex: 0.5 },

    {
      field: "profileProfile",
      headerName: " photo",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "doctorName",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
     {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1
    },
   
    {
      field: "phone",
      headerName: "Phone No",
      flex: 1,
    },
    {
      field: "workingStatus",
      headerName: "Working status",
      flex: 1,
    },
     {
      field:"actions",
      headerName: "Actions",
    flex: 1,
      renderCell: (params) => {
        const handelEdit = () => {
         console.log(`edit clicked id`)
       }
        const handeldDelete = (id) => {
         console.log(`delete clicked id`)
        }
        return (
          <div>
            <Button onClick={()=>handelEdit()} type="submit" color="secondary" variant="contained" style={{ marginRight: "3px",width:"50%" }} >
              <EditOutlined/>
            </Button>
            <Button onClick={()=>handeldDelete()} type="submit" color="danger" variant="contained">
              <DeleteOutlined style={{color:"#fff"}}/>
            </Button>
          </div>
        )
     }
    },
       
 
  ];

// define unique id 
  const getRowId =(row) => row._id


  // display spinner on loading state
  if (isLoading) {
    return <Spinner/>
  }
  return (
    <Box m="20px" position="relative">
      <Header
        title="Doctor"
        subtitle="List of  doctors"
      />
      <Box display="center" justifyContent="flex-end" alignItems="center" mt="20px" >
        <Button style={{backgroundColor:"rgb(0,0,255)", color:"#fff"}} onClick={()=>setShowAddForm(true)}>New</Button>
      </Box>
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
            backgroundColor: colors.blueAccent[400],
            borderBottom: "none",
            color:"#fff"
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
          rows={doctors}
          columns={columns}
          getRowId={getRowId}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
          {
        showAddForm &&
        <Box position="absolute" top="0" left="0" p="20px" right="0" backgroundColor="rgba(0,0,0,0.5)" minHeight="100vh">
          
              <AddNewDoctor setShowAddForm={setShowAddForm} />
            
      </Box>
      }
    </Box>
  );
};

export default Doctor;
