import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { NavigationProvider } from './contexts/NavigationContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <NavigationProvider>
      <RouterProvider router={router} />
    </NavigationProvider>
  </React.StrictMode>,
)
