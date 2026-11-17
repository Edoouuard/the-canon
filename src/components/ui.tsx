import type { CSSProperties, ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ART, galleryOf } from '../data/galleries'
import type { Category } from '../types'

/** A small engraved ornament: hairline, lozenge, hairline. */
export function Ornament({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 ${className}`} aria-hidden>
      <span className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-gold/60" />
      <svg width="22" height="10" viewBox="0 0 22 10" className="text-gold">
        <path d="M11 0 L15 5 L11 10 L7 5 Z" fill="currentColor" opacity="0.9" />
        <circle cx="2" cy="5" r="1.2" fill="currentColor" opacity="0.6" />
        <circle cx="20" cy="5" r="1.2" fill="currentColor" opacity="0.6" />
      </svg>
      <span className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  )
}

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`caps text-[0.68rem] text-gold ${className}`}>{children}</p>
}

/** A cropped region of one of the paintings, used as gallery art. */
export function PaintedCrop({
  category,
  zoom = '240%',
  className = '',
  style,
}: {
  category: Category
  zoom?: string
  className?: string
  style?: CSSProperties
}) {
  const g = galleryOf(category)
  return (
    <div
      className={`painted ${className}`}
      style={{ backgroundImage: `url(${ART[g.art]})`, backgroundSize: zoom, backgroundPosition: g.focus, ...style }}
      aria-hidden
    />
  )
}

export function Reveal({ children, delay = 0, className = '' }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export function Monogram({ size = 30 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden className="text-gold">
      <rect x="6" y="5" width="20" height="2" fill="currentColor" />
      <path d="M5 8 H27 L25 10 H7 Z" fill="currentColor" opacity="0.85" />
      {[9, 14.5, 20].map((x) => (
        <rect key={x} x={x} y="11" width="3" height="14" fill="currentColor" opacity="0.9" />
      ))}
      <rect x="6" y="25" width="20" height="2" fill="currentColor" />
      <rect x="4" y="27.5" width="24" height="1.5" fill="currentColor" opacity="0.7" />
    </svg>
  )
}
