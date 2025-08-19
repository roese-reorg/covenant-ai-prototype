import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import NewsPage from './news/NewsPage.tsx'
import CovenantAIPage from './cov-ai/CovenantAIPage.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/intel', element: <NewsPage /> },
  { path: '/cov-ai', element: <CovenantAIPage /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
