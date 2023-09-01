import {useState} from "react";
import { Box, Grid, useMediaQuery } from "@mui/material";
import Preliminilaries from "../../components/boqComponents/Preliminilaries";
import Substructure from "../../components/boqComponents/Substructure";
import Walling from "../../components/boqComponents/Walling";
import Roofing from "../../components/boqComponents/Roofing";
import Blandering from "../../components/boqComponents/Blandering";
import GypsumCeiling from "../../components/boqComponents/GypsumCeiling";
import PvcOverHang from "../../components/boqComponents/PvcOverHang";
import WallSkimming from "../../components/boqComponents/WallSkimming";
import Finishing from "../../components/boqComponents/Finishing";
import Windows from "../../components/boqComponents/Windows";
import Doors from "../../components/boqComponents/Doors";
import Plumbing from "../../components/boqComponents/Plumbing";
import Plastering from "../../components/boqComponents/Plastering";
import BoqSideBar from "../../components/boqComponents/BoqSideBar";
import Tiles from "../../components/boqComponents/Tiles";
import ElectricalInstallation from "../../components/boqComponents/ElectricalInstallation";
import SubBlinding from "../../components/boqComponents/SubBlinding";
import SubStripFoundation from "../../components/boqComponents/SubStripFoundation";
import SubPad from "../../components/boqComponents/SubPad";
import SubWallFoundation from "../../components/boqComponents/SubWallFoundation";
import SubBeamFoundation from "../../components/boqComponents/SubBeamFoundation";
import SubConcrete from "../../components/boqComponents/SubConcrete";
import BlanderingOutside from "../../components/boqComponents/BlandOutside";
import BlanderingInside from "../../components/boqComponents/BlandInside";
import SkimmingInside from "../../components/boqComponents/SkimmingInside";
import SkimmingOutside from "../../components/boqComponents/SkimmingOutside";
import WindowGrills from "../../components/boqComponents/WindowGrills";
import AluminiumPanels from "../../components/boqComponents/AluminiumPanel";
import DoorFrames from "../../components/boqComponents/DoorFrames";
import DoorShutters from "../../components/boqComponents/DoorShutters";


const CreateBoq = ({ setIsSidebar }) => {
    const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const [collapsed, setCollapsed] =useState(isSmallScreen);
  const [showComponent, setShowComponent] = useState('pre');
 

  setIsSidebar(false)
  return (
    <Box display={"flex"}  marginLeft={isSmallScreen ? "px": "300px"}>

      <BoqSideBar collapsed={collapsed} setShowComponent={setShowComponent} />
      <Box width="90%" position={"relative"} marginBottom={"30px"}>
      {showComponent ==="pre" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}>  <Preliminilaries setIsSidebar={setIsSidebar} /></Box>}
     {/* substructure submenu */}
      {showComponent ==="blind" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <SubBlinding  /></Box>}
      {showComponent ==="strip" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <SubStripFoundation  /></Box>}
      {showComponent ==="pad" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <SubPad  /></Box>}
      {showComponent ==="foundwall" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <SubWallFoundation  /></Box>}
      {showComponent ==="beam" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <SubBeamFoundation  /></Box>}
      {showComponent ==="concrete" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <SubConcrete  /></Box>}
     {/* end */}
        {showComponent === "walling" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <Walling /></Box>}
      {showComponent ==="roofing"&&<Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Roofing  /></Box>}
      {/* blandering  submenu */}
        {showComponent === "blandering" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}> <Blandering /></Box>}
        {showComponent === "blandout" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}> <BlanderingOutside /></Box>}
        {showComponent === "blandin" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}> <BlanderingInside /></Box>}
    {/* end */}
        {showComponent === "gypsum" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <GypsumCeiling /></Box>}
      {showComponent ==="pvc" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}><PvcOverHang /></Box>}
     {/* skimminig wall */}
        {showComponent === "skimming" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <WallSkimming /></Box>}
        {showComponent === "skimin" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <SkimmingInside /></Box>}
        {showComponent === "skimout" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <SkimmingOutside /></Box>}
      
        {showComponent === "finishing" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}> <Finishing /></Box>}
      {showComponent ==="windows" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Windows  /></Box>}
      
      {showComponent ==="grill" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <WindowGrills  /></Box>}
      {showComponent ==="panel" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <AluminiumPanels /></Box>}
      
        {showComponent === "doors" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <Doors /></Box>}
      
        {showComponent === "frame" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <DoorFrames/></Box>}
        {showComponent === "shutter" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <DoorShutters/></Box>}
      
        {showComponent === "plumbing" && <Box position={"absolute"} top={"0px"} left={"0px"} right={"0"} bottom={"0px"}>  <Plumbing /></Box>}
      {showComponent ==="tiles"&& <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}>  <Tiles /></Box>}
      {showComponent ==="plastering" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Plastering /></Box>}
      {showComponent ==="electrical" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <ElectricalInstallation /></Box>}
      </Box>
    </Box>
  );
};

export default CreateBoq;
