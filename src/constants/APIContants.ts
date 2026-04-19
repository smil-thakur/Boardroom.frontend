export const HEALTH_CHECK = "/utility/health";

export const HISTORY_BASE = "/history";

export const GET_USER_SESSIONS = (userId: string) => `/history/${userId}`;

export const GET_SESSION_DETAILS = (userId: string, ideaId: string) => 
  `/history/${userId}/${ideaId}`;
