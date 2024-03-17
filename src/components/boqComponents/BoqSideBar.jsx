import React, { useState } from 'react';
import { Box, Typography, List, ListItem, ListItemIcon, ListItemText, Divider, Collapse, styled } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import InboxIcon from '@mui/icons-material/Inbox';
import DoneIcon from '@mui/icons-material/Done';
import MailIcon from '@mui/icons-material/Mail';
import UserIcon from '@mui/icons-material/People';
import LogoutIcon from '@mui/icons-material/Logout';
import Request from '@mui/icons-material/Receipt';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';

const DropdownArrow = styled('div')({
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  border: 'solid #000',
  borderWidth: '0 2px 2px 0',
  display: 'inline-block',
  padding: '3px',
  cursor: 'pointer',
});

const DropdownBackground = styled('div')({
  backgroundColor: '#f0f0f0',
  padding: '5px 0',
  borderRadius: '0 0 5px 5px',
});

const BoqSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState({
    report: false,
    users: false,
    // Add more dropdowns here if needed
  });

  const navigationItems = [
    { path: '/pre', icon: <HomeIcon />, text: 'Preliminaries' },
    
    {
      text: 'Substructure',
      icon: <MailIcon />,
      children: [
        { path: '/blinding', text: 'blinding' },
        { path: '/strip', text: 'Strip Foundation' },
        { path: '/pad', text: 'Pad Foundation' },
        { path: '/wallFound', text: 'Wall Foundation' },
        { path: '/wallbeam', text: 'Ground Beam' },
        { path: '/concrete', text: 'Over site Concrete' },
      ],
    },
      { path: '/walling', icon: <HomeIcon />, text: 'Walling' },
    
      { path: '/roofing', icon: <HomeIcon />, text: 'Roofing' },
    
      // { path: '/blandering', icon: <HomeIcon />, text: 'Blandering' },
    
    {
      text: 'Blandering',
      icon: <MailIcon />,
      children: [
        { path: '/blandeOut', text: 'Blandering out' },
        { path: '/blandeIn', text: 'Blandering In' },
      ],
    },
    { path: '/ceiling', icon: <Request />, text: 'Gysum Ceiling' },
    { path: '/pvcHang', icon: <InboxIcon />, text: 'Pvc' },
        {
      text: 'Skimming',
      icon: <MailIcon />,
      children: [
        { path: '/skimInside', text: 'Skimming Inside' },
        { path: '/skimOutside', text: 'Skimming Outside' },
      ],
    },
    { path: '/finishing', icon: <InboxIcon />, text: 'Finishing' },
         {
      text: 'Windows',
      icon: <MailIcon />,
      children: [
        { path: '/windowGrill', text: 'Window Grills' },
        { path: '/panel', text: 'Aluminium Panel' },
      ],
    },
         {
      text: 'Doors',
      icon: <MailIcon />,
      children: [
        { path: '/doorFrame', text: 'Door Frames' },
        { path: '/doorShut', text: 'Door Shutters' },
      ],
    },
    { path: '/Plumbing', icon: <DoneIcon />, text: 'Plumbing' },
    { path: '/tiles', icon: <MailIcon />, text: 'Tiles' },
    { path: '/plastering', icon: <MailIcon />, text: 'Plastering' },
    { path: '/electrical', icon: <MailIcon />, text: 'Electrical' },
  ];

  const handleListItemClick = (path) => {
    navigate(path);
  };

  const handleLogoutUser = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  };

  const handleDropdownClick = (dropdownName) => {
    setOpenDropdown((prevState) => ({
      ...prevState,
      [dropdownName]: !prevState[dropdownName],
    }));
  };

  return (
    <Box
      className="navbar-container"
      sx={{
        boxShadow: `0 4px 8px rgba(0,0,0,0.3)`,
        position: `fixed`,
        top: `0px`,
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
                  className={`navbar-item ${isOpen ? 'active' : ''}`}
                  onClick={() => handleDropdownClick(item.text.toLowerCase())}
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.text} style={{ color: '#000' }} />
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
                            location.pathname === child.path ? 'active' : ''
                          }`}
                          onClick={() => handleListItemClick(child.path)}
                          style={{ paddingLeft: '30px' }}
                        >
                          {child.icon && <ListItemIcon>{child.icon}</ListItemIcon>}
                          <ListItemText primary={child.text} style={{ color: '#000' }} />
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
                  location.pathname === item.path ? 'active' : ''
                }`}
                onClick={() => handleListItemClick(item.path)}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} style={{ color: '#000' }} />
              </ListItem>
            );
          }
        })}
        <Divider />
        <ListItem button onClick={() => handleLogoutUser()} style={{ marginTop: `15px` }}>
          <ListItemIcon><LogoutIcon /></ListItemIcon>
          <ListItemText primary={'Logout'} style={{ color: '#000' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default BoqSideBar;