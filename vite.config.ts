import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'mask-icon.svg'],
      manifest: {
        name: 'VEDIX - Digital Heritage Platform',
        short_name: 'VEDIX',
        description: 'Immersive digital heritage platform for Bharatiya Natya mudras',
        theme_color: '#FFA000',
        background_color: '#FFFFFF',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      }
    })
  ],
  optimizeDeps: {
    include: ['three', '@react-three/fiber', '@react-three/drei'],
    exclude: ['@mediapipe/hands', '@mediapipe/camera_utils']
  },
  build: {
    target: 'esnext',
    minify: 'esbuild',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          'gsap': ['gsap'],
          'mediapipe': ['@mediapipe/hands', '@mediapipe/camera_utils'],
        }
      }
    }
  }
});

