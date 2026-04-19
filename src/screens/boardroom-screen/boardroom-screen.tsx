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
} from "react";
// import { ScrollArea } from "@/components/ui/scroll-area"; // TEMPORARILY REMOVING TO DEBUG WITH NATIVE SCROLL
import { AnimatePresence, motion } from "motion/react";
import { useDebateStore } from "@/stores/debate-store";
import { useSocketStore } from "@/stores/socket-store";
import LoadingBubble from "@/common/chat-bubble/loading-bubble";
import ErrorDialog from "@/components/error-dialog/error-dialog";
import MinimalBackground from "@/components/minimal-background/minimal-background";
import { useDebate } from "@/hooks/use-debate";
import UsageLimitDialog from "@/components/usage-limit-dialog/usage-limit-dialog";

const Main: React.FC = () => {
  const { open, toggleSidebar } = useSidebar();
  const [userPrompt, setUserPrompt] = useState<string>("");
  const [showLimitDialog, setShowLimitDialog] = useState<boolean>(false);
  const scrollToDivRef = useRef<HTMLDivElement | null>(null);
  
  const { sendUserMessage, startDebate } = useDebate();
  const messages = useDebateStore((state) => state.messages);
  const startUpIdea = useDebateStore((state) => state.startUpIdea);
  const generatingAgent = useDebateStore((state) => state.generatingAgent);
  const socketStatus = useSocketStore((state) => state.status);

  const userMessagesCount = messages.filter(m => m.agent_id === "User").length;
  const isLimitReached = userMessagesCount >= 3;

  useEffect(() => {
    if (startUpIdea && (socketStatus === "idle" || socketStatus === "closed")) {
      startDebate(startUpIdea);
    }
  }, [startUpIdea, socketStatus, startDebate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement> | { target: { value: string } }) => {
    const value = e.target.value;
    setUserPrompt(value);
  };

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const handleSendMessage = () => {
    if (isLimitReached) {
      setShowLimitDialog(true);
      return;
    }
    if (userPrompt.trim()) {
      sendUserMessage(userPrompt);
      setUserPrompt("");
      setSelectedAgent(null); // Clear tag after sending
    }
  };

  const handleSelectAgent = (agentId: string) => {
    if (selectedAgent === agentId) {
      // Toggle OFF
      setSelectedAgent(null);
      setUserPrompt((prev) => prev.replace(`@${agentId} `, ""));
    } else {
      // Toggle ON (Replace existing tag if any)
      let currentPrompt = userPrompt;
      if (selectedAgent) {
        currentPrompt = currentPrompt.replace(`@${selectedAgent} `, "");
      }
      setSelectedAgent(agentId);
      setUserPrompt(`@${agentId} ${currentPrompt.trimStart()}`);
    }
  };

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollToDivRef.current) {
      scrollToDivRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, generatingAgent]);

  return (
    <div className="flex flex-col flex-1 h-full w-full relative z-10 overflow-hidden">
      <ErrorDialog />
      <MinimalBackground />
      <UsageLimitDialog 
        isOpen={showLimitDialog} 
        onClose={() => setShowLimitDialog(false)} 
        title="Question Limit Exhausted"
        description="You've reached your free tier question limit for this idea."
      />

      {/* Persistent Header */}
      <header className="flex-none flex items-center h-14 px-4 border-b border-border/10 bg-background/50 backdrop-blur-sm w-max">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar} 
          className="h-8 w-8"
        >
          {!open ? <SquareChevronRight size={20} /> : <SquareChevronLeft size={20} />}
        </Button>
        <h2 className="ml-4 text-sm font-semibold truncate text-muted-foreground uppercase tracking-tight">
          {startUpIdea || "In Session"}
        </h2>
      </header>

      {/* Main Chat Container - Native Scroll for maximum stability */}
      <main className="flex-1 w-full overflow-y-auto scroll-smooth custom-scrollbar">
        <div className="flex flex-col gap-6 px-4 sm:px-8 py-8 w-full max-w-4xl mx-auto min-h-full">
          <AnimatePresence mode="popLayout">
            {messages.map((value, index) => (
              <motion.div
                key={`${value.agent_id}-${index}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ChatBubble agentId={value.agent_id} content={value.message} />
              </motion.div>
            ))}

            {generatingAgent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingBubble agentName={generatingAgent} />
              </motion.div>
            )}
          </AnimatePresence>
          {/* Invisible element to scroll into view */}
          <div ref={scrollToDivRef} />
        </div>
      </main>

      {/* Floating Prompt Area Container */}
      <footer className="flex-none p-4 md:p-6 w-full flex justify-center bg-linear-to-t from-background via-background/90 to-transparent">
        <div className="w-full max-w-3xl">
          <PromptArea
            inputDisabled={!!generatingAgent}
            value={userPrompt}
            onValueChange={handleInputChange}
            onClick={handleSendMessage}
            onSelectAgent={handleSelectAgent}
            selectedAgent={selectedAgent}
            buttonLabel={isLimitReached ? "Limit" : "Send"}
            buttonDisabled={userPrompt.trim() === "" || !!generatingAgent}
            placeholder={
              isLimitReached 
                ? "Switch ideas to keep going!" 
                : (generatingAgent ? "Board thinking..." : "Ask @CEO, @CTO...")
            }
            showAgents={!isLimitReached}
          />
        </div>
      </footer>
    </div>
  );
};

const BoardroomScreen = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <SidebarProvider open={sidebarOpen} onOpenChange={setSidebarOpen}>
      <BoardRoomSidebar />
      <div className="content-wrapper flex flex-col p-0 overflow-hidden h-dvh pt-[44px] mt-0">
        <Main />
      </div>
    </SidebarProvider>
  );
};

export default BoardroomScreen;
