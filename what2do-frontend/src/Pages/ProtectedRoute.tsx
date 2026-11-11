import { Outlet, Navigate } from "react-router";
import { useJwt } from "../hooks/useJwt";

function ProtectedRoute() {
  const user = localStorage.getItem("user");
  const { isTokenExpired } = useJwt();

  if (!user || isTokenExpired) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
