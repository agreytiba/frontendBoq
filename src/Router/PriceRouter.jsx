import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';


// Lazy-loaded Pages


const MyMaps = lazy(() => import("../scenes/userpage/MyMaps"));
const Profile = lazy(() => import("../scenes/user/Profile"));
const UnitChecker = lazy(() => import("../scenes/map/UnitChecker"));
const Products = lazy(() => import("../scenes/products"));
const Boq = lazy(() => import("../scenes/boq"));
export default function PriceRoutes() {
  let element = useRoutes([
 
    {
      path: '/bidhaa',
      element: <Products/>,
    },
  
    {
      path: '/Profile',
      element: <Profile />,
    },
       {
      path: '/',
      element: <Boq/>,
    },
    {
      path: '*',
      element: <Boq/>,
    },
  

  ]);

  return element;
}