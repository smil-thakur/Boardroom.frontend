import axios from "axios";

export const API_handler = async (
  type: "get" | "post",
  api_url: string,
  req: Record<string, unknown> | null = null,
) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  switch (type) {
    case "get":
      return await axios.get(backendURL + api_url);
    case "post":
      return await axios.post(backendURL + api_url, req);
    default:
      break;
  }
};
