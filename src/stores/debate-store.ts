import type { AgentsType } from "@/constants/contants";
import { create } from "zustand";

interface agentMessage {
  agent_id: AgentsType;
  message: string;
}

interface debateStore {
  agentID: AgentsType | null;
  messages: agentMessage[];
  appendMessage: (message: agentMessage) => void;
  startUpIdea: string | null;
  setStartUpIdea: (idea: string) => void;
  generatingAgent: string | null;
  setGeneratingAgent: (agent: string | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

export const useDebateStore = create<debateStore>((set, get) => ({
  agentID: null,
  messages: [],
  appendMessage: (message) => {
    set({ messages: [...get().messages, message] });
  },
  startUpIdea: null,
  setStartUpIdea: (idea) => {
    set({ startUpIdea: idea });
  },
  generatingAgent: null,
  setGeneratingAgent: (agent) => set({ generatingAgent: agent }),
  error: null,
  setError: (error) => set({ error }),
}));
