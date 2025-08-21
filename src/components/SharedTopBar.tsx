import { Link, useLocation } from 'react-router-dom'

export default function SharedTopBar() {
  const location = useLocation()
  // Derive title by route
  const routeTitle = (() => {
    if (location.pathname.startsWith('/private-credit')) return 'Private Credit'
    if (location.pathname.startsWith('/credit-cloud-pipeline')) return 'Credit Cloud Pipeline'
    if (location.pathname.startsWith('/portfolio-analytics')) return 'Portfolio Analytics'
    if (location.pathname.startsWith('/intel')) return 'Intel & Analysis'
    if (location.pathname.startsWith('/cov-ai')) return 'CovenantAI by Octus™'
    return 'CovenantAI by Octus™'
  })()
  return (
    <div className="bg-[#27007A] px-6 h-[50px] flex items-center">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-4">
          {/* No icon per request */}
          <h1 className="text-white text-lg font-medium">{routeTitle}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-80 bg-[#4B3CCD] text-white px-4 py-2 pl-10 rounded-full focus:outline-none placeholder-white/90"
            />
            <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-white/90"></i>
          </div>
          
          {/* CreditAI Button */}
          <Link
            to="/"
            className="bg-[#4B3CCD] text-white px-4 py-2 rounded-full flex items-center gap-2 hover:brightness-110 transition-colors"
          >
            <i className="bi bi-robot"></i>
            CreditAI
          </Link>
        </div>
      </div>
    </div>
  )
}
