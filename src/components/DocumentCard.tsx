import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import type { DocMeta } from '../types'
import { CATEGORY_LABELS } from '../types'

export default function DocumentCard({ doc, rich, index }: { doc: DocMeta; rich: boolean; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.4) }}
      whileHover={{ y: -4 }}
      className="h-full"
    >
      <Link
        to={`/doc/${doc.slug}`}
        className="liquid-glass group block rounded-2xl overflow-hidden p-6 h-full hover:bg-white/[0.04] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_20px_40px_-20px_rgba(0,0,0,0.6)] transition-all duration-300"
      >
        <div className="flex items-center justify-between mb-4">
          <span className="text-white/40 text-xs tracking-widest uppercase">{doc.medium}</span>
          <span className="text-white/40 text-xs">{doc.year}</span>
        </div>
        <h3
          className="text-white text-xl mb-2 tracking-tight leading-snug transition-colors group-hover:text-white"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {doc.title}
        </h3>
        <p className="text-white/50 text-sm mb-4">{doc.author}</p>
        <p className="text-white/50 text-sm leading-relaxed line-clamp-3 mb-5">{doc.blurb}</p>
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-xs tracking-widest uppercase">{CATEGORY_LABELS[doc.category]}</span>
          {rich && (
            <span className="flex items-center gap-1 text-white/70 text-xs">
              <Sparkles size={12} />
              Enriched
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  )
}
