import React,{useContext} from 'react'
import { Box, Button, Typography } from '@mui/material'
import { AppContext } from '../../useContextApi/AppContext'
import { useNavigate } from 'react-router-dom'
const GoToBoQ = () => {
    const { setShowBoq } = useContext(AppContext)
    const navigate =useNavigate()
    const handleClick = () => {
        setShowBoq(true)
        navigate('/')
    }
  return (
      <Box display={`flex`} justifyContent={`center`} alignItems={`center`} mt={`200px`}>
      <Typography variant='h4'>
        Click here to navigate to create BOQ :   <Button variant='contained' color={`success`} sx={{ marginLeft: `10px`, width: `100px`, height: `40px` }} onClick={handleClick}>BoQ</Button>  
      </Typography>
    </Box>
  )
}

export default GoToBoQ