import React from 'react'
import { Box,Button,List, ListItem, ListItemText ,Typography} from '@mui/material'
import {  Upload } from '@mui/icons-material';
import { logout } from '../redux/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Profile = ({setShowProfile}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
     // handle logout user from the system
  const handleLogout = () => {
    dispatch(logout())
    setShowProfile(false)
    navigate("/")
    window.location.reload()
  }
  

  // get user from local 
const user = JSON.parse(sessionStorage.getItem('user'));
  return (
    <Box p="10px"display="flex" justifyContent="flex-end" minHeight="100vh" zIndex="999">
      <Box width="350px" backgroundColor='#3425a9' p="20px 10px">
        < Typography variant="h4" color="#eee" textAlign="center" my="10px" textTransform="uppercase">
          user profile
        </Typography>
       <Box display="flex" justifyContent="center" alignItems="center" my="10px">
                <img
                  alt="profile-user"
                  width="150px"
                  height="150px"
                  src={`../../assets/agrey.png`}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
          />
         
        </Box>
         <Box  ml="5px" display="flex" justifyContent="center"><Button style={{backgroundColor:"#ddd"}}><Upload/> Upload</Button></Box>
      <Box>
        <List>
          <ListItem >
            <ListItemText style={{color:"#fff"}} primary="username" />
            <ListItemText style={{color:"goldenrod", textAlign:"start"}} primary={`${user?.name}`} />
          </ListItem>
          <ListItem>
            <ListItemText style={{color:"#fff"}} primary="email" />
            <ListItemText style={{color:"goldenrod", textAlign:"start"}} primary={`${user?.email}`} />
          </ListItem>
          {/* <ListItem>
            <ListItemText style={{color:"#fff"}} primary="access level" />
            <ListItemText style={{color:"goldenrod",textAlign:"start" }} primary={`${user?.accessLevel}`}/>
          </ListItem> */}
        </List>
        </Box>
        <Box backgroundColor="red"color="#fff" width="60px" display="flex" justifyContent="flex-end"  alignItems="end">
          <Button onClick={handleLogout} style={{color:"#fff"}}>logout</Button>
         </Box>
      </Box>
    </Box>
  )
}

export default Profile


