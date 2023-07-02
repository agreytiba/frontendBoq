import { Box, CircularProgress } from '@mui/material'
import React from 'react'

const Spinner = () => {
  return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh"  backgroundColor="#999">
       <Box width="100px">
              <CircularProgress />
        </Box>
    </Box>
  )
}

export default Spinner