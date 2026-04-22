import { C } from '../data'

export default function AISearchBar() {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.cardBorder}`,
        borderRadius: 8,
        padding: '11px 14px',
        marginBottom: 10,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: 5,
            background: `linear-gradient(135deg,${C.accent},${C.gYellow})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 12,
            color: '#fff',
            fontWeight: 800,
            flexShrink: 0,
          }}
        >
          AI
        </div>
        <input
          placeholder="Ask anything about leveraged finance markets…"
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 12,
            fontFamily: 'inherit',
          }}
        />
      </div>
      <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
        {['HY spread trends', 'Apex deal comps', 'KKR pipeline', 'Fed impact'].map((s, i) => (
          <span
            key={i}
            style={{
              fontSize: 12,
              color: C.textBlue,
              background: C.purpleBg,
              border: `1px solid ${C.purpleStroke}`,
              borderRadius: 4,
              padding: '2px 6px',
              cursor: 'pointer',
            }}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  )
}
