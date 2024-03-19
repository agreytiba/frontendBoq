import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';
import User from '../scenes/user';

// Lazy-loaded Pages
// const Dashboard = lazy(() => import("../scenes/dashboard"));
// const Boq = lazy(() => import("../scenes/boq"));
// const SellerPage = lazy(() => import("../scenes/seller"));
const UserPage = lazy(() => import("../scenes/userpage"));
const SingleBlog = lazy(() => import("../scenes/blog/SingleBlog"));
const Blog = lazy(() => import("../scenes/blog"));
const Upload = lazy(() => import("../scenes/upload"));
const MyMaps = lazy(() => import("../scenes/userpage/MyMaps"));
const CreateBoq = lazy(() => import("../scenes/boq/CreateBoq"));

const CompletedBoq = lazy(() => import("../scenes/boq/CompletedBoq"));
const UserBoq = lazy(() => import("../scenes/userpage/UserBoq"));
const Profile = lazy(() => import("../scenes/user/Profile"));

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
      path: 'userboq',
      element: <UserBoq />,
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
      path: '/blog',
      element: < Blog/>,
    },
    {
      path: '/blog/:id',
      element: <SingleBlog />,
    },
  {
      path: '/Profile',
      element: <Profile />,
    },
    {
      path: '*',
      element: <UserPage/>,
    },
  

  ]);

  return element;
}