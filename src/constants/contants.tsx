export const AGENTS = ["CEO", "CFO", "CMO", "CTO", "CPO", "User"];
export type AgentsType = "CEO" | "CFO" | "CMO" | "CTO" | "CPO" | "User";
export const boardRoomDetails = ["MOM", "Summary", "Sticky Notes", "Analysis"];
export const agentClass: Record<string, string> = {
  CEO: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800",
  CFO: "bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800",
  CTO: "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:border-blue-800",
  CPO: "bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800",
  CMO: "bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950 dark:text-rose-300 dark:border-rose-800",
  User: "bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700",
};
export const agentClassBorder: Record<string, string> = {
  CEO: "border-amber-200 dark:border-amber-800",
  CFO: "border-green-200 dark:border-green-800",
  CTO: "border-blue-200 dark:border-blue-800",
  CPO: "border-violet-200 dark:border-violet-800",
  CMO: "border-rose-200 dark:border-rose-800",
  User: "border-slate-200 dark:border-slate-700",
};
