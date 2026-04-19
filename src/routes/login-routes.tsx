import { useUserStateStore } from "@/stores/user-state-store";
import { Navigate, Outlet } from "react-router";
import { Loader2 } from "lucide-react";

const LoginRoutes = () => {
  const isLoggedIn = useUserStateStore((state) => state.isLoggedIn);
  const isAuthChecked = useUserStateStore((state) => state.isAuthChecked);

  if (!isAuthChecked) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="animate-spin text-primary" size={40} />
      </div>
    );
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default LoginRoutes;
