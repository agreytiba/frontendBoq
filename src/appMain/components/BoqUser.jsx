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
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import DoneIcon from "@mui/icons-material/Done";
import MailIcon from "@mui/icons-material/Mail";
import UserIcon from "@mui/icons-material/People";
import LogoutIcon from "@mui/icons-material/Logout";
import Request from "@mui/icons-material/Receipt";
import { Balance, Build, Colorize, DoorFront, ElectricMeter, Foundation, FoundationOutlined, FoundationSharp, House, RoofingSharp, RoofingTwoTone, SixK, Water, Window } from "@mui/icons-material";
const BoqUser = () => {
  const location = useLocation();
  const hideSidebarRoutes = ["/", "/boq", "/login"]; // Add the routes where you want to hide the sidebar

  const isSidebarVisible = !hideSidebarRoutes.includes(location.pathname);
 const navigationItems = [
    {
      path: "/pre",
      icon: <HomeIcon />,
      text: "Preliminaries",
      name: "savedpres",
    },

    {
      text: "Substructure",
      icon: <FoundationOutlined />,
      children: [
        { path: "/blinding", text: "blinding", name: "savedblinding" },
        { path: "/strip", text: "Strip Foundation", name: "savedStrips" },
        { path: "/pad", text: "Pad Foundation", name: "savedpads" },
        {
          path: "/wallFound",
          text: "Wall Foundation",
          name: "savedwallfoundations",
        },
        { path: "/wallbeam", text: "Ground Beam", name: "savedBeams" },
        {
          path: "/concrete",
          text: "Over site Concrete",
          name: "savedconcretes",
        },
      ],
    },
    {
      path: "/walling",
      icon: <Foundation />,
      text: "Walling",
      name: "savedwalling",
    },

    {
      path: "/roofing",
      icon: <RoofingSharp />,
      text: "Roofing",
      name: "savedroofing",
    },

    // { path: '/blandering', icon: <HomeIcon />, text: 'Blandering' },

    {
      text: "Blandering",
      icon: <FoundationSharp/>,
      children: [
        {
          path: "/blandeOut",
          text: "Blandering out",
          name: "savedblandoutside",
        },
        { path: "/blandeIn", text: "Blandering In", name: "savedblandinside" },
      ],
    },
    {
      path: "/ceiling",
      icon: <RoofingTwoTone/>,
      text: "Gysum Ceiling",
      name: "savedgypsum",
    },
    { path: "/pvcHang", icon: <InboxIcon />, text: "Pvc", name: "savedpvcs" },
    {
      text: "Skimming",
      icon: <FoundationOutlined />,
      children: [
        {
          path: "/skimInside",
          text: "Skimming Inside",
          name: "savedskiminside",
        },
        {
          path: "/skimOutside",
          text: "Skimming Outside",
          name: "savedskimoutside",
        },
      ],
    },
    {
      path: "/finishing",
      icon: <House/>,
      text: "Finishing",
      name: "savedfinishing",
    },
    {
      text: "Windows",
      icon: <Window />,
      children: [
        { path: "/windowGrill", text: "Window Grills", name: "savedgrills" },
        { path: "/panel", text: "Aluminium Panel", name: "savedpanels" },
      ],
    },

    {
      text: "Doors",
      icon: <DoorFront />,
      children: [
        { path: "/doorFrame", text: "Door Frames", name: "savedframes" },
        { path: "/doorShut", text: "Door Shutters", name: "savedshutters" },
      ],
    },
    {
      text: "Plumbing",
      icon: <Water />,
      children: [
        { path: "/waterInside", text: "Water Inside", name: "savedwaterIn" },
        { path: "/waterOutside", text: "Water Outside", name: "savedwaterOut" },
        { path: "/sewage", text: "Sewage Inside", name: "savedsewageIn" },
        {
          path: "/finishInside",
          text: "Finishing Inside",
          name: "savedfinishIn",
        },
        { path: "/septic", text: "Septic Tank", name: "savedseptic" },
      ],
    },
    // { path: "/Plumbing", icon: <DoneIcon />, text: "Plumbing", name: "savedtiles" },
    { path: "/tiles", icon: <Foundation/>, text: "Tiles", name: "savedtiles" },
    {
      path: "/plastering",
      icon: <Colorize />,
      text: "Plastering",
      name: "savedplastering",
    },
    {
      path: "/electrical",
      icon: <ElectricMeter />,
      text: "Electrical",
      name: "savedelectrical",
    },
  ];
  return (
    <Container>
      <Box>
        <LogNavbar /></Box>
      <Grid container>
        {isSidebarVisible && (
          <Grid item md={3}>
            <BoqSideBar navigationItems={navigationItems} />
          </Grid>
        )}
        <Grid item md={isSidebarVisible ? 9 : 12}>
          <Box sx={{ margin: `10px` }}>
            <BoqRoutes />
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BoqUser;
