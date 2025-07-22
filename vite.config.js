import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Use object syntax instead of function - safer for React
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-antd': ['antd', '@ant-design/icons'],
          'vendor-redux': ['@reduxjs/toolkit', 'react-redux'],
          'vendor-charts': ['chart.js', 'react-chartjs-2'],
          'vendor-motion': ['framer-motion'],
          'vendor-leaflet': ['leaflet', 'react-leaflet'],
          'vendor-utils': ['lodash', 'axios', 'dayjs'],
        },
      },
    },
  },
});
