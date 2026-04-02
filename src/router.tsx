import { createBrowserRouter } from "react-router";
import App from "./App";
import WelcomeScreen from "./screens/welcome-screen/welcome-screen";
import BoardroomScreen from "./screens/boardroom-screen/boardroom-screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomeScreen />,
      },
      {
        path: "/boardroom",
        element: <BoardroomScreen />,
      },
    ],
  },
]);

export default router;
