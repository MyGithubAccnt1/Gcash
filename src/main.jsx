import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from "./App";
import Home from "./pages/home";
import Notfound from "./pages/Notfound";
import "./index.css";

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