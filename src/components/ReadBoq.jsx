import React, { useEffect, useState } from 'react';
import { Box, Button, useMediaQuery, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { API_BASE_URL } from '../confing.js/baseUrl';
import { formatCurrency } from '../utulities/formatCurrency';

const ReadBoq = ({ infoData }) => {

  const [boqData, setBoqData] = useState([]);
  const [boqInfo, setBoqInfo] = useState([]);

 
  // get saved mapId from local storage
  const mapId = JSON.parse(localStorage.getItem("myMapId"));

  // get user from localstorage
  const user = JSON.parse(sessionStorage.getItem("user"));

  // destructure  infoData
  const { urlName, collectionName,pdfTitle, Title, tableHeaders } = infoData

  // config file
  const config = {
    headers: {
      Authorization: `Bearer ${user?.token}`,
    },
  }
 

  useEffect(() => {
    const fetchSavedPres = async () => {
      try {
        const response = await axios.get(API_BASE_URL + `/api/` + `${urlName}`, config);
        if (response.data) {
      const filteredData = response.data.filter((item) => item.mapId === mapId);
        setBoqInfo(filteredData);
    
        setBoqData(filteredData[0]?.[collectionName] || []);
      
    }   
      } catch (error) {
        toast.error(error);
      }
    };

    fetchSavedPres();
  }, []);

console.log(boqInfo)

  const totalAmountwithCurrency = boqData.reduce((total, data) => total + data.quantity * data.materialId.rate, 0);
  const totalAmount = formatCurrency(totalAmountwithCurrency);

  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

const handleDownloadPDF = () => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const titleText = `${Title}`;

  // Calculate the x position to center-align the title
  const textWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize() / doc.internal.scaleFactor;
  const textX = (pageWidth - textWidth) / 2;

  doc.text(titleText, textX, 10); // Center-align the title

  const tableData = boqData.map(data => [
    data.materialId.material,
    data.materialId.unit,
    data.quantity,
    formatCurrency(data.materialId.rate),
    formatCurrency(data.quantity * data.materialId.rate)
  ]);

  // Calculate total amount
  const totalAmount = boqData.reduce((acc, data) => acc + (data.quantity * data.materialId.rate), 0);

  // Add total amount row to table data
  const totalRow = [
    { content: 'Total Amount:', styles: { fontStyle: 'bold' }}, // Bold style for total label
    '', // Empty unit
    '', // Empty quantity
    '', // Empty rate
    { content: formatCurrency(totalAmount), styles: { fontStyle: 'bold' }} // Bold style for total amount
  ];

  tableData.push(totalRow);

  doc.autoTable({
    head: [['Material', 'Unit', 'Quantity', 'Rate(Tsh)', 'Amount(Tsh)']],
    body: tableData,
    startY: 20,
  });

  doc.save(`${pdfTitle}.pdf`);
};



  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      <Box width={isSmallScreen ? "100%" : "800px"} boxShadow="0 4px 12px rgba(0,0,0,0.3)" padding="10px" borderRadius="10px">
       <Typography align="center" textTransform={`uppercase`} variant="h4" margin="20px 0 10px 0" fontWeight={`bold`}>{Title}</Typography>
        {boqInfo[0]?.isSaved ? <Button onClick={handleDownloadPDF} color="primary" variant='outlined' sx={{ marginBottom: `10px` }}>Download PDF</Button> : <Typography variant='h5'color={`green`} paddingY={`10px`}> Bado inafanyiwa makadilio,ikamilika utaweza kudownload</Typography>}
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow style={{ textTransform: "uppercase", fontWeight: "700", color: "#fff", backgroundColor: "#3498db" }}>
                {tableHeaders.map((header, index) => (
                  <TableCell key={index}>{header}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {boqData.map((data) => (
                <TableRow key={data._id}>
              <TableCell>{data.materialId.material}</TableCell>
                      <TableCell>{data.materialId.unit}</TableCell>
                  <TableCell>{data.quantity}</TableCell>
                  <TableCell>{formatCurrency(data.materialId.rate)}</TableCell>
                  <TableCell>{formatCurrency(data.quantity * data.materialId.rate)}</TableCell>
                  
                  
                </TableRow>
              ))}
              <TableRow style={{ borderBlock: "2px solid #333" }} >
              <TableCell sx={{fontWeight:`bold`}} >Total Amount:</TableCell>
                <TableCell/>
                <TableCell/>
                <TableCell/>
                <TableCell sx={{fontWeight:`bold`}}>
                  {totalAmount} Tsh
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

       
      </Box>
    </Box>
  );
}

export default ReadBoq;
