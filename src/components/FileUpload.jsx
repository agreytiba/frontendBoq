// FileUpload.js
import React, { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import {   Cloudinary as CloudinaryContext, Image, Transformation } from '@cloudinary/react';
import cloudinary from '../cloudinary/cloudinaryConfig';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileSelect = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    cloudinary.uploader.upload(formData).then((result) => {
      setUploadedFile(result.secure_url);
    });
  };

  return (
    <Box>
      <Typography variant="h6">Upload PDF</Typography>
      <input type="file" onChange={handleFileSelect} />
      <Button variant="contained" color="primary" onClick={handleFileUpload}>
        Upload
      </Button>
      {uploadedFile && (
        <Box mt={2}>
          <Typography variant="subtitle1">Uploaded File:</Typography>
          <CloudinaryContext cloudName={cloudinary.config().cloud_name}>
            <Image publicId={uploadedFile} secure="true" width="300">
              <Transformation width="300" crop="scale" />
            </Image>
          </CloudinaryContext>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
