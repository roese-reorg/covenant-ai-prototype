import { useState, useMemo } from 'react'
import SharedNavigation from '../components/SharedNavigation'
import SharedTopBar from '../components/SharedTopBar'

// Dummy data for news articles
const DUMMY = [
  {
    id: 1,
    title: 'Venezuela / Citgo Holding / Crystallex - Litigation Coverage: Court Continues Aug. 18 Citgo Sale Approval Hearing in Light of New Amber Energy Bid for PDVH Shares',
    company: 'Citgo Holding Inc.',
    content: 'Judge Leonard Stark has adjourned the hearing on Dalinar Energy\'s $7.4 billion bid for Venezuelan state-owned oil company PDVSA\'s shares in Citgo owner PDVH due to a new $8.8 billion bid from Amber Energy. The court cited the new bid as a "non-actionable underbid" and has scheduled a new hearing for August 18 to consider both proposals.',
    time: '01:32 PM EDT'
  },
  {
    id: 2,
    title: 'Primary Analysis: Flora Foods Works with Advisors on Potential $2.1B Refinancing Package',
    company: 'Flora Foods International',
    content: 'Flora Foods International is working with financial advisors to structure a comprehensive $2.1 billion refinancing package. The deal is expected to include new term loans, revolving credit facilities, and potential bond issuance to refinance existing debt and fund expansion initiatives.',
    time: '12:45 PM EDT'
  },
  {
    id: 3,
    title: 'Trinity Capital Plans to Sell Notes in Secondary Market; Pricing Expected at 94-96 Range',
    company: 'Trinity Capital Group',
    content: 'Trinity Capital Group has announced plans to sell approximately $450 million in senior secured notes through the secondary market. Market sources indicate pricing is expected in the 94-96 range, reflecting current market conditions and the company\'s credit profile.',
    time: '11:20 AM EDT'
  },
  {
    id: 4,
    title: 'EARNINGS: HB Fuller Q2\'25 Results Show Strong Performance; Leverage Ratio Improves to 3.2x',
    company: 'HB Fuller Company',
    content: 'HB Fuller has reported strong Q2 2025 results with EBITDA growth of 8.5% year-over-year. The company\'s leverage ratio has improved to 3.2x from 3.8x, driven by strong cash flow generation and debt reduction initiatives.',
    time: '10:15 AM EDT'
  },
  {
    id: 5,
    title: 'Samarco Seeks Early Exit from Restructuring Plan; Lenders Consider $1.8B Refinancing',
    company: 'Samarco Mineração',
    content: 'Samarco Mineração is seeking early exit from its current restructuring plan through a proposed $1.8 billion refinancing package. The deal would allow the company to emerge from restructuring ahead of schedule and resume normal operations.',
    time: '09:30 AM EDT'
  },
  {
    id: 6,
    title: 'CLO Insights: New Issue Volume Reaches $45B in Q2; Spreads Tighten Across Capital Stack',
    company: 'CLO Market Analysis',
    content: 'The CLO market has seen robust new issue volume of $45 billion in Q2 2025, with spreads tightening across the capital stack. Triple-A spreads have compressed by 15-20 basis points while mezzanine tranches show similar tightening trends.',
    time: '08:45 AM EDT'
  },
  {
    id: 7,
    title: 'Americas Private Credit Deal Origination: Healthcare Sector Leads Q2 Activity with $12B Volume',
    company: 'Private Credit Market',
    content: 'The Americas private credit market has recorded $12 billion in healthcare sector deal origination during Q2 2025, representing 28% of total volume. The sector continues to attract strong investor interest despite broader market volatility.',
    time: '08:00 AM EDT'
  },
  {
    id: 8,
    title: 'Distressed Alert: Retail Chain Seeks DIP Financing; $850M Restructuring Plan Underway',
    company: 'Retail Ventures Corp.',
    content: 'A major retail chain has filed for Chapter 11 protection and is seeking $150 million in DIP financing to support operations during restructuring. The company has proposed an $850 million restructuring plan that includes store closures and operational improvements.',
    time: '07:30 AM EDT'
  },
  {
    id: 9,
    title: 'Credit Update: Manufacturing Company Secures $650M Refinancing; Extends Maturity to 2030',
    company: 'Advanced Manufacturing Co.',
    content: 'Advanced Manufacturing Co. has successfully closed a $650 million refinancing package that extends debt maturities to 2030. The deal includes improved pricing and covenant relief, reflecting the company\'s strong operational performance.',
    time: '07:00 AM EDT'
  },
  {
    id: 10,
    title: 'M&A Alert: Private Equity Consortium Acquires Energy Services Provider for $3.2B',
    company: 'Energy Services International',
    content: 'A consortium of private equity firms has completed the acquisition of Energy Services International for $3.2 billion. The deal includes $2.1 billion in debt financing and represents one of the largest energy services transactions of the year.',
    time: '06:45 AM EDT'
  }
]

