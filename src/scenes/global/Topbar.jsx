import { Box, IconButton, useTheme,Typography,Mem} from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  // initialize useNavigation
  const navigate = useNavigate()
  // get user from local storage
const user = JSON.parse(localStorage.getItem('user'));

  return (
    <Box display="flex" justifyContent="space-between" p={2} boxShadow="10px 0px 8px #555">
      {/* SEARCH BAR */}
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
        <IconButton onClick={()=>navigate("/user/profile")}>
          <PersonOutlinedIcon />
        </IconButton>
        </Box> :
        <Box display="flex" columnGap="7px">
          <Link to={"/"} style={{textDecoration:"none", color:"#222"}}>
        <Typography variant="h5" textAlign="center">
							Login
            </Typography>
          </Link>
          <Link to={"/register"} style={{textDecoration:"none", color:"#222"}}>
            <Typography variant="h5" textAlign="center">
							Register
						</Typography>

          </Link>
       
        </Box>}
   
    </Box>
  );
};

export default Topbar;
