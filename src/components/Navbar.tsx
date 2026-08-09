import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Library } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/directory', label: 'Directory' },
]

export default function Navbar() {
  const location = useLocation()

  return (
    <div className="relative z-20 px-6 py-6">
      <div className="liquid-glass rounded-full max-w-5xl mx-auto px-6 py-3 flex items-center justify-between overflow-hidden">
        <Link to="/" className="flex items-center gap-2">
          <Library size={22} className="text-white" strokeWidth={1.75} />
          <span className="text-white font-semibold text-lg" style={{ fontFamily: "'Instrument Serif', serif" }}>
            The Canon
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 ml-8">
          {LINKS.map((link) => {
            const active = link.to === '/' ? location.pathname === '/' : location.pathname.startsWith(link.to)
            return (
              <Link key={link.to} to={link.to} className="relative px-4 py-1.5 text-sm font-medium">
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors ${active ? 'text-white' : 'text-white/70 hover:text-white'}`}>
                  {link.label}
                </span>
              </Link>
            )
          })}
        </div>

        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link
            to="/directory"
            className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium overflow-hidden block hover:bg-white/5 transition-colors"
          >
            Explore
          </Link>
        </motion.div>
      </div>
    </div>
  )
}
