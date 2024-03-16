import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';


// Lazy-loaded Pages


const MyMaps = lazy(() => import("../scenes/userpage/MyMaps"));
const Profile = lazy(() => import("../scenes/user/Profile"));
const UnitChecker = lazy(() => import("../scenes/map/UnitChecker"));
export default function PangaRoutes() {
  let element = useRoutes([
 
    {
      path: '/',
      element: <UnitChecker/>,
    },
    {
      path: '/mymaps',
      element: <MyMaps />,
    },
    {
      path: '/Profile',
      element: <Profile />,
    },
    
    {
      path: '*',
      element: <UnitChecker/>,
    },
  

  ]);

  return element;
}