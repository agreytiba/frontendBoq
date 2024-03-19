import { lazy } from "react";
import { useRoutes } from 'react-router-dom';
// boq pages
const Preliminaries = lazy(() => import("../components/user/pre"));
const SubBlinding = lazy(() => import("../components/user/blinding"));
const SubStripFoundation  = lazy(() => import("../components/user/Strip"));
const SubPad = lazy(() => import("../components/user/pad"));
const SubWallFoundation = lazy(() => import("../components/user/wallfound"));
const SubBeamFoundation= lazy(() => import("../components/user/beam"));
const SubConcrete= lazy(() => import("../components/user/Concerate"));
const Walling= lazy(() => import("../components/user/wall"));
const Roofing= lazy(() => import("../components/user/Roof"));

const GypsumCeiling= lazy(() => import("../components/user/Gysum"));
const PvcOverHang= lazy(() => import("../components/user/Pvc"));

const Finishing= lazy(() => import("../components/user/Finish"));

const WindowGrills= lazy(() => import("../components/user/grills"));
const AluminiumPanel= lazy(() => import("../components/user/panel"));

const DoorFrames= lazy(() => import("../components/user/Frame"));
const DoorShutters= lazy(() => import("../components/user/Shutter"));
const Plumbing= lazy(() => import("../components/user/Tile"));
const Tiles= lazy(() => import("../components/user/Tile"));
const Plastering= lazy(() => import("../components/user/Plaster"));
const ElectricalInstallation= lazy(() => import("../components/user/Electric"));
const SkimmingInside= lazy(() => import("../components/user/Skimin"));
const SkimmingOutside= lazy(() => import("../components/user/Skimout"));
const BlanderingOutside= lazy(() => import("../components/user/BlandOut"));
const BlanderingInside= lazy(() => import("../components/user/Blandin"));
export default function MyBoqRoutes() {
  let element = useRoutes([
      {
      path: '/',
      element: <Preliminaries />,
    },
    {
      path: '/blinding',
      element: <SubBlinding />,
    },
    {
      path: '/pad',
      element: <SubPad/>,
    },
    {
      path: '/strip',
      element: <SubStripFoundation/>,
    },
  
    {
      path: '/wallFound',
      element: <SubWallFoundation />,
    },
    
    {
      path: '/wallBeam',
      element: <SubBeamFoundation />,
    },
    {
      path: '/concrete',
      element: <SubConcrete />,
    },
    {
      path: '/walling',
      element: <Walling />,
    },
    {
      path: '/roofing',
      element: <Roofing />,
    },
    // {
    //   path: '/blandering',
    //   element: <Blandering />,
    // },
    {
      path: '/ceiling',
      element: <GypsumCeiling />,
    },
    {
      path: '/pvcHang',
      element: <PvcOverHang />,
    },
    // {
    //   path: '/wallSkim',
    //   element: <WallSkimming />,
    // },
    {
      path: '/finishing',
      element: <Finishing />,
    },
    
    // {
    //   path: '/windows',
    //   element: <Windows/>,
    // },
    {
      path: '/windowGrill',
      element: <WindowGrills/>,
    },
    {
      path: '/panel',
      element: <AluminiumPanel/>,
    },
    // {
    //   path: '/doors',
    //   element: <Doors/>,
    // },
    
    {
      path: '/doorFrame',
      element: <DoorFrames/>,
    },
    
    {
      path: '/doorShut',
      element: <DoorShutters/>,
    },
    
    {
      path: '/plumbing',
      element: <Plumbing/>,
    },
    {
      path: '/tiles',
      element: <Tiles/>,
    },
    {
      path: '/plastering',
      element: <Plastering/>,
    },
    {
      path: '/electrical',
      element: <ElectricalInstallation/>,
    },
    {
      path: '/skimInside',
      element: <SkimmingInside/>,
    },
    {
      path: '/skimOutside',
      element: <SkimmingOutside/>,
    },
    {
      path: '/blandeOut',
      element: <BlanderingOutside/>,
    },
    {
      path: '/blandeIn',
      element: <BlanderingInside/>,
    },
    
    // {
    //   path: '*',
    //   element: <Boq/>,
    // },
  

  ]);

  return element;
}