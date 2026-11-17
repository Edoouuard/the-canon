import { motion } from 'framer-motion'
import type { TimelineEntry } from '../types'

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="relative border-l border-gold/30 ml-2">
      {entries.map((entry, i) => (
        <motion.li
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="relative pl-8 pb-9 last:pb-0"
        >
          <span className="absolute -left-[5px] top-2 w-[9px] h-[9px] rotate-45 bg-gold shadow-[0_0_12px_rgba(200,162,90,0.7)]" />
          <p className="caps text-[0.66rem] text-gold-light mb-2">{entry.year}</p>
          <p className="text-parchment/75 text-[1.05rem] leading-relaxed">{entry.text}</p>
        </motion.li>
      ))}
    </ol>
  )
}
