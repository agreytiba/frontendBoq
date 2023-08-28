import React, { useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';

const UploadImage = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

	const handleFileChange = (event) => {
		setSelectedFiles([ ...event.target.files ]);
	};

	const handleUpload = async () => {
		const formData = new FormData();
		selectedFiles.forEach((file) => {
			formData.append('pdf', file);
		});

		try {
			const res = await axios.post('https://backendboq.onrender.com/upload-pdf', formData, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			});
      console.log(res.data);
      const { maps } = res.data
       const arrayIds = []
      
      for (let i = 0,len=maps.length; i < len; i++) {
        const { _id } = maps[i];
        arrayIds.push(_id);
        
      }
      console.log(arrayIds)
			alert('PDFs uploaded successfully!');
		} catch (error) {
			console.error('Error uploading PDFs:', error);
			alert('Failed to upload PDFs.');
		}
	};

	return (
		<div>
			<input type="file" multiple onChange={handleFileChange} />
			<Button variant="contained" color="primary" onClick={handleUpload}>
				Upload
			</Button>
		</div>
	);
};

export default UploadImage;
