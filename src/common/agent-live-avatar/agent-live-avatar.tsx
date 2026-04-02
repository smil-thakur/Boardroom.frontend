import { AGENTS } from "@/constants/contants";
import type { AgentId } from "@/stores/nav-store";
import type React from "react";
import "./agent-live-avatar.scss";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface AgentLiveAvatarProps {
  activeAgent: AgentId;
}

const AgentLiveAvatar: React.FC<AgentLiveAvatarProps> = ({ activeAgent }) => {
  return (
    <div className="flex items-center gap-2">
      {AGENTS.map((agent) => {
        const isActive = agent === activeAgent;

        return (
          <motion.div
            key={agent}
            initial={false}
            animate={
              isActive
                ? {
                    outline: "2px solid currentColor", // Ensure color and style are defined
                    outlineOffset: ["0px", "4px"], // Animates from 0 to 4
                  }
                : {
                    outline: "0px solid transparent",
                    outlineOffset: "0px",
                  }
            }
            transition={{
              outlineOffset: {
                duration: 0.4,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
              },
            }}
            className={cn(
              agent,
              isActive && "border",
              "px-2",
              "py-1",
              "rounded-md",
              "font-bold",
            )}
          >
            {agent}
          </motion.div>
        );
      })}
    </div>
  );
};

export default AgentLiveAvatar;
