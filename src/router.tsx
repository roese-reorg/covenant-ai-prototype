import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import NewsPage from './news/NewsPage.tsx'
import CovenantAIPage from './cov-ai/CovenantAIPage.tsx'
import PrivateCreditPage from './private-credit/PrivateCreditPage.tsx'
import CreditCloudPipelinePage from './locked/CreditCloudPipelinePage.tsx'
import PortfolioAnalyticsPage from './locked/PortfolioAnalyticsPage.tsx'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/intel',
    element: <NewsPage />,
  },
  {
    path: '/cov-ai',
    element: <CovenantAIPage />,
  },
  {
    path: '/private-credit',
    element: <PrivateCreditPage />,
  },
  {
    path: '/credit-cloud-pipeline',
    element: <CreditCloudPipelinePage />,
  },
  {
    path: '/portfolio-analytics',
    element: <PortfolioAnalyticsPage />,
  },
])
