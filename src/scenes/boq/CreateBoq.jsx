import React,{ useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import Preliminaries from "../../components/boqComponents/Preliminilaries";
import SubBlinding from "../../components/boqComponents/SubBlinding";
import SubStripFoundation from "../../components/boqComponents/SubStripFoundation";
import SubPad from "../../components/boqComponents/SubPad";
import SubWallFoundation from "../../components/boqComponents/SubWallFoundation";
import SubBeamFoundation from "../../components/boqComponents/SubBeamFoundation";
import SubConcrete from "../../components/boqComponents/SubConcrete";
import Walling from "../../components/boqComponents/Walling";
import Roofing from "../../components/boqComponents/Roofing";
import Blandering from "../../components/boqComponents/Blandering";
import GypsumCeiling from "../../components/boqComponents/GypsumCeiling";
import PvcOverHang from "../../components/boqComponents/PvcOverHang";
import WallSkimming from "../../components/boqComponents/WallSkimming";
import Finishing from "../../components/boqComponents/Finishing";
import Windows from "../../components/boqComponents/Windows";
import WindowGrills from "../../components/boqComponents/WindowGrills";
import AluminiumPanels from "../../components/boqComponents/AluminiumPanel";
import Doors from "../../components/boqComponents/Doors";
import DoorFrames from "../../components/boqComponents/DoorFrames";
import DoorShutters from "../../components/boqComponents/DoorShutters";
import Plumbing from "../../components/boqComponents/Plumbing";
import Tiles from "../../components/boqComponents/Tiles";
import Plastering from "../../components/boqComponents/Plastering";
import ElectricalInstallation from "../../components/boqComponents/ElectricalInstallation";
import SkimmingInside from "../../components/boqComponents/SkimmingInside";
import SkimmingOutside from "../../components/boqComponents/SkimmingOutside";
import BlanderingOutside from "../../components/boqComponents/BlandOutside";
import BlanderingInside from "../../components/boqComponents/BlandInside";
import BoqSideBar from "../../components/boqComponents/BoqSideBar";

const componentsMap = {
  pre: Preliminaries,
  blind: SubBlinding,
  strip: SubStripFoundation,
  pad: SubPad,
  foundwall: SubWallFoundation,
  beam: SubBeamFoundation,
  concrete: SubConcrete,
  walling: Walling,
  roofing: Roofing,
  blandering: Blandering,
  blandout: BlanderingOutside,
  blandin: BlanderingInside,
  gypsum: GypsumCeiling,
  pvc: PvcOverHang,
  skimming: WallSkimming,
  skimin: SkimmingInside,
  skimout: SkimmingOutside,
  finishing: Finishing,
  windows: Windows,
  grill: WindowGrills,
  panel: AluminiumPanels,
  doors: Doors,
  frame: DoorFrames,
  shutter: DoorShutters,
  plumbing: Plumbing,
  tiles: Tiles,
  plastering: Plastering,
  electrical: ElectricalInstallation,
};

const CreateBoq = () => {
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [collapsed, setCollapsed] = useState(isSmallScreen);
  const [showComponent, setShowComponent] = useState("pre");

  return (
    <Box display={"flex"} marginLeft={isSmallScreen ? "0" : "100px"}>
      <BoqSideBar collapsed={collapsed} setShowComponent={setShowComponent} />
      <Box width="90%"  marginBottom="30px">
        {Object.keys(componentsMap).map((key) => (
          showComponent === key && (
            <Box
              key={key}
         
            >
              {React.createElement(componentsMap[key])}
            </Box>
          )
        ))}
      </Box>
    </Box>
  );
};

export default CreateBoq;
