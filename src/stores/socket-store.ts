import { create } from "zustand";

type SocketStatus = "idle" | "connecting" | "open" | "closed" | "error";

interface SocketStoreModel {
  socket: WebSocket | null;
  status: SocketStatus;
  connect: (url: string, onMessage: (event: MessageEvent) => void) => void;
  disconnect: () => void;
  send: (data: object) => void;
}

export const useSocketStore = create<SocketStoreModel>((set, get) => ({
  socket: null,
  status: "idle",

  connect: (url, onMessage) => {
    get().disconnect();

    set({ status: "connecting" });
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log("ws is opened");
      set({ status: "open" });
    };

    ws.onmessage = onMessage;

    ws.onerror = () => {
      set({ status: "error" });
    };

    ws.onclose = () => {
      set({ socket: null, status: "closed" });
    };

    set({ socket: ws });
  },

  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.close();
      set({ socket: null, status: "idle" });
    }
  },

  send: (data) => {
    const { socket, status } = get();
    if (socket && status === "open") {
      socket.send(JSON.stringify(data));
    } else {
      console.warn("Socket not open - cannot send");
    }
  },
}));
