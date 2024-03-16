
import { lazy,Suspense } from "react";
import Spinner from "../components/Spinner";
import { useSelector } from "react-redux"
import Topbar from "../scenes/global/Topbar";
import LogNavbar from "../components/LogNavbar";
const AdminApp = lazy(() => import("./Admin"));
const PublicRouter = lazy(() => import("../Router/PublicRouter"));
const RegularRouter = lazy(() => import("../Router/RegularRouter"));
const MaboreshoRouter = lazy(() => import("../Router/maboreshoRouter"));
const PangaRouter = lazy(() => import("../Router/pangaRouter"));

const VipimoRouter = lazy(() => import("../Router/vipimoRouter"));
const BoqRouter = lazy(() => import("../Router/boqRouter"));


const AppMain = () => {
  
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.accessLevel === "admin";
  const isTypecheker = user?.accessLevel === "typecheker";
  const isUnitChecker = user?.accessLevel === "unitchecker";
  const isSeller = user?.accessLevel === "seller";
  const isBoq = user?.accessLevel === "boq";
  const isFailed = user?.accessLevel === "failed";
  const isUser = user?.accessLevel === "user";
  const isAuthenticated = user?.token;
  if (isAuthenticated && isAdmin) {
    return (
      <Suspense fallback={<Spinner />}>
        {/* <AdminApp /> */}
        <LogNavbar/>
       <BoqRouter/>
      </Suspense>
    )
  }
  if (isAuthenticated && isUnitChecker) {
    return (
      <Suspense fallback={<Spinner />}>
        {/* <AdminApp /> */}
        <LogNavbar/>
       <VipimoRouter/>
      </Suspense>
    )
  }
  if (isAuthenticated && isTypecheker) {
    return (
      <Suspense fallback={<Spinner />}>
        <LogNavbar/>
       <PangaRouter/>
      </Suspense>
    )
  }
  if (isAuthenticated && isFailed) {
    return (
      <Suspense fallback={<Spinner />}>
        <LogNavbar/>
       <MaboreshoRouter/>
      </Suspense>
    )
  }
  if (isAuthenticated && isUser) {
    return (
      <Suspense fallback={<Spinner />}>
     
        <LogNavbar/>
       <RegularRouter/>
      </Suspense>
    )
  }
  return (
    <Suspense fallback={<Spinner />}>
      <Topbar/>
      <PublicRouter />
    </Suspense>
         
  )
}
export default AppMain