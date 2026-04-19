import Logo from "@/common/components/logo";
import {
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarFooter,
  Sidebar,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenu,
} from "../ui/sidebar";
import { History, MessageSquare, Loader2, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { useUserStateStore } from "@/stores/user-state-store";
import { useSessions, fetchSessionDetails, type Session } from "@/hooks/use-sessions";
import { useDebateStore, type AgentMessage } from "@/stores/debate-store";
import { useNavigate } from "react-router";
import { useState } from "react";

const BoardRoomSidebar = () => {
  const user = useUserStateStore((state) => state.user);
  const resetDebate = useDebateStore((state) => state.resetDebate);
  const setMessages = useDebateStore((state) => state.setMessages);
  const setHistory = useDebateStore((state) => state.setHistory);
  const setStartUpIdea = useDebateStore((state) => state.setStartUpIdea);
  const navigate = useNavigate();
  
  const [resumingId, setResumingId] = useState<string | null>(null);

  // Use shared session data from TanStack Query
  const { data: sessions = [], isLoading: loading } = useSessions();

  const handleNewIdea = () => {
    resetDebate();
    navigate("/");
  };

  const handleResume = async (session: Session) => {
    if (!user?.uid) return;
    setResumingId(session.id);
    try {
      const data = await fetchSessionDetails(user.uid, session.idea);
      
      // Hydrate state
      setMessages((data.chats as AgentMessage[]) || []);
      setHistory(data.history || []);
      setStartUpIdea(session.idea);
      
      // Navigate to boardroom
      navigate("/boardroom");
    } catch (error) {
      console.error("Failed to resume session from sidebar:", error);
    } finally {
      setResumingId(null);
    }
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex flex-row items-center justify-between pr-4">
        <Logo />
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 rounded-full bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-all"
          onClick={handleNewIdea}
          title="Start New Idea"
        >
          <Plus size={16} />
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
            <History size={14} />
            Recent Boardrooms
          </div>
          <SidebarMenu>
            {loading && (
               <div className="px-4 py-2 flex items-center gap-2 text-sm text-muted-foreground">
                 <Loader2 size={14} className="animate-spin" />
                 Loading...
               </div>
            )}
            {!loading && sessions.length === 0 && (
              <div className="px-4 py-2 text-sm text-muted-foreground italic">No past sessions found.</div>
            )}
            {sessions.map((session) => (
              <SidebarMenuItem key={session.id}>
                <SidebarMenuButton 
                  onClick={() => handleResume(session)}
                  disabled={resumingId === session.id}
                  className="w-full flex items-center gap-2"
                >
                  {resumingId === session.id ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <MessageSquare size={16} />
                  )}
                  <span className="truncate">{session.idea}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <Button variant="outline" className="w-full justify-start gap-2 h-10 px-3">
          <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold">
            {user?.displayName?.substring(0, 2).toUpperCase() || "U"}
          </div>
          <span className="truncate text-sm font-medium">{user?.displayName || "Profile Settings"}</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};

export default BoardRoomSidebar;
