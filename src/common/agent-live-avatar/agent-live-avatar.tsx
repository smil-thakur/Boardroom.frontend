import { agentClass, AGENTS } from "@/constants/contants";
import type React from "react";
import "./agent-live-avatar.scss";
import { Badge } from "@/components/ui/badge";

interface AgentLiveAvatarProps {
  onSelectAgent?: (agentId: string) => void;
  selectedAgent?: string | null;
}

const AgentLiveAvatar: React.FC<AgentLiveAvatarProps> = ({ onSelectAgent, selectedAgent }) => {
  const executiveAgents = AGENTS.filter(agent => agent !== "User");

  return (
    <div className="flex flex-wrap items-center gap-2">
      {executiveAgents.map((agent) => {
        const isSelected = selectedAgent === agent;
        return (
          <Badge 
            key={agent}
            variant="outline" 
            className={`
              ${agentClass[agent]} 
              cursor-pointer 
              transition-all 
              duration-200 
              select-none
              py-1 px-2.5
              hover:scale-105 
              active:scale-95
              ${isSelected ? "ring-2 ring-primary ring-offset-2 ring-offset-background scale-105 font-bold border-primary shadow-sm" : "opacity-80 hover:opacity-100"}
            `}
            onClick={() => onSelectAgent?.(agent)}
          >
            {agent}
          </Badge>
        );
      })}
    </div>
  );
};

export default AgentLiveAvatar;
