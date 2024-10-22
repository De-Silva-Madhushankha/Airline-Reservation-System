import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Change to a different port if needed
    host: 'localhost', // Ensure it binds to localhost
  },
  css: {
    postcss: './postcss.config.js',
  },
})

