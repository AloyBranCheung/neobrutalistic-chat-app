import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function PrivateRoute() {
  const location = useLocation();

  return true ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
