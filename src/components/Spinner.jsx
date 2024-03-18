import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
  return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"  backgroundColor="rgba(0,0,0,0.41)">
       <Box width="100px" color={`#3498db`}>
              <CircularProgress />
        </Box>
    </Box>
  )
}

export default Spinner