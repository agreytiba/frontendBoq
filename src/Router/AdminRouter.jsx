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
const UserBoq = lazy(() => import("../scenes/userpage/UserBoq"));
const Profile = lazy(() => import("../scenes/user/Profile"));
export default function AdminRoutes() {
  let element = useRoutes([
    {
      path: '/',
      element: <Dashboard />,
    },
    {
      path: '/allpdf',
      element: <AllPdf />,
    },
  
    {
      path: '/mymaps',
      element: <MyMaps />,
    },
    {
      path: '/maps',
      element: <Maps />,
    },
    {
      path: '/failed',
      element: <Failed />,
    },
    {
      path: '/passed',
      element: <Passed />,
    },
    {
      path: '/createboq',
      element: <CreateBoq />,
    },
    {
      path: '/completedboq',
      element: <CompletedBoq />,
    },
    {
      path: '/users',
      element: <User />,
    },
     {
      path: '/Profile',
      element: <Profile />,
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
      path: '/blog',
      element: < Blog/>,
    },
    {
      path: '/blog/:id',
      element: <SingleBlog />,
    },
    {
      path: '/orders',
      element: <Orders/>,
    },
    {
      path: '/mteja',
      element: <UserPage/>,
    },
    {
      path: '/mtoahuduma',
      element: <SellerPage/>,
    },
    {
      path: '/boq',
      element: <Boq/>,
    },
    {
      path: '/bidhaa',
      element: <Products/>,
    },
    {
      path: '/watoahuduma',
      element: <ServiceProviders/>,
    },
    {
      path: '/ramani',
      element: <Maps/>,
    },
    {
      path: '/pangaramani',
      element: <TypeChecker/>,
    },
    {
      path: '/vipimo',
      element: <UnitChecker/>,
    },
    {
      path: '/suggestion',
      element: <FailedChecker/>,
    },
    {
      path: '*',
      element: <Dashboard/>,
    },
  

  ]);

  return element;
}