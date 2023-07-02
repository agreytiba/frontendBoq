import { useState } from "react";
import { Sidebar as ProSideBar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { AirlineSeatFlat, BookOnlineRounded, Logout, MessageOutlined, MessageRounded, SupervisorAccountOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/authSlice";

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
   // initialize dispatch
  const dispatch = useDispatch()

  // initializer navigation
  const navigate = useNavigate()
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  // handle logout user from the system
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
    window.location.reload()
  }

  

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
      <ProSideBar collapsed={isCollapsed} style={{   position: "fixed",
              left:"0px", top:"0px"}}>
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
              to="/"
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
              title="Todo"
              to="/todos"
               icon={<MessageOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
         
         
              <MenuItem
      active={selected === logout}
      style={{
        color: colors.grey[100],
      }}
      onClick={handleLogout}
    icon={<Logout/>}
  
    >
      <Typography>logout</Typography>
     
    </MenuItem>
          </Box>
        </Menu>
      </ProSideBar>
    </Box>
  );
};

export default Sidebar;
