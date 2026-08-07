import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { DeepDiveConnection } from '../types'

export default function InfluenceMap({ title, connections }: { title: string; connections: DeepDiveConnection[] }) {
  const n = connections.length
  const radius = 40 // % of container
  const centerX = 50
  const centerY = 50

  const points = connections.map((_, i) => {
    const angle = (i / n) * 2 * Math.PI - Math.PI / 2
    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle) * 0.82
    return { x, y }
  })

  return (
    <div className="relative w-full aspect-[16/11] md:aspect-[16/9]">
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
        {points.map((p, i) => (
          <motion.line
            key={i}
            x1={centerX}
            y1={centerY}
            x2={p.x}
            y2={p.y}
            stroke="rgba(255,255,255,0.15)"
            strokeWidth={0.3}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
          />
        ))}
      </svg>

      {/* Center node */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="liquid-glass absolute -translate-x-1/2 -translate-y-1/2 rounded-2xl px-4 py-3 overflow-hidden text-center w-36 md:w-44"
        style={{ left: `${centerX}%`, top: `${centerY}%` }}
      >
        <p className="text-white text-xs md:text-sm leading-snug tracking-tight" style={{ fontFamily: "'Instrument Serif', serif" }}>
          {title}
        </p>
      </motion.div>

      {/* Satellite nodes */}
      {connections.map((c, i) => {
        const p = points[i]
        const node = (
          <div className="text-center">
            <p className="text-white/80 text-xs md:text-sm mb-0.5 leading-snug">{c.label}</p>
            <p className="text-white/40 text-[10px] md:text-xs leading-snug">{c.note}</p>
          </div>
        )
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-28 md:w-36"
            style={{ left: `${p.x}%`, top: `${p.y}%` }}
          >
            {c.slug ? (
              <Link
                to={`/doc/${c.slug}`}
                className="liquid-glass block rounded-xl px-3 py-2.5 overflow-hidden hover:bg-white/[0.05] transition-colors"
              >
                {node}
              </Link>
            ) : (
              <div className="liquid-glass rounded-xl px-3 py-2.5 overflow-hidden">{node}</div>
            )}
          </motion.div>
        )
      })}
    </div>
  )
}
