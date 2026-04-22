import { DEALS, C } from '../data'

export default function KPIStrip() {
  const pricingToday = DEALS.filter(d => d.status.label === 'Pricing Today').length
  const booksOpen = DEALS.filter(d => d.status.label === 'Books Open').length
  const totalVol = DEALS.reduce((s, d) => s + parseFloat(d.size.replace(/[$,M]/g, '')), 0)
  const avgSpread = Math.round(DEALS.reduce((s, d) => s + parseInt(d.spread.replace('S+', '')), 0) / DEALS.length)

  const kpis = [
    { label: 'Deals In Market', value: DEALS.length, color: C.accent },
    { label: 'Pricing Today', value: pricingToday, color: C.textBlue },
    { label: 'Books Open', value: booksOpen, color: C.yellowText },
    { label: 'Total Volume', value: `$${(totalVol / 1000).toFixed(1)}B`, color: C.greenText },
    { label: 'Avg Spread', value: `S+${avgSpread}`, color: C.text },
  ]

  return (
    <div style={{ display: 'flex', gap: 10, marginBottom: 10, flexWrap: 'wrap' }}>
      {kpis.map((x, i) => (
        <div
          key={i}
          style={{
            background: C.card,
            border: `1px solid ${C.cardBorder}`,
            borderRadius: 8,
            padding: '10px 18px',
            minWidth: 110,
            textAlign: 'center',
            flex: 1,
          }}
        >
          <div style={{ fontSize: 22, fontWeight: 700, color: x.color }}>{x.value}</div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>{x.label}</div>
        </div>
      ))}
    </div>
  )
}
