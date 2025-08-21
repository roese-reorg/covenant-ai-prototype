import { Link } from 'react-router-dom'
import { useState } from 'react'
import SharedNavigation from './components/SharedNavigation'
import SharedTopBar from './components/SharedTopBar'

export default function App() {
  // Landing page uses its own navigation state - keeps it exactly as it was
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const [intelExpanded, setIntelExpanded] = useState(true)
  const [covenantsExpanded, setCovenantsExpanded] = useState(false)
  const [sourceFilesExpanded, setSourceFilesExpanded] = useState(false)
  const [companiesExpanded, setCompaniesExpanded] = useState(false)
  const [creditCloudExpanded, setCreditCloudExpanded] = useState(false)
  const [findoxExpanded, setFindoxExpanded] = useState(false)
  const [resourcesExpanded, setResourcesExpanded] = useState(false)

  return (
    <div className="h-screen flex bg-[#EFF0FF] overflow-hidden">
      {/* Left Navigation Sidebar */}
      <SharedNavigation 
        isNavExpanded={isNavExpanded}
        setIsNavExpanded={setIsNavExpanded}
        intelExpanded={intelExpanded}
        setIntelExpanded={setIntelExpanded}
        covenantsExpanded={covenantsExpanded}
        setCovenantsExpanded={setCovenantsExpanded}
        sourceFilesExpanded={sourceFilesExpanded}
        setSourceFilesExpanded={setSourceFilesExpanded}
        companiesExpanded={companiesExpanded}
        setCompaniesExpanded={setCompaniesExpanded}
        creditCloudExpanded={creditCloudExpanded}
        setCreditCloudExpanded={setCreditCloudExpanded}
        findoxExpanded={findoxExpanded}
        setFindoxExpanded={setFindoxExpanded}
        resourcesExpanded={resourcesExpanded}
        setResourcesExpanded={setResourcesExpanded}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Top Bar */}
        <SharedTopBar />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden h-0">
          {/* Left Panel - Conversations */}
          <div className="w-80 bg-black border-r border-black/10 p-3 flex flex-col overflow-hidden h-full">
            <Link
              to="/cov-ai"
              className="w-full bg-primary-600 hover:bg-primary-700 px-3 py-2 text-sm font-medium text-white shadow-none block text-center flex-shrink-0"
            >
              NEW CONVERSATION
            </Link>
            <div className="mt-0 flex-1 bg-black p-3 text-white flex flex-col overflow-hidden h-0">
              <div className="text-xs uppercase text-white/60 flex-shrink-0">Recent Conversations</div>
              <div className="mt-2 space-y-1 pr-1 overflow-y-auto flex-1">
                {/* September 1st, 2024 */}
                <div className="text-xs text-white/40 mt-3 mb-2">September 1st, 2024</div>
                {[
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                  'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
                ].map((label, i) => (
                  <div
                    key={i}
                    className="rounded-block px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                  >
                    <span className="inline-block text-[10px] leading-none text-[#FFDC61]">▶</span>
                    <span className="line-clamp-2">{label}</span>
                  </div>
                ))}
                
                {/* August 30th, 2024 */}
                <div className="text-xs text-white/40 mt-3 mb-2">August 30th, 2024</div>
                {[
                  'Laboris nisi ut aliquip ex ea commodo consequat',
                  'Duis aute irure dolor in reprehenderit in voluptate velit',
                  'Excepteur sint occaecat cupidatat non proident',
                ].map((label, i) => (
                  <div
                    key={i}
                    className="rounded-block px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                  >
                    <span className="inline-block text-[10px] leading-none text-[#FFDC61]">▶</span>
                    <span className="line-clamp-2">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Landing Page Content */}
          <div className="flex-1 flex justify-center px-3 sm:px-6 overflow-y-auto h-full">
            <div className="w-full max-w-4xl rounded-2xl flex flex-col min-h-0 mt-6">
              <div className="flex-1 p-4 sm:p-6 space-y-6">
                {/* Main Title and Description */}
                <div className="text-center">
                  <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
                    CovenantAI by Octus™
                  </h1>
                  <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                    Transform your covenant analysis with AI-powered insights. Get instant answers to complex questions, 
                    analyze documents in seconds, and make informed decisions with confidence.
                  </p>
                </div>

                {/* See What's Possible Section */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">See What's Possible</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      'Analyze covenant compliance across multiple documents',
                      'Compare terms and conditions between different agreements',
                      'Identify potential risks and red flags in contracts',
                      'Generate summary reports for stakeholder presentations',
                      'Answer complex legal and financial questions instantly',
                      'Track changes and amendments across document versions'
                    ].map((query, index) => (
                      <Link
                        key={index}
                        to="/cov-ai"
                        className="block p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors text-left group"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                            <i className="bi bi-lightbulb text-blue-600 text-sm"></i>
                          </div>
                          <p className="text-gray-700 group-hover:text-gray-900 transition-colors">
                            {query}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom Search Bar */}
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <div className="max-w-2xl mx-auto">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Ask CovenantAI anything..."
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-xl text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <i className="bi bi-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl"></i>
                      <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                        Ask
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
