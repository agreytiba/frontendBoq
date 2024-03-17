import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";
import Topbar from "../scenes/global/Topbar";
import LogNavbar from "../components/LogNavbar";
// import BoqUser from "./components/BoqUser";
import { Box } from "@mui/material";

const AdminApp = lazy(() => import("./components/Admin"));
const PublicRouter = lazy(() => import("../Router/PublicRouter"));
const RegularRouter = lazy(() => import("../Router/RegularRouter"));
const MaboreshoRouter = lazy(() => import("../Router/maboreshoRouter"));
const PangaRouter = lazy(() => import("../Router/pangaRouter"));
const VipimoRouter = lazy(() => import("../Router/vipimoRouter"));
const PriceRouter = lazy(() => import("../Router/PriceRouter"));
const BoqUser = lazy(() => import("./components/BoqUser"));

const AppMain = () => {
  const { user } = useSelector((state) => state.auth);
  const { accessLevel} = user || {};

  switch (accessLevel) {
    case "admin":
      return <Suspense fallback={<Spinner />}><AdminApp /></Suspense>;
      case "user":
      return (
        <Suspense fallback={<Spinner />}>
          <LogNavbar />
          <RegularRouter />
        </Suspense>
      );
    case "boq":
      return <Suspense fallback={<Spinner />}><BoqUser /></Suspense>;
    case "pricetag":
      return <Suspense fallback={<Spinner />}>  <LogNavbar />
          <PriceRouter /></Suspense>;
    case "unitchecker":
      return (
        <Suspense fallback={<Spinner />}>
          <LogNavbar />
          <VipimoRouter />
        </Suspense>
      );
    case "typechecker":
      return (
        <Suspense fallback={<Spinner />}>
          <LogNavbar />
          <PangaRouter />
        </Suspense>
      );
    case "failedchecker":
      return (
        <Suspense fallback={<Spinner />}>
          <LogNavbar />
          <MaboreshoRouter />
        </Suspense>
      );

    default:
      return (
        <Suspense fallback={<Spinner />}>
          <Box
            display="flex"
            justifyContent="center"
            minHeight={`100vh`}
            sx={{ backgroundColor: `grey` }}
          >
            <Box
              width={`80%`}
              boxShadow={`0 4px 12px rgba(0,0,0,0.3)`}
              sx={{ backgroundColor: `#fff`, position:`relative` }}
            >
              <Topbar />
              <Box padding={`0 20px`} >
                <PublicRouter />
              </Box>
            </Box>
          </Box>
        </Suspense>
      );
  }
};

export default AppMain;
