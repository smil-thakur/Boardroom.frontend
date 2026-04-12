import { ModeToggle } from "@/components/mode-toggle";
import Logo from "../logo";
import "./nav-bar.scss";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserStateStore } from "@/stores/user-state-store";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase/intialize-firebase";

const Navbar = () => {
  const user = useUserStateStore((state) => state.user);

  return (
    <div className="flex justify-between px-4 py-2 nav-bar">
      <div className="logo">
        <Logo />
      </div>
      <div className="flex-1 main flex justify-center items-center"></div>
      <div className="actions flex items-center gap-2">
        {user && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar>
                <AvatarImage src={user.photoURL ?? ""} />
                <AvatarFallback>
                  {user.displayName?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => signOut(auth)}>
                SignOut
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
