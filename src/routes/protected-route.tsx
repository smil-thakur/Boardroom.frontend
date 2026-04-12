import { useUserStateStore } from "@/stores/user-state-store";
import { Navigate, Outlet } from "react-router";

const ProtectedRoute = () => {
  const isLoggedIn = useUserStateStore((state) => state.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
