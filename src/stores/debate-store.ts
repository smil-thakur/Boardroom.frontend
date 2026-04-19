import type { AgentsType } from "@/constants/contants";
import { create } from "zustand";

export interface AgentMessage {
  agent_id: AgentsType;
  message: string;
}

interface debateStore {
  agentID: AgentsType | null;
  messages: AgentMessage[];
  appendMessage: (message: AgentMessage) => void;
  setMessages: (messages: AgentMessage[]) => void;
  startUpIdea: string | null;
  setStartUpIdea: (idea: string) => void;
  generatingAgent: string | null;
  setGeneratingAgent: (agent: string | null) => void;
  error: string | null;
  setError: (error: string | null) => void;
  history: { agent: string; message: string }[] | null;
  setHistory: (history: { agent: string; message: string }[] | null) => void;
  resetDebate: () => void;
}

export const useDebateStore = create<debateStore>((set, get) => ({
  agentID: null,
  messages: [],
  appendMessage: (message) => {
    set({ messages: [...get().messages, message] });
  },
  setMessages: (messages) => {
    set({ messages });
  },
  startUpIdea: null,
  setStartUpIdea: (idea) => {
    set({ startUpIdea: idea });
  },
  generatingAgent: null,
  setGeneratingAgent: (agent) => set({ generatingAgent: agent }),
  error: null,
  setError: (error) => set({ error }),
  history: null,
  setHistory: (history) => set({ history }),
  resetDebate: () => {
    set({
      messages: [],
      startUpIdea: null,
      history: null,
      generatingAgent: null,
      error: null,
    });
  },
}));
