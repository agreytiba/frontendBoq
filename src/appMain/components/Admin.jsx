import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import NavigationBar from "../../scenes/global/Sidebar";
import AdminRoutes from "../../Router/AdminRouter";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
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
  return (
    <Container>
      <Grid container>
        <Grid item md={3}>
          <NavigationBar />
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
