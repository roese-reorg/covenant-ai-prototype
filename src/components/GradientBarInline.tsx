export default function GradientBarInline() {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-t-[15px]">
      <div className="h-full w-full bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-cyan-400 bg-[length:200%_100%] animate-shimmer" />
    </div>
  )
}

