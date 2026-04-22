import { useState, useMemo } from 'react'
import { DEALS, C } from '../data'
import Tag from './Tag'

const TH: React.CSSProperties = {
  padding: '7px 10px',
  fontSize: 12,
  fontWeight: 700,
  color: C.text,
  background: C.card,
  borderBottom: `2px solid ${C.text}`,
  whiteSpace: 'nowrap',
  textAlign: 'left',
}

export default function PipelineTable() {
  const [search, setSearch] = useState('')
  const [sector, setSector] = useState('All')
  const [page, setPage] = useState(1)
  const PER_PAGE = 5

  const sectors = ['All', ...Array.from(new Set(DEALS.map(d => d.sector)))]

  const filtered = useMemo(
    () =>
      DEALS.filter(
        d =>
          d.issuer.toLowerCase().includes(search.toLowerCase()) &&
          (sector === 'All' || d.sector === sector),
      ),
    [search, sector],
  )

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.cardBorder}`,
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
      }}
    >
      {/* Card header */}
      <div style={{ padding: '12px 14px', borderBottom: `1px solid ${C.div}` }}>
        <div style={{ fontSize: 15, fontWeight: 700 }}>New Issuance Pipeline</div>
      </div>

      {/* Action bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '8px 12px',
          borderBottom: `1px solid ${C.div}`,
          flexWrap: 'wrap',
        }}
      >
        {/* Search */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            border: `1px solid ${C.div}`,
            borderRadius: 5,
            padding: '4px 8px',
            width: 200,
            background: C.card,
          }}
        >
          <svg width={13} height={13} viewBox="0 0 12 12" fill="none" stroke={C.textMuted} strokeWidth="1.3" strokeLinecap="round">
            <circle cx="4.5" cy="4.5" r="3.5" />
            <path d="M7.5 7.5L11 11" />
          </svg>
          <input
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search issuer…"
            style={{ border: 'none', outline: 'none', fontSize: 12, fontFamily: 'inherit', background: 'transparent', width: '100%' }}
          />
        </div>

        {/* Sector filter */}
        <select
          value={sector}
          onChange={e => { setSector(e.target.value); setPage(1) }}
          style={{ border: `1px solid ${C.div}`, borderRadius: 5, padding: '4px 8px', fontSize: 12, fontFamily: 'inherit', background: C.accentPale, color: C.text, cursor: 'pointer' }}
        >
          {sectors.map(s => <option key={s}>{s}</option>)}
        </select>

        <div style={{ marginLeft: 'auto', fontSize: 12, color: C.textGrey }}>
          <b style={{ color: C.text }}>{filtered.length}</b> deals
        </div>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>
              {['Issuer', 'Sector', 'Type', 'Size', 'Spread', 'OID', 'RV vs. Sector', 'Status'].map((h, i) => (
                <th key={h} style={{ ...TH, textAlign: i === 0 ? 'left' : 'right' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} style={{ padding: 24, textAlign: 'center', color: C.textMuted }}>No deals match.</td>
              </tr>
            ) : paginated.map(d => (
              <tr
                key={d.id}
                style={{ background: C.card, borderBottom: `1px solid ${C.rowBorder}` }}
                onMouseEnter={e => (e.currentTarget.style.background = C.accentPale)}
                onMouseLeave={e => (e.currentTarget.style.background = C.card)}
              >
                <td style={{ padding: '7px 10px' }}>
                  <span style={{ color: C.textBlue, fontWeight: 500 }}>{d.issuer}</span>
                  {d.flex && (
                    <Tag color={C.text} bg="#f0f0f0" stroke={C.div} size={11}>
                      {' '}{d.flex === 'Rev Flex' ? '↑ Rev Flex' : '↓ Flex Out'}
                    </Tag>
                  )}
                </td>
                <td style={{ padding: '7px 10px', textAlign: 'right' }}>
                  <Tag color={C.textGrey} bg="#f0f0f0" stroke={C.div} size={11}>{d.sector}</Tag>
                </td>
                <td style={{ padding: '7px 10px', textAlign: 'right', color: C.textGrey }}>{d.type}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right', fontWeight: 600 }}>{d.size}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right' }}>{d.spread}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right', color: C.textGrey }}>{d.oid}</td>
                <td style={{ padding: '7px 10px', textAlign: 'right' }}>
                  <Tag color={d.rv.color} bg={d.rv.bg} stroke={d.rv.stroke}>{d.rv.label}</Tag>
                </td>
                <td style={{ padding: '7px 10px', textAlign: 'right' }}>
                  <Tag color={d.status.color} bg={d.status.bg} stroke={d.status.stroke}>{d.status.label}</Tag>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '8px 14px',
          borderTop: `1px solid ${C.div}`,
        }}
      >
        <span style={{ fontSize: 12, color: C.textGrey }}>
          {filtered.length ? Math.min((page - 1) * PER_PAGE + 1, filtered.length) : 0}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
        </span>
        <div style={{ display: 'flex', gap: 4 }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              onClick={() => setPage(p)}
              style={{
                width: 26,
                height: 26,
                borderRadius: '50%',
                border: `1px solid ${C.accentMid}`,
                background: p === page ? C.accentPale : C.card,
                color: C.accentMid,
                fontSize: 12,
                cursor: 'pointer',
                fontWeight: p === page ? 700 : 400,
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
