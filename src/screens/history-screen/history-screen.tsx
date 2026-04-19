import { useState } from "react";
import { useUserStateStore } from "@/stores/user-state-store";
import { useDebateStore } from "@/stores/debate-store";
import type { AgentMessage } from "@/stores/debate-store";
import { useNavigate } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { History, MessageSquare, ArrowRight, Loader2, RefreshCcw } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { useSessions, fetchSessionDetails, type Session } from "@/hooks/use-sessions";

const HistoryScreen = () => {
  const user = useUserStateStore((state) => state.user);
  const setMessages = useDebateStore((state) => state.setMessages);
  const setHistory = useDebateStore((state) => state.setHistory);
  const setStartUpIdea = useDebateStore((state) => state.setStartUpIdea);
  const navigate = useNavigate();

  // Unified data fetching via TanStack Query
  const { data: sessions = [], isLoading: loading, refetch, isFetching } = useSessions();
  
  const [resumingId, setResumingId] = useState<string | null>(null);

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
      console.error("Failed to resume session:", error);
    } finally {
      setResumingId(null);
    }
  };

  return (
    <div className="container mx-auto py-8 md:py-12 px-4 max-w-5xl h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] overflow-hidden flex flex-col">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-primary/10 text-primary">
            <History size={32} />
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Meeting Minutes</h1>
            <p className="text-sm md:text-base text-muted-foreground">Revisit your previous boardroom debates.</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => refetch()} 
          disabled={isFetching}
          className="gap-2 w-full sm:w-auto"
        >
          <RefreshCcw size={16} className={isFetching ? "animate-spin" : ""} />
          Refresh
        </Button>
      </div>

      <ScrollArea className="flex-1 pr-0 md:pr-4">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="animate-spin text-primary" size={40} />
            <p className="text-muted-foreground">Fetching your archives...</p>
          </div>
        ) : sessions.length === 0 ? (
          <div className="text-center py-16 md:py-20 border-2 border-dashed rounded-3xl bg-muted/30 px-4">
            <MessageSquare className="mx-auto mb-4 text-muted-foreground" size={48} />
            <h3 className="text-xl font-medium">No sessions yet</h3>
            <p className="text-muted-foreground mb-6">Your startup journeys will appear here once you start your first boardroom.</p>
            <Button onClick={() => navigate("/")}>Start New Idea</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 pb-10 p-1">
            {sessions.map((session, index) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="group hover:border-primary/50 transition-all cursor-pointer border-border/40 bg-card/40 backdrop-blur-sm m-0.5">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-md md:text-lg truncate group-hover:text-primary transition-colors">
                      {session.idea}
                    </CardTitle>
                    <div className="text-[10px] md:text-xs text-muted-foreground flex items-center gap-1">
                      {new Date(session.last_updated).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div className="flex gap-2">
                         <div className="px-2 py-1 rounded-md bg-muted text-[10px] font-medium uppercase tracking-wider">
                           Archives
                         </div>
                      </div>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        className="group-hover:bg-primary group-hover:text-primary-foreground transition-all gap-2"
                        onClick={() => handleResume(session)}
                        disabled={resumingId === session.id}
                      >
                        {resumingId === session.id ? (
                          <Loader2 className="animate-spin" size={16} />
                        ) : (
                          <>
                            <span className="hidden xs:inline">Resume</span> <ArrowRight size={14} />
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default HistoryScreen;
