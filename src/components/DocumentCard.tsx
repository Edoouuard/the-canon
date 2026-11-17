import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { DocMeta } from '../types'
import { CATEGORY_LABELS } from '../types'
import { documents } from '../data/documents'
import { galleryOf } from '../data/galleries'
import { roman } from './ui'

const CATALOGUE = new Map(
  [...documents].sort((a, b) => a.year - b.year || a.title.localeCompare(b.title)).map((d, i) => [d.slug, i + 1]),
)

export function catalogueNo(slug: string): number {
  return CATALOGUE.get(slug) ?? 0
}

export default function DocumentCard({ doc, rich, index }: { doc: DocMeta; rich: boolean; index: number }) {
  const g = galleryOf(doc.category)
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.035, 0.35), ease: [0.22, 1, 0.36, 1] }}
      className="h-full"
    >
      <Link to={`/doc/${doc.slug}`} className="plate plate-hover group flex flex-col h-full p-6 md:p-7 hover:-translate-y-1">
        <div className="flex items-center justify-between mb-5">
          <span className="caps text-[0.6rem] text-gold/80">No. {roman(catalogueNo(doc.slug))}</span>
          <span className="caps text-[0.62rem] text-parchment/50">{doc.year}</span>
        </div>

        <h3 className="display text-[1.55rem] leading-[1.15] text-parchment mb-2 group-hover:text-gold-light transition-colors">
          {doc.title}
        </h3>
        <p className="italic text-parchment/55 text-[0.95rem] mb-4">{doc.author}</p>
        <p className="text-parchment/65 text-[0.95rem] leading-relaxed line-clamp-3 mb-6">{doc.blurb}</p>

        <div className="mt-auto pt-4 border-t border-gold/15 flex items-center justify-between gap-3">
          <span className="flex items-center gap-2 caps text-[0.58rem] text-parchment/60">
            <span className="w-1.5 h-1.5 rotate-45" style={{ background: g.accent }} />
            {CATEGORY_LABELS[doc.category]}
          </span>
          <span className="caps text-[0.58rem] text-parchment/40">{rich ? doc.medium : 'Forthcoming'}</span>
        </div>
      </Link>
    </motion.div>
  )
}
