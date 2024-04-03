import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './app/i18n.ts'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <App />
      <ToastContainer />
  </React.StrictMode>
)
