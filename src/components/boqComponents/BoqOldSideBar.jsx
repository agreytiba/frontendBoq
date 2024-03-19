import React, { useState } from "react";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { Sidebar as ProSideBar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { API_BASE_URL } from "../../confing.js/baseUrl";
import { tokens } from "../../theme";

const Item = ({ title, to, selected, setSelected, setShowComponent, createSavedBoq, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    setSelected(title);
    setShowComponent(name);
    createSavedBoq(name);
  };

  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[500] }}
      onClick={handleClick}
      component={<Link to={to} />}
    >
      <Typography>{title}</Typography>
    </MenuItem>
  );
};

const SubItem = ({ title, selected, setSelected, setShowComponent, createSavedBoq, name }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleClick = () => {
    setSelected(title);
    setShowComponent(name);
    createSavedBoq(name);
  };

  return (
    <Item
      title={title}
      selected={selected}
      setSelected={setSelected}
      setShowComponent={setShowComponent}
      createSavedBoq={createSavedBoq}
      name={name}
    />
  );
};

const BoqSideBar = ({ setShowComponent }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("Dashboard");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const createSavedBoq = async (name) => {
    const endpoints = {
      wall: "savedwalling",
      roof: "savedroofing",
      gyp: "savedgypsum",
      finish: "savedfinishing",
      tile: "savedtiles",
      pvc: "savedpvcs",
      electric: "savedelectrical",
      plaster: "savedplastering",
      blind: "savedblinding",
      strip: "savedStrips",
      foundwall: "savedwallfoundations",
      pad: "savedpads",
      beam: "savedBeams",
      concrete: "savedconcretes",
      blandout: "savedblandoutside",
      blandin: "savedblandinside",
      skimin: "savedskiminside",
      skimout: "savedskimoutside",
      grill: "savedgrills",
      panel: "savedpanels",
      frame: "savedframes",
      shutter: "savedshutters",
    };

    try {
      const mapData = JSON.parse(localStorage.getItem("mapData"));
      const mapId = mapData._id;

      const response = await axios.post(API_BASE_URL + `/api/${endpoints[name]}`, { mapId });

      if (response.data) {
        const combinedData = {
          mapId,
          savedPreId: response.data._id,
        };
        localStorage.setItem("savedData", JSON.stringify(combinedData));
      }
    } catch (error) {
      console.error("Error creating saved pre:", error.response?.data);
    }
  };

  return (
    <Box
      sx={{
        "& .ps-sidebar-container": {
          background: `#fff !important`,
          minHeight: `80vh !important`,
          boxShadow: `0 4px 12px rgba(0,0,0,0.3)`,
          borderRadius:`10px`
        },
        "& .pro-sidebar-inner": {
          // background: `#fff !important`,
        },
        "& .pro-icon-wrapper": {
          // backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          // padding: "5px 35px 5px 20px !important",
          // color: `${colors.redAccent[100]}!important `,
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
          // background: `${colors.greenAccent[400]} !important`,
        },
        "& .ps-open": {
          background: `#eee !important`,
        },
      }}
    >
      <ProSideBar
        collapsed={isCollapsed}
     
      >
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ color: colors.grey[100] }}
          >
            {!isCollapsed && (
              <Box display="flex" justifyContent="space-between" alignItems="center" ml="15px">
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon style={{ color: " #fff" }} />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box>
            <Item
              title="PRELIMINARIES"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="pre"
            />

            <SubMenu title="SUBSTRUCTURE">
              <SubItem
                title="Blinding"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="blind"
              />
              <SubItem
                title="Strip foundation"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="strip"
              />
              <SubItem
                title="Pad Foundation"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="pad"
              />
              <SubItem
                title="Foundation Wall"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="foundwall"
              />
              <SubItem
                title="Ground Beam"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="beam"
              />
              <SubItem
                title="Site Concrete"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="concrete"
              />
            </SubMenu>

            <Item
              title="WALLING"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="wall"
            />
            <Item
              title="ROOFING"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="roof"
            />

            <SubMenu title="BLANDERING">
              <SubItem
                title="Blandering Inside"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="blandin"
              />
              <SubItem
                title="Blandering Outside"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="blandout"
              />
            </SubMenu>

            <Item
              title="GYPSUM CEILING"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="gyp"
            />
            <Item
              title="PVC OVERHANG"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="pvc"
            />

            <SubMenu title="WALL SKIMMING">
              <SubItem
                title="Wall Skimming Inside"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="skimin"
              />
              <SubItem
                title="Wall Skimming Outside"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="skimout"
              />
            </SubMenu>

            <Item
              title="FINISHING PAINT"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="finish"
            />

            <SubMenu title="WINDOWS">
              <SubItem
                title="Window Grills"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="grill"
              />
              <SubItem
                title="Aluminium Panels"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="panel"
              />
            </SubMenu>

            <SubMenu title="DOORS">
              <SubItem
                title="Door Frames"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="frame"
              />
              <SubItem
                title="Door Shutters"
                selected={selected}
                setSelected={setSelected}
                setShowComponent={setShowComponent}
                createSavedBoq={createSavedBoq}
                name="shutter"
              />
            </SubMenu>

            <Item
              title="PLUMBING"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="plumb"
            />
            <Item
              title="TILES"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="tile"
            />
            <Item
              title="PLASTERING"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="plaster"
            />
            <Item
              title="ELECTRICAL"
              to="/"
              selected={selected}
              setSelected={setSelected}
              setShowComponent={setShowComponent}
              createSavedBoq={createSavedBoq}
              name="electric"
            />
          </Box>
        </Menu>
      </ProSideBar>
    </Box>
  );
};

export default BoqSideBar;
