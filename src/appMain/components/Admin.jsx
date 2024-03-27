import React from "react";
import { Grid, Container, Box } from "@mui/material";
import NavigationBar from "../../scenes/global/Sidebar";
import AdminRoutes from "../../Router/AdminRouter";
import { AppBar, Toolbar, Avatar, Typography, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import DoneIcon from '@mui/icons-material/Done';
import MailIcon from '@mui/icons-material/Mail';
import UserIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import Request from '@mui/icons-material/Receipt';
// import Logo from './logo.png'; // Import your logo image

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: `#fff`, width: `100%` }}>
      <Toolbar>
        <Link to="/" style={{ textDecoration: "none" }}>
          {/* <img src={Logo} alt="Logo" style={{ width: `80px`, height: `80px` }} /> */}
        </Link>
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
  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <NavigationBar />
        </Grid>
        <Grid item xs={12} md={9}>
          <Navbar />
          <Box sx={{ margin: `100px 10px 10px 10px` }}>
            <AdminRoutes />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Admin;
