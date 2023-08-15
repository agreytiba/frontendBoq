import React from 'react'
import FileUpload from '../../components/FilesUpload'
import {Box} from '@mui/material'
import UploadImage from '../../components/UploadImage'
const Upload = () => {
  return (
      <Box  display="flex" justifyContent="center" flexDirection="column" alignItems="center" minHeight="100vh">
          <Box>
              <FileUpload/>
      </Box>
     
          <Box mt="100px">
              <UploadImage/>
          </Box>
    </Box>
  )
}

export default Upload