import { useState } from "react";
import {
  Sidebar as ProSideBar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { People } from "@mui/icons-material";
import axios from "axios";
import {toast} from 'react-toastify'

import { useDispatch, useSelector } from "react-redux";

const Item = ({
  title,
  to,
  icon,
  selected,
  setSelected,
  state,
  setShowComponent,
  createSavedBoq,
  name,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[500],
      }}
      onClick={() => {
        setSelected(title);
        setShowComponent(state);
        createSavedBoq(name);
      }}
      icon={icon}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const BoqSideBar = ({ setShowComponent }) => {
  // initialize dispatch
  const dispatch = useDispatch();
 const user = JSON.parse(sessionStorage.getItem("user"));
 const config = {
	    headers: {
	      Authorization: `Bearer ${user?.token}`,
	    },
	  }
const createSavedBoq = async (name) => {
  const endpoints = {
    wall: "savedwalling",
    roof: "savedroofing",
    gyp: "savedgypsum",
    finish: "savedfinishing",
    tile: "savedtiles",
    pvc: "savedpvcs",
    electric: "savedelectrical",
    plaster: "savedplastering",
    blind: "savedblinding",
    strip: "savedStrips",
    foundwall: "savedwallfoundations",
    pad: "savedpads",
    beam: "savedBeams",
    concrete: "savedconcretes",
    blandout: "savedblandoutside",
    blandin: "savedblandinside",
    skimin: "savedskiminside",
    skimout: "savedskimoutside",
    grill: "savedgrills",
    panel: "savedpanels",
    frame: "savedframes",
    shutter:"savedshutters"
  };

  // if (!endpoints[name]) {
  //   toast.error("failed to create files");
  //   return;
  // }

  try {
    const mapData = JSON.parse(localStorage.getItem("mapData"));
    const mapId = mapData._id;
 
    const response = await axios.post(`https://backendboq.onrender.com/api/${endpoints[name]}`, { mapId },config);
    
    if (response.data) {
      const combinedData = {
        mapId,
        savedPreId: response.data._id,
      };
      localStorage.setItem("savedData", JSON.stringify(combinedData));
    }
  } catch (error) {
    console.error("Error creating saved pre:", error.response?.data);
  }
};

  // initializer navigation
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `${colors.blueAccent[400]} !important`,
          minHeight: `100vh !important`,
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[200]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
          color: `${colors.redAccent[100]}!important `,
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#fff !important",
        },
        "& .ps-menu-button": {
          color: `#000 !important`,
        },
        "& .ps-menu-button:hover": {
          background: `${colors.greenAccent[400]} !important`,
        },
        "& .ps-open": {
          background: `#eee !important`,
        },
      }}
    >
      <ProSideBar
        collapsed={isCollapsed}
        style={{ position: "fixed", left: "0px", top: "0px", bottom: "0" }}
      >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{ color: " #fff" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box>
            <Item
              title="PRELIMINARIES"
              state="pre"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
             createSavedBoq={createSavedBoq}
              name={"pre"} />
              
             <Typography  variant="h5"ml={"10px"}>SUBSTRUCTURE</Typography>
            <SubMenu title="Substructure"  style={{color:"#333", backgroundColor:"#fff"}}>
        <Item
              title="Blinding"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"blind"}
               createSavedBoq={createSavedBoq}
              name={"blind"}
            />
              <Item
                 title="Strip foundation"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"strip"}
               createSavedBoq={createSavedBoq}
              name={"strip"}
            />
              <Item
                title="Pad Foundation"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"pad"}
               createSavedBoq={createSavedBoq}
              name={"pad"}
            />
              <Item
              title="Foundation Wall"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"foundwall"}
               createSavedBoq={createSavedBoq}
              name={"foundwall"}
            />
              <Item
                 title="Ground Beam"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"beam"}
               createSavedBoq={createSavedBoq}
              name={"beam"}
              />
              <Item
                
              title="Site Concrete"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"concrete"}
               createSavedBoq={createSavedBoq}
              name={"concrete"}
            />
      </SubMenu>

            <Item
              title="WALLING"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"walling"}
              createSavedBoq={createSavedBoq}
              name={"wall"}
            />
            <Item
              title="ROOFING"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"roofing"}
               createSavedBoq={createSavedBoq}
              name={"roof"}
            />

            <Typography  variant="h5"ml={"10px"}>BLANDERING</Typography>
        <SubMenu title="Blandering"  style={{color:"#333", backgroundColor:"#fff"}}>
        <Item
              title="Blandering Inside"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"blandin"}
               createSavedBoq={createSavedBoq}
              name={"blandin"}
            />
              <Item
                 title="Blandering Outside"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"blandout"}
               createSavedBoq={createSavedBoq}
              name={"blandout"}
            />
           
             
        
      </SubMenu>
            <Item
              title="GYPSUM CEILING"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"gypsum"}
               createSavedBoq={createSavedBoq}
              name={"gyp"}
            />
            <Item
              title="PVC OVERHANG"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"pvc"}
               createSavedBoq={createSavedBoq}
              name={"pvc"}
            />
       
               <Typography  variant="h5"ml={"10px"}>WALL SKIMMING</Typography>
                   <SubMenu title="Wall skimming"  style={{color:"#333", backgroundColor:"#fff"}}>
        <Item
              title="Wall Skimming Inside"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"skimin"}
               createSavedBoq={createSavedBoq}
              name={"skimin"}
            />
              <Item
                 title="Wall Skimming Outside"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"skimout"}
               createSavedBoq={createSavedBoq}
              name={"skimout"}
            />
           
             
        
      </SubMenu>
            <Item
              title="FINISHING PAINT"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"finishing"}
               createSavedBoq={createSavedBoq}
              name={"finish"}
            />

        

               <Typography  variant="h5"ml={"10px"}>WINDOWS</Typography>
                   <SubMenu title="Blandering"  style={{color:"#333", backgroundColor:"#fff"}}>
        <Item
              title="Window Grills"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"grill"}
               createSavedBoq={createSavedBoq}
              name={"grill"}
            />
              <Item
                 title="Aluminium Panels"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"panel"}
               createSavedBoq={createSavedBoq}
              name={"panel"}
            />
           
             
        
      </SubMenu>
        
               <Typography  variant="h5"ml={"10px"}>DOORS</Typography>
                   <SubMenu title="Blandering"  style={{color:"#333", backgroundColor:"#fff"}}>
        <Item
              title="Door Frames"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"frame"}
               createSavedBoq={createSavedBoq}
              name={"frame"}
            />
              <Item
                 title="Door Shutters"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"shutter"}
               createSavedBoq={createSavedBoq}
              name={"shutter"}
            />
           
             
        
      </SubMenu>
            <Item
              title="PLUMBING"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"plumbing"}
               createSavedBoq={createSavedBoq}
              name={"plumb"}
            />
            <Item
              title="TILES"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"tiles"}
               createSavedBoq={createSavedBoq}
              name={"tile"}
            />
            <Item
              title="PLASTERING"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"plastering"}
               createSavedBoq={createSavedBoq}
              name={"plaster"}
            />
            <Item
              title="ELECTRICAL"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"electrical"}
               createSavedBoq={createSavedBoq}
              name={"electric"}
            />
          </Box>
        </Menu>
      </ProSideBar>
    </Box>
  );
};

export default BoqSideBar;
