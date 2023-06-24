import { useState } from "react";
import { Sidebar as ProSideBar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { AirlineSeatFlat, BookOnlineRounded, MessageOutlined, MessageRounded, SupervisorAccountOutlined } from "@mui/icons-material";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
      component={ <Link to={to} />}
    >
      <Typography>{title}</Typography>
     
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{

        "& .ps-sidebar-container": {
          background: `#3425a9 !important`,
          minHeight: `100vh !important`,
          
        },
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
           color:`${colors.redAccent[100]}!important `
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#fff !important",
        },
        "& .ps-menu-button": {
           color: `#fff !important`,
        },
        "& .ps-menu-button:hover": {
           background: `${colors.greenAccent[400]} !important`,
        }
      }}
    >
      <ProSideBar collapsed={isCollapsed} >
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
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
                <Typography variant="h3" color="#fff" textTransform="uppercase">
                  At Hospital
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon  style={{color:" #fff"}}/>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
           
            
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Appointments"
              to="/appointments"
               icon={<BookOnlineRounded />}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="patients"
              to="/patients"
               icon={<AirlineSeatFlat />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Users"
               icon={<PersonOutlinedIcon />}
              to="/users"
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Doctors"
              to="/doctors"
               icon={<SupervisorAccountOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
          
            <Item
              title="messages"
              to="/user"
               icon={<MessageOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
         
            <Item
              title="login"
              to="/"
               icon={<MessageOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
         
            <Item
              title="Register"
              to="/register"
               icon={<MessageOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
         
           
          </Box>
        </Menu>
      </ProSideBar>
    </Box>
  );
};

export default Sidebar;
