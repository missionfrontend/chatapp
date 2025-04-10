import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define:{
    "process.env.VITE_ORIGIN":JSON.stringify(process.env.VITE_ORIGIN),
    "process.env.VITE_SERVER":process.env.VITE_SERVER
  }
})
