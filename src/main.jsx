import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/UserRouter'
import { AuthProvider } from './utils/AuthProvider'
import { LocalStorageProvider } from './utils/LocalStorageProvider'

import "keen-slider/keen-slider.min.css"
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalStorageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LocalStorageProvider>
  </StrictMode>,
)
