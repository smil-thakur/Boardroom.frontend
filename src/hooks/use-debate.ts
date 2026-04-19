import type {
  StartDebateModel,
  UserMessageModel,
} from "@/models/debate-models";
import { useDebateStore } from "@/stores/debate-store";
import { useSocketStore } from "@/stores/socket-store";
import { useUserStateStore } from "@/stores/user-state-store";
import { useCallback } from "react";

export const useDebate = () => {
  const setStartUpIdea = useDebateStore((state) => state.setStartUpIdea);
  const connect = useSocketStore((state) => state.connect);
  const send = useSocketStore((state) => state.send);
  const appendMessage = useDebateStore((state) => state.appendMessage);
  const setGeneratingAgent = useDebateStore(
    (state) => state.setGeneratingAgent,
  );
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

      const waitAndSent = setInterval(() => {
        const { status } = useSocketStore.getState();
        const { history: latestHistory } = useDebateStore.getState();
        const currentUser = useUserStateStore.getState().user;

        if (status === "open") {
          // Wrap in async to get the token
          (async () => {
            const token = await currentUser?.getIdToken();
            const startPayload: StartDebateModel = {
              type: "start_debate",
              start_up_idea: idea,
              user_id: currentUser?.uid || "anonymous",
              token: token,
              initial_history: latestHistory || undefined,
            };
            send(startPayload);
          })();
          clearInterval(waitAndSent);
        }
        if (status === "error" || status === "closed") {
          clearInterval(waitAndSent);
        }
      }, 50);
    },
    [setStartUpIdea, connect, handleMessages, send],
  );

  const sendUserMessage = useCallback(
    (content: string) => {
      const messagePayload: UserMessageModel = {
        type: "user_message",
        content: content,
      };

      appendMessage({
        agent_id: "User",
        message: content,
      });

      send(messagePayload);
    },
    [send, appendMessage],
  );

  return {
    startDebate,
    sendUserMessage,
  };
};
