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
import './css/sidebar.css';


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

const NavigationBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const [openReport, setOpenReport] = useState(false);

  const navigationItems = [
      { path: '/', icon: <HomeIcon />, text: 'Home' },
     { text: 'Watumiaji', icon: <MailIcon />, children: [
      { path: '/mteja', text: 'wateja' },
      { path: '/pangaramani', text: 'Report in pdf' },
      { path: '/vipimo', text: 'angalia vipimo' },
      { path: '/suggestion', text: 'maboresho' },
      { path: '/mtoahuduma', text: 'watoa huduma' },
     
      ]
      },
     { text: 'Ramani', icon: <MailIcon />, children: [
      { path: '/allpdf', text: 'pdfs' },
      { path: '/maps', text: 'ramani zote' },
      { path: '/failed', text: 'zilizofail' },
      { path: '/passed', text: 'Zilizofanikiwa' },
      ]
      },
    
    { path: '/bidhaa', icon: <Request />, text: 'Bidhaa' },
     { path: '/completedboq', icon: <InboxIcon />, text: 'zilizokamilika' },
    { path: '/boq', icon: <InboxIcon />, text: 'Boq' },
    { path: '/users', icon: <DoneIcon />, text: 'Users' },
    { path: '/blog', icon: <MailIcon />, text: 'Blog' },
    { path: '', icon: <MailIcon />, text: 'Logout' },
  ];

  const handleListItemClick = (path) => {
    navigate(path);
  };

  const handleLogoutUser = () => {
    sessionStorage.removeItem('user');
    window.location.reload();
  };

  const handleReportClick = () => {
    setOpenReport(!openReport);
  };

  return (
    <Box className="navbar-container"  sx={{boxShadow:`0 4px 8px rgba(0,0,0,0.3)`,position:`sticky`,top:`50px`, borderRadius:`10px`, backgroundColor:`#fff`,color:`#000`, margin:`100px 10px 10px 10px`,minHeight:`80vh`,padding:`20px`, maxWidth:`220px`}}>
      <List className="navbar-list">
        {navigationItems.map((item, index) => {
          if (item.children) {
            return (
              <React.Fragment key={index}>
                <ListItem
                  button
                  className={`navbar-item ${openReport ? 'active' : ''}`}
                  onClick={handleReportClick}
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.text} style={{ color: '#000' }} />
                  {openReport ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={openReport} timeout="auto" unmountOnExit>
                  <DropdownBackground>
                    <List component="div" disablePadding>
                      {item.children.map((child, idx) => (
                        <ListItem
                          key={idx}
                          button
                          className={`navbar-item ${location.pathname === child.path ? 'active' : ''}`}
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
                className={`navbar-item ${location.pathname === item.path ? 'active' : ''}`}
                onClick={() => handleListItemClick(item.path)}
              >
                {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                <ListItemText primary={item.text} style={{ color: '#000' }} />
              </ListItem>
            );
          }
        })}
        <Divider />
        <ListItem
          button
          onClick={handleLogoutUser}
          style={{marginTop:`15px`}}
        >
          <ListItemIcon><LogoutIcon/></ListItemIcon>
          <ListItemText primary={'Logout'} style={{ color: '#000' }} />
        </ListItem>
      </List>
    </Box>
  );
};

export default NavigationBar;
