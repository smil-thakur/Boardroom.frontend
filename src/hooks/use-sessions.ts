import { useQuery } from "@tanstack/react-query";
import { API_handler } from "@/common/API_handler";
import { GET_USER_SESSIONS, GET_SESSION_DETAILS } from "@/constants/APIContants";
import { useUserStateStore } from "@/stores/user-state-store";
import type { AgentMessage } from "@/stores/debate-store";

export interface Session {
  id: string;
  idea: string;
  last_updated: string;
}

interface SessionsResponse {
  sessions: Session[];
}

export interface SessionDetailsResponse {
  chats: AgentMessage[];
  history: { agent: string; message: string }[];
}

export const useSessions = () => {
  const user = useUserStateStore((state) => state.user);

  return useQuery({
    queryKey: ["sessions", user?.uid],
    queryFn: async () => {
      if (!user?.uid) return [];
      const data = await API_handler<SessionsResponse>("get", GET_USER_SESSIONS(user.uid));
      return data.sessions;
    },
    enabled: !!user?.uid,
    staleTime: 1000 * 60 * 5, // 5 minutes
    
    // Stability fixes
    refetchOnWindowFocus: false, // Stop re-fetching every time user clicks back to tab
    retry: 1, // Only retry once on failure to prevent infinite loops on 404s
  });
};

export const fetchSessionDetails = async (userId: string, ideaId: string) => {
  return await API_handler<SessionDetailsResponse>("get", GET_SESSION_DETAILS(userId, ideaId));
};
