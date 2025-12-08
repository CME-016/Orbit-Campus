
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // This tells Vite to handle client-side routing correctly on page reloads.
  appType: 'spa',
  plugins: [react()],
  server: {
    // Ensure the server is accessible on the network
    host: '0.0.0.0',
    port: 3000,
    proxy: {
      // Proxy API requests to the PHP backend running on XAMPP
      '/api': {
        // The target now correctly points to the 'php/api' folder inside your htdocs.
        target: 'http://localhost/php/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
