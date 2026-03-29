import { createBrowserRouter } from "react-router";
import App from "./App";
import WelcomeScreen from "./screens/welcome-screen/welcome-screen";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <WelcomeScreen />,
      },
    ],
  },
]);

export default router;
