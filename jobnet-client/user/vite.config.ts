import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import federation from '@originjs/vite-plugin-federation'

// https://vitejs.dev/config/
export default defineConfig({
  envDir: '../',
  plugins: [
    react(),
    federation({
      name: 'User',
      remotes: {
        Business: 'http://localhost:3012/assets/remoteEntry.js',
        Post: 'http://localhost:3011/assets/remoteEntry.js',
        Common: 'http://localhost:3014/assets/remoteEntry.js',
      },
      exposes: {
        './AuthHeaderComponent':
          './src/remoteComponents/AuthHeaderComponent.tsx',
        './JSSettings': './src/remoteComponents/JSSettings.tsx',

        './RC/Campaigns': './src/remoteComponents/RC/Campaigns.tsx',
        './RC/Appliciant': './src/remoteComponents/RC/Appliciants.tsx',
        './RC/AuthHeaderRC': './src/remoteComponents/RC/AuthHeaderRC.tsx',

        './AD/ADJobSeekerDetail':
          './src/remoteComponents/AD/ADJobSeekerDetail.tsx',
        './AD/ADRecruiterDetail':
          './src/remoteComponents/AD/ADRecruiterDetail.tsx',
        './AD/ADRecruiters': './src/remoteComponents/AD/ADRecruiter.tsx',
        './AD/ADJobseekers': './src/remoteComponents/AD/ADJobseekers.tsx',

        './Profile': './src/remoteComponents/Profile.tsx',
        './JobSeeker/services': './src/services/jobSeekerService.ts',
        './Recruiter/services': './src/services/recruiterService.ts',
        './Noftification': './src/services/notificationService.ts',
        './Resume': './src/services/resumeService.ts',
        './Registration': './src/services/registrationService.ts',
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
