import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = () => {
  const userId = localStorage.getItem("userId");
  return userId ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoutes;
