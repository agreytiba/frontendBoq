import { Box } from "@mui/material";
import Header from "../components/Header";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";

import { useTheme } from "@mui/material";

const AppointmentsList = ({data}) => {


  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "patientName",
      headerName: "patient name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "doctorName",
      headerName: "Doctor Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "appointmentDate",
      headerName: "appointment Date",
      flex: 1,
    },
    {
      field: "department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "reason",
      headerName: "reasons",
      flex: 1
    },
  ];

  return (
    <Box m="20px">

      <Box borderTop="2px #000 solid" mt="30px" p="15px">
        <Header title="list of appointment" subtitle="list of appointment attended or on wait" />
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
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
        
      </Box>
    </Box>
   
  );
};



export default AppointmentsList;
