import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes/UserRouter'
import { AuthProvider } from './utils/AuthProvider'

import "keen-slider/keen-slider.min.css"
import './index.css'
import { LocalStorageProvider } from './utils/LocalStorageProvider'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalStorageProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </LocalStorageProvider>
  </StrictMode>,
)
