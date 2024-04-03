import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  envDir:"../",
  plugins: [
    react(),
    federation({
      name: 'Business',
      remotes: {
        User: 'http://localhost:3013/assets/remoteEntry.js',
        Common: 'http://localhost:3014/assets/remoteEntry.js',
      },
      exposes: {
        './services': './src/services/businessService.ts',
        './components/Businesses': './src/remoteComponents/Businesses.tsx',
        './components/Business': './src/remoteComponents/Business.tsx',
        './components/BusinessesSlider':
          './src/remoteComponents/BusinessesSlider.tsx',
        './RC/Business': './src/remoteComponents/RC/Business.tsx',

        './AD/ADBusinessDetail':
          './src/remoteComponents/AD/ADBusinessDetail.tsx',
        './AD/AdminBusinesses': './src/remoteComponents/AD/AdminBusinesses.tsx',
      },
      shared: [
        'react',
        'react-dom',
        'react-router-dom',
        'i18next',
        'react-i18next',
        'axios',
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
