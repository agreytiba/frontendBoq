// PdfGallery.js
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/x-data-grid';
import { CloudinaryContext, Image, Transformation } from '@cloudinary/react';
import cloudinary from './cloudinaryConfig';

const PdfGallery = () => {
  const [pdfFiles, setPdfFiles] = useState([]);

  useEffect(() => {
    cloudinary.api.resources_by_tag('pdf', (error, result) => {
      if (!error) {
        setPdfFiles(result.resources);
      }
    });
  }, []);

  return (
    <Box>
      <Typography variant="h6">Uploaded PDFs</Typography>
      <CloudinaryContext cloudName={cloudinary.config().cloud_name}>
        {pdfFiles.map((pdfFile) => (
          <Box key={pdfFile.public_id} mt={2}>
            <Image publicId={pdfFile.public_id} secure="true" width="300">
              <Transformation width="300" crop="scale" />
            </Image>
          </Box>
        ))}
      </CloudinaryContext>
    </Box>
  );
};

export default PdfGallery;
