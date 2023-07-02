import React from 'react'
import { Box,List, ListItem, ListItemText } from '@mui/material'
import Header from '../../components/Header'
const profile = () => {

  // get user from local 
const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Box m="20px">
       <Header
        title="User Profile"
        subtitle=" user information"
      />

      <Box>
        <List>
          <ListItem>
            <ListItemText style={{color:"firstColor"}} primary="username" />
            <ListItemText primary={`${user?.name}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="email" />
            <ListItemText primary={`${user?.email}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary="access level" />
            <ListItemText primary={`${user?.accessLevel}`}/>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default profile


