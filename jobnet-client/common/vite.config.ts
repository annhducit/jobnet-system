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
        Post: 'http://localhost:3011/assets/remoteEntry.js',
        Business: 'http://localhost:3012/assets/remoteEntry.js',
        Jobnet: 'http://localhost:3000/assets/remoteEntry.js',
        Jobnet_recruiter: 'http://localhost:3001/assets/remoteEntry.js',
        Jobnet_admin: 'http://localhost:3002/assets/remoteEntry.js',
      },
      exposes: {
        './input/Checkbox': './src/components/input/Checkbox.tsx',
        './input/DateInput': './src/components/input/DateInput.tsx',
        './input/Input': './src/components/input/Input.tsx',
        './input/ListInput': './src/components/input/ListInput.tsx',
        './input/LocationInput': './src/components/input/LocationInput.tsx',
        './input/Radio': './src/components/input/Radio.tsx',
        './input/Select': './src/components/input/Select.tsx',
        './input/Selection': './src/components/input/Selection.tsx',
        './input/TagsInput': './src/components/input/TagsInput.tsx',
        './input/Textarea': './src/components/input/Textarea.tsx',

        './skeleton/JobItem': './src/components/skeleton/JobItem.tsx',
        './skeleton/JobItemSkeleton':
          './src/components/skeleton/JobItemSkeleton.tsx',
        './skeleton/LoadingSkeleton':
          './src/components/skeleton/LoadingSkeleton.tsx',
        './skeleton/RCJobItem': './src/components/skeleton/RCJobItem.tsx',
        './skeleton/SkeletonItem': './src/components/skeleton/SkeletonItem.tsx',
        './skeleton/BusinessCard': './src/components/skeleton/BusinessCard.tsx',
        './skeleton/BusinessItem': './src/components/skeleton/BusinessItem.tsx',

        './table/EmptyTableRow': './src/components/table/EmptyTableRow.tsx',
        './table/Table': './src/components/table/Table.tsx',
        './table/TableBody': './src/components/table/TableBody.tsx',
        './table/TableFooter': './src/components/table/TableFooter.tsx',
        './table/TableHeader': './src/components/table/TableHeader.tsx',

        './auth': './src/utils/auth.ts',
        './setLoad': './src/utils/loading.ts',

        './Button': './src/components/Button.tsx',
        './ChatPlugin': './src/components/ChatPlugin.tsx',
        './Dropdown': './src/components/Dropdown.tsx',
        './EmptyData': './src/components/EmptyData.tsx',
        './FileUpload': './src/components/FileUpload.tsx',
        './Footer': './src/components/Footer.tsx',
        './InfoSection': './src/components/InfoSection.tsx',
        './ItemPostHeading': './src/components/ItemPostHeading.tsx',
        './JobItem': './src/components/JobItem.tsx',
        './LanguageSelector': './src/components/LanguageSelector.tsx',
        './Loading': './src/components/Loading.tsx',
        './Modal': './src/components/Modal.tsx',
        './ModalForm': './src/components/ModalForm.tsx',
        './Pagination': './src/components/Pagination.tsx',
        './PostDetailInfo': './src/components/PostDetailInfo.tsx',
        './SideBar': './src/components/Sidebar.tsx',
        './Slider': './src/components/Slider.tsx',
        './SubFooter': './src/components/SubFooter.tsx',
        './Tabs': './src/components/Tabs.tsx',
        './Tag': './src/components/Tag.tsx',
        './TinyEditor': './src/components/TinyEditor.tsx',
        './Toggle': './src/components/Toggle.tsx',
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
