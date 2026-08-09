import { motion } from 'framer-motion'
import { Radar } from 'lucide-react'
import type { SectorSnapshotItem } from '../types'

export default function SectorSnapshot({ items }: { items: SectorSnapshotItem[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
          className="liquid-glass rounded-2xl p-5 overflow-hidden"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="liquid-glass rounded-full px-2.5 py-1 text-[11px] text-white/70 tracking-widest overflow-hidden flex items-center gap-1.5">
              <Radar size={11} />
              {item.year}
            </span>
          </div>
          <h4 className="text-white text-sm md:text-base mb-1.5 tracking-tight">{item.name}</h4>
          <p className="text-white/50 text-xs md:text-sm leading-relaxed">{item.detail}</p>
        </motion.div>
      ))}
    </div>
  )
}
