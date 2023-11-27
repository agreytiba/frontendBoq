import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box,Typography,Button,Dialog,DialogActions,DialogContent,DialogTitle,TableContainer,TableBody,TableCell,Table,TableRow,TableHead} from '@mui/material';
import { toast } from 'react-toastify';
import { API_BASE_URL } from '../../confing.js/baseUrl';
const SavedPreList = () => {
  const [savedPres, setSavedPres] = useState([]);
   const [openDialog, setOpenDialog] = useState(false);
  const [selectedPreData, setSelectedPreData] = useState([]);


    //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));


     const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }
  useEffect(() => {
    const fetchSavedPres = async () => {
      try {
        const response = await axios.get(API_BASE_URL + '/api/savedpres',config);
        setSavedPres(response.data);
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
        onClick={() => handleViewPreData(params.row.preData)}
      >
        Preliminilaries
      </Button>
    ),
  }

  ];
  const handleViewPreData = (preData) => {
  setSelectedPreData(preData);
  setOpenDialog(true);
};
const handleCloseDialog = () => {
  setSelectedPreData([]);
  setOpenDialog(false);
};

  const getRowId = (row) => row._id;
  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box width={"80%"} border={"1px solid #333"} p="10px" my={"10px"}
        sx={{
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: "none",
            display: "none",
          },
       
        }}>
                <Typography variant='h2'>Premiliries</Typography>
        <DataGrid rows={savedPres} columns={columns} pageSize={5} getRowId={getRowId} />
     
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle style={{textAlign:"center",backgroundColor:"goldenrod",color:"#fff"}}>Preliminilaries</DialogTitle>
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

export default SavedPreList;
