import { motion } from 'framer-motion'
import type { TimelineEntry } from '../types'

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <div className="grid grid-cols-1 gap-3">
      {entries.map((entry, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="liquid-glass rounded-xl p-4 md:p-5 overflow-hidden flex gap-4 items-start"
        >
          <span
            className="text-white/70 text-sm md:text-base shrink-0 w-16 md:w-20"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            {entry.year}
          </span>
          <p className="text-white/60 text-sm leading-relaxed">{entry.text}</p>
        </motion.div>
      ))}
    </div>
  )
}
