import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'spa-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url;

          // Dejar pasar assets, módulos virtuales de Vite y archivos con extensión
          if (
            url.startsWith('/@') ||
            url.startsWith('/node_modules') ||
            url.startsWith('/__vite') ||
            (url.includes('.') && !url.endsWith('/'))
          ) {
            return next();
          }

          // Redirigir raíz a mock1
          if (url === '/' || url === '') {
            res.writeHead(302, { Location: '/mock1/' });
            res.end();
            return;
          }

          // SPA rewrite: todas las rutas bajo /mock1/* → mock1.html
          if (url.startsWith('/mock1')) {
            req.url = '/mock1.html';
          } else if (url.startsWith('/mock2')) {
            req.url = '/mock2.html';
          } else if (url.startsWith('/mock3')) {
            req.url = '/mock3.html';
          }

          next();
        });
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        mock1: path.resolve(__dirname, 'mock1.html'),
        mock2: path.resolve(__dirname, 'mock2.html'),
        mock3: path.resolve(__dirname, 'mock3.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@shared': path.resolve(__dirname, 'src/shared'),
      '@mock1': path.resolve(__dirname, 'src/mock1'),
      '@mock2': path.resolve(__dirname, 'src/mock2'),
      '@mock3': path.resolve(__dirname, 'src/mock3'),
    },
  },
});
