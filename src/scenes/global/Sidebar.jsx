import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ExpandMore, ExpandLess } from "@mui/icons-material";
import "./sidebar.css";

const Sidebar = () => {
  const history = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isRamaniOpen, setIsRamaniOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  const handleLogout = () => {
    // Implement your logout logic here
    history("/");
    // Reload the window if necessary
    window.location.reload();
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* LOGO AND MENU ICON */}
      <div className="menu-icon" onClick={() => setIsCollapsed(!isCollapsed)}>
        {!isCollapsed && (
          <div className="logo">
            <span>BOQ</span>
          </div>
        )}
        <div className="menu-toggle">
          <span>{isCollapsed ? "+" : "-"}</span>
        </div>
      </div>

      <div className="menu-items">
        <h4>
        <Link to="/dashboard" className={selected === "Dashboard" ? "active" : ""}>
          DASHBOARD
        </Link></h4>
        <div className="dropdown-link submenu">
          <h4 style={{position:`relative`}}onClick={() => setIsOpen(!isOpen)}><span >WATUMIAJI</span>
             <p style={{textAlign:`right`,position:`absolute`,bottom:`-25px`,right:`50%`}}> {isOpen ? <ExpandLess /> : <ExpandMore />}</p></h4>
          {isOpen && (
            <ul type="none"className="drop-menu">
              <li>
                <Link to="/mteja">wateja</Link>
              </li>
              <li>
                <Link to="/pangaramani">panga ramani</Link>
              </li>
              <li>
                <Link to="/vipimo">angalia vipimo</Link>
              </li>
              <li>
                <Link to="/suggestion">maboresho</Link>
              </li>
              <li>
                <Link to="/mtoahuduma">mtoa huduma</Link>
              </li>
              <li>
                <Link to="/watoahuduma">watoahuduma</Link>
              </li>
            </ul>)}
        </div>
        <div className="dropdown-link submenu" onClick={() => setIsRamaniOpen(!isRamaniOpen)}>
          <h4 style={{position:`relative`}}><span>RAMANI</span>
           <p style={{textAlign:`right`,position:`absolute`,bottom:`-25px`,right:`50%`}}> {isRamaniOpen ? <ExpandLess /> : <ExpandMore />}</p></h4>
          {isRamaniOpen && (
            <ul className="drop-menu"type="none">
              <li><Link to="/allpdf">pdfs</Link></li>
              <li><Link to="/maps">ramani zote</Link></li>
              <li><Link to="/failed">zilizofail</Link></li>
              <li><Link to="/passed">Zilizofanikiwa</Link></li>
            </ul>
          )}
        </div>
        <h4>
        <Link to="/bidhaa" className={selected === "bidhaa" ? "active" : ""}>
          BIDHAA
          </Link></h4>
         <h4>
        <Link to="/completedboq" className={selected === "completedboq" ? "active" : ""}>
          COMPLETED BOQ
        </Link></h4>
         <h4>
        <Link to="/boq" className={selected === "boq" ? "active" : ""}>
          BOQ
        </Link></h4>
         <h4>
        <Link to="/users" className={selected === "users" ? "active" : ""}>
          USERS
        </Link></h4>
         <h4>
        <Link to="/blog" className={selected === "blog" ? "active" : ""}>
          BLOG
        </Link></h4>
        <h4 className="menu-item" onClick={handleLogout}>
          Logout
        </h4>
      </div>
    </div>
  );
};

export default Sidebar;
