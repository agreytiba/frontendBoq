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
      {showComponent ==="sub" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Substructure  /></Box>}
      {showComponent ==="walling"&&<Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}>  <Walling /></Box>}
      {showComponent ==="roofing"&&<Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Roofing  /></Box>}
      {showComponent ==="blandering" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Blandering /></Box>}
      {showComponent ==="gypsum"&&<Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}>  <GypsumCeiling /></Box>}
      {showComponent ==="pvc" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}><PvcOverHang /></Box>}
      {showComponent ==="skimming" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}>  <WallSkimming /></Box>}
      {showComponent ==="finishing" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Finishing /></Box>}
      {showComponent ==="windows" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Windows  /></Box>}
      {showComponent ==="doors" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}>  <Doors /></Box>}
      {showComponent ==="plumbing"&& <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}>  <Plumbing  /></Box>}
      {showComponent ==="tiles"&& <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}>  <Tiles /></Box>}
      {showComponent ==="plastering" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <Plastering /></Box>}
      {showComponent ==="electrical" && <Box  position={"absolute"} top={"0px"} left={"0px"} right={"0"}bottom={"0px"}> <ElectricalInstallation /></Box>}
      </Box>
    </Box>
  );
};

export default CreateBoq;
