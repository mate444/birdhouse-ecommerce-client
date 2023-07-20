import { defineConfig, splitVendorChunkPlugin } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      parserOpts: {
        plugins: ["decorators-legacy", "classProperties"]
      }
    }
  }), splitVendorChunkPlugin()],
  server: {
    port: 3001
    },
    build: {
        chunkSizeWarningLimit: 1000
    }
});
