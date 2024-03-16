import React from "react";
import { Grid, Container, Box, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import NavigationBar from "../../scenes/global/Sidebar";
import BoqRoutes from "../../Router/boqRouter";
import { AppBar, Toolbar, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import LogNavbar from "../../components/LogNavbar";
import BoqSideBar from "../../components/boqComponents/BoqSideBar";

const BoqUser = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/", "/boq"]; // Add the routes where you want to hide the sidebar

  const isSidebarVisible = !hideSidebarRoutes.includes(location.pathname);

  return (
    <Container>
      <Grid container>
        {isSidebarVisible && (
          <Grid item md={3}>
            <BoqSideBar />
          </Grid>
        )}
        <Grid item md={isSidebarVisible ? 9 : 12}>
          <LogNavbar />
          <Box sx={{ margin: `100px 10px 10px 10px` }}>
            <BoqRoutes />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BoqUser;
