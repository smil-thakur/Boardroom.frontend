import { create } from "zustand";

export type AgentId = "CEO" | "CTO" | "CFO" | "CPO" | "CMO" | null;

export interface NavAgentModel {
  type: "agents";
  activeAgent: AgentId;
}

export type NavContent = NavAgentModel | { type: "demo" } | null;

interface NavStore {
  content: NavContent;
  setContent: (content: NavContent) => void;
  clearContent: () => void;
}

export const useNavbarStore = create<NavStore>((set) => ({
  content: null,
  setContent: (content) => set({ content }),
  clearContent: () => set({ content: null }),
}));
