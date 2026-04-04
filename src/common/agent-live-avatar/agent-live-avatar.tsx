import { agentClass, AGENTS } from "@/constants/contants";
import type React from "react";
import "./agent-live-avatar.scss";
import { Badge } from "@/components/ui/badge";
import { Spinner } from "@/components/ui/spinner";
import { useLiveAgentStore } from "@/stores/live-agent-store";

const AgentLiveAvatar: React.FC = () => {
  const activeAgent = useLiveAgentStore((state) => state.activeAgent);
  return (
    <div className="flex items-center gap-2">
      {AGENTS.map((agent) => {
        const isActive = activeAgent ? activeAgent === agent : false;
        return (
          <Badge variant="outline" className={agentClass[agent]}>
            {isActive && <Spinner data-icon="inline-start" />}
            {agent}
          </Badge>
        );
      })}
    </div>
  );
};

export default AgentLiveAvatar;
