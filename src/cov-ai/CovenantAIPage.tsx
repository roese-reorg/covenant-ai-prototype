import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import clsx from 'clsx'
import { Link } from 'react-router-dom'
import SharedNavigation from '../components/SharedNavigation'
import SharedTopBar from '../components/SharedTopBar'

function GradientBarInline() {
  return (
    <div className="h-[3px] w-full overflow-hidden rounded-t-[15px]">
      <div className="h-full w-full bg-gradient-to-r from-fuchsia-500 via-indigo-400 to-cyan-400 bg-[length:200%_100%] animate-shimmer" />
    </div>
  )
}

function TypingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity }}
      className="inline-block w-0.5 h-4 bg-black ml-1"
    />
  )
}

function MessageBubble({ role, content, streaming }: { role: 'user' | 'assistant'; content: string; streaming?: boolean }) {
  const isAssistant = role === 'assistant'
  const [copied, setCopied] = useState(false)
  return (
    <div className={clsx('w-full flex items-start gap-3')}>
      <div
        className={clsx(
          'mt-0.5 h-7 w-7 shrink-0 rounded-full',
          isAssistant ? 'bg-gradient-to-br from-fuchsia-500 to-indigo-500' : 'bg-black/80 border border-black'
        )}
      />
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
        className={clsx(
          'max-w-[800px] text-[15px] leading-7',
          isAssistant ? 'rounded-[15px] bg-white text-black px-4 py-3 border border-black/10 shadow-sm' : 'text-black whitespace-pre-wrap'
        )}
      >
        {isAssistant ? (
          <ReactMarkdown
            components={{
              p: ({ node, ...props }) => <p className="mb-2" {...props} />,
              strong: ({ node, ...props }) => <strong className="font-semibold" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc pl-6 space-y-1" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal pl-6 space-y-1" {...props} />,
              li: ({ node, ...props }) => <li className="ml-1" {...props} />,
              h4: ({ node, ...props }) => <h4 className="font-semibold mb-1" {...props} />,
            }}
          >
            {content}
          </ReactMarkdown>
        ) : (
          content
        )}
        {streaming && <TypingCursor />}
        {isAssistant && !streaming && (
          <div className="mt-2 flex items-center gap-2 text-xs text-black/60">
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(content)
                setCopied(true)
                setTimeout(() => setCopied(false), 1200)
              }}
              className="inline-flex items-center gap-1 rounded px-2 py-1 bg-[#EFF0FF] text-black hover:opacity-90"
              title="Copy"
              type="button"
            >
              <i className="bi bi-files" />
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
            <button className="ml-1 inline-flex items-center justify-center h-7 w-7 rounded bg-[#EFF0FF] text-black hover:opacity-90" title="Helpful" type="button">
              <i className="bi bi-hand-thumbs-up-fill" />
            </button>
            <button className="inline-flex items-center justify-center h-7 w-7 rounded bg-[#EFF0FF] text-black hover:opacity-90" title="Not helpful" type="button">
              <i className="bi bi-hand-thumbs-down-fill" />
            </button>
          </div>
        )}
      </motion.div>
    </div>
  )
}

function ThinkingMessage({ line, step, totalSteps }: { line: string; step: number; totalSteps: number }) {
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
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={step} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -3 }} transition={{ duration: 0.25 }} className="text-[15px] leading-7 italic text-black/60">
                  {line}
                </motion.div>
              </AnimatePresence>
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

