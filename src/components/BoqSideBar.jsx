import { useState } from "react";
import {
  Sidebar as ProSideBar,
  Menu,
  MenuItem,
  SubMenu,
} from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

import { useDispatch, useSelector } from "react-redux";

const Item = ({ title, to, icon, selected, setSelected,state ,setShowComponent}) => {
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
        style={{ position: "fixed", left: "0px", top: "0px",bottom:"0" }}
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
            />

            <Item
              title="SUBSTRUCTURE"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"sub"}
            />

            <Item
              title="WALLING"
             
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"walling"}
              
            />
            <Item
              title="ROOFING"
            
              selected={selected}
              setSelected={setSelected}
               setShowComponent={setShowComponent}
              state={"roofing"}
            />
            <Item
              title="BLANDERING"
             
              selected={selected}
              setSelected={setSelected}
                setShowComponent={setShowComponent}
              state={"blandering"}
            />
            <Item
              title="GYPSUM CEILING"
            
              selected={selected}
              setSelected={setSelected}
                setShowComponent={setShowComponent}
              state={"gypsum"}
            />
            <Item
              title="PVC OVERHANG"
             
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"pvc"}
            />
            <Item
              title="WALL SKIMMING"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"skimming"}
            />
            <Item
              title="FINISHING PAINT"
              selected={selected}
              setSelected={setSelected}
               setShowComponent={setShowComponent}
              state={"finishing"}
            />
          
            <Item
              title="WINDOWS"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              state={"windows"}
            />
            <Item
              title="DOORS"
              selected={selected}
              setSelected={setSelected}
                setShowComponent={setShowComponent}
              state={"doors"}
            />
            <Item
              title="PLUMBING"
              selected={selected}
              setSelected={setSelected}
                setShowComponent={setShowComponent}
              state={"plumbing"}
            />
            <Item
              title="TILES"
              selected={selected}
              setSelected={setSelected}
                setShowComponent={setShowComponent}
              state={"tiles"}
            />
            <Item
              title="PLASTERING"
              selected={selected}
              setSelected={setSelected}
                setShowComponent={setShowComponent}
              state={"plastering"}
            />
            <Item
              title="ELECTRICAL"
              selected={selected}
              setSelected={setSelected}
                setShowComponent={setShowComponent}
              state={"electrical"}
            />
          </Box>
        </Menu>
      </ProSideBar>
    </Box>
  );
};

export default BoqSideBar;
