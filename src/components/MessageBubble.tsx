import { useState } from 'react'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'

interface MessageBubbleProps {
  role: 'user' | 'assistant'
  content: string
  streaming?: boolean
}

export default function MessageBubble({ role, content, streaming }: MessageBubbleProps) {
  const isAssistant = role === 'assistant'
  const [copied, setCopied] = useState(false)

  return (
    <div className="w-full flex items-start gap-3">
      <div
        className={`mt-0.5 h-7 w-7 shrink-0 rounded-full ${
          isAssistant ? 'bg-gradient-to-br from-fuchsia-500 to-indigo-500' : 'bg-black/80 border border-black'
        }`}
      />
      <div
        className={`max-w-[800px] text-[15px] leading-7 ${
          isAssistant ? 'rounded-[15px] bg-white text-black px-4 py-3 border border-black/10 shadow-sm' : 'text-black whitespace-pre-wrap'
        }`}
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
      </div>
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
