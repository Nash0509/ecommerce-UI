// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://ec2-15-207-71-186.ap-south-1.compute.amazonaws.com',
        changeOrigin: true,
      },
    },
  },
});
