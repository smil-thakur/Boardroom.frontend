import ChatBubble from "@/common/chat-bubble/chat-bubble";
import PromptArea from "@/common/prompt-area/prompt-area";
import BoardRoomSidebar from "@/components/boardroom-sidebar/boardroom-sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { SquareChevronLeft, SquareChevronRight } from "lucide-react";
import React, {
  useEffect,
  useRef,
  useState,
  type BaseSyntheticEvent,
} from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatePresence, motion } from "motion/react";
import { useLiveAgentStore } from "@/stores/live-agent-store";
import { useDebateStore } from "@/stores/debate-store";
import LoadingBubble from "@/common/chat-bubble/loading-bubble";
import ErrorDialog from "@/components/error-dialog/error-dialog";
import MinimalBackground from "@/components/minimal-background/minimal-background";

const Main: React.FC = () => {
  const { open, toggleSidebar } = useSidebar();
  const [userPrompt, setUserPrompt] = useState<string>("");
  const setLiveAgent = useLiveAgentStore((state) => state.setActiveAgent);
  const scrollToDivRef = useRef<HTMLDivElement | null>(null);
  const handleInputChange = (e: BaseSyntheticEvent) => {
    const value = (e.target as HTMLTextAreaElement).value;
    setUserPrompt(value);
  };
  const messages = useDebateStore(state=>state.messages);
  const generatingAgent = useDebateStore(state=>state.generatingAgent);

  useEffect(()=>{console.log(messages)},[messages])

  const handleIntruption = () => {
    setUserPrompt("");
    setLiveAgent("CEO");
    console.log(userPrompt);
  };

  useEffect(() => {
    if (scrollToDivRef.current) {
      scrollToDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, generatingAgent]);

  return (
    <>
      <ErrorDialog />
      <MinimalBackground />
      <div className="flex flex-col h-full relative z-10">
        <Button variant="outline" size="icon" onClick={toggleSidebar}>
          {!open ? <SquareChevronRight /> : <SquareChevronLeft />}
        </Button>
        <div className="flex-1 flex flex-col">
          <ScrollArea className="w-full h-[calc(100vh-230px)]">
            <div className="flex flex-col gap-4 px-8 pt-4 pb-12">
              <AnimatePresence mode="popLayout">
                {
                  messages.map((value)=>(
                    <motion.div
                      key={`${value.agent_id}-${value.message.substring(0,20)}`}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                    >
                      <ChatBubble agentId={value.agent_id} content={value.message} />
                    </motion.div>
                  ))
                }
                
                {generatingAgent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                  >
                    <LoadingBubble agentName={generatingAgent} />
                  </motion.div>
                )}
              </AnimatePresence>

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
