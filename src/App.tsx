import { Outlet } from "react-router";
import Navbar from "./common/components/nav-bar/nav-bar";

const App = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
