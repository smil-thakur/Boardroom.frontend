import { Outlet } from "react-router";
import Navbar from "./common/components/nav-bar/nav-bar";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Toaster />
    </div>
  );
};

export default App;
