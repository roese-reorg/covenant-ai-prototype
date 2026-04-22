import { useState } from 'react'
import SharedNavigation from '../components/SharedNavigation'
import { C } from './data'
import AISearchBar from './components/AISearchBar'
import MetricsBar from './components/MetricsBar'
import KPIStrip from './components/KPIStrip'
import PipelineTable from './components/PipelineTable'
import LiveAlerts from './components/LiveAlerts'

const TABS = ['Dashboard', 'Pipeline', 'Comps', 'Issuers', 'Sponsors', 'Historical Transactions', 'News']

export default function LevFinPage() {
  const [activeTab, setActiveTab] = useState('Dashboard')

  // Nav state (same pattern as App.tsx)
  const [isNavExpanded, setIsNavExpanded] = useState(true)
  const [intelExpanded, setIntelExpanded] = useState(false)
  const [covenantsExpanded, setCovenantsExpanded] = useState(false)
  const [sourceFilesExpanded, setSourceFilesExpanded] = useState(false)
  const [companiesExpanded, setCompaniesExpanded] = useState(false)
  const [creditCloudExpanded, setCreditCloudExpanded] = useState(false)
  const [findoxExpanded, setFindoxExpanded] = useState(false)
  const [resourcesExpanded, setResourcesExpanded] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        background: C.bg,
        fontFamily: "'Inter', system-ui, sans-serif",
        overflow: 'hidden',
        fontSize: 12,
        color: C.text,
      }}
    >
      {/* Shared left nav */}
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

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {/* Top bar (LevFin-branded, matches design spec) */}
        <div
          style={{
            background: C.topNav,
            height: 46,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 12,
            flexShrink: 0,
          }}
        >
          <span style={{ fontSize: 14, fontWeight: 700, color: '#fff' }}>Leveraged Finance</span>
          <div
            style={{
              flex: 1,
              background: 'rgba(255,255,255,0.12)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: 6,
              height: 30,
              display: 'flex',
              alignItems: 'center',
              padding: '0 10px',
              gap: 8,
            }}
          >
            <svg width={11} height={11} viewBox="0 0 12 12" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1.3" strokeLinecap="round">
              <circle cx="4.5" cy="4.5" r="3.5" />
              <path d="M7.5 7.5L11 11" />
            </svg>
            <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>Search</span>
          </div>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#c4a0ff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 12,
              fontWeight: 700,
              color: C.topNav,
            }}
          >
            TR
          </div>
        </div>

        {/* Tab bar */}
        <div
          style={{
            background: C.card,
            borderBottom: `1px solid ${C.div}`,
            display: 'flex',
            alignItems: 'flex-end',
            padding: '0 16px',
            height: 42,
            flexShrink: 0,
          }}
        >
          {TABS.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: '0 14px',
                height: 42,
                display: 'flex',
                alignItems: 'center',
                fontSize: 12,
                fontWeight: t === activeTab ? 700 : 400,
                color: t === activeTab ? C.accent : C.textGrey,
                borderBottom: t === activeTab ? `2px solid ${C.accent}` : '2px solid transparent',
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                userSelect: 'none',
                fontFamily: 'inherit',
              }}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {activeTab === 'Dashboard' && (
            <div style={{ padding: '12px 16px', display: 'flex', gap: 12 }}>
              {/* Main column */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <AISearchBar />
                <MetricsBar />
                <KPIStrip />
                <PipelineTable />
              </div>
              {/* Right sidebar */}
              <div style={{ width: 300, flexShrink: 0 }}>
                <LiveAlerts />
              </div>
            </div>
          )}

          {activeTab === 'Pipeline' && (
            <div style={{ padding: '14px 16px' }}>
              <KPIStrip />
              <PipelineTable />
            </div>
          )}

          {!['Dashboard', 'Pipeline'].includes(activeTab) && (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: C.textMuted,
                fontSize: 14,
                padding: 48,
              }}
            >
              {activeTab} — coming soon
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
