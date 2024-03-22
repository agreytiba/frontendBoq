import { Container, Box, Grid } from "@mui/material"
import LogNavbar from "../../components/LogNavbar"
import MyBoqRoutes from "../../Router/MyBoqRouter"
import BoqSideBar from "../../components/boqComponents/BoqSideBar"

import React from 'react'
import UserPage from "../../scenes/userpage"
import UserSideBar from "../../components/user/UserSideBar"
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import DoneIcon from "@mui/icons-material/Done";
import MailIcon from "@mui/icons-material/Mail";
import UserIcon from "@mui/icons-material/People";
import Request from "@mui/icons-material/Receipt";

const UserViewRouter = () => {

   const navigationItems = [
    { path: "/", icon: <HomeIcon />, text: "Preliminaries", name:"savedpres" },

    {
      text: "Substructure",
      icon: <MailIcon />,
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
      icon: <HomeIcon />,
      text: "Walling",
      name: "savedwalling",
    },

    {
      path: "/roofing",
      icon: <HomeIcon />,
      text: "Roofing",
      name: "savedroofing",
    },

    // { path: '/blandering', icon: <HomeIcon />, text: 'Blandering' },

    {
      text: "Blandering",
      icon: <MailIcon />,
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
      icon: <Request />,
      text: "Gysum Ceiling",
      name: "savedgypsum",
    },
    { path: "/pvcHang", icon: <InboxIcon />, text: "Pvc", name: "savedpvcs" },
    {
      text: "Skimming",
      icon: <MailIcon />,
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
      icon: <InboxIcon />,
      text: "Finishing",
      name: "savedfinishing",
    },
    {
      text: "Windows",
      icon: <MailIcon />,
      children: [
        { path: "/windowGrill", text: "Window Grills", name: "savedgrills" },
        { path: "/panel", text: "Aluminium Panel", name: "savedpanels" },
      ],
    },
 
    {
      text: "Doors",
      icon: <MailIcon />,
      children: [
        { path: "/doorFrame", text: "Door Frames", name: "savedframes" },
        { path: "/doorShut", text: "Door Shutters", name: "savedshutters" },
      ],
    },
       {
      text: "Plumbing",
      icon: <MailIcon />,
      children: [
        { path: "/waterInside", text: "Water Inside", name: "savedwaterIn" },
        { path: "/waterOutside", text: "Water Outside", name: "savedwaterOut" },
        { path: "/sewage", text: "Sewage Inside", name: "savedsewageIn" },
        { path: "/finishInside", text: "Finishing Inside", name: "savedfinishIn" },
        { path: "/septic", text: "Septic Tank", name: "savedseptic" },
      ],
    },
    // { path: "/Plumbing", icon: <DoneIcon />, text: "Plumbing", name: "savedtiles" },
    { path: "/tiles", icon: <MailIcon />, text: "Tiles", name: "savedtiles" },
    {
      path: "/plastering",
      icon: <MailIcon />,
      text: "Plastering",
      name: "savedplastering",
    },
    {
      path: "/electrical",
      icon: <MailIcon />,
      text: "Electrical",
      name: "savedelectrical",
    },
  ];
  return (
   <Container>
    
      <Grid container> 
          <Grid item md={3}>
            <UserSideBar navigationItems={navigationItems}/>
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
