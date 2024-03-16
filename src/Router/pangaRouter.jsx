import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';


// Lazy-loaded Pages

const FailedChecker = lazy(() => import("../scenes/map/FailedChecker"));
const MyMaps = lazy(() => import("../scenes/userpage/MyMaps"));
const Profile = lazy(() => import("../scenes/user/Profile"));
const TypeChecker = lazy(() => import("../scenes/map/TypeChecker"));
export default function PangaRoutes() {
  let element = useRoutes([
 
  {
      path: '/',
      element: <TypeChecker/>,
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
      element: <TypeChecker/>,
    },
  

  ]);

  return element;
}