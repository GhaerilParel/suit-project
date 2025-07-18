import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/suitapi': {
        target: 'https://suitmedia-backend.suitdev.com',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/suitapi/, '/api'), // tetap pakai /api
      },
    },
  },
});
