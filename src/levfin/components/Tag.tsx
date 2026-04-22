interface TagProps {
  children: React.ReactNode
  color: string
  bg: string
  stroke: string
  size?: number
}

export default function Tag({ children, color, bg, stroke, size = 12 }: TagProps) {
  return (
    <span
      style={{
        fontSize: size,
        color,
        background: bg,
        border: `1px solid ${stroke}`,
        borderRadius: 4,
        padding: '2px 6px',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        lineHeight: '16px',
      }}
    >
      {children}
    </span>
  )
}
