import { Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDoctors } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";
import DeleteOutlined from "@mui/icons-material/DeleteOutlineOutlined"
import EditOutlined from "@mui/icons-material/Edit"

const Doctor = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },

    {
      field: "img",
      headerName: " photo",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "dept",
      headerName: "Department",
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

  return (
    <Box m="20px">
      <Header
        title="Doctor"
        subtitle="List of  doctors"
      />
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
          rows={mockDoctors}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default Doctor;
