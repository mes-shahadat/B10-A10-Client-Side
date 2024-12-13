import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './utils/AuthProvider'
import { LocalStorageProvider } from './utils/LocalStorageProvider'
import App from './routes/App'

import "keen-slider/keen-slider.min.css"
import 'react-toastify/dist/ReactToastify.css';
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LocalStorageProvider>
      <AuthProvider>
        <App/>
      </AuthProvider>
    </LocalStorageProvider>
  </StrictMode>,
)
