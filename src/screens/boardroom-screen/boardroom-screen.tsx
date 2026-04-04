import ChatBubble from "@/common/chat-bubble/chat-bubble";
import UserBubble from "@/common/chat-bubble/user-bubble";
import PromptArea from "@/common/prompt-area/prompt-area";
import BoardRoomSidebar from "@/components/boardroom-sidebar/boardroom-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { DUMMY_AGENT_MESSAGE } from "@/temp/dummy-agent-message";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  type BaseSyntheticEvent,
} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useLiveAgentStore } from "@/stores/live-agent-store";

const Main: React.FC = () => {
  const { open, toggleSidebar } = useSidebar();
  const [userPrompt, setUserPrompt] = useState<string>("");
  const setLiveAgent = useLiveAgentStore((state) => state.setActiveAgent);
  const scrollToDivRef = useRef<HTMLDivElement | null>(null);
  const handleInputChange = (e: BaseSyntheticEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setUserPrompt(value);
  };
  const handleIntruption = () => {
    setUserPrompt("");
    setLiveAgent("CEO");
    console.log(userPrompt);
  };

  useEffect(() => {
    if (scrollToDivRef.current) {
      scrollToDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <>
      <div className="flex flex-col h-full">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {!open ? <SquareChevronRight /> : <SquareChevronLeft />}
        </Button>
        <div className="flex-1 flex flex-col">
          <ScrollArea className="w-full h-[calc(100vh-230px)]">
            <div className="flex flex-col gap-2 px-8">
              <ChatBubble agentId="CEO" content={DUMMY_AGENT_MESSAGE} />
              <ChatBubble agentId="CTO" content={DUMMY_AGENT_MESSAGE} />
              <ChatBubble agentId="CMO" content={DUMMY_AGENT_MESSAGE} />
              <ChatBubble agentId="CPO" content={DUMMY_AGENT_MESSAGE} />
              <ChatBubble agentId="CFO" content={DUMMY_AGENT_MESSAGE} />

              <UserBubble content="Noo you have to make something else u r getting it wrong" />
              <div id="scroll-div" ref={scrollToDivRef}></div>
            </div>
          </ScrollArea>
        </div>
        <div className="user-prompt  flex justify-center">
          <div className="mobile-width fixed bottom-2">
            <PromptArea
              inputDisabled={false}
              value={userPrompt}
              onValueChange={handleInputChange}
              onClick={() => handleIntruption()}
              buttonLabel={""}
              buttonDisabled={userPrompt === ""}
              placeholder={"Intrupt the boardroom.."}
              showAgents={true}
            />
          </div>
        </div>
      </div>
    </>
  );
};

const BoardroomScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <BoardRoomSidebar />
      <div className="content-wrapper fixed-height">
        <Main />
      </div>
    </SidebarProvider>
  );
};

export default BoardroomScreen;
