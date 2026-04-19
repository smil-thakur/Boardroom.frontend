export interface StartDebateModel {
  type: "start_debate";
  start_up_idea: string;
  user_id: string;
  token: string | undefined;
  initial_history?: { agent: string; message: string }[];
}

export interface UserMessageModel {
  type: "user_message";
  content: string;
}

export type IncomingMessage = StartDebateModel | UserMessageModel;
