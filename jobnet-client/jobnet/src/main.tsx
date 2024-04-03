import React from 'react'
import ReactDOM from 'react-dom/client'
import { ToastContainer } from 'react-toastify'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'

import './index.css'
import 'react-toastify/dist/ReactToastify.min.css'
import './app/i18n.ts'

import App from './App.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer />
    </Provider>
  </React.StrictMode>
)
