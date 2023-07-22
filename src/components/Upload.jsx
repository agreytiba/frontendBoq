import React, { useContext, useState } from 'react';
import { Button, Container, Grid } from '@mui/material';
import { Document, Page, pdfjs } from 'react-pdf';
import { saveAs } from 'file-saver';
import { AppContext } from '../useContextApi/AppContext';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Upload = () => {
  const [numPages, setNumPages] = useState(null);

  // get  useState from context api
  const {file,setFile} = useContext(AppContext)
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleFileUpload = () => {
    const fileReader = new FileReader();

    fileReader.onloadend = () => {
      const buffer = new Uint8Array(fileReader.result);
      const blob = new Blob([buffer], { type: 'application/pdf' });
      saveAs(blob, 'uploaded_pdf.pdf');
    };

    fileReader.readAsArrayBuffer(file);
   
  };

  const handlePdfLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="secondary"
            disabled={!file}
            onClick={handleFileUpload}
          >
            Upload PDF
          </Button>
        
        </Grid>
        {file && (
          <Grid item xs={12}>
            <Document
              file={file}
              onLoadSuccess={handlePdfLoadSuccess}
              style={{height:"400px" , width:"400px"}}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Upload;
