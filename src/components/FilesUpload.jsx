import React, { useState } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../confing.js/baseUrl';

const FileUpload = () => {
  const [filename, setFilename] = useState(null);

  const handleFileChange = (event) => {
    setFilename(event.target.files[0]);
  };
    //  get user from session store
  const user = JSON.parse(sessionStorage.getItem("user"));


     const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('pdf', filename);
     const res = await axios.post(API_BASE_URL + '/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
       },
      
      }, config);
      alert('File uploaded successfully');
      console.log(res.data)
    } catch (error) {
      console.error('Error uploading the file', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
