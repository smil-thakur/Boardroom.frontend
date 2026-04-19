import {
  agentClass,
  agentClassBorder,
  type AgentsType,
} from "@/constants/contants";
import type React from "react";
import AgentMessage from "../agent-message.tsx/agent-message";

interface ChatBubbleProps {
  agentId: AgentsType;
  content: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ agentId, content }) => {
  const isUser = agentId === "User";

  return (
    <div
      className={`flex flex-col gap-1.5 mb-2 group ${
        isUser ? "items-end" : "items-start"
      }`}
    >
      <div
        className={`${
          agentClass[agentId]
        } w-fit px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border shadow-sm`}
      >
        {agentId}
      </div>
      <div
        className={`${agentClassBorder[agentId]} border p-4 rounded-2xl ${
          isUser ? "rounded-tr-none" : "rounded-tl-none"
        } max-w-xl bg-card/70 backdrop-blur-md shadow-sm transition-all hover:shadow-lg hover:shadow-${
          agentId === "CEO"
            ? "amber"
            : agentId === "CFO"
              ? "green"
              : agentId === "CTO"
                ? "blue"
                : agentId === "CMO"
                  ? "rose"
                  : agentId === "CPO"
                    ? "violet"
                    : "slate"
        }-500/10`}
      >
        <AgentMessage content={content}></AgentMessage>
      </div>
    </div>
  );
};

export default ChatBubble;
