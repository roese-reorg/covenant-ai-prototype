import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

export default function SharedNavigation() {
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const [findoxExpanded, setFindoxExpanded] = useState(true)
  const [intelExpanded, setIntelExpanded] = useState(true)
  const location = useLocation()

  return (
    <div className={`${isNavExpanded ? 'w-64' : 'w-16'} bg-white border-r border-black/10 transition-all duration-300 flex flex-col h-full`}>
      {/* Header with Logo and Toggle */}
      <div className="p-4 border-b border-black/10">
        <div className="flex items-center justify-between">
          {/* Octus Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 flex items-center justify-center">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="32" height="32" fill="#6B46C1"/>
                <rect x="8" y="8" width="16" height="16" fill="none" stroke="white" strokeWidth="2"/>
              </svg>
            </div>
            {isNavExpanded && (
              <span className="text-lg font-semibold text-gray-800">Octus</span>
            )}
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="p-1 hover:bg-gray-100 rounded transition-colors"
          >
            <i className={`bi bi-chevron-${isNavExpanded ? 'left' : 'right'} text-gray-600`} />
          </button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 overflow-y-auto">
        {/* Findox Section */}
        <div className="mb-4">
          <button
            onClick={() => setFindoxExpanded(!findoxExpanded)}
            className="px-4 py-2 bg-purple-100 rounded-lg mx-3 mb-2 hover:bg-purple-200 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="bi bi-shield-lock text-purple-600"></i>
                {isNavExpanded && <span className="text-purple-800 font-medium">Findox</span>}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${findoxExpanded ? 'up' : 'down'} text-purple-600`} />
              )}
            </div>
          </button>
          {isNavExpanded && findoxExpanded && (
            <div className="ml-6 space-y-1">
              {['Dashboard', 'Deals', 'Documents', 'Reports', 'Admin'].map((item) => (
                <Link
                  key={item}
                  to="/"
                  className="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 rounded-lg mx-3"
                >
                  {item}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Intel & Analysis Section */}
        <div className="mb-4">
          <button
            onClick={() => setIntelExpanded(!intelExpanded)}
            className="px-4 py-2 bg-blue-600 rounded-lg mx-3 mb-2 hover:bg-blue-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className="bi bi-lightbulb text-white"></i>
                {isNavExpanded && <span className="text-white font-medium">Intel & Analysis</span>}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${intelExpanded ? 'up' : 'down'} text-white`} />
              )}
            </div>
          </button>
          {isNavExpanded && intelExpanded && (
            <div className="ml-6 space-y-1">
              {['Breaking News', 'Past Blogs', 'Analysis', 'Webinars & Podcasts'].map((item) => (
                <Link
                  key={item}
                  to="/intel"
                  className="block px-4 py-2 text-sm text-blue-800 hover:bg-blue-50 rounded-lg mx-3"
                >
                  {item}
                </Link>
              ))}
              
              {/* Octus Intel Subsection */}
              <div className="mt-3">
                <div className="px-4 py-1 font-semibold text-blue-800 text-sm">Octus Intel</div>
                <div className="ml-3 space-y-1">
                  {[
                    { name: 'All Octus Intel', path: '/intel', isActive: location.pathname === '/intel' },
                    { name: 'All Covenants', path: '/intel', isActive: false },
                    { name: 'Americas', path: '/intel', isActive: false },
                    { name: 'Americas Middle Market', path: '/intel', isActive: false },
                    { name: 'Admin', path: '/intel', isActive: false }
                  ].map((item) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`block px-4 py-2 text-sm rounded-lg mx-3 ${
                        item.isActive 
                          ? 'bg-blue-100 text-blue-900 font-medium' 
                          : 'text-blue-800 hover:bg-blue-50'
                      }`}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Content Section */}
        <div className="mb-4">
          <div className="px-4 py-2">
            <div className="flex items-center gap-2 mb-2">
              <i className="bi bi-shield-lock text-gray-600"></i>
              {isNavExpanded && <span className="font-semibold text-gray-800">Additional Content</span>}
            </div>
          </div>
          {isNavExpanded && (
            <div className="ml-6 space-y-1">
              {[
                { name: 'Octus Dashboard', icon: 'bi-window-stack' },
                { name: 'Source Files', icon: 'bi-file-earmark' },
                { name: 'Companies', icon: 'bi-building' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to="/"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg mx-3"
                >
                  <i className={item.icon}></i>
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
