import { useState } from "react";
import { Sidebar as ProSideBar, Menu, MenuItem,SubMenu } from "react-pro-sidebar";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { AirlineSeatFlat, Book, BookOnlineRounded, Logout, MapOutlined, MessageOutlined, MessageRounded, People, ProductionQuantityLimits, SupervisorAccountOutlined, WorkOff, WorkOutlined } from "@mui/icons-material";
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
    navigate("/")
    window.location.reload()
  }
  

  return (
    <Box
      sx={{

        "& .ps-sidebar-container": {
          background: `#edae00 !important`,
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
           color:`${colors.redAccent[100]}!important `
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
                  BOQ
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

        <SubMenu title="Watumiaji"  style={{color:"#333"}}  icon={<People />}>
        <Item
              title="wateja"
              to="/mteja"
              
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="panga ramani"
              to="/pangaramani"
               
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title=" angalia vipimo"
              to="/vipimo"
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="maboresho"
              to="suggestion"
             
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="mtoa huduma"
              to="/mtoahuduma"
            
              selected={selected}
              setSelected={setSelected}
              />
                      <Item
              title="watoahuduma"
              to="/watoahuduma"
              
              selected={selected}
              setSelected={setSelected}
            />
      </SubMenu>
       

          
              <Item
              title="bidhaa"
              to="/bidhaa"
               icon={<ProductionQuantityLimits/>}
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Oda"
              to="/orders"
               icon={<ProductionQuantityLimits/>}
              selected={selected}
              setSelected={setSelected}
            />
      
               
           <SubMenu title="Ramani"  style={{color:"#333"}}  icon={<MapOutlined/>}>
        <Item
              title="pdfs"
               to="/allpdf"
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="ramani zote"
              to="/maps" 
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title=" zilizofail"
              to="/failed"
              selected={selected}
              setSelected={setSelected}
            />
              <Item
              title="Zilizofanikiwa"
              to="passed"
             
              selected={selected}
              setSelected={setSelected}
            />
             
                     
      </SubMenu>
            {/* <Item
              title="Ramani"
              to="/allpdf"
               icon={<MapOutlined />}
              selected={selected}
              setSelected={setSelected}
            /> */}
         
              <Item
              title="BOQ"
              to="/boq"
               icon={<Book />}
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
              title="Blog"
               icon={<PersonOutlinedIcon />}
              to="/blog"
              selected={selected}
              setSelected={setSelected}
            />
       
         
              <MenuItem
      active={selected === logout}
      style={{
        color: colors.grey[100],
      }}
    
    icon={<Logout/>}
  onClick={handleLogout}

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
