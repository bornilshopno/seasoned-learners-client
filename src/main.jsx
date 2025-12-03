import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import router from './Router.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './auths/AuthProvider'
import NextThemeProvider from './pages/shared/NextThemeProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NextThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />,
      </AuthProvider>
    </NextThemeProvider>
  </StrictMode>,
)
