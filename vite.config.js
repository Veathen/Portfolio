import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // One base setting keeps dev previews and GitHub Pages asset URLs consistent.
  base: "/Portfolio/",
  plugins: [react()],
});
