import { useUserStateStore } from "@/stores/user-state-store";
import { Navigate, Outlet } from "react-router";

const LoginRoutes = () => {
  const isLoggedIn = useUserStateStore((state) => state.isLoggedIn);
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return <Outlet />;
};

export default LoginRoutes;
