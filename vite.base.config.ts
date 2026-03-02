import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export const viteBaseConfig = defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/react-booking-system/' : '/',
  server: {
    port: 5173,
  },
}));
