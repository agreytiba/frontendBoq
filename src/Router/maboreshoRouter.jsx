import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';


// Lazy-loaded Pages

const FailedChecker = lazy(() => import("../scenes/map/FailedChecker"));
const MyMaps = lazy(() => import("../scenes/userpage/MyMaps"));
const Profile = lazy(() => import("../scenes/user/Profile"));
export default function AdminRoutes() {
  let element = useRoutes([
 
   {
      path: '/',
      element: <FailedChecker/>,
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
      element: <FailedChecker/>,
    },
  

  ]);

  return element;
}