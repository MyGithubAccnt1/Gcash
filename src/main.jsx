import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App";
import Home from "./views/home";
import Notfound from "./views/Notfound";
import "./index.css";
import CanbanBoard from "./views/canban/index";

const baseName = import.meta.env.MODE === "development" ? "/" : "/Gcash";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    errorElement: <Notfound/>,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: 'canban',
        element: <CanbanBoard/>
      }
    ]
  },
  {
    path: '*',
    element: <Notfound/>
  }
], {
  basename: baseName
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);