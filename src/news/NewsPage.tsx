import { useState, useMemo } from 'react'
import SharedNavigation from '../components/SharedNavigation'
import SharedTopBar from '../components/SharedTopBar'
import { useNavigation } from '../contexts/NavigationContext'

export default function NewsPage() {
  const [selectedId, setSelectedId] = useState(1)
  const [leftWidth, setLeftWidth] = useState(320)
  const [rightWidth, setRightWidth] = useState(360)
  const [isRightOpen, setIsRightOpen] = useState(false)
  const [articleSummaryOpen, setArticleSummaryOpen] = useState(true)
  const [companySummaryOpen, setCompanySummaryOpen] = useState(true)
  
  // Navigation state from context
  const {
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
  } = useNavigation()

  const DUMMY = [
    { id: 1, title: 'Kloeckner Pentaplast Group GmbH & Co. KG - Company Update', company: 'Kloeckner Pentaplast Group GmbH & Co. KG', time: 'Mon 20 June, 2024 07:00 PM EST' },
    { id: 2, title: 'Materials Group Holdings Limited - Financial Results', company: 'Materials Group Holdings Limited', time: 'Mon 20 June, 2024 06:30 PM EST' },
    { id: 3, title: 'Container Solutions International - Market Analysis', company: 'Container Solutions International', time: 'Mon 20 June, 2024 06:00 PM EST' },
    { id: 4, title: 'Metal Packaging Corporation - Strategic Review', company: 'Metal Packaging Corporation', time: 'Mon 20 June, 2024 05:30 PM EST' },
    { id: 5, title: 'Glass Manufacturing Ltd - Quarterly Report', company: 'Glass Manufacturing Ltd', time: 'Mon 20 June, 2024 05:00 PM EST' },
    { id: 6, title: 'Plastic Containers Inc - Industry Trends', company: 'Plastic Containers Inc', time: 'Mon 20 June, 2024 04:30 PM EST' },
    { id: 7, title: 'Packaging Solutions Group - Market Update', company: 'Packaging Solutions Group', time: 'Mon 20 June, 2024 04:00 PM EST' },
    { id: 8, title: 'Sustainable Materials Corp - ESG Report', company: 'Sustainable Materials Corp', time: 'Mon 20 June, 2024 03:30 PM EST' },
    { id: 9, title: 'Industrial Packaging Ltd - Financial Analysis', company: 'Industrial Packaging Ltd', time: 'Mon 20 June, 2024 03:00 PM EST' },
    { id: 10, title: 'Global Containers Group - Strategic Update', company: 'Global Containers Group', time: 'Mon 20 June, 2024 02:30 PM EST' }
  ]

  const selected = useMemo(() => DUMMY.find(a => a.id === selectedId) || DUMMY[0], [selectedId])

  // Helpers to draw a simple deterministic pricing line per company
  function seededRandom(seed: number) {
    // mulberry32
    return function () {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0
      let t = Math.imul(seed ^ seed >>> 15, 1 | seed)
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t
      return ((t ^ t >>> 14) >>> 0) / 4294967296
    }
  }
  function hashString(str: string) {
    let h = 2166136261
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i)
      h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24)
    }
    return h >>> 0
  }
  const pricingPath = useMemo(() => {
    const width = 560
    const height = 120
    const padding = 6
    const n = 36
    const rand = seededRandom(hashString(selected.company))
    const pts: number[] = []
    let v = 0.5
    for (let i = 0; i < n; i++) {
      v = Math.min(0.95, Math.max(0.05, v + (rand() - 0.5) * 0.12))
      pts.push(v)
    }
    const stepX = (width - padding * 2) / (n - 1)
    const scaleY = (height - padding * 2)
    let d = ''
    pts.forEach((pv, i) => {
      const x = padding + i * stepX
      const y = padding + (1 - pv) * scaleY
      d += i === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`
    })
    return d
  }, [selected.company])

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

        {/* Filter bar */}
        <div className="border-b border-black/10 bg-white flex-shrink-0">
          <div className="px-4 sm:px-6 py-2 text-sm flex gap-2 flex-wrap">
            {['Countries', 'Content Type', 'Published Date', 'Coverage Area', 'Topic Category', 'Lifecycle Stage', 'GICS Sector'].map(t => (
              <div key={t} className="rounded-md border border-black/10 bg-white px-2 py-1">{t} ▾</div>
            ))}
            <div className="ml-auto">492 Results</div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-hidden h-0">
          <div className="flex h-full">
            {/* Main content wrapper with padding */}
            <div className="flex-1 px-4 sm:px-6 pt-4 overflow-hidden h-full">
              {/* Main content container */}
              <div className="flex rounded-xl border border-black/10 bg-white shadow-sm overflow-hidden h-full">
                {/* Intel list (resizable) */}
                <div className="relative" style={{ width: leftWidth }}>
                  <aside className="h-full border-r border-black/10 bg-white overflow-y-auto">
                    <div className="px-3 py-2 text-sm font-medium flex-shrink-0">Intel List</div>
                    <div className="overflow-y-auto flex-1">
                      {DUMMY.map(a => (
                        <button
                          key={a.id}
                          className={`w-full text-left px-3 py-3 border-t border-black/10 hover:bg-[#fafaff] ${selectedId === a.id ? 'bg-[#f2f3ff]' : ''}`}
                          onClick={() => setSelectedId(a.id)}
                        >
                          <div className="flex items-center gap-2 text-[13px]">
                            <span className="font-medium">{a.title}</span>
                          </div>
                          <div
                            className="mt-1 text-[12px] text-indigo-700 hover:underline cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation()
                              setIsRightOpen(true)
                              setRightWidth(Math.max(rightWidth, 360))
                            }}
                          >
                            {a.company}
                          </div>
                          <div className="text-[12px] text-black/50">{a.time}</div>
                        </button>
                      ))}
                    </div>
                  </aside>
                  {/* Resize handle for left panel */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize"
                    onMouseDown={(e) => {
                      e.preventDefault()
                      const startX = e.clientX
                      const startWidth = leftWidth
                      const prevBodySelect = document.body.style.userSelect
                      const prevHtmlSelect = document.documentElement.style.userSelect
                      document.body.style.userSelect = 'none'
                      document.documentElement.style.userSelect = 'none'
                      function onMove(ev: MouseEvent) {
                        ev.preventDefault()
                        setLeftWidth(Math.max(240, startWidth + (ev.clientX - startX)))
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
                </div>

                {/* Article */}
                <main className="flex-1 overflow-y-auto p-5 h-full">
                  <h2 className="text-xl font-semibold">{selected.title}</h2>
                  <div className="mt-1 text-[12px] text-black/60">{selected.time}</div>
                  <div
                    className="mt-1 text-[13px] text-indigo-700 hover:underline cursor-pointer"
                    onClick={() => { setIsRightOpen(true); setRightWidth(Math.max(rightWidth, 360)) }}
                  >
                    {selected.company}
                  </div>

                  {/* AI Summary in main content (collapsible) */}
                  <div className="mt-3 rounded-[6px] border-2 px-4 py-[6px]" style={{ borderImage: 'linear-gradient(45deg, #FFDC61, #C2A88d, #7264c7, #5f4adf, #4b2ff6) 1' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-sm text-black">
                        <i className="bi bi-stars text-black" />
                        <span>Summary by AI at Octus</span>
                      </div>
                      <button
                        className="text-lg text-black/60"
                        onClick={() => setArticleSummaryOpen(o => !o)}
                        aria-label="Toggle summary"
                        title="Toggle summary"
                      >
                        <i className={`bi bi-chevron-${articleSummaryOpen ? 'up' : 'down'}`} />
                      </button>
                    </div>
                    {articleSummaryOpen && (
                      <p className="text-[14px] leading-[21px] mt-2">
                        {selected.company} shows improving liquidity and a stable operating outlook. Headline themes include disciplined capex, modest leverage reduction, and supportive demand across packaging end markets.
                      </p>
                    )}
                  </div>

                  {/* Article body */}
                  <div className="mt-4 text-sm text-black/80 leading-relaxed">
                    <p>This is a sample article content for {selected.company}. The full article would contain detailed information about the company's recent developments, financial performance, and market analysis.</p>
                    <p className="mt-3">Additional content would include industry insights, competitive analysis, and forward-looking statements relevant to investors and stakeholders.</p>
                  </div>
                </main>

                {/* Company Details Panel */}
                {isRightOpen && (
                  <div className="relative" style={{ width: rightWidth }}>
                    <aside className="h-full border-l border-black/10 bg-white overflow-y-auto">
                      <div className="px-3 py-2 text-sm font-medium flex items-center justify-between flex-shrink-0 border-b border-black/10">
                        <span>Company Details</span>
                        <button
                          onClick={() => setIsRightOpen(false)}
                          aria-label="Close company panel"
                          className="text-gray-500 hover:text-black text-lg leading-none"
                        >
                          ×
                        </button>
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-3">{selected.company}</h3>
                        <div className="space-y-3 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">Industry:</span>
                            <span className="ml-2 text-gray-600">Materials & Packaging</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Headquarters:</span>
                            <span className="ml-2 text-gray-600">Various Locations</span>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Market Cap:</span>
                            <span className="ml-2 text-gray-600">$2.1B - $4.8B</span>
                          </div>
                        </div>

                        {/* AI Summary in side panel (collapsible) */}
                        <div className="mt-4 rounded-[6px] border-2 px-3 py-[6px]" style={{ borderImage: 'linear-gradient(45deg, #FFDC61, #C2A88d, #7264c7, #5f4adf, #4b2ff6) 1' }}>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[13px] text-black">
                              <i className="bi bi-stars text-black" />
                              <span>Company Summary (AI)</span>
                            </div>
                            <button
                              className="text-[16px] text-black/60"
                              onClick={() => setCompanySummaryOpen(o => !o)}
                              aria-label="Toggle company summary"
                            >
                              <i className={`bi bi-chevron-${companySummaryOpen ? 'up' : 'down'}`} />
                            </button>
                          </div>
                          {companySummaryOpen && (
                            <div className="text-[13px] leading-[20px] mt-1">
                              Stable outlook; leverage trending modestly lower; adequate liquidity and covenant headroom based on latest disclosures.
                            </div>
                          )}
                        </div>

                        {/* Capital Structure - detailed table (restored) */}
                        <div className="mt-4 rounded-[6px] border border-black/10 p-3 overflow-x-auto">
                          <h4 className="font-semibold mb-2">Capital Structure</h4>
                          <div className="min-w-[680px]">
                            <table className="w-full text-[12px]">
                              <thead>
                                <tr className="border-b border-black/15 text-black/70">
                                  <th className="text-left py-1 font-medium">Instrument</th>
                                  <th className="text-right py-1 font-medium">Amount</th>
                                  <th className="text-right py-1 font-medium">Price</th>
                                  <th className="text-right py-1 font-medium">Mkt. Val.</th>
                                  <th className="text-left py-1 font-medium">Maturity</th>
                                  <th className="text-left py-1 font-medium">Rate</th>
                                  <th className="text-right py-1 font-medium">Yield</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr className="border-b border-black/10">
                                  <td className="py-1 font-medium text-indigo-700">Secured Debt</td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                </tr>
                                <tr className="border-b border-black/5">
                                  <td className="py-1 pl-3">CEI Term B-1 Loan</td>
                                  <td className="py-1 text-right">2,864.0</td>
                                  <td className="py-1 text-right">100.0</td>
                                  <td className="py-1 text-right">2,864.0</td>
                                  <td className="py-1">Feb-06-2031</td>
                                  <td className="py-1">USD SOFR + 2.250%</td>
                                  <td className="py-1 text-right">—</td>
                                </tr>
                                <tr className="border-b border-black/5">
                                  <td className="py-1 pl-3">CEI Term Loan A</td>
                                  <td className="py-1 text-right">656.0</td>
                                  <td className="py-1 text-right">99.9</td>
                                  <td className="py-1 text-right">655.6</td>
                                  <td className="py-1">Jan-31-2028</td>
                                  <td className="py-1">USD SOFR + 2.250%</td>
                                  <td className="py-1 text-right">—</td>
                                </tr>
                                <tr className="border-b border-black/5">
                                  <td className="py-1 pl-3">6.5% CEI Secured Notes</td>
                                  <td className="py-1 text-right">1,500.0</td>
                                  <td className="py-1 text-right">101.8</td>
                                  <td className="py-1 text-right">1,500.0</td>
                                  <td className="py-1">Feb-15-2032</td>
                                  <td className="py-1">6.500%</td>
                                  <td className="py-1 text-right">6.138%</td>
                                </tr>
                                <tr className="border-b border-black/5">
                                  <td className="py-1 pl-3">7% CEI Secured Notes</td>
                                  <td className="py-1 text-right">2,000.0</td>
                                  <td className="py-1 text-right">103.0</td>
                                  <td className="py-1 text-right">2,000.0</td>
                                  <td className="py-1">Feb-15-2030</td>
                                  <td className="py-1">7.000%</td>
                                  <td className="py-1 text-right">6.219%</td>
                                </tr>
                                <tr className="border-b border-black/10 bg-gray-50">
                                  <td className="py-1 font-medium">Total Secured Debt</td>
                                  <td className="py-1 text-right font-medium">9,384.0</td>
                                  <td className="py-1 text-right">—</td>
                                  <td className="py-1 text-right font-medium">9,383.6</td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                </tr>
                                <tr className="border-b border-black/10">
                                  <td className="py-1 font-medium text-indigo-700">Unsecured Debt</td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                </tr>
                                <tr className="border-b border-black/5">
                                  <td className="py-1 pl-3">8.125% CEI Senior Notes</td>
                                  <td className="py-1 text-right">546.0</td>
                                  <td className="py-1 text-right">100.0</td>
                                  <td className="py-1 text-right">546.0</td>
                                  <td className="py-1">Jul-01-2027</td>
                                  <td className="py-1">8.125%</td>
                                  <td className="py-1 text-right">8.053%</td>
                                </tr>
                                <tr className="border-b border-black/5">
                                  <td className="py-1 pl-3">4.625% CEI Senior Notes</td>
                                  <td className="py-1 text-right">1,200.0</td>
                                  <td className="py-1 text-right">94.3</td>
                                  <td className="py-1 text-right">1,131.9</td>
                                  <td className="py-1">Oct-15-2029</td>
                                  <td className="py-1">4.625%</td>
                                  <td className="py-1 text-right">6.219%</td>
                                </tr>
                                <tr className="border-b border-black/10 bg-gray-50">
                                  <td className="py-1 font-medium">Total Unsecured Debt</td>
                                  <td className="py-1 text-right font-medium">2,888.0</td>
                                  <td className="py-1 text-right">—</td>
                                  <td className="py-1 text-right font-medium">2,776.1</td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                </tr>
                                <tr className="border-b border-black/10 bg-indigo-50">
                                  <td className="py-1 font-semibold">Total Debt</td>
                                  <td className="py-1 text-right font-semibold">12,272.0</td>
                                  <td className="py-1 text-right">—</td>
                                  <td className="py-1 text-right font-semibold">12,159.6</td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                </tr>
                                <tr>
                                  <td className="py-1">Less: Cash & Equivalents</td>
                                  <td className="py-1 text-right">(982.0)</td>
                                  <td className="py-1 text-right">—</td>
                                  <td className="py-1 text-right">(982.0)</td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                </tr>
                                <tr className="bg-indigo-100">
                                  <td className="py-1 font-semibold">Net Debt</td>
                                  <td className="py-1 text-right font-semibold">11,290.0</td>
                                  <td className="py-1 text-right">—</td>
                                  <td className="py-1 text-right font-semibold">11,177.6</td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                  <td className="py-1"></td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>

                        {/* Pricing Chart */}
                        <div className="mt-4 rounded-[6px] border border-black/10 p-3">
                          <h4 className="font-semibold mb-2">Pricing (Last 12 Months)</h4>
                          <svg width="100%" height="140" viewBox="0 0 560 140" preserveAspectRatio="none">
                            <rect x="0" y="0" width="560" height="140" fill="white" />
                            <path d={pricingPath} stroke="#1f2937" strokeWidth="1" fill="none" />
                          </svg>
                        </div>

                        {/* Quick Links (two-column) */}
                        <div className="mt-4">
                          <div className="border-t border-black/10 pt-3">
                            <h4 className="font-semibold mb-2">Quick Links</h4>
                            <div className="grid grid-cols-2 gap-y-2 text-[14px]">
                              <a href="#" className="text-indigo-700 hover:underline">Tearsheet</a>
                              <a href="#" className="text-indigo-700 hover:underline">Intel</a>
                              <a href="#" className="text-indigo-700 hover:underline">Capital Structure</a>
                              <a href="#" className="text-indigo-700 hover:underline">Press Releases</a>
                              <a href="#" className="text-indigo-700 hover:underline">Company Page</a>
                              <a href="#" className="text-indigo-700 hover:underline">Documents</a>
                            </div>
                          </div>
                        </div>

                        {/* Latest Intel */}
                        <div className="mt-5">
                          <h4 className="font-semibold mb-2">Latest Intel</h4>
                          <div className="space-y-4 text-[14px]">
                            {[1,2,3].map((i) => (
                              <div key={i}>
                                <a href="#" className="font-semibold text-black hover:underline block">
                                  Blackstone, Bain, Bridgepoint and Cinven Circle Interpath - The Sunday Times
                                </a>
                                <div className="text-indigo-700 text-[13px]">
                                  <a href="#" className="hover:underline">Deal Origination</a>
                                  <span className="mx-1">/</span>
                                  <a href="#" className="hover:underline">Company</a>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </aside>
                    {/* Resize handle for right panel */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize"
                      onMouseDown={(e) => {
                        e.preventDefault()
                        const startX = e.clientX
                        const startWidth = rightWidth
                        const prevBodySelect = document.body.style.userSelect
                        const prevHtmlSelect = document.documentElement.style.userSelect
                        document.body.style.userSelect = 'none'
                        document.documentElement.style.userSelect = 'none'
                        function onMove(ev: MouseEvent) {
                          ev.preventDefault()
                          setRightWidth(Math.max(300, startWidth - (ev.clientX - startX)))
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
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


