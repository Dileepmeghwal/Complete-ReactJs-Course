import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default () => {
  return defineConfig({
    plugins: [react()],
    optimizeDeps: {
      include: ["redux-thunk"],
    },
  });
};
