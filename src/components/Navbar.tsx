import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Atrium' },
  { to: '/directory', label: 'Galleries' },
]

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

export default function Navbar({ overlay = false }: { overlay?: boolean }) {
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = !overlay || scrolled

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        solid ? 'bg-ink/85 backdrop-blur-md border-b border-gold/15' : 'bg-gradient-to-b from-ink/60 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="The Canon, home">
          <Monogram />
          <span className="flex flex-col leading-none">
            <span className="caps text-[0.78rem] md:text-[0.9rem] text-parchment tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">The Canon</span>
            <span className="caps text-[0.55rem] text-gold/70 mt-1 hidden sm:block">Ideas that moved billions</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {LINKS.map((link) => {
            const active = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to) || location.pathname.startsWith('/doc')
            return (
              <Link key={link.to} to={link.to} className={`relative px-2 sm:px-3 md:px-4 py-2 ${link.to === '/' ? 'hidden sm:block' : ''}`}>
                <span className={`caps text-[0.66rem] md:text-[0.7rem] transition-colors ${active ? 'text-gold-light' : 'text-parchment/70 hover:text-parchment'}`}>
                  {link.label}
                </span>
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-2 right-2 sm:left-3 sm:right-3 md:left-4 md:right-4 -bottom-0.5 h-px bg-gold"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
              </Link>
            )
          })}
          <Link
            to="/directory?focus=search"
            aria-label="Search the collection"
            className="ml-1 md:ml-3 w-9 h-9 flex items-center justify-center border border-gold/30 text-parchment/80 hover:text-gold-light hover:border-gold transition-colors"
          >
            <Search size={15} strokeWidth={1.5} />
          </Link>
        </nav>
      </div>
    </header>
  )
}
