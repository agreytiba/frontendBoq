import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';


// Lazy-loaded Pages
const Boq = lazy(() => import("../scenes/boq"));
const CreateBoq = lazy(() => import("../scenes/boq/CreateBoq"));
const MyMaps = lazy(() => import("../scenes/userpage/MyMaps"));
const Profile = lazy(() => import("../scenes/user/Profile"));
export default function AdminRoutes() {
  let element = useRoutes([
 
    {
      path: '/',
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
      path: '/Profile',
      element: <Profile />,
    },
    
    {
      path: '*',
      element: <Boq/>,
    },
  

  ]);

  return element;
}