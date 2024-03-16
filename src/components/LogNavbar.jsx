import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link, useNavigate } from "react-router-dom"; // Import Link from React Router (or use appropriate routing library)
import { useDispatch, useSelector } from "react-redux"; // Import Link from React Router (or use appropriate routing library)
import { logout } from "../redux/auth/authSlice";
import { Home } from "@mui/icons-material";

function LogNavbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  // initailize use dispatch and use navigate
  const navigate = useNavigate()
  const dispatch = useDispatch()
   const user = JSON.parse(sessionStorage.getItem('user'));
  // get the  user from   react redux state

  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  // handle show profile
  const handleProfile = () => {
    handleCloseUserMenu()
    handleCloseNavMenu()
    navigate("/profile")
 
  }
  // handle logout user function
  const handleLogoutUser = () => {
    handleCloseUserMenu()
    dispatch(logout())
    navigate("/")
  }
  return (
    <AppBar position="static" style={{backgroundColor:`#fff`,boxShadow:`0 4px 14px rgba(0,0,0,0.3)`,margin:`10px 0`, paddingInline:`10px`}}>
      <Toolbar disableGutters>
                  
          <Typography
            variant="h6"
            noWrap
            component={Link} // Use Link component for the logo
            to="/" // Define the logo link
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: '#000',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
  
            
              
   <Typography color={"#000" }  component={Link} // Use Link component for the logo
          to="/"
          sx={{
              ml:5,
              fontFamily: 'monospace',
              fontWeight: 600,
              color: '#000',
              textDecoration: 'none',
            }}
        ><Home/></Typography>
              

        <Box >
      
        </Box>
      
        <Typography
          variant="h5"
          noWrap
          component={Link} // Use Link component for the logo
          to="/" // Define the logo link
          sx={{
            mr: 2,
            display: { xs: "flex", md: "none" },
            flexGrow: 1,
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".3rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          LOGO
        </Typography>
          <Box
            sx={{ flexGrow: 0 }}
            position={`absolute`}
            right={`15px`}
          >
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px", marginLeft: "20px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
            
                <MenuItem  onClick={handleProfile}>
                  <Typography textAlign="center" >profile</Typography>
                </MenuItem>
            <MenuItem onClick={handleLogoutUser}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
    
            </Menu>
          </Box>
   

      </Toolbar>
    </AppBar>
  );
}
export default LogNavbar;
