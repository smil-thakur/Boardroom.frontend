import { createHashRouter } from "react-router";
import App from "../App";
import WelcomeScreen from "../screens/welcome-screen/welcome-screen";
import BoardroomScreen from "../screens/boardroom-screen/boardroom-screen";
import LoginScreen from "../screens/login-screen/login-screen";
import ProtectedRoute from "./protected-route";
import RegisterScreen from "@/screens/login-screen/register-screen";
import LoginRoutes from "./login-routes";

import HistoryScreen from "../screens/history-screen/history-screen";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        element: <LoginRoutes />,
        children: [
          {
            path: "/login",
            element: <LoginScreen />,
          },
          {
            path: "/register",
            element: <RegisterScreen />,
          },
        ],
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            index: true,

            element: <WelcomeScreen />,
          },
          {
            path: "/boardroom",
            element: <BoardroomScreen />,
          },
          {
            path: "/history",
            element: <HistoryScreen />,
          },
        ],
      },
    ],
  },
]);

export default router;
