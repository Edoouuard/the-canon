import { motion } from 'framer-motion'
import type { SectorSnapshotItem } from '../types'

export default function SectorSnapshot({ items }: { items: SectorSnapshotItem[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.08 }}
          className="plate p-6"
        >
          <p className="caps text-[0.56rem] text-gold mb-4">{item.year}</p>
          <h3 className="display text-xl text-parchment mb-2 leading-snug">{item.name}</h3>
          <p className="text-parchment/65 text-[0.95rem] leading-relaxed">{item.detail}</p>
        </motion.div>
      ))}
    </div>
  )
}
