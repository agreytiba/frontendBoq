import { useEffect,useContext,useMemo } from "react";
import { Box, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../theme";
import { useTheme } from "@mui/material";
import { mockPreliminaries } from "../data/mockBoq";
import Header from "./Header";



const Preliminilaries = () => {

  // color themes
   const theme = useTheme();
  const colors = tokens(theme.palette.mode);
const data = mockPreliminaries.items
 
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "materialName",
      headerName: "material",
      flex: 1,
      cellClassName: "name-column--cell",
    },
   
    {
      field: "unit",
      headerName: "unit",
      flex: 0.5,
    },
     {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      cellClassName: "name-column--cell",
    },
     {
      field: "rate",
      headerName: "Rate",
      flex: 1,
      cellClassName: "name-column--cell",
    },
     {
      field: "amount",
      headerName: "amount",
      flex: 1,
      cellClassName: "name-column--cell",
    }
  
  ];
  // define unique id 
  const getRowId =(row) => row.id

  return (
      <Box >
         
          <Typography variant="h3">
               Preliminaries
    </Typography>
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
            backgroundColor: colors.blueAccent[400],
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
            getRowId={getRowId}
        //   components={{ Toolbar: GridToolbar }}
                 responsiveLayout={['xs','sm']}
        />
      </Box>
        
      </Box>
    
   
  );
};



export default Preliminilaries;
