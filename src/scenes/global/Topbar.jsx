import { Box, IconButton, useTheme,Typography,Mem} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import { Link, useNavigate } from "react-router-dom";
import Profile from "../../components/Profile";
import { useState } from "react";

const Topbar = () => {
  // useState to show the profile
  const[showProfile, setShowProfile] = useState(false)
  // colors themes
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  // initialize useNavigation
  const navigate = useNavigate()
  // get user from local storage
const user = JSON.parse(sessionStorage.getItem('user'));

  return (
    <Box display="flex" justifyContent="space-between" justifyItems={`center`} m={0}  boxShadow={`0 3px 12px rgba(0,0,0,0.3)`} position={`sticky`} top={`0px`} zIndex={`99`} backgroundColor={`#fff`}>
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
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        {/* <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton> */}
      </Box>

      {/* ICONS */}
      {user ?
         <Box display="flex" textAlign={`center`}>
    
        {/* <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton> */}
        <IconButton onClick={()=>setShowProfile(!showProfile) }>
            <PersonOutlinedIcon  />
        </IconButton>
        </Box> :
        <Box display="flex" columnGap="15px" p={`20px`}>
          <Link to={"/"} style={{textDecoration:"none", color:"#222"}}>
        <Typography variant="h5" textAlign="center">
							Home
            </Typography>
          </Link>
          <Link to={"/about"} style={{textDecoration:"none", color:"#222"}}>
        <Typography variant="h5" textAlign="center">
							About us
            </Typography>
          </Link>
          <Link to={"/contact"} style={{textDecoration:"none", color:"#222"}}>
        <Typography variant="h5" textAlign="center">
							Contact
            </Typography>
          </Link>
          <Link to={"/login"} style={{textDecoration:"none", color:"#222"}}>
        <Typography variant="h5" textAlign="center">
							Login
            </Typography>
          </Link>
          <Link to={"/register"} style={{textDecoration:"none", color:"#222"}}>
            <Typography variant="h5" textAlign="center">
							Jisajiri
						</Typography>

          </Link>
       
        </Box>}
      {/* { showProfile &&
      <Box position="absolute" top="60px" right="0"  zIndex="999">
          <Profile setShowProfile={setShowProfile} />
        </Box>
      } */}
    </Box>
  );
};

export default Topbar;
