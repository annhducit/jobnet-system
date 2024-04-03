import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  plugins: [
    react(),
    federation({
      name: 'Post',
      remotes: {
        Business: 'http://localhost:3012/assets/remoteEntry.js',
        Common: 'http://localhost:3014/assets/remoteEntry.js',
        User: 'http://localhost:3013/assets/remoteEntry.js',
      },
      exposes: {
        './FavoritePosts': './src/remoteComponents/JS/FavoritePosts.tsx',
        './FeatureJobs': './src/remoteComponents/JS/FeatureJobs.tsx',
        './PostsSearch': './src/remoteComponents/JS/PostsSearch.tsx',
        './HiringPosts': './src/remoteComponents/JS/HiringPosts.tsx',
        './PostsApplied': './src/remoteComponents/JS/PostsApplied.tsx',
        './Post': './src/remoteComponents/JS/Post.tsx',

        './RC/ManagePosts': './src/remoteComponents/RC/ManagePosts.tsx',
        './RC/CreatePost': './src/remoteComponents/RC/CreatePost.tsx',

        './AD/ADPostComponent': './src/remoteComponents/AD/ADPostComponent.tsx',
        './AD/AdminPostDetail': './src/remoteComponents/AD/AdminPostDetail.tsx',
        './AD/CategoriesManagement':
          './src/remoteComponents/AD/CategoriesManagement.tsx',
        './AD/LevelsBenefitsManagement':
          './src/remoteComponents/AD/LevelsBenefitsManagement.tsx',
        './AD/ProfessionsManagement':
          './src/remoteComponents/AD/ProfessionsManagement.tsx',

        './services': './src/services/postService.ts',
        './Wishlist': './src/services/wishlistService.ts',
        './Category': './src/services/categoryService.ts',
        './Application': './src/services/applicationService.ts',
        './Profession': './src/services/professionService.ts',
        './Evaluation': './src/services/evaluationService.ts',
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