export default function NewsPage() {
  const [selectedId, setSelectedId] = useState(1)
  const [isRightOpen, setIsRightOpen] = useState(false)
  const [leftWidth, setLeftWidth] = useState(300)
  const [rightWidth, setRightWidth] = useState(400)
  const [articleSummaryOpen, setArticleSummaryOpen] = useState(true)
  const [companySummaryOpen, setCompanySummaryOpen] = useState(true)

  const selected = useMemo(() => DUMMY.find(a => a.id === selectedId) || DUMMY[0], [selectedId])

  return (
    <div className="min-h-dvh flex bg-white">
      {/* Left Navigation Sidebar */}
      <SharedNavigation />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <SharedTopBar />

        {/* Filter bar */}
        <div className="border-b border-black/10 bg-white">
          <div className="px-4 sm:px-6 py-2 text-sm flex gap-2 flex-wrap">
            {['Countries', 'Content Type', 'Published Date', 'Coverage Area', 'Topic Category', 'Lifecycle Stage', 'GICS Sector'].map(t => (
              <div key={t} className="rounded-md border border-black/10 bg-white px-2 py-1">{t} ▾</div>
            ))}
            <div className="ml-auto">492 Results</div>
          </div>
        </div>

        {/* Main content area */}
        <div className="flex-1 overflow-auto">
          <div className="flex">
            {/* Main content wrapper with padding */}
            <div className="flex-1 px-4 sm:px-6 pt-4">
              {/* Main content container */}
              <div className="flex rounded-xl border border-black/10 bg-white shadow-sm overflow-hidden" style={{ height: 'calc(100dvh - 200px)' }}>
                {/* Intel list (resizable) */}
                <div className="relative" style={{ width: leftWidth }}>
                  <aside className="h-full border-r border-black/10 bg-white overflow-auto">
                    <div className="px-3 py-2 text-sm font-medium">Intel List</div>
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
                  </aside>
                  {/* Resize handle for left panel */}
                  <div
                    className="absolute right-0 top-0 bottom-0 w-1 cursor-col-resize"
                    onMouseDown={(e) => {
                      const startX = e.clientX
                      const startWidth = leftWidth
                      function onMove(ev: MouseEvent) { setLeftWidth(Math.max(240, startWidth + (ev.clientX - startX))) }
                      function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
                      window.addEventListener('mousemove', onMove)
                      window.addEventListener('mouseup', onUp)
                    }}
                  />
                </div>

                {/* Article */}
                <main className="flex-1 overflow-auto p-5">
                  <h2 className="text-xl font-semibold">{selected.title}</h2>
                  <div className="mt-1 text-[12px] text-black/60">Mon 20 June, 2024 07:00 PM EST</div>

                  <div className="mt-3 rounded-[5px] border-2 py-[5px] px-4 relative overflow-hidden" style={{ borderImage: 'linear-gradient(45deg, #FFDC61, #C2A88d, #7264c7, #5f4adf, #4b2ff6) 1' }}>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-black/60">Summary by AI at Octus</div>
                      <button 
                        className="text-lg transition-transform duration-200" 
                        onClick={() => setArticleSummaryOpen(!articleSummaryOpen)}
                        style={{ transform: articleSummaryOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                      >
                        <i className="bi bi-chevron-down" />
                      </button>
                    </div>
                    {articleSummaryOpen && (
                      <>
                        <p className="text-[14px] leading-[21px]">
                          {selected.content}
                        </p>
                        <div className="mt-3 text-sm">
                          Tags: <button className="text-indigo-700 hover:underline" onClick={() => { setIsRightOpen(true); setRightWidth(Math.max(rightWidth, 360)) }}>{selected.company}</button>
                        </div>
                      </>
                    )}
                  </div>
                  
                  {/* Full Article */}
                  <div className="mt-4">
                    <p className="text-[14px] leading-[21px]">
                      {selected.content}
                    </p>
                    <p className="text-[14px] leading-[21px] mt-3">
                      The company has been working closely with its advisors to develop a comprehensive restructuring plan that addresses both immediate financial challenges and long-term sustainability. This approach involves not only operational improvements but also strategic repositioning in the market.
                    </p>
                    <p className="text-[14px] leading-[21px] mt-3">
                      Industry analysts have noted that this restructuring represents a broader trend in the sector, where companies are seeking to adapt to changing market conditions while maintaining their core business operations. The success of this plan will likely serve as a case study for similar situations in the future.
                    </p>
                  </div>
                </main>

                {/* Resizable right panel; only shown when opened - positioned to push content aside */}
                {isRightOpen && (
                  <div className="relative" style={{ width: rightWidth }}>
            <div className="absolute left-0 top-0 bottom-0 w-1 cursor-col-resize bg-transparent"
              onMouseDown={(e) => {
                const startX = e.clientX
                const startWidth = rightWidth
                function onMove(ev: MouseEvent) { setRightWidth(Math.max(280, startWidth - (ev.clientX - startX))) }
                function onUp() { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
                window.addEventListener('mousemove', onMove)
                window.addEventListener('mouseup', onUp)
              }}
            />
            <aside className="h-full border-l border-black/10 bg-white overflow-auto p-4 w-full">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{selected.company}</h3>
                <div className="flex items-center gap-2">
                  <button className="text-lg" aria-label="Close" onClick={() => setIsRightOpen(false)}>×</button>
                </div>
              </div>
              <div className="mt-3 rounded-[5px] border-2 py-[5px] px-3 text-sm relative overflow-hidden" style={{ borderImage: 'linear-gradient(45deg, #FFDC61, #C2A88d, #7264c7, #5f4adf, #4b2ff6) 1' }}>
                <div className="flex items-center justify-between">
                  <div className="text-[14px] leading-[14px]">Company Summary</div>
                  <button 
                    className="text-lg transition-transform duration-200" 
                    onClick={() => setCompanySummaryOpen(!companySummaryOpen)}
                    style={{ transform: companySummaryOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    <i className="bi bi-chevron-down" />
                  </button>
                </div>
                {companySummaryOpen && (
                  <div className="text-[14px] leading-[21px]">
                    Information summary about company: recent leverage, liquidity highlights, and covenant headroom based on latest filings.
                  </div>
                )}
              </div>
              
              {/* Capital Structure Table */}
              <div className="mt-4 rounded-[5px] border border-black/10 p-3 overflow-x-auto">
                <h4 className="font-semibold mb-3">Capital Structure</h4>
                <div className="min-w-[600px]">
                  <table className="w-full text-[11px]">
                    <thead>
                      <tr className="border-b border-black/20">
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
                        <td className="py-1 font-medium text-blue-700">Secured Debt</td>
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
                        <td className="py-1 text-right">-</td>
                      </tr>
                      <tr className="border-b border-black/5">
                        <td className="py-1 pl-3">CEI Term Loan A</td>
                        <td className="py-1 text-right">656.0</td>
                        <td className="py-1 text-right">99.9</td>
                        <td className="py-1 text-right">655.6</td>
                        <td className="py-1">Jan-31-2028</td>
                        <td className="py-1">USD SOFR + 2.250%</td>
                        <td className="py-1 text-right">-</td>
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
                        <td className="py-1 text-right">-</td>
                        <td className="py-1 text-right font-medium">9,383.6</td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                      </tr>
                      <tr className="border-b border-black/5">
                        <td className="py-1 font-medium text-blue-700">Unsecured Debt</td>
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
                        <td className="py-1 text-right">-</td>
                        <td className="py-1 text-right font-medium">2,776.1</td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                      </tr>
                      <tr className="border-b border-black/10 bg-blue-50">
                        <td className="py-1 font-semibold">Total Debt</td>
                        <td className="py-1 text-right font-semibold">12,272.0</td>
                        <td className="py-1 text-right">-</td>
                        <td className="py-1 text-right font-semibold">12,159.6</td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                      </tr>
                      <tr className="border-b border-black/10 bg-blue-50">
                        <td className="py-1">Less: Cash & Equivalents</td>
                        <td className="py-1 text-right">(982.0)</td>
                        <td className="py-1 text-right">-</td>
                        <td className="py-1 text-right">(982.0)</td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                      </tr>
                      <tr className="bg-blue-100">
                        <td className="py-1 font-semibold">Net Debt</td>
                        <td className="py-1 text-right font-semibold">11,290.0</td>
                        <td className="py-1 text-right">-</td>
                        <td className="py-1 text-right font-semibold">11,177.6</td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                        <td className="py-1"></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                
                {/* Additional Metrics */}
                <div className="mt-4 grid grid-cols-2 gap-4 text-[11px]">
                  <div>
                    <h5 className="font-medium mb-2">Operating Metrics</h5>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>LTM Revenue:</span>
                        <span className="font-medium">11,374.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span>LTM EBITDA:</span>
                        <span className="font-medium">3,725.0</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h5 className="font-medium mb-2">Credit Metrics</h5>
                    <div className="space-y-1">
                      <div className="flex justify-between">
                        <span>Gross Leverage:</span>
                        <span className="font-medium">3.3x</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Net Leverage:</span>
                        <span className="font-medium">3.0x</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-2 text-sm"><a className="text-indigo-700 hover:underline" href="/">Open in CreditAI</a></div>
              <ul className="mt-3 list-disc pl-5 space-y-1 text-sm">
                <li>As of January 2025, the company has proposed a $1,503m senior secured first lien term loan due in 2032.</li>
                <li>Recent performance demonstrates solid financial direction since 2020.</li>
                <li>Quick Links: <a className="text-indigo-700" href="#">Tearsheet</a>, <a className="text-indigo-700" href="#">Intel</a>, <a className="text-indigo-700" href="#">Capital Structure</a></li>
              </ul>
            </aside>
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


