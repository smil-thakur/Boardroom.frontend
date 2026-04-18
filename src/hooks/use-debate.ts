import type { StartDebateModel } from "@/models/debate-models";
import { useDebateStore } from "@/stores/debate-store";
import { useSocketStore } from "@/stores/socket-store";
import { useCallback } from "react";

export const useDebate = () => {
  const setStartUpIdea = useDebateStore((state) => state.setStartUpIdea);
  const connect = useSocketStore((state) => state.connect);
  const send = useSocketStore((state) => state.send);
  const appendMessage = useDebateStore((state) => state.appendMessage);
  const setGeneratingAgent = useDebateStore((state) => state.setGeneratingAgent);
  const setError = useDebateStore((state) => state.setError);
  const disconnect = useSocketStore((state) => state.disconnect);
  
  const handleMessages = useCallback(
    (event: MessageEvent) => {
      try {
        const payload = JSON.parse(event.data);
        
        if (payload.type === "message") {
          appendMessage(payload.data);
          setGeneratingAgent(null); 
        } else if (payload.type === "status") {
          if (payload.status === "started") {
            setGeneratingAgent("Conductor");
          } else if (payload.status === "thinking") {
            setGeneratingAgent(payload.agent);
          } else if (payload.status === "completed") {
            setGeneratingAgent(null);
          }
        } else if (payload.type === "error") {
          setError(payload.message);
          setGeneratingAgent(null);
          disconnect();
        }
        console.log("Parsed signal:", payload);
      } catch (error) {
        console.error("Failed to parse websocket message:", error, event.data);
      }
    },
    [appendMessage, setGeneratingAgent, setError, disconnect],
  );
  const startDebate = useCallback(
    (idea: string) => {
      setStartUpIdea(idea);
      connect("ws://localhost:8000/api/v1/debate/ws/chat", (event) => {
        handleMessages(event);
      });
      const startDebate: StartDebateModel = {
        start_up_idea: idea,
      };
      const waitAndSent = setInterval(() => {
        const status = useSocketStore.getState().status;
        console.log("trying to send the data", status);
        if (status === "open") {
          send(startDebate);
          clearInterval(waitAndSent);
        }
        if (status === "error" || status === "closed") {
          clearInterval(waitAndSent);
        }
      }, 50);
    },
    [setStartUpIdea, connect, handleMessages, send],
  );
  return {
    startDebate,
  };
};
