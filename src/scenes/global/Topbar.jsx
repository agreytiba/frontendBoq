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
    <Box display="flex" justifyContent="space-between" p={2} boxShadow="10px 0px 8px #555" position="relative" backgroundColor="#edae00">
     BOQ BURE
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
         <Box display="flex">
    
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={()=>setShowProfile(!showProfile) }>
            <PersonOutlinedIcon  />
        </IconButton>
        </Box> :
        <Box display="flex" columnGap="15px">
          <Link to={"/"} style={{textDecoration:"none", color:"#222"}}>
        <Typography variant="h5" textAlign="center">
							Home
            </Typography>
          </Link>
          <Link to={"/about"} style={{textDecoration:"none", color:"#222"}}>
        <Typography variant="h5" textAlign="center">
							about us
            </Typography>
          </Link>
          <Link to={"/contact"} style={{textDecoration:"none", color:"#222"}}>
        <Typography variant="h5" textAlign="center">
							contact
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
      { showProfile &&
      <Box position="absolute" top="60px" right="0"  zIndex="999">
          <Profile />
        </Box>
      }
    </Box>
  );
};

export default Topbar;
