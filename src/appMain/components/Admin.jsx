import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import NavigationBar from "../../scenes/global/Sidebar";
import AdminRoutes from "../../Router/AdminRouter";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import DoneIcon from '@mui/icons-material/Done';
import MailIcon from '@mui/icons-material/Mail';
import UserIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import Request from '@mui/icons-material/Receipt';
import { Book, Padding, Person2TwoTone, Person3Rounded, ScubaDiving } from '@mui/icons-material';

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <AppBar position="fixed" sx={{ backgroundColor: `#fff`, width: `100%` }}>
      <Toolbar>
        <Box
          color={`#000`}
          sx={{
            fontFamily: "monospace",
          
              textDecoration: "none",
          }}
          component={Link} // Use Link component for the logo
          to="/"
        >
          <img  src="image/logo.png" style={{width:`80px`,height:`80px`}}/>
        </Box>
        <Avatar
          sx={{ marginLeft: "auto" }}
          alt="User Avatar"
          src=""
          onClick={() => {
            navigate("/Profile");
          }}
        />
      </Toolbar>
    </AppBar>
  );
};

const Admin = () => {

   const navigationItems = [
    { path: '/dashboard', icon: <HomeIcon />, text: 'Home' },
    {
      text: 'Watumiaji',
      icon: <Person2TwoTone/>,
      children: [
        { path: '/mteja', text: 'wateja' },
        { path: '/pangaramani', text: 'Panga Ramani' },
        { path: '/vipimo', text: 'angalia vipimo' },
        { path: '/suggestion', text: 'maboresho' },
        { path: '/mtoahuduma', text: 'watoa huduma' },
      ],
    },
    {
      text: 'Ramani',
      icon: <Book />,
      children: [
        { path: '/allpdf', text: 'pdfs' },
        { path: '/maps', text: 'ramani zote' },
        { path: '/failed', text: 'zilizofail' },
        { path: '/passed', text: 'Zilizofanikiwa' },
      ],
    },
    { path: '/bidhaa', icon: <Request />, text: 'Bidhaa' },
    // { path: '/completedboq', icon: <DoneIcon/>, text: 'zilizokamilika' },
    { path: '/boq', icon: <Padding />, text: 'Boq' },
    { path: '/users', icon: <Person3Rounded />, text: 'Users' },
    { path: '/blog', icon: <MailIcon/>, text: 'Blog' },
  ];
  return (
    <Container>
      <Grid container>
        <Grid item md={3}>
          <NavigationBar  navigationItems={navigationItems}/>
        </Grid>
        <Grid item md={9}>
          <Navbar />
          <Box sx={{ margin: `100px 10px 10px 10px` }}>
            <AdminRoutes/>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
