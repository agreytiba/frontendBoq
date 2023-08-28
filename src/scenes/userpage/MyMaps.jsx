
import { useLocation } from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Paper, List, ListItem, ListItemText, Button, Typography } from '@mui/material';
import { saveAs } from 'file-saver';
function PDFFetcher() {
  const [pdfs, setPdfs] = useState([]);
  const location = useLocation()
  const {mapIds}  = location.state

  useEffect(() => {
    async function fetchPDFs() {
      const pdfDataPromises = mapIds.map((id) =>
        axios.get(`https://backendboq.onrender.com/upload-pdf?pdfId=${id}`)
      );

      try {
        const pdfDataResponses = await Promise.all(pdfDataPromises);
        const pdfData = pdfDataResponses.map((response) => response.data);
        setPdfs(pdfData);
      } catch (error) {
        console.error('Error fetching PDFs:', error);
      }
    }

    if (mapIds.length > 0) {
      fetchPDFs();
    }
  }, []);

  //  download pdf
const handleView = async (pdfId) => {
    try {
      // Fetch the PDF file data
      const response = await axios.get(`https://backendboq.onrender.com/get-pdf/${pdfId}`, {
        responseType: 'blob',
      });

      // Create a Blob from the response data
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' });

      // Get the URL of the Blob
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open the PDF in a new tab or window
      window.open(pdfUrl, '_blank');

      // Clean up the URL object after opening the new tab/window
      URL.revokeObjectURL(pdfUrl);
    } catch (error) {
      console.error('Error downloading PDF:', error);
      alert('Failed to download the PDF.');
    }
  };
// handle download
  
  const handleDownload = (pdfId, filename) => {
    axios
      .get(`https://backendboq.onrender.com/get-pdf/${pdfId}`, { responseType: 'blob' })
      .then((response) => {
        const blob = new Blob([response.data], { type: 'application/pdf' });
        saveAs(blob, filename);
      })
      .catch((error) => {
        console.error('Error downloading PDF:', error);
      });
  };
  
  return (
    <Container >
      <Paper elevation={3} style={{ padding: '16px', marginTop:"20px" }}>
        <Typography variant='h2' textAlign={'center'}>
      Ramani ulizotuma
        </Typography>
     
        {pdfs.length > 0 ? (
          <List>
            {pdfs.map((pdf, index) => (
              <ListItem key={pdf._id}>
                <ListItemText primary={pdf.filename} />
                <Button variant="contained" color="primary"sx={{marginRight:"10px"}} onClick={()=>handleView(pdf._id)}>
                  View Document
                </Button>
                <Button variant="contained" color="secondary" onClick={()=>handleDownload(pdf._id)}>
                  Download
                </Button>
              </ListItem>
            ))}
          </List>
        ) : (
          <p>No PDFs available.</p>
        )}
        				<Button onClick={()=>window.history.back()} variant='contained' color="primary">back</Button>
      </Paper>
    </Container>
  );
}

export default PDFFetcher;
