import { motion, AnimatePresence } from 'framer-motion'

interface ThinkingMessageProps {
  line: string
  step: number
  totalSteps: number
}

export default function ThinkingMessage({ line, step, totalSteps }: ThinkingMessageProps) {
  return (
    <div className="w-full flex items-start gap-3">
      <div className="mt-0.5 h-7 w-7 shrink-0 rounded-full bg-gradient-to-br from-fuchsia-500 to-indigo-500" />
      <div className="flex-1 rounded-[15px] bg-white text-black border border-black/10 shadow-sm overflow-hidden">
        <div className="px-4 py-3">
          <div className="flex items-stretch gap-3">
            <div className="relative mt-0.5 w-1.5 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-fuchsia-400 via-indigo-300 to-cyan-300 bg-[length:100%_200%] animate-shimmer-y" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[15px] leading-7 italic text-black/60">
                {line}
              </div>
            </div>
          </div>
        </div>
        {step === totalSteps - 1 && (
          <>
            <div className="px-4 pb-3">
              <p className="text-[15px] leading-7 italic text-black/60 mb-3">
                I'm now pulling up the specific sections in McAfee's credit agreement that detail amendment consent requirements.
              </p>
            </div>
            <GradientBarInline />
          </>
        )}
      </div>
    </div>
  )
}

function GradientBarInline() {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-t-[15px]">
      <div className="h-full w-full bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-cyan-400 bg-[length:200%_100%] animate-shimmer" />
    </div>
  )
}
