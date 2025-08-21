import { Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

interface SharedNavigationProps {
  isNavExpanded: boolean
  setIsNavExpanded: (expanded: boolean) => void
  intelExpanded: boolean
  setIntelExpanded: (expanded: boolean) => void
  covenantsExpanded: boolean
  setCovenantsExpanded: (expanded: boolean) => void
  sourceFilesExpanded: boolean
  setSourceFilesExpanded: (expanded: boolean) => void
  companiesExpanded: boolean
  setCompaniesExpanded: (expanded: boolean) => void
  creditCloudExpanded: boolean
  setCreditCloudExpanded: (expanded: boolean) => void
  findoxExpanded: boolean
  setFindoxExpanded: (expanded: boolean) => void
  resourcesExpanded: boolean
  setResourcesExpanded: (expanded: boolean) => void
}

export default function SharedNavigation({
  isNavExpanded,
  setIsNavExpanded,
  intelExpanded,
  setIntelExpanded,
  covenantsExpanded,
  setCovenantsExpanded,
  sourceFilesExpanded,
  setSourceFilesExpanded,
  companiesExpanded,
  setCompaniesExpanded,
  creditCloudExpanded,
  setCreditCloudExpanded,
  findoxExpanded,
  setFindoxExpanded,
  resourcesExpanded,
  setResourcesExpanded
}: SharedNavigationProps) {
  const location = useLocation()
  const [navWidth, setNavWidth] = useState<number>(175)

  // Expose current nav width to siblings via CSS variable for layout (e.g., sticky input offsets)
  useEffect(() => {
    const width = isNavExpanded ? navWidth : 64
    document.documentElement.style.setProperty('--nav-width', `${width}px`)
  }, [navWidth, isNavExpanded])

  // Persist width across pages/sessions without touching other page content
  useEffect(() => {
    const saved = localStorage.getItem('octus-nav-width')
    if (saved) {
      const parsed = parseInt(saved, 10)
      if (!Number.isNaN(parsed)) setNavWidth(Math.max(175, parsed))
    }
  }, [])

  useEffect(() => {
    // Only persist when expanded so collapsed 64px doesn't overwrite preference
    if (isNavExpanded) {
      localStorage.setItem('octus-nav-width', String(navWidth))
    }
  }, [navWidth, isNavExpanded])

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen flex-shrink-0 relative z-20`}
      style={{ width: isNavExpanded ? navWidth : 64, minWidth: isNavExpanded ? 175 : 64 }}
    >
      {/* Header - Fixed at top */}
      <div className="flex-shrink-0 p-3 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {/* Octus Logo */}
          <div className="flex items-center gap-2">
            <img src="/octus-logo.png" alt="Octus" className="w-6 h-6 object-contain" />
            {isNavExpanded && <span className="text-blue-600 font-semibold text-sm">Octus</span>}
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={() => setIsNavExpanded(!isNavExpanded)}
            className="p-1 rounded hover:bg-gray-100 transition-colors"
          >
            <i className={`bi bi-chevron-${isNavExpanded ? 'left' : 'right'} text-gray-600 text-sm`} />
          </button>
        </div>
      </div>

      {/* Resize handle */}
      {isNavExpanded && (
        <div
          className="absolute right-0 top-0 bottom-0 w-2 cursor-col-resize hover:bg-gray-200 z-30"
          onMouseDown={(e) => {
            e.preventDefault()
            const startX = e.clientX
            const startWidth = navWidth
            const prevBodySelect = document.body.style.userSelect
            const prevHtmlSelect = document.documentElement.style.userSelect
            document.body.style.userSelect = 'none'
            document.documentElement.style.userSelect = 'none'
            function onMove(ev: MouseEvent) {
              ev.preventDefault()
              const next = Math.max(175, startWidth + (ev.clientX - startX))
              setNavWidth(next)
            }
            function onUp() {
              window.removeEventListener('mousemove', onMove)
              window.removeEventListener('mouseup', onUp)
              document.body.style.userSelect = prevBodySelect
              document.documentElement.style.userSelect = prevHtmlSelect
            }
            window.addEventListener('mousemove', onMove)
            window.addEventListener('mouseup', onUp)
          }}
        />
      )}

      {/* Navigation Items - Scrollable independently */}
      <div className="flex-1 py-3 overflow-y-auto min-h-0 h-0">
        {/* Dashboard */}
        <div>
          <Link
            to="/"
            className={`w-full px-3 py-2 rounded-lg mx-0 hover:bg-gray-100 transition-colors flex items-center gap-2 text-left ${
              isNavExpanded && location.pathname === '/' ? 'bg-[#EFF0FF]' : 'bg-transparent'
            }`}
          >
            <i className="bi bi-grid text-gray-600 text-xs"></i>
            {isNavExpanded && <span className="text-gray-800 font-medium text-xs">Dashboard</span>}
          </Link>
        </div>

        {/* Intel & Analysis Section */}
        <div>
          <button
            onClick={() => setIntelExpanded(!intelExpanded)}
            className={`w-full px-3 py-2 rounded-lg mx-0 mb-0 hover:bg-blue-100 transition-colors text-left ${
              isNavExpanded && intelExpanded && location.pathname === '/intel' ? 'bg-blue-600' : 
              isNavExpanded && intelExpanded ? 'bg-[#EFF0FF]' : 'bg-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {(() => {
                  const isActive = location.pathname === '/intel'
                  const showActiveBlueBg = isNavExpanded && intelExpanded && isActive
                  const iconColor = showActiveBlueBg ? 'text-white' : (isNavExpanded && intelExpanded ? 'text-blue-600' : 'text-gray-600')
                  const textColor = showActiveBlueBg ? 'text-white' : (intelExpanded ? 'text-blue-600' : 'text-gray-800')
                  return (
                    <>
                      <i className={`${iconColor} bi bi-lightbulb text-xs`}></i>
                      {isNavExpanded && (
                        <span className={`font-medium text-xs ${textColor}`}>Intel & Analysis</span>
                      )}
                    </>
                  )
                })()}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${intelExpanded ? 'up' : 'down'} text-xs ${isNavExpanded && intelExpanded && location.pathname === '/intel' ? 'text-white' : 'text-gray-600'}`} />
              )}
            </div>
          </button>
          {isNavExpanded && intelExpanded && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>
              <div className="absolute left-4 bottom-0 w-px h-5 bg-white"></div>
              <div className="ml-4 space-y-1">
                {/* Direct Sub-items under Intel & Analysis */}
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/intel"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Breaking News
                  </Link>
                  <div className="flex items-center gap-2 absolute right-2 top-1.5">
                    <div className="w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">1</div>
                    <i className="bi bi-box-arrow-up-right text-gray-400 text-xs"></i>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/intel"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Past Blogs
                  </Link>
                  <i className="bi bi-box-arrow-up-right text-gray-400 text-xs absolute right-2 top-1.5"></i>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/intel"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Analysis
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/intel"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Webinars & Podcasts
                  </Link>
                </div>
                
                {/* Octus Intel subsection */}
                <div className="font-semibold text-gray-600 mb-1 text-[10px] px-3 mx-2" style={{ marginTop: '10px' }}>Octus Intel</div>
                
                {[
                  'All Octus Intel',
                  'All Covenants',
                  'Americas',
                  'Americas Covenants',
                  'Americas Middle Market',
                  'Americas Municipals',
                  'Americas Private Credit and Deal Origination',
                  'APAC Private Credit and Deal Origination',
                  'APAC',
                  'CLO Insights',
                  'EMEA Covenants',
                  'EMEA Middle Market',
                  'EMEA Private Credit and Deal Origination',
                  'Emerging Markets CEEMEA',
                  'Emerging Markets LatAm',
                  'Europe',
                  'First Day'
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                    <Link
                      to="/intel"
                      className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                    >
                      {item}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Covenants, Bonds & Loans Section */}
        <div>
          <button
            onClick={() => setCovenantsExpanded(!covenantsExpanded)}
            className={`w-full px-3 py-2 rounded-lg mx-0 mb-0 hover:bg-purple-100 transition-colors text-left ${
              isNavExpanded && covenantsExpanded ? 'bg-[#EFF0FF]' : 'bg-transparent'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <i className={`${isNavExpanded && covenantsExpanded ? 'text-purple-600' : 'text-gray-600'} bi bi-shield-check text-xs mt-0.5`}></i>
                {isNavExpanded && (
                  <span className="font-medium text-xs text-gray-800">Covenants, Bonds & Loans</span>
                )}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${covenantsExpanded ? 'up' : 'down'} text-xs text-gray-600 mt-0.5`} />
              )}
            </div>
          </button>
          {isNavExpanded && covenantsExpanded && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>
              <div className="absolute left-4 bottom-0 w-px h-5 bg-white"></div>
              <div className="ml-4 space-y-1">
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Covenants Overview
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Intel & Research
                  </Link>
                </div>
                
                {/* HIGH YIELD BONDS subsection */}
                <div className="font-semibold text-gray-600 mb-1 text-[10px] px-3 mx-2" style={{ marginTop: '10px' }}>HIGH YIELD BONDS</div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Market Maker
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Bonds Library
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Drafting Search
                  </Link>
                </div>
                
                {/* LEVERAGED LOANS subsection */}
                <div className="font-semibold text-gray-600 mb-1 text-[10px] px-3 mx-2" style={{ marginTop: '10px' }}>LEVERAGED LOANS</div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Representative Loan Terms (EMEA/US)
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Loan Portfolio Manager (EMEA/US)
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Loans Library
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Source Files Section */}
        <div>
          <button
            onClick={() => setSourceFilesExpanded(!sourceFilesExpanded)}
            className={`w-full px-3 py-2 rounded-lg mx-0 mb-0 hover:bg-purple-100 transition-colors text-left ${
              isNavExpanded && sourceFilesExpanded ? 'bg-[#EFF0FF]' : 'bg-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className={`${isNavExpanded && sourceFilesExpanded ? 'text-purple-600' : 'text-gray-600'} bi bi-files text-xs`}></i>
                {isNavExpanded && (
                  <span className="font-medium text-xs text-gray-800">Source Files</span>
                )}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${sourceFilesExpanded ? 'up' : 'down'} text-xs text-gray-600`} />
              )}
            </div>
          </button>
          {isNavExpanded && sourceFilesExpanded && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>
              <div className="absolute left-4 bottom-0 w-px h-5 bg-white"></div>
              <div className="ml-4 space-y-1">
                {[
                  'Press Releases', 'Court Filings', 'Debt Documents', 'Schemes and Part 26A: Europe', 'SEC Filings', 'Transcripts'
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                    <Link
                      to="/cov-ai"
                      className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                    >
                      {item}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Companies Section */}
        <div>
          <button
            onClick={() => setCompaniesExpanded(!companiesExpanded)}
            className={`w-full px-3 py-2 rounded-lg mx-0 mb-0 hover:bg-blue-100 transition-colors text-left ${
              isNavExpanded && companiesExpanded ? 'bg-[#EFF0FF]' : 'bg-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className={`${isNavExpanded && companiesExpanded ? 'text-blue-600' : 'text-gray-600'} bi bi-building text-xs`}></i>
                {isNavExpanded && (
                  <span className="font-medium text-xs text-gray-800">Companies</span>
                )}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${companiesExpanded ? 'up' : 'down'} text-xs text-gray-600`} />
              )}
            </div>
          </button>
          {isNavExpanded && companiesExpanded && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>
              <div className="absolute left-4 bottom-0 w-px h-5 bg-white"></div>
              <div className="ml-4 space-y-1">
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    All Octus Coverage
                  </Link>
                </div>
                
                {/* RECOMMENDED subsection */}
                <div className="font-semibold text-gray-600 mb-1 text-[10px] px-3 mx-2" style={{ marginTop: '10px' }}>RECOMMENDED</div>
                
                {[
                  'Apple Inc.', 'Microsoft Corp.', 'Amazon.com Inc.', 'Alphabet Inc.', 'Tesla Inc.',
                  'Meta Platforms Inc.', 'NVIDIA Corp.', 'Berkshire Hathaway', 'UnitedHealth Group', 'Johnson & Johnson'
                ].map((company, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                    <Link
                      to="/cov-ai"
                      className="text-xs text-gray-800 hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                    >
                      {company}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Credit Cloud & Data Hub Section */}
        <div>
          <button
            onClick={() => setCreditCloudExpanded(!creditCloudExpanded)}
            className={`w-full px-3 py-2 rounded-lg mx-0 mb-0 hover:bg-blue-100 transition-colors text-left ${
              isNavExpanded && creditCloudExpanded ? 'bg-[#EFF0FF]' : 'bg-transparent'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-2">
                <i className={`${isNavExpanded && creditCloudExpanded ? 'text-blue-600' : 'text-gray-600'} bi bi-stack text-xs mt-0.5`}></i>
                {isNavExpanded && (
                  <span className="font-medium text-xs text-gray-800">Credit Cloud & Data Hub</span>
                )}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${creditCloudExpanded ? 'up' : 'down'} text-xs text-gray-600 mt-0.5`} />
              )}
            </div>
          </button>
          {isNavExpanded && creditCloudExpanded && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>
              <div className="absolute left-4 bottom-0 w-px h-5 bg-white"></div>
              <div className="ml-4 space-y-1">
                {[
                  'Dashboard', 'Reports', 'Report Builder', 'Datasets'
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                    <Link
                      to="/cov-ai"
                      className="text-xs text-gray-800 hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                    >
                      {item}
                    </Link>
                  </div>
                ))}
                
                {/* DATA HUB subsection */}
                <div className="font-semibold text-gray-600 mb-1 text-[10px] px-3 mx-2" style={{ marginTop: '10px' }}>DATA HUB</div>
                
                {[
                  'Market Data', 'Company Financials', 'Credit Ratings', 'Bond Prices', 'Loan Terms',
                  'Covenant Analysis', 'Industry Benchmarks', 'Risk Metrics', 'Performance Data', 'Historical Trends',
                  'Regulatory Filings', 'News & Events', 'Analyst Reports', 'Economic Indicators', 'Portfolio Analytics'
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                    <Link
                      to="/cov-ai"
                      className="text-xs text-gray-800 hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                    >
                      {item}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Findox Section */}
        <div>
          <button
            onClick={() => setFindoxExpanded(!findoxExpanded)}
            className={`w-full px-3 py-2 rounded-lg mx-0 mb-0 hover:bg-purple-100 transition-colors text-left ${
              isNavExpanded && findoxExpanded ? 'bg-[#EFF0FF]' : 'bg-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className={`${isNavExpanded && findoxExpanded ? 'text-purple-600' : 'text-gray-600'} bi bi-search text-xs`}></i>
                {isNavExpanded && (
                  <span className="font-medium text-xs text-gray-800">Findox</span>
                )}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${findoxExpanded ? 'up' : 'down'} text-xs text-gray-600`} />
              )}
            </div>
          </button>
          {isNavExpanded && findoxExpanded && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>
              <div className="absolute left-4 bottom-0 w-px h-5 bg-white"></div>
              <div className="ml-4 space-y-1">
                {[
                  'Dashboard', 'Deals', 'Documents', 'Reports', 'Admin'
                ].map((item, index) => (
                  <div key={index} className="relative">
                    <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                    <Link
                      to="/cov-ai"
                      className="text-xs text-[#4B3CCD] hover:bg-[#EFF0FF] rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                    >
                      {item}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Calendar Section */}
        <div>
          <Link
            to="/cov-ai"
            className="w-full px-3 py-2 rounded-lg mx-0 hover:bg-gray-100 transition-colors flex items-center gap-2 text-left bg-transparent"
          >
            <i className="bi bi-calendar text-gray-600 text-xs"></i>
            {isNavExpanded && <span className="text-gray-800 font-medium text-xs">Calendar</span>}
          </Link>
        </div>

        {/* Resources Section */}
        <div>
          <button
            onClick={() => setResourcesExpanded(!resourcesExpanded)}
            className={`w-full px-3 py-2 rounded-lg mx-0 mb-0 hover:bg-gray-100 transition-colors text-left ${
              isNavExpanded && resourcesExpanded ? 'bg-[#EFF0FF]' : 'bg-transparent'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <i className={`${isNavExpanded && resourcesExpanded ? 'text-gray-600' : 'text-gray-600'} bi bi-file-check text-xs`}></i>
                {isNavExpanded && (
                  <span className="font-medium text-xs text-gray-800">Resources</span>
                )}
              </div>
              {isNavExpanded && (
                <i className={`bi bi-chevron-${resourcesExpanded ? 'up' : 'down'} text-xs text-gray-600`} />
              )}
            </div>
          </button>
          {isNavExpanded && resourcesExpanded && (
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-px bg-gray-300"></div>
              <div className="ml-4 space-y-1">
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-gray-50 rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Free Text Search
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="relative text-xs text-[#4B3CCD] hover:bg-gray-50 rounded-lg px-2 py-1 block px-3 py-1.5 mx-2 pr-6"
                  >
                    About Octus
                    <i className="bi bi-box-arrow-up-right text-gray-400 text-xs absolute right-2 top-1.5"></i>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="relative text-xs text-[#4B3CCD] hover:bg-gray-50 rounded-lg px-2 py-1 block px-3 py-1.5 mx-2 pr-6"
                  >
                    FAQs
                    <i className="bi bi-box-arrow-up-right text-gray-400 text-xs absolute right-2 top-1.5"></i>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="relative text-xs text-[#4B3CCD] hover:bg-gray-50 rounded-lg px-2 py-1 block px-3 py-1.5 mx-2 pr-6"
                  >
                    Privacy Policy
                    <i className="bi bi-box-arrow-up-right text-gray-400 text-xs absolute right-2 top-1.5"></i>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="relative text-xs text-[#4B3CCD] hover:bg-gray-50 rounded-lg px-2 py-1 block px-3 py-1.5 mx-2 pr-6"
                  >
                    Terms & Conditions
                    <i className="bi bi-box-arrow-up-right text-gray-400 text-xs absolute right-2 top-1.5"></i>
                  </Link>
                </div>
                
                <div className="relative">
                  <div className="absolute left-0 top-3 w-3 h-px bg-gray-300"></div>
                  <Link
                    to="/cov-ai"
                    className="text-xs text-[#4B3CCD] hover:bg-gray-50 rounded-lg px-2 py-1 block px-3 py-1.5 mx-2"
                  >
                    Compare Two Documents
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Additional Access Section */}
        <div className="mt-2">
          <div className="px-3 py-1.5 text-gray-600 font-semibold text-xs">Additional Access</div>
          <div className="space-y-1">
            {[
              { name: 'Credit Cloud Pipeline', icon: 'bi-bar-chart', path: '/credit-cloud-pipeline' },
              { name: 'Portfolio Analytics', icon: 'bi-graph-up', path: '/portfolio-analytics' },
              { name: 'Private Credit', icon: 'bi-currency-exchange', path: '/private-credit' }
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 px-3 py-1.5">
                <i className="bi bi-lock text-gray-600 text-xs"></i>
                <Link to={item.path} className="text-gray-800 text-xs hover:text-blue-600">
                  {item.name}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
