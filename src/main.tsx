import { createRoot } from "react-dom/client";
import "./index.css";
import GooglyDoc from "../Components/GooglyDoc.tsx";
import Home from "../Components/Home.tsx";

import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router";

let router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/:doc_id",
    Component: GooglyDoc,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
