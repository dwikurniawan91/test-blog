import { defineConfig } from "vite";
import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ command }) => {
  const plugins = [tailwindcss(), reactRouter(), tsconfigPaths()];

  if (command === 'build') {
    return {
      base: '/test-blog/',
      plugins,
    };
  } else {
    return {
      plugins,
    };
  }
});

