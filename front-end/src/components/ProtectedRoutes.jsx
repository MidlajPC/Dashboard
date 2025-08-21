import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const userId = sessionStorage.getItem("userId");
  return userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
