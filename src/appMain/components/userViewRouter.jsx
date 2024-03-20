import { Container, Box, Grid } from "@mui/material"
import LogNavbar from "../../components/LogNavbar"
import MyBoqRoutes from "../../Router/MyBoqRouter"
import BoqSideBar from "../../components/boqComponents/BoqSideBar"

import React from 'react'
import UserPage from "../../scenes/userpage"
import UserSideBar from "../../components/user/UserSideBar"

const UserViewRouter = () => {
  return (
   <Container>
    
      <Grid container> 
          <Grid item md={3}>
            <UserSideBar/>
          </Grid>
        <Grid >
          <Box sx={{ margin: `10px` }}>
       <MyBoqRoutes/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  )
}

export default UserViewRouter
