import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite' // Ensure this import is correct

// https://vitejs.dev/config/
export default defineConfig({
  // *** Yeh line zaroori hai ***
  base: './', 

  plugins: [
    react(), 
    tailwindcss()
  ],
})