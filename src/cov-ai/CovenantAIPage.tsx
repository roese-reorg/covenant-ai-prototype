import { useState, useRef, useEffect } from 'react'
import SharedNavigation from '../components/SharedNavigation'
import SharedTopBar from '../components/SharedTopBar'
import MessageBubble from '../components/MessageBubble'
import ThinkingMessage from '../components/ThinkingMessage'
import { useNavigation } from '../contexts/NavigationContext'

export default function CovenantAIPage() {
  const [messages, setMessages] = useState<Array<{ id: number; text: string; isUser: boolean; timestamp: Date; streaming?: boolean }>>([])
  const [input, setInput] = useState('')
  const [isThinking, setIsThinking] = useState(false)
  const [thinkingShown, setThinkingShown] = useState(false)
  const [thinkingStep, setThinkingStep] = useState(0)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const thinkingIntervalRef = useRef<number | null>(null)
  const hasStreamedRef = useRef(false)
  
  // Navigation state from context
  const {
    isNavExpanded,
    setIsNavExpanded,
    intelExpanded,
    setIntelExpanded,
    covenantsExpanded,
    setCovenantsExpanded,
    sourceFilesExpanded,
    setSourceFilesExpanded,
    companiesExpanded,
    setCompaniesExpanded,
    creditCloudExpanded,
    setCreditCloudExpanded,
    findoxExpanded,
    setFindoxExpanded,
    resourcesExpanded,
    setResourcesExpanded
  } = useNavigation()

  const thinkingLines = [
    'Analyzing covenant compliance...',
    'Reviewing document terms...',
    'Identifying potential risks...',
    'Generating comprehensive analysis...',
    'Preparing detailed response...'
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
    // eslint-disable-next-line no-console
    console.log('[CovAI] render state', { count: messages.length, thinkingShown, thinkingStep })
  }, [messages, thinkingShown])

  // Cleanup any running timers on unmount
  useEffect(() => {
    return () => {
      if (thinkingIntervalRef.current) {
        window.clearInterval(thinkingIntervalRef.current)
        thinkingIntervalRef.current = null
      }
    }
  }, [])

  const handleSend = async () => {
    // Debug: ensure handler fires
    // eslint-disable-next-line no-console
    console.log('[CovAI] handleSend called with', input)
    const prompt = input.trim()
    if (!prompt) return

    const userMessage = {
      id: Date.now(),
      text: prompt,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')

    // Start thinking animation (step-by-step)
    setIsThinking(true)
    setThinkingShown(true)
    setThinkingStep(0)
    // eslint-disable-next-line no-console
    console.log('[CovAI] thinking started')

    hasStreamedRef.current = false
    const stepInterval = window.setInterval(() => {
      setThinkingStep(prev => {
        const next = prev + 1
        if (next >= thinkingLines.length) {
          window.clearInterval(stepInterval)
          thinkingIntervalRef.current = null
          setThinkingShown(false)
          setIsThinking(false)

          // After thinking, stream the assistant answer
          if (hasStreamedRef.current) return thinkingLines.length - 1
          hasStreamedRef.current = true

          const answer = `Based on the retrieved documents, in McAfee's credit agreement, several types of amendments require affected lender consent.\n\n**Amendments Requiring Each Affected Lender's Consent:**\n\n1. **Individual Lender Commitment Changes** — Any amendment that increases the commitment of a specific lender\n2. **Principal Reduction** — Amendments that reduce the principal amount of any loan owed to a specific lender or any amount due on loan installment dates\n3. **Maturity Extensions** — Amendments that extend the scheduled final maturity of any loan or postpone loan installment dates or interest payment dates for specific lenders\n4. **Rate/Fee Reductions** — Amendments that reduce the rate of interest or the amount of any fee or premium owed to a specific lender (subject to exceptions for default rate waivers and technical changes)\n5. **Commitment Extensions** — Amendments that extend the expiry date of a specific lender's commitment\n\n**Unanimous Consent Requirements (All Lenders):**\n\n- Changes to definitions governing voting thresholds (e.g., "Required Lenders")\n- Release of all or substantially all collateral under the collateral documents\n- Release of all or substantially all value of guarantees under the loan guaranty\n\n**Class-Specific Amendments:**\n\n- Where an amendment affects only one class of loans or commitments and does not adversely affect others, the change may be effected with consent of the **Required Class Lenders** for that class rather than all lenders.\n\n**Revolving Facility Specific:**\n\n- Financial covenant amendments (including First Lien Net Leverage Ratio definition) typically require consent of the **majority of revolving lenders**, not all lenders or term lenders.\n\nThese provisions also work alongside deemed consent mechanics and net-short restrictions in the assignment/transfer sections.`

          const assistantId = Date.now() + 1
          setMessages(prev => [...prev, { id: assistantId, text: '', isUser: false, timestamp: new Date(), streaming: true }])
          // eslint-disable-next-line no-console
          console.log('[CovAI] streaming answer...')

          const words = answer.split(' ')
          let composed = ''
          words.forEach((w, i) => {
            setTimeout(() => {
              composed += (i === 0 ? '' : ' ') + w
              setMessages(prev => prev.map(m => (m.id === assistantId ? { ...m, text: composed } : m)))
              if (i === words.length - 1) {
                // stop streaming at the end
                setMessages(prev => prev.map(m => (m.id === assistantId ? { ...m, streaming: false } : m)))
                // eslint-disable-next-line no-console
                console.log('[CovAI] streaming complete')
              }
            }, 35 * i)
          })
        }
        return Math.min(next, thinkingLines.length - 1)
      })
    }, 700)
    thinkingIntervalRef.current = stepInterval
  }

  return (
    <div className="h-screen flex bg-[#EFF0FF] overflow-hidden">
      {/* Left Navigation Sidebar */}
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

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden h-full">
        {/* Top Bar */}
        <SharedTopBar />

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden h-full">
          {/* Left Panel - Conversations */}
          <div className="w-80 bg-black border-r border-black/10 p-0 flex flex-col overflow-hidden h-full">
            <button
              className="w-full bg-primary-600 hover:bg-primary-700 px-3 py-2 text-sm font-medium text-white shadow-none block text-center flex-shrink-0"
            >
              NEW CONVERSATION
            </button>
            
            {/* Recent Conversations - Scrollable independently */}
            <div className="flex-1 bg-black px-3 pb-4 pt-3 text-white flex flex-col overflow-hidden h-0">
              <div className="text-xs uppercase text-white/60 flex-shrink-0">Recent Conversations</div>
              <div className="mt-3 space-y-1 pr-1 overflow-y-auto flex-1">
                {/* September 1st, 2024 */}
                <div className="text-xs text-white/40 mt-3 mb-2">September 1st, 2024</div>
                {[
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
                  'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
                  'Ut enim ad minim veniam, quis nostrud exercitation ullamco',
                ].map((label, i) => (
                  <div
                    key={`sep1-${i}`}
                    className="rounded-block px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 cursor-pointer"
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
                    key={`sep2-${i}`}
                    className="rounded-block px-3 py-2 text-sm flex items-center gap-2 hover:bg-white/10 cursor-pointer"
                  >
                    <span className="inline-block text-[10px] leading-none text-[#FFDC61]">▶</span>
                    <span className="line-clamp-2">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Chat Interface */}
          <div className="flex-1 bg-[#EFF0FF] flex flex-col overflow-hidden h-full">
            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 pb-32">
              {messages.length === 0 && (
                <div className="text-center text-gray-500 mt-20">
                  <i className="bi bi-chat-dots text-4xl mb-4 block"></i>
                  <h3 className="text-xl font-semibold mb-2">Welcome to CovenantAI</h3>
                  <p className="text-gray-400">Ask me anything about covenants, bonds, loans, or credit analysis.</p>
                </div>
              )}
              
              {messages.map((message) => (
                <div key={message.id} className="mb-6">
                  <MessageBubble
                    role={message.isUser ? 'user' : 'assistant'}
                    content={message.text}
                    streaming={!!message.streaming}
                  />
                </div>
              ))}
              
              {thinkingShown && (
                <div className="mb-6">
                  <ThinkingMessage
                    line={thinkingLines[thinkingStep]}
                    step={thinkingStep}
                    totalSteps={thinkingLines.length}
                  />
                </div>
              )}

              {/* Anchor for auto-scroll to bottom */}
              <div ref={messagesEndRef} />
            </div>

            {/* Search Bar - Fixed at Bottom */}
            <div
              className="fixed bottom-0 right-0 bg-white border-t border-gray-200 p-4 z-10"
              style={{ left: (isNavExpanded ? 176 : 64) + 320 }}
            >
              <form onSubmit={(e) => { e.preventDefault(); handleSend() }} className="flex gap-3">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask CovenantAI anything..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isThinking}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Send
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
