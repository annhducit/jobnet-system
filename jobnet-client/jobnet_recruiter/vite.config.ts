import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  plugins: [
    react(),
    federation({
      name: 'Recruiter',
      remotes: {
        Post: 'http://localhost:3011/assets/remoteEntry.js',
        Business: 'http://localhost:3012/assets/remoteEntry.js',
        User: 'http://localhost:3013/assets/remoteEntry.js',
        Common: 'http://localhost:3014/assets/remoteEntry.js',
      },
      exposes: {
        './auth': './src/utils/auth.ts',
        './loading': './src/utils/loading.ts',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        'i18next',
        'react-i18next',
        'react-redux',
        'flowbite',
        'flowbite-react',
      ],
    }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
})
