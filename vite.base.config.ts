import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export const viteBaseConfig = defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
  },
});
