import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    manifest: true,
    cssCodeSplit: false,
    rollupOptions: {
      watch: {
        include: 'src/**',
        exclude: 'node_modules/**',
        buildDelay: 100,
        clearScreen: true
      },
      output: {
        entryFileNames: 'bundle.js',
        assetFileNames: 'bundle.[ext]'
      },
    },
  },
  plugins: [react()],
})
