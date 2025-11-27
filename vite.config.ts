import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { tanstackRouter } from '@tanstack/router-plugin/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    //as per recommendation in https://tanstack.com/router/v6/docs/integrations/vite
    tanstackRouter({
      target: 'react',
      autoCodeSplitting: true,
    }),

    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path, // Keep the /api path as-is
      },
    },
  },
});
