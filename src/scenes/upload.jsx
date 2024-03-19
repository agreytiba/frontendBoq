import React, { useState } from 'react';
import { CloudinaryContext, Image } from 'cloudinary-react';
import axios from 'axios';

const CLOUDINARY_URL = 'https://api.cloudinary.com/v1_1/greyma/upload';
const UPLOAD_PRESET = 'uploads';

function Upload() {
  const [image, setImage] = useState(null);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
        setImage(response.data.secure_url);
        console.log(response.data.secure_url)
    } catch (error) {
      console.error('Error uploading image: ', error);
    }
  };

  const saveToCloudinary = () => {
    // You can perform additional actions here, like saving the URL to a database
    console.log('Image URL:', image);
  };

  return (
    <div>
      <h1>Upload Image to Cloudinary</h1>
      <input type="file" onChange={handleImageUpload} />
      <button onClick={saveToCloudinary}>Save to Cloudinary</button>
      {image && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={image} alt="Uploaded" />
        </div>
      )}
    </div>
  );
}

export default Upload;