export default function CovenantAIPage() {
  const [messages, setMessages] = useState<Array<{ role: 'user' | 'assistant'; content: string }>>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingShown, setThinkingShown] = useState(0)

  const endRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, isThinking])

  const thinkingLines = useMemo(
    () => [
      "Okay, so I can see you're asking about McAfee and which amendments need affected lender consent. I'm on it.",
      "I'm now searching through McAfee's credit agreement for detailed information about:",
      'Which amendments, waivers, or modifications require unanimous consent from all affected lenders (Unanimous Lender Matters)',
      'Specific changes to key structural definitions like Majority Lender or Super Majority Lender that need special approval',
      'Modifications to enforcement priority and Transaction Security distribution mechanisms under the Intercreditor Agreement',
      'Introduction of senior-ranking facilities and their consent requirements',
      'Amendments that may only need Threshold For Financial Covenant Amendment standards with Required Lenders or majority facility lender consent',
      'Financial covenant modifications and their specific approval thresholds',
      'Transfer or assignment provisions that trigger Borrower Consent Required stipulations',
      'Any deemed consent timeframes that apply to these various amendment categories',
    ],
    []
  )

  async function handleSend() {
    const trimmed = input.trim()
    if (!trimmed) return
    setMessages(prev => [...prev, { role: 'user', content: trimmed }])
    setInput('')

    // Show thinking and animate lines progressively
    setIsThinking(true)
    setThinkingShown(0)
    for (let i = 0; i < thinkingLines.length; i++) {
      setThinkingShown(i)
      // slower per step for readability
      const delay = i < 1 ? 1500 : 1000
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, delay))
    }

    // After thinking, clear thinking card and stream the final answer
    setIsThinking(false)

    const answer = `Based on the retrieved documents, in McAfee's credit agreement, several types of amendments require affected lender consent.\n\n**Amendments Requiring Each Affected Lender's Consent:**\n\n1. **Individual Lender Commitment Changes** — Any amendment that increases the commitment of a specific lender\n2. **Principal Reduction** — Amendments that reduce the principal amount of any loan owed to a specific lender or any amount due on loan installment dates\n3. **Maturity Extensions** — Amendments that extend the scheduled final maturity of any loan or postpone loan installment dates or interest payment dates for specific lenders\n4. **Rate/Fee Reductions** — Amendments that reduce the rate of interest or the amount of any fee or premium owed to a specific lender (with certain exceptions for default rate waivers and technical adjustments)\n5. **Commitment Extensions** — Amendments that extend the expiry date of a specific lender's commitment\n\n**Unanimous Consent Requirements (All Lenders):**\n\n- Changes to the definition of "Required Lenders" or voting percentages\n- Release of all or substantially all collateral from liens granted under collateral documents\n- Release of all or substantially all value of guarantees under the loan guaranty\n\n**Class-Specific Amendments:**\n\n- Amendments affecting only one class of loans or commitments that don't adversely affect other classes may be made with consent of the Required Class Lenders of that specific class, rather than requiring all lenders' consent.\n\n**Revolving Facility Specific:**\n\n- For revolving facilities, amendments to financial covenants (including the First Lien Net Leverage Ratio definition) only require consent of the majority of revolving lenders, not all lenders or term lenders.\n\nThe credit agreement also includes provisions for net short lender restrictions and deemed consent timeframes of 10 business days for certain assignment matters.`;

    const words = answer.split(' ')
    let composed = ''
    for (let i = 0; i < words.length; i++) {
      composed += (i === 0 ? '' : ' ') + words[i]
      setMessages(prev => {
        const clone = [...prev]
        const last = clone[clone.length - 1]
        if (last?.role === 'assistant') clone[clone.length - 1] = { role: 'assistant', content: composed }
        else clone.push({ role: 'assistant', content: composed })
        return clone
      })
      // eslint-disable-next-line no-await-in-loop
      await new Promise(r => setTimeout(r, Math.max(10, 24 - Math.min(i, 24))))
    }
  }

  return (
    <div className="min-h-dvh flex bg-[#EFF0FF]">
      {/* Left Navigation Sidebar */}
      <SharedNavigation />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <SharedTopBar />

        {/* Main Content */}
        <div className="flex-1 flex">
          {/* Left Panel - Conversations */}
          <div className="w-80 bg-black border-r border-black/10">
            {/* NEW CONVERSATION Button - Full width across both panels */}
            <div className="p-3">
              <Link
                to="/"
                className="w-full bg-primary-600 hover:bg-primary-700 px-3 py-2 text-sm font-medium text-white shadow-none rounded-lg flex items-center justify-center gap-2 transition-colors"
              >
                <i className="bi bi-plus-lg"></i>
                NEW CONVERSATION
              </Link>
            </div>
            
            <div className="flex-1 bg-black p-3 text-white flex flex-col overflow-hidden">
              <div className="text-xs uppercase text-white/60">Recent Conversations</div>
              <div className="mt-2 space-y-1 pr-1">
                {/* September 1st, 2024 */}
                <div className="text-xs text-white/40 mt-3 mb-2">September 1st, 2024</div>
                {[
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                  'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
                ].map((label, i) => (
                  <div
                    key={i}
                    className="rounded-md px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                  >
                    <span className="inline-block text-[10px] leading-none text-[#FFDC61]">▶</span>
                    <span className="line-clamp-2">{label}</span>
                  </div>
                ))}
                
                {/* August 30th, 2024 */}
                <div className="text-xs text-white/40 mt-3 mb-2">August 30th, 2024</div>
                {[
                  'Laboris nisi ut aliquip ex ea commodo consequat',
                  'Duis aute irure dolor in reprehenderit in voluptate velit',
                  'Excepteur sint occaecat cupidatat non proident',
                ].map((label, i) => (
                  <div
                    key={i}
                    className="rounded-md px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                  >
                    <span className="inline-block text-[10px] leading-none text-[#FFDC61]">▶</span>
                    <span className="line-clamp-2">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="flex-1 bg-[#EFF0FF] flex flex-col">
            {/* Chat Messages - Scrollable */}
            <div className="flex-1 p-6 overflow-y-auto">
              <div className="max-w-4xl mx-auto space-y-6">
                <AnimatePresence initial={false}>
                  {messages.map((m, i) => (
                    <MessageBubble key={i} role={m.role} content={m.content} />
                  ))}
                  {isThinking && (
                    <ThinkingMessage line={thinkingLines[thinkingShown]} step={thinkingShown} totalSteps={thinkingLines.length} />
                  )}
                </AnimatePresence>
                <div ref={endRef} />
              </div>
            </div>

            {/* Chat Input - Fixed to Bottom */}
            <div className="bg-gray-800 p-4 mt-auto">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="space-y-3">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <select className="bg-gray-700 text-white px-3 py-2 rounded-lg text-sm border border-gray-600">
                      <option>CovenantAI</option>
                    </select>
                    <i className="bi bi-chevron-down text-gray-400"></i>
                  </div>
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me something!"
                    className="flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500"
                  />
                  <div className="text-gray-400 text-sm">0/500</div>
                </div>
                <div className="text-xs text-gray-400">
                  Answers are generated by CreditAI and should not be considered advice or guidance, 
                  <a href="#" className="text-blue-400 hover:underline"> complete information here</a>. 
                  Need help crafting questions? <a href="#" className="text-blue-400 hover:underline">Click here for Tips & Tricks</a>.
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
