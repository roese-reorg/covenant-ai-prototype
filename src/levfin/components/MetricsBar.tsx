import { METRICS, C } from '../data'

export default function MetricsBar() {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 8, marginBottom: 10 }}>
      <div style={{ display: 'flex' }}>
        {METRICS.map((m, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              padding: '10px 10px 8px',
              borderRight: i < METRICS.length - 1 ? `1px solid ${C.div}` : 'none',
            }}
          >
            <div style={{ fontSize: 11, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 3 }}>
              {m.label}
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, lineHeight: 1.15, marginBottom: 3 }}>{m.value}</div>
            <div
              style={{
                fontSize: 12,
                color: m.up === true ? C.green : m.up === false ? C.red : C.textGrey,
              }}
            >
              {m.delta}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
