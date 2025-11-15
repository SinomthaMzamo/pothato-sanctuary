import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-github-username' and 'your-repo-name' with your actual values
export default defineConfig({
  plugins: [react()],
  base: '/pothato-sanctuary/'
})
