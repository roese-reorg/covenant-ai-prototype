import { Link } from 'react-router-dom'

export default function SharedTopBar() {
  return (
    <div className="bg-gray-800 border-b border-gray-700 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="32" height="32" fill="#6B46C1"/>
              <rect x="8" y="8" width="16" height="16" fill="none" stroke="white" strokeWidth="2"/>
            </svg>
          </div>
          <h1 className="text-white text-lg font-medium">CovenantAI by Octus™</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="w-64 bg-gray-700 text-white px-4 py-2 pl-10 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
            />
            <i className="bi bi-search absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
          </div>
          
          {/* CreditAI Button */}
          <Link
            to="/"
            className="bg-purple-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors"
          >
            <i className="bi bi-robot"></i>
            CreditAI
          </Link>
        </div>
      </div>
    </div>
  )
}
