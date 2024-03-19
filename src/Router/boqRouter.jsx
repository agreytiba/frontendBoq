import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';



// Lazy-loaded Pages
const Boq = lazy(() => import("../scenes/boq"));
const CreateBoq = lazy(() => import("../scenes/boq/CreateBoq"));
const MyMaps = lazy(() => import("../scenes/userpage/MyMaps"));
const Profile = lazy(() => import("../scenes/user/Profile"));
const Products= lazy(() => import("../scenes/products"));
// boq pages
const Preliminaries = lazy(() => import("../components/boqComponents/Preliminilaries"));
const SubBlinding = lazy(() => import("../components/boqComponents/SubBlinding"));
const SubStripFoundation  = lazy(() => import("../components/boqComponents/SubStripFoundation"));
const SubPad = lazy(() => import("../components/boqComponents/SubPad"));
const SubWallFoundation = lazy(() => import("../components/boqComponents/SubWallFoundation"));
const SubBeamFoundation= lazy(() => import("../components/boqComponents/SubBeamFoundation"));
const SubConcrete= lazy(() => import("../components/boqComponents/SubConcrete"));
const Walling= lazy(() => import("../components/boqComponents/Walling"));
const Roofing= lazy(() => import("../components/boqComponents/Roofing"));
const Blandering= lazy(() => import("../components/boqComponents/Blandering"));
const GypsumCeiling= lazy(() => import("../components/boqComponents/GypsumCeiling"));
const PvcOverHang= lazy(() => import("../components/boqComponents/PvcOverHang"));
const WallSkimming= lazy(() => import("../components/boqComponents/WallSkimming"));
const Finishing= lazy(() => import("../components/boqComponents/Finishing"));
const Windows= lazy(() => import("../components/boqComponents/Windows"));
const WindowGrills= lazy(() => import("../components/boqComponents/WindowGrills"));
const AluminiumPanel= lazy(() => import("../components/boqComponents/AluminiumPanel"));
const Doors= lazy(() => import("../components/boqComponents/Doors"));
const DoorFrames= lazy(() => import("../components/boqComponents/DoorFrames"));
const DoorShutters= lazy(() => import("../components/boqComponents/DoorShutters"));
const Plumbing= lazy(() => import("../components/boqComponents/Plumbing"));
const Tiles= lazy(() => import("../components/boqComponents/Tiles"));
const Plastering= lazy(() => import("../components/boqComponents/Plastering"));
const ElectricalInstallation= lazy(() => import("../components/boqComponents/ElectricalInstallation"));
const SkimmingInside= lazy(() => import("../components/boqComponents/SkimmingInside"));
const SkimmingOutside= lazy(() => import("../components/boqComponents/SkimmingOutside"));
const BlanderingOutside= lazy(() => import("../components/boqComponents/BlandOutside"));
const BlanderingInside= lazy(() => import("../components/boqComponents/BlandInside"));
const WaterInside= lazy(() => import("../components/boqComponents/waterIn"));
const WaterOut= lazy(() => import("../components/boqComponents/waterOutside"));
const SewageInside = lazy(() => import("../components/boqComponents/SewageInside"));
const FinishingInside= lazy(() => import("../components/boqComponents/FinishingInside"));
const Septic = lazy(() => import("../components/boqComponents/Septic"));

export default function AdminRoutes() {
  let element = useRoutes([
 
    {
      path: '/boq',
      element: <Boq/>,
    },
    {
      path: '/mymaps',
      element: <MyMaps />,
      },
       {
      path: '/createboq',
      element: <CreateBoq />,
    },
        {
      path: '/bidhaa',
      element: <Products/>,
    },
    {
      path: '/Profile',
      element: <Profile />,
    },
      {
      path: '/pre',
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
    {
      path: '/wallSkim',
      element: <WallSkimming />,
    },
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
    {
      path: '/waterInside',
      element: <WaterInside/>,
    },
    {
      path: '/waterOutside',
      element: <WaterOut/>,
    },
    {
      path: '/sewage',
      element: <SewageInside/>,
    },
    {
      path: '/finishInside',
      element: <FinishingInside/>,
    },
    {
      path: '/septic',
      element: <Septic/>,
    },
    
    {
      path: '*',
      element: <Boq/>,
    },
  

  ]);

  return element;
}