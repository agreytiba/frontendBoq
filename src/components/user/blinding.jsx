import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, TableContainer, TableBody, TableCell, Table, TableRow, TableHead } from '@mui/material';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../../confing.js/baseUrl';

const Blinding = () => {
  const [savedPres, setSavedPres] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPreData, setSelectedPreData] = useState([]);
  const location = useLocation();
  const mapId = JSON.parse(localStorage.getItem("myMapId"));
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
        const response = await axios.get(API_BASE_URL + '/api/savedblinding',config);
        // Filter the data by mapId
        const filteredData = response.data.filter((item) => item.mapId === mapId);

        setSavedPres(filteredData);
      } catch (error) {
        toast.error(error);
      }
    };

    fetchSavedPres();
  }, []);

  const columns = [
    {
      field: 'viewPreData',
      headerName: 'View',
      width: 150,
      renderCell: (params) => (
        <Button
          variant="outlined"
          onClick={() => handleViewPreData(params.row.blindData)}
        >
          Blinding
        </Button>
      ),
    },
  ];

  const handleViewPreData = (blindData) => {
    setSelectedPreData(blindData);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setSelectedPreData([]);
    setOpenDialog(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.text('Substructure blinding', 10, 10);

    const tableData = selectedPreData.map(data => [
      data.materialId.material,
      data.materialId.unit,
      data.materialId.rate,
      data.quantity,
      data.quantity * data.materialId.rate
    ]);

    doc.autoTable({
      head: [['Material', 'Unit', 'Rate', 'Quantity', 'Amount']],
      body: tableData,
      startY: 20,
    });

    const totalAmount = selectedPreData.reduce(
      (total, data) => total + data.quantity * data.materialId.rate,
      0
    );

    doc.text(`Total Amount: ${totalAmount}`, 10, doc.autoTable.previous.finalY + 10);

    doc.save('blinding.pdf');
  };

  const getRowId = (row) => row._id;

  return (
    <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
      <Box width={"80%"} sx={{
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "none",
          display: "none",
        },
      }}>
        <DataGrid rows={savedPres} columns={columns} pageSize={5} getRowId={getRowId} />

              <Dialog open={openDialog} >
                     {
                          selectedPreData.isSaved ? <span>imekamilika</span> : <span style={{color:"red",fontSize:"20px",textAlign:"center"}}>bado inafanyiwa kazi</span>
                      }
                  <DialogTitle style={{
                      textAlign: "center",
                      backgroundColor: "goldenrod", color: "#fff"
                  }}>Substructure Blinding</DialogTitle>
          <DialogContent>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow style={{ textTransform: "uppercase", fontWeight: "700", color: "#000" }}>
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
                  <TableRow style={{ borderBlock: "5px solid #333", fontWeight: "bolder" }}>
                    <TableCell colSpan={4} align="right">
                      Total Amount:
                    </TableCell>
                    <TableCell>
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
            <Button onClick={handleDownloadPDF} color="primary">
              Download PDF
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
}

export default Blinding;
