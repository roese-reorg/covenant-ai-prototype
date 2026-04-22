import { ALERTS, C } from '../data'

export default function LiveAlerts() {
  return (
    <div style={{ background: C.card, border: `1px solid ${C.cardBorder}`, borderRadius: 8, marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px', borderBottom: `1px solid ${C.div}` }}>
        <div style={{ fontSize: 13, fontWeight: 700, flex: 1 }}>Live Alerts</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: C.green }} />
          <span style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>Live</span>
        </div>
      </div>
      <div style={{ maxHeight: 260, overflowY: 'auto' }}>
        {ALERTS.map((a, i) => (
          <div
            key={i}
            style={{ padding: '8px 14px', borderBottom: i < ALERTS.length - 1 ? `1px solid ${C.div}` : 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
              <span style={{ fontSize: 11, color: C.textMuted }}>{a.time}</span>
              <span
                style={{
                  fontSize: 10,
                  color: a.sc,
                  background: a.sb,
                  border: `1px solid ${a.sc}44`,
                  borderRadius: 3,
                  padding: '1px 5px',
                  fontWeight: 700,
                }}
              >
                {a.type}
              </span>
            </div>
            <div style={{ fontSize: 12, lineHeight: 1.45 }}>{a.text}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
