import { agentClassBorder, type AgentsType } from "@/constants/contants";
import type React from "react";
import AgentMessage from "../agent-message.tsx/agent-message";

interface ChatBubbleProps {
  agentId: AgentsType;
  content: string;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ agentId, content }) => {
  return (
    <div
      className={`${agentClassBorder[agentId]} border p-2 rounded-md max-w-xl bg-card`}
    >
      <AgentMessage content={content}></AgentMessage>
    </div>
  );
};

export default ChatBubble;
