import fs from "fs";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const httpsOptions = {
  key: fs.readFileSync("../localhost+2-key.pem"),
  cert: fs.readFileSync("../localhost+2.pem"),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    https: httpsOptions,
  },
});
