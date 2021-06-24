import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import path from 'path'

export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src'),
      '@img': path.resolve(__dirname, '/img')
    }
  },
  base: '/typesty/',
  build: {
    outDir: 'docs'
  }
})
