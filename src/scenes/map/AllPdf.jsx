import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import { saveAs } from 'file-saver';
import { Typography,Box,List,ListItem,ListItemText, ListItemButton } from '@mui/material';
import PopupForm from '../../components/CommentForm';

const AllPdf = () => {
  // ... (existing code)

  const [allPDFs, setAllPDFs] = useState([]);

  useEffect(() => {
    fetchAllPDFs();
  }, []);

  const fetchAllPDFs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/upload-pdf');
      setAllPDFs(response.data);
    } catch (error) {
      console.error('Error fetching all PDFs:', error);
      alert('Failed to fetch all PDFs.');
    }
    };
  //     const handleDownload = async (pdfId) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5000/get-pdf/${pdfId}`, {
  //       responseType: 'blob',
  //     });
  //     const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
  //     saveAs(pdfBlob, `${pdfId}.pdf`);
  //   } catch (error) {
  //     console.error('Error downloading PDF:', error);
  //     alert('Failed to download the PDF.');
  //   }
  // };
  // ... (existing imports)



  const handleDownload = async (pdfId) => {
    try {
      // Fetch the PDF file data
      const response = await axios.get(`http://localhost:5000/get-pdf/${pdfId}`, {
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



  return (
    <Box display="flex" justifyContent="center" alignItems="center" my="3rem">
    
      {allPDFs.length > 0 && (
        <Box>
          <Typography variant='h3' textAlign="center">ALL MAPS</Typography>
          <List>
            {allPDFs.map((pdf, index) => (
              <ListItem key={index}>
                <ListItemText primary={pdf.filename}/>
                <Button
                  variant="contained"
                  color="firstColor"
                  onClick={() => handleDownload(pdf._id)}
                  style={{marginLeft:"1em"}}
                >
                  View & Download
                </Button>
              </ListItem>
            ))}
          </List>

        </Box>
      )}
      <PopupForm/>
    </Box>
  );
};

export default AllPdf;
