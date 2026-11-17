import { motion } from 'framer-motion'
import type { StatChip } from '../types'

export default function StatChips({ stats }: { stats: StatChip[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-gold/25 border border-gold/25">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06 }}
          className="bg-umber p-6 md:p-7"
        >
          <p className="caps text-[0.58rem] text-parchment/50 mb-3">{stat.label}</p>
          <p className="display text-2xl md:text-[1.7rem] leading-snug text-gold-light">{stat.value}</p>
        </motion.div>
      ))}
    </div>
  )
}
