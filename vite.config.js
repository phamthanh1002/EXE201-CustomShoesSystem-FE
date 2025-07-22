import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('antd')) return 'vendor-antd';
            if (id.includes('lodash')) return 'vendor-lodash';
            if (id.includes('redux')) return 'vendor-redux';
            if (id.includes('leaflet')) return 'vendor-leaflet';
            if (id.includes('chart.js') || id.includes('react-chartjs')) return 'vendor-chartjs';
            if (id.includes('xlsx')) return 'vendor-xlsx';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('react-toastify')) return 'vendor-toastify';
            return 'vendor';
          }
        },
      },
    },
  },
});
