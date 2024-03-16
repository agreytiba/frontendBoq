import { lazy } from 'react';
import { useRoutes } from 'react-router-dom';

const Home = lazy(() => import("../scenes/home"));
const Login = lazy(() => import("../scenes/login"));
const Register = lazy(() => import("../scenes/register"));
const ForgotPassword = lazy(() => import("../scenes/forgotpassword"));

export default function PublicRouter() {
  let element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/login',
      element: <Login />,
    },
  
    {
      path: '/register',
      element: <Register />,
    },
    {
      path: '/forgot',
      element: <ForgotPassword/>,
    },
       {
      path: '*',
      element: <Home/>,
    },

  ]);

  return element;
}