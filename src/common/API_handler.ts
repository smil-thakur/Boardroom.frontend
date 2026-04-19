import axios, { type AxiosRequestConfig } from "axios";

// Helper to ensure base URL has the correct prefix
const getBaseURL = () => {
  const envURL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  // If the envURL doesn't end with /api/v1, append it
  if (!envURL.includes("/api/v1")) {
    return `${envURL.replace(/\/$/, "")}/api/v1`;
  }
  return envURL;
};

// Create an axios instance for centralized configuration
const backend = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach the Firebase ID Token
import { auth } from "@/firebase/intialize-firebase";
backend.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const token = await user.getIdToken();
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Generic API Handler to replace ad-hoc fetch calls.
 * @template T - The expected response data type
 * @template D - The request body data type
 */
export const API_handler = async <T, D = void>(
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: D,
  config?: AxiosRequestConfig<D>,
): Promise<T> => {
  try {
    const response = await backend.request<T>({
      method,
      url,
      data,
      ...config,
    });
    return response.data;
  } catch (error: unknown) {
    let errorMessage = "An unknown error occurred";
    if (axios.isAxiosError(error)) {
      errorMessage = error.response?.data || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    console.error(`API Error [${method.toUpperCase()} ${url}]:`, errorMessage);
    throw error;
  }
};

export default backend;
