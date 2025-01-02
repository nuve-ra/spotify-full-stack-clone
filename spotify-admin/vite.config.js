import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5143,
    strictPort: true, // This ensures it only uses port 5143
    host: true // This allows access from other devices on the network
  }
})
