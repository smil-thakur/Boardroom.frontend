import { ModeToggle } from "@/components/mode-toggle";
import Logo from "../logo";
import "./nav-bar.scss";
import { useNavbarStore, type NavContent } from "@/stores/nav-store";
import AgentLiveAvatar from "@/common/agent-live-avatar/agent-live-avatar";

const renderNavContent = (content: NavContent) => {
  if (!content) return null;
  switch (content.type) {
    case "agents":
      return <AgentLiveAvatar activeAgent={content.activeAgent} />;
    default:
      break;
  }
};

const Navbar = () => {
  const content = useNavbarStore((state) => state.content);

  return (
    <div className="flex justify-between px-4 py-2 nav-bar">
      <div className="logo">
        <Logo />
      </div>
      <div className="flex-1 main flex justify-center items-center">
        {renderNavContent(content)}
      </div>
      <div className="actions">
        <ModeToggle />
      </div>
    </div>
  );
};

export default Navbar;
