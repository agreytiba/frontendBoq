import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box,Typography,Button,Dialog,DialogActions,DialogContent,DialogTitle,TableContainer,TableBody,TableCell,Table,TableRow,TableHead} from '@mui/material';
import { toast } from 'react-toastify';
const SavedPlasteringList = () => {
  const [savedData, setSavedData] = useState([]);
   const [openDialog, setOpenDialog] = useState(false);
  const [selectedPreData, setSelectedPreData] = useState([]);

  useEffect(() => {
    const fetchSavedPres = async () => {
      try {
        const response = await axios.get('https://backendboq.onrender.com/api/savedplastering');
        setSavedData(response.data);
      } catch (error) {
        toast.error( error);
      }
    };

    fetchSavedPres();
  }, []);

  const columns = [
  
    	{
			field: 'mapId',
			headerName: 'Ramani No',
            flex: 1,
            textAlign:'center',
			renderCell: (params) => {
				return (
					<Typography component={"p"} >
						Rama1{(params.row.mapId).slice(-3)}
					</Typography>
				);
			}
		},
 
    {
    field: 'viewPreData',
    headerName: 'View',
    width: 150,
    renderCell: (params) => (
      <Button
        variant="outlined"
        onClick={() => handleViewPreData(params.row.plasterData)}
      >
    Plastering
      </Button>
    ),
  }

  ];
  const handleViewPreData = (plasterData) => {
  setSelectedPreData(plasterData);
  setOpenDialog(true);
};
const handleCloseDialog = () => {
  setSelectedPreData([]);
  setOpenDialog(false);
};

  const getRowId = (row) => row._id;
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box width={"80%"} my={"20px"}
        sx={{
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "none",
            display: "none",
          },
       
        }}>
              <Typography variant='h2'>Plastering </Typography>
        <DataGrid rows={savedData} columns={columns} pageSize={5} getRowId={getRowId} />
     
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle style={{textAlign:"center",backgroundColor:"goldenrod",color:"#fff"}}>Gypsum Material</DialogTitle>
          <DialogContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{textTransform:"uppercase",fontWeight:"700",color:"#000"}}>
                    <TableCell>Material ID</TableCell>
                    <TableCell>Unit</TableCell>
                    <TableCell>Rate</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Amount</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedPreData.map((data) => (
                    <TableRow key={data._id}>
                      <TableCell>{data.materialId.material}</TableCell>
                      <TableCell>{data.materialId.unit}</TableCell>
                      <TableCell>{data.materialId.rate}</TableCell>
                      <TableCell>{data.quantity}</TableCell>
                      <TableCell>{data.quantity * data.materialId.rate}</TableCell>
                    </TableRow>
                  ))}
                  <TableRow style={{borderBlock:"5px solid #333",fontWeight:"bolder"}}>
                    <TableCell colSpan={4} align="right">
                      Total Amount:
                    </TableCell>
                    <TableCell >
                      {selectedPreData.reduce(
                        (total, data) => total + data.quantity * data.materialId.rate,
                        0
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>

              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>

    </Box>
  );
};

export default SavedPlasteringList;
