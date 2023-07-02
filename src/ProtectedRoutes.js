import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
const useAuth = () => {
    // get all  properties from react reduc state
    const { user } = useSelector((state) => state.auth)
    return user && user.token
};
const ProtectedRoutes = () => {
    const isauth = useAuth()
    return isauth ? <Outlet /> : <Navigate to="/login" />;
}
export default ProtectedRoutes