import { motion } from 'framer-motion'

export default function TypingCursor() {
  return (
    <motion.span
      animate={{ opacity: [1, 0] }}
      transition={{ duration: 0.9, repeat: Infinity }}
      className="inline-block w-0.5 h-4 bg-black ml-1"
    />
  )
}

