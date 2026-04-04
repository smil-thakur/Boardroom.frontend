import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, SendHorizonal } from "lucide-react";
import type React from "react";
import type { BaseSyntheticEvent } from "react";
import AgentLiveAvatar from "../agent-live-avatar/agent-live-avatar";

interface PromptAreaProps {
  inputDisabled: boolean;
  value: string;
  onValueChange: (e: BaseSyntheticEvent) => void;
  onClick: () => void;
  buttonLabel: string;
  buttonDisabled: boolean;
  placeholder: string;
  showAgents?: boolean;
}

const PromptArea: React.FC<PromptAreaProps> = ({
  inputDisabled,
  value,
  onValueChange,
  onClick,
  buttonLabel,
  buttonDisabled,
  placeholder,
  showAgents = false,
}) => {
  return (
    <div className="flex flex-col w-full items-center gap-2 border-2 p-2 rounded-lg bg-background h-30">
      <Textarea
        disabled={inputDisabled}
        id="idea-input"
        value={value}
        onChange={onValueChange}
        placeholder={placeholder}
        className="max-h-32 z-1"
      />
      <div className="flex justify-between w-full">
        <div>
          <Button>
            <Mic />
          </Button>
        </div>
        {showAgents && <AgentLiveAvatar />}
        <div>
          <Button onClick={onClick} disabled={buttonDisabled}>
            {buttonLabel}
            <SendHorizonal />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptArea;
