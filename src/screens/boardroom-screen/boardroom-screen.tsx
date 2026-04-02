import { useNavbarStore } from "@/stores/nav-store";
import { useEffect } from "react";

const BoardroomScreen = () => {
  const setContent = useNavbarStore((state) => state.setContent);
  const clearContent = useNavbarStore((state) => state.clearContent);

  useEffect(() => {
    setContent({ type: "agents", activeAgent: null });
    return () => clearContent();
  }, [clearContent, setContent]);

  const handleButtonClick = () => {
    setContent({ type: "agents", activeAgent: "CEO" });
  };

  return (
    <div className="content-wrapper">
      boardroom screen <button onClick={handleButtonClick}>click me</button>
    </div>
  );
};

export default BoardroomScreen;
