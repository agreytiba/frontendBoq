// import React, { useEffect, useState } from 'react';
// import { Box, Button, useMediaQuery, TableContainer, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
// import { DataGrid } from '@mui/x-data-grid';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useLocation } from 'react-router-dom';
// import jsPDF from 'jspdf';
// import 'jspdf-autotable';
// import { API_BASE_URL } from '../../confing.js/baseUrl';
// import { formatCurrency } from '../../utulities/formatCurrency';

// const Blinding = () => {
//   const [savedPres, setSavedPres] = useState([]);
//   const [openDialog, setOpenDialog] = useState(false);
//   const [selectedPreData, setSelectedPreData] = useState([]);
//   const location = useLocation();
//   const mapId = JSON.parse(localStorage.getItem("myMapId"));
//   const user = JSON.parse(sessionStorage.getItem("user"));
//   const config = {
//     headers: {
//       Authorization: `Bearer ${user?.token}`,
//     },
//   };

//   useEffect(() => {
//     const fetchSavedPres = async () => {
//       try {
//         const response = await axios.get(API_BASE_URL + '/api/savedblinding', config);
//         const filteredData = response.data.filter((item) => item.mapId === mapId);
//         setSavedPres(filteredData);
//         setSelectedPreData(filteredData[0]?.blindData || []);
//       } catch (error) {
//         toast.error(error);
//       }
//     };

//     fetchSavedPres();
//   }, []);

//   const totalAmountwithCurrency = selectedPreData.reduce((total, data) => total + data.quantity * data.materialId.rate, 0);
//   const totalAmount = formatCurrency(totalAmountwithCurrency);

//   const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));

//   const handleDownloadPDF = () => {
//     const doc = new jsPDF();
//     doc.text('Substructure blinding', 10, 10);

//     const tableData = selectedPreData.map(data => [
//       data.materialId.material,
//       data.materialId.unit,
//       data.materialId.rate,
//       data.quantity,
//       data.quantity * data.materialId.rate
//     ]);

//     doc.autoTable({
//       head: [['Material', 'Unit', 'Rate', 'Quantity', 'Amount']],
//       body: tableData,
//       startY: 20,
//     });

//     doc.text(`Total Amount: ${totalAmount}`, 10, doc.autoTable.previous.finalY + 10);

//     doc.save('blinding.pdf');
//   };

//   return (
//     <Box display="flex" justifyContent="center" alignItems="center">
//       <Box width={isSmallScreen ? "100%" : "600px"} boxShadow="0 4px 12px rgba(0,0,0,0.3)" padding="10px" borderRadius="10px">
//         <Typography align="center" variant="h3" marginY="10px">Blinding</Typography>
//         <TableContainer>
//           <Table>
//             <TableHead>
//               <TableRow style={{ textTransform: "uppercase", fontWeight: "700", color: "#fff", backgroundColor: "#3498db" }}>
//                 <TableCell>Material ID</TableCell>
//                 <TableCell>Unit</TableCell>
//                 <TableCell>Rate</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Amount</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {savedPres[0]?.blindData?.map((data) => (
//                 <TableRow key={data._id}>
//                   <TableCell>{data.materialId.material}</TableCell>
//                   <TableCell>{data.materialId.unit}</TableCell>
//                   <TableCell>{formatCurrency(data.materialId.rate)}</TableCell>
//                   <TableCell>{data.quantity}</TableCell>
//                   <TableCell>{formatCurrency(data.quantity * data.materialId.rate)}</TableCell>
//                 </TableRow>
//               ))}
//               <TableRow style={{ borderBlock: "5px solid #333", fontWeight: "bolder" }}>
//                 <TableCell colSpan={4} align="left" color="#333">Total Amount:</TableCell>
//                 <TableCell>
//                 {totalAmount}
//                 </TableCell>
//               </TableRow>
//             </TableBody>
//           </Table>
//         </TableContainer>
        
//         <Button onClick={handleDownloadPDF} color="primary">Download PDF</Button>
//       </Box>
//     </Box>
//   );
// }

// export default Blinding;
import React from 'react'
import ReadBoq from '../ReadBoq'

const blinding = () => {
  const tableHeaders = [
  'Material ID',
    'Unit',
    'Quantity',
     'Rate',
     'Amount'
]
  const infoData = {
    urlName: 'savedblinding',
    collectionName: 'blindData',
    Title: 'Blinding Boq',
    pdfTitle:'blindingBoq',
    tableHeaders
  }
  return (
 <ReadBoq infoData={infoData}/>
  )
}

export default blinding
