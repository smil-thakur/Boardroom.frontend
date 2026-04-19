import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Mic, MicOff, SendHorizonal } from "lucide-react";
import { useState, useMemo, useEffect, useRef } from "react";
import type React from "react";
import AgentLiveAvatar from "../agent-live-avatar/agent-live-avatar";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CustomValueEvent {
  target: {
    value: string;
  };
}

interface PromptAreaProps {
  inputDisabled: boolean;
  value: string;
  onValueChange: (e: React.ChangeEvent<HTMLTextAreaElement> | CustomValueEvent) => void;
  onClick: () => void;
  buttonLabel: string;
  buttonDisabled: boolean;
  placeholder: string;
  showAgents?: boolean;
  onSelectAgent?: (agentId: string) => void;
  selectedAgent?: string | null;
}

// Minimal types for SpeechRecognition to avoid 'any'
interface SpeechRecognitionEvent extends Event {
  results: {
    [key: number]: {
      [key: number]: {
        transcript: string;
      };
    };
    length: number;
  };
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognitionInstance extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  onend: () => void;
  start: () => void;
  stop: () => void;
}

const WORD_LIMIT = 256;

const PromptArea: React.FC<PromptAreaProps> = ({
  inputDisabled,
  value,
  onValueChange,
  onClick,
  buttonLabel,
  buttonDisabled,
  placeholder,
  showAgents = false,
  onSelectAgent,
  selectedAgent,
}) => {
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionInstance | null>(null);

  const wordCount = useMemo(() => {
    return value.trim().split(/\s+/).filter(Boolean).length;
  }, [value]);

  const isOverLimit = wordCount > WORD_LIMIT;

  useEffect(() => {
    const SpeechRecognition = 
      (window as any).SpeechRecognition || 
      (window as any).webkitSpeechRecognition;
    
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition() as SpeechRecognitionInstance;
      recognition.continuous = true;
      recognition.interimResults = true;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = Array.from({ length: event.results.length })
          .map((_, i) => event.results[i][0].transcript)
          .join("");
        
        onValueChange({ target: { value: transcript } });
      };

      recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        
        if (event.error === "not-allowed") {
          toast.error("Microphone Access Denied", {
            description: "Please enable microphone permissions in your browser settings."
          });
        } else if (event.error === "network") {
          toast.error("Network Error", {
            description: "Browser speech service is unreachable. Check your internet connection or use a different browser (Chrome/Safari recommended)."
          });
        } else if (event.error === "no-speech") {
          toast.warning("No speech detected", {
            description: "We couldn't hear you. Please try again."
          });
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onValueChange]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      toast.error("Not Supported", {
        description: "Speech recognition is not supported in this browser."
      });
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (e) {
        console.error("Failed to start recognition:", e);
        setIsListening(false);
      }
    }
  };

  return (
    <div className={cn(
      "flex flex-col w-full gap-3 p-3 md:p-4 rounded-2xl border bg-card/80 backdrop-blur-md shadow-lg transition-all",
      isOverLimit ? "border-destructive/50 ring-1 ring-destructive/20" : "border-border"
    )}>
      <Textarea
        disabled={inputDisabled}
        id="idea-input"
        value={value}
        onChange={onValueChange}
        placeholder={placeholder}
        className="min-h-[80px] md:min-h-[100px] max-h-48 z-1 border-none focus-visible:ring-0 text-md md:text-lg resize-none bg-transparent"
      />
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 flex-1">
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              type="button"
              onClick={toggleListening}
              className={cn(
                "rounded-full h-10 w-10 transition-all duration-300",
                isListening 
                  ? "bg-primary text-primary-foreground animate-pulse shadow-lg shadow-primary/20" 
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </Button>
            <div className={cn(
              "text-[10px] md:text-xs font-medium px-2 py-0.5 rounded-full transition-colors",
              isOverLimit 
                ? "bg-destructive/10 text-destructive animate-bounce" 
                : "bg-muted text-muted-foreground"
            )}>
              {wordCount} / {WORD_LIMIT} words
            </div>
          </div>
          {showAgents && (
            <div className="hidden sm:block">
              <AgentLiveAvatar onSelectAgent={onSelectAgent} selectedAgent={selectedAgent} />
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          {showAgents && (
            <div className="sm:hidden">
              <AgentLiveAvatar onSelectAgent={onSelectAgent} selectedAgent={selectedAgent} />
            </div>
          )}
          <Button 
            onClick={onClick} 
            disabled={buttonDisabled || isOverLimit}
            className="rounded-xl px-5 h-10 md:h-11 font-semibold transition-all active:scale-95 flex gap-2"
          >
            {buttonLabel && <span className="hidden sm:inline">{buttonLabel}</span>}
            <SendHorizonal size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PromptArea;
