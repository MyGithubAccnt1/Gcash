import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Index from "./views/index/Index";
import Notfound from "./views/Notfound";
import "./index.css";
import CanbanBoard from "./views/canban/index";
import Settings from "./views/settings";

const baseName = import.meta.env.MODE === "development" ? "/" : "/Gcash";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <Notfound />,
      children: [
        {
          index: true,
          element: <Index />,
        },
        {
          path: "kanban-board",
          element: <CanbanBoard />,
        },
        {
          path: "account-setting",
          element: <Settings />,
        },
      ],
    },
    {
      path: "*",
      element: <Notfound />,
    },
  ],
  {
    basename: baseName,
  }
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
