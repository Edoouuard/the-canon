import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Search, Volume2, VolumeX } from 'lucide-react'
import { Monogram } from './ui'
import { GameHUD } from './game'
import { setAmbience, useSound } from '../lib/sound'
import { useGame } from '../lib/game'
import { BRIEFS } from '../data/watch'

const LINKS = [
  { to: '/', label: 'Atrium' },
  { to: '/directory', label: 'Galleries' },
  { to: '/path', label: 'Path' },
  { to: '/watch', label: 'Watch' },
]

function AmbienceButton() {
  const { ambience } = useSound()
  return (
    <button
      onClick={() => setAmbience(!ambience)}
      aria-pressed={ambience}
      aria-label={ambience ? 'Silence the garden ambience' : 'Play the garden ambience'}
      title={ambience ? 'Ambience on' : 'Ambience off'}
      className={`relative w-9 h-9 hidden sm:flex items-center justify-center border transition-colors ${
        ambience ? 'border-gold text-gold-light bg-gold/10' : 'border-gold/30 text-parchment/70 hover:text-gold-light hover:border-gold'
      }`}
    >
      {ambience ? <Volume2 size={15} strokeWidth={1.5} /> : <VolumeX size={15} strokeWidth={1.5} />}
      {ambience && (
        <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-[2px] items-end h-2" aria-hidden>
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-[2px] bg-gold-light"
              animate={{ height: [2, 7, 3, 6, 2] }}
              transition={{ repeat: Infinity, duration: 1.6 + i * 0.3, ease: 'easeInOut' }}
            />
          ))}
        </span>
      )}
    </button>
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
  const game = useGame()
  const unread = BRIEFS.filter((b) => !(game.briefs ?? {})[b.id]).length

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-500 ${
        solid ? 'bg-ink/85 backdrop-blur-md border-b border-gold/15' : 'bg-gradient-to-b from-ink/60 to-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="The Canon, home">
          <Monogram />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="caps text-[0.78rem] md:text-[0.9rem] text-parchment tracking-[0.2em] sm:tracking-[0.3em] whitespace-nowrap">The Canon</span>
            <span className="caps text-[0.55rem] text-gold/70 mt-1 hidden md:block">Ideas that moved billions</span>
          </span>
        </Link>

        <nav className="flex items-center gap-1 md:gap-2">
          {LINKS.map((link) => {
            const active = link.to === '/' ? location.pathname === '/' : link.to === '/directory' ? location.pathname.startsWith('/directory') || location.pathname.startsWith('/doc') : location.pathname.startsWith(link.to)
            return (
              <Link key={link.to} to={link.to} className={`relative px-2 sm:px-3 md:px-4 py-2 ${link.to === '/' ? 'hidden sm:block' : ''}`}>
                <span className={`caps text-[0.66rem] md:text-[0.7rem] transition-colors ${active ? 'text-gold-light' : 'text-parchment/70 hover:text-parchment'}`}>
                  {link.label}
                </span>
                {link.to === '/watch' && unread > 0 && (
                  <span className="absolute top-1 right-0 sm:right-1 md:right-2 w-1.5 h-1.5 rounded-full bg-terracotta shadow-[0_0_6px_rgba(184,105,63,0.9)]" aria-label={`${unread} unread briefs`} />
                )}
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
          <div className="flex items-center gap-2 ml-1 md:ml-3">
            <GameHUD />
            <AmbienceButton />
            <Link
              to="/directory?focus=search"
              aria-label="Search the collection"
              className="w-9 h-9 hidden sm:flex items-center justify-center border border-gold/30 text-parchment/80 hover:text-gold-light hover:border-gold transition-colors"
            >
              <Search size={15} strokeWidth={1.5} />
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
