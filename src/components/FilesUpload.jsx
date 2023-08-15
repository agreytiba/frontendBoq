import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [filename, setFilename] = useState(null);

  const handleFileChange = (event) => {
    setFilename(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('pdf', filename);
     const res = await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
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
