import { ModeToggle } from "@/components/mode-toggle";
import Logo from "./logo";

const Navbar = () => {
  return (
    <div className="flex justify-between px-4 py-2">
      <div className="logo">
        <Logo />
      </div>
      <div className="flex-1 main"></div>
      <div className="actions">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
