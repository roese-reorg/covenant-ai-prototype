import { Link } from 'react-router-dom'
import SharedNavigation from './components/SharedNavigation'
import SharedTopBar from './components/SharedTopBar'

export default function App() {
  return (
    <div className="min-h-dvh flex bg-[#EFF0FF]">
      {/* Left Navigation Sidebar */}
      <SharedNavigation />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <SharedTopBar />

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Panel - Conversations */}
          <div className="w-80 bg-black border-r border-black/10 p-3">
            <Link
              to="/cov-ai"
              className="w-full bg-primary-600 hover:bg-primary-700 px-3 py-2 text-sm font-medium text-white shadow-none block text-center"
            >
              NEW CONVERSATION
            </Link>
            <div className="mt-0 flex-1 bg-black p-3 text-white flex flex-col overflow-hidden">
              <div className="text-xs uppercase text-white/60">Recent Conversations</div>
              <div className="mt-2 space-y-1 pr-1">
                {/* September 1st, 2024 */}
                <div className="text-xs text-white/40 mt-3 mb-2">September 1st, 2024</div>
                {[
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                  'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
                ].map((label, i) => (
                  <div
                    key={i}
                    className="rounded-md px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 cursor-pointer"
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
                    className="rounded-md px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                  >
                    <span className="inline-block text-[10px] leading-none text-[#FFDC61]">▶</span>
                    <span className="line-clamp-2">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Landing Page Content */}
          <div className="flex-1 flex justify-center px-3 sm:px-6">
            <div className="w-full max-w-4xl rounded-2xl flex flex-col min-h-0 mt-6">
              <div className="flex-1 p-4 sm:p-6 space-y-6 overflow-auto min-h-0">
                {/* Main Title and Description */}
                <div className="text-center">
                  <h1 className="text-4xl font-bold text-gray-800 mb-6">CovenantAI by Octus™</h1>
                  <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    Powered by CreditAI, CovenantAI delivers advanced agentic AI for covenant analysis, 
                    leveraging our <strong>vast repository</strong> of credit agreements and market intelligence. 
                    <strong>Instantly surface</strong> <strong>deal specific details</strong> through 
                    <strong>exhaustive searches</strong> across thousands of documents, enhanced by 
                    <strong>sophisticated reasoning frameworks</strong> that provide 
                    <strong>full traceability</strong> to source materials. Access 
                    <strong>real-world, market-tested examples</strong> and comprehensive analysis all from 
                    <strong>one centralized platform</strong>.
                  </p>
                </div>

                {/* See What's Possible Section */}
                <div className="mt-12">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">See What's Possible</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Find Comparable Deals */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Find Comparable Deals</h3>
                      <div className="space-y-3">
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">Which deals have been sponsored by KKR?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">Which transactions had a deal size between $500 million and $1 billion?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>

                    {/* Risk Assessment */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Risk Assessment</h3>
                      <div className="space-y-3">
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">What is the potential for LME style maneuvers for Presidio?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">Are there any new types of springing maturities that could increase refinancing risk?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>

                    {/* Covenant Trends Analysis */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Covenant Trends Analysis</h3>
                      <div className="space-y-3">
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">What has changed in recent years with respect to the ratio-based investment basket?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">How common are J-Crew blockers in the European leveraged loans market?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>

                    {/* Deal Analysis */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Deal Analysis</h3>
                      <div className="space-y-3">
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">In McAfee, what amendments require affected lender consent?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">How could lenders strengthen lender protection from priming transactions in Asurion?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>

                    {/* Clause Comparison & Precedent Retrieval */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Clause Comparison & Precedent Retrieval</h3>
                      <div className="space-y-3">
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">Are there any precedent clauses for change of control provisions?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">How does the J-Crew blocker differ between McAfee and Vapeth? Provide drafting for a standard J-Crew Blocker.</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>

                    {/* Provision Search across Agreements */}
                    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Provision Search across Agreements</h3>
                      <div className="space-y-3">
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">Which credit agreements have a Serta blocker?</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                        <Link
                          to="/cov-ai"
                          className="block w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-lg flex items-center justify-between transition-colors"
                        >
                          <span className="text-sm">List agreements that are cov lite.</span>
                          <i className="bi bi-arrow-right"></i>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Search Bar */}
              <div className="bg-gray-800 p-4 rounded-b-2xl">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <select className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600">
                      <option>CovenantAI</option>
                    </select>
                    <i className="bi bi-chevron-down text-gray-400"></i>
                  </div>
                  <input
                    type="text"
                    placeholder="Ask me something!"
                    className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                  />
                  <div className="text-gray-400 text-sm">0/500</div>
                </div>
                <div className="mt-2 text-xs text-gray-400">
                  Answers are generated by CreditAI and should not be considered advice or guidance, 
                  <a href="#" className="text-blue-400 hover:underline"> complete information here</a>. 
                  Need help crafting questions? <a href="#" className="text-blue-400 hover:underline">Click here for Tips & Tricks</a>.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
