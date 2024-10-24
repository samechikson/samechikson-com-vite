import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Sidepanel from "./Sidepanel.tsx";
import { Analytics } from "@vercel/analytics/react";
import React from "react";
import Experience from "./Experience.tsx";

const rootElement = document.getElementById("app");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <Sidepanel />
      <Experience />
      <Analytics />
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
