import React, { useState } from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  styled,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import LogoutIcon from "@mui/icons-material/Logout";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import "../css/userRouter.css";
import { API_BASE_URL } from "../../confing.js/baseUrl";
const DropdownArrow = styled("div")({
  position: "absolute",
  right: "10px",
  top: "50%",
  transform: "translateY(-50%)",
  border: "solid #000",
  borderWidth: "0 2px 2px 0",
  display: "inline-block",
  padding: "3px",
  cursor: "pointer",
});

const DropdownBackground = styled("div")({
  backgroundColor: "#f0f0f0",
  padding: "5px 0",
  borderRadius: "0 0 5px 5px",
});

const BoqSideBar = ({navigationItems}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState({
    report: false,
    users: false,
    // Add more dropdowns here if needed
  });

 

  const handleListItemClick = async (item) => {
    try {
      const mapData = JSON.parse(localStorage.getItem("mapData"));
      const mapId = mapData._id;

      const response = await axios.post(API_BASE_URL + `/api/${item.name}`, {
        mapId,
      });

      if (response.data) {
        const combinedData = {
          mapId,
          savedPreId: response.data._id,
        };
        navigate(item.path);
        localStorage.setItem("savedData", JSON.stringify(combinedData));
      }
    } catch (error) {
      toast.error("Error creating saved pre:", error.response?.data);
    }

    // navigate(item.path);
  };

  const handleLogoutUser = () => {
    sessionStorage.removeItem("user");
    window.location.reload();
  };

  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  return (
    <Box>
      <Box
        className="navbar-container"
        sx={{
          boxShadow: `0 4px 8px rgba(0,0,0,0.3)`,
          borderRadius: `10px`,
          backgroundColor: `#fff`,
          color: `#000`,
          margin: ` 10px 10px 10px`,
          minHeight: `100vh`,
          padding: `20px`,
          maxWidth: `220px`,
        }}
      >
        <List className="navbar-list">
          {navigationItems.map((item, index) => {
            if (item.children) {
              const isOpen = openDropdown[item.text.toLowerCase()];
              return (
                <React.Fragment key={index}>
                  <ListItem
                    button
                    className={`navbar-item ${isOpen ? "activ" : ""}`}
                    onClick={() => handleDropdownClick(item.text.toLowerCase())}
                  >
                    {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                    <ListItemText
                      primary={item.text}
                      color="#000"
                    />
                    {isOpen ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <DropdownBackground>
                      <List component="div" disablePadding>
                        {item.children.map((child, idx) => (
                          <ListItem
                            key={idx}
                            button
                            className={`navbar-item ${
                              location.pathname === child.path ? "active" : ""
                            }`}
                            onClick={() => handleListItemClick(child)}
                            style={{ paddingLeft: "30px" }}
                          >
                            {child.icon && (
                              <ListItemIcon>{child.icon}</ListItemIcon>
                            )}
                            <ListItemText
                              primary={child.text}
                              style={{ color: "#000" }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </DropdownBackground>
                  </Collapse>
                </React.Fragment>
              );
            } else {
              return (
                <ListItem
                  key={index}
                  button
                  className={`navbar-item ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                  onClick={() => handleListItemClick(item)}
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.text} style={{ color: "#000" }} />
                </ListItem>
              );
            }
          })}
          <Divider />
          <ListItem
            button
            onClick={() => handleLogoutUser()}
            style={{ marginTop: `15px` }}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={"Logout"} style={{ color: "#000" }} />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default BoqSideBar;
