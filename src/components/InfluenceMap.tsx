import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { DeepDiveConnection } from '../types'
import { documents } from '../data/documents'

export default function InfluenceMap({ title, connections }: { title: string; connections: DeepDiveConnection[] }) {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="border border-gold/50 bg-umber px-6 py-4 text-center max-w-md">
          <p className="caps text-[0.55rem] text-gold mb-1">This work</p>
          <p className="display text-xl text-parchment leading-snug">{title}</p>
        </div>
        <svg width="100%" height="48" viewBox="0 0 600 48" preserveAspectRatio="none" className="text-gold/45 hidden md:block" aria-hidden>
          <path d="M300 0 V18 M100 48 V30 H500 V48 M300 18 V48" stroke="currentColor" strokeWidth="1" fill="none" vectorEffect="non-scaling-stroke" />
        </svg>
        <span className="md:hidden w-px h-8 bg-gold/45" />
      </div>
      <div className="grid md:grid-cols-3 gap-5">
        {connections.map((c, i) => {
          const target = c.slug ? documents.find((d) => d.slug === c.slug) : undefined
          const body = (
            <>
              <p className="display text-lg text-parchment leading-snug group-hover:text-gold-light transition-colors">{c.label}</p>
              {target && (
                <p className="caps text-[0.52rem] text-parchment/45 mt-2">
                  {target.author.split('(')[0].trim()} · {target.year}
                </p>
              )}
              <p className="italic text-parchment/65 text-[0.95rem] mt-3 leading-snug">{c.note}</p>
            </>
          )
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              {c.slug ? (
                <Link to={`/doc/${c.slug}`} className="plate plate-hover group block p-5 h-full relative">
                  <ArrowUpRight size={14} className="absolute top-4 right-4 text-gold/60 group-hover:text-gold-light" />
                  {body}
                </Link>
              ) : (
                <div className="plate p-5 h-full">{body}</div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
