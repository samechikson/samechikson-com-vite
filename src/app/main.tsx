import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Sidepanel from "./Sidepanel.tsx";
import React from "react";

const rootElement = document.getElementById("app");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Sidepanel />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
