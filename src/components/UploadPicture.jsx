import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dropzone from 'react-dropzone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  dropzone: {
    width: 150,
    height: 150,
    border: '2px dashed gray',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  avatar: {
    width: 150,
    height: 150,
  },
}));

const ProfilePictureUpload = () => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setSelectedFile(URL.createObjectURL(file));
  };

  return (
    <div className={classes.root}>
      <Dropzone onDrop={handleFileDrop}>
        {({ getRootProps, getInputProps }) => (
          <div {...getRootProps()} className={classes.dropzone}>
            <input {...getInputProps()} />
            {selectedFile ? (
              <Avatar alt="Profile Picture" src={selectedFile} className={classes.avatar} />
            ) : (
              <CloudUploadIcon fontSize="large" />
            )}
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default ProfilePictureUpload;
