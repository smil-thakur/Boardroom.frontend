import type { AgentsType } from "@/constants/contants";
import { create } from "zustand";

interface LiveAgentStoreModal {
  activeAgent: AgentsType | null;
  setActiveAgent: (activeAgent: AgentsType) => void;
  clearActiveAgent: () => void;
}

export const useLiveAgentStore = create<LiveAgentStoreModal>((set) => ({
  activeAgent: null,
  setActiveAgent: (activeAgent) => set({ activeAgent: activeAgent }),
  clearActiveAgent: () => set({ activeAgent: null }),
}));
