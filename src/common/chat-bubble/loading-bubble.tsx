import React from "react";

interface LoadingBubbleProps {
  agentName: string | null;
}

const LoadingBubble: React.FC<LoadingBubbleProps> = ({ agentName }) => {
  return (
    <div className="flex flex-col gap-1.5 p-4 border border-border/50 rounded-2xl rounded-tl-none max-w-sm bg-card/50 backdrop-blur-md shadow-sm relative overflow-hidden group">
      <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite] group-hover:via-white/10" />
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce"></div>
        </div>
        <span className="text-xs font-medium text-muted-foreground italic flex items-center gap-1">
          <span className="text-primary/80 font-semibold not-italic capitalize">{agentName || "An agent"}</span>
          is assessing...
        </span>
      </div>
    </div>
  );
};

export default LoadingBubble;
