import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
    },
  ],
  {
    basename: "/qc",
  }
);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById("root")
);
