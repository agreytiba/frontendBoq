import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import User from '../scenes/user';

// Lazy-loaded Pages
const Dashboard = lazy(() => import("../scenes/dashboard"));
const Boq = lazy(() => import("../scenes/boq"));
const SellerPage = lazy(() => import("../scenes/seller"));
const UserPage = lazy(() => import("../scenes/userpage"));
const Products= lazy(() => import("../scenes/products"));
const ServiceProviders = lazy(() => import("../scenes/serviceProvider"));
const Maps= lazy(() => import("../scenes/map"));
const Blog = lazy(() => import("../scenes/blog"));
const Upload = lazy(() => import("../scenes/upload"));
const ForgotPassword = lazy(() => import("../scenes/forgotpassword"));
const SingleBlog = lazy(() => import("../scenes/blog/SingleBlog"));
const AllPdf= lazy(() => import("../scenes/map/AllPdf"));
const TypeChecker = lazy(() => import("../scenes/map/TypeChecker"));
const UnitChecker = lazy(() => import("../scenes/map/UnitChecker"));
const FailedChecker = lazy(() => import("../scenes/map/FailedChecker"));
const MyMaps = lazy(() => import("../scenes/userpage/MyMaps"));
const CreateBoq = lazy(() => import("../scenes/boq/CreateBoq"));
const Orders = lazy(() => import("../scenes/order"));
const Failed= lazy(() => import("../scenes/map/Failed"));
const Passed = lazy(() => import("../scenes/map/Passed"));
const CompletedBoq = lazy(() => import("../scenes/boq/CompletedBoq"));
const UserBoq= lazy(() => import("../scenes/userpage/UserBoq"));
export default function AdminRoutes() {
  let element = useRoutes([
 {
      path: '/',
      element: <UserPage/>,
    },
  
    {
      path: '/mymaps',
      element: <MyMaps />,
    },
    {
      path: '/completedboq',
      element: <CompletedBoq />,
    },
    
    {
      path: '/upload',
      element: <Upload />,
    },
    {
      path: 'mteja/userboq',
      element: <UserBoq />,
    },
  
 
    {
      path: '*',
      element: <UserPage/>,
    },
  

  ]);

  return element;
}