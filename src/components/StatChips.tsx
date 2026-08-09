import { motion } from 'framer-motion'
import type { StatChip } from '../types'

export default function StatChips({ stats }: { stats: StatChip[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -3, borderColor: 'rgba(255,255,255,0.3)' }}
          transition={{ duration: 0.4, delay: i * 0.05 }}
          className="liquid-glass rounded-xl p-4 overflow-hidden"
        >
          <p className="text-white/40 text-xs tracking-widest uppercase mb-2">{stat.label}</p>
          <p className="text-white text-sm md:text-base leading-snug">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  )
}
