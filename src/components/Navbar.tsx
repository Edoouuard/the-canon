import { Link, useLocation } from 'react-router-dom'
import { Library } from 'lucide-react'

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

        <div className="hidden md:flex items-center gap-8 ml-8">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${location.pathname === '/' ? 'text-white' : 'text-white/70 hover:text-white'}`}
          >
            Accueil
          </Link>
          <Link
            to="/directory"
            className={`text-sm font-medium transition-colors ${location.pathname.startsWith('/directory') ? 'text-white' : 'text-white/70 hover:text-white'}`}
          >
            Répertoire
          </Link>
        </div>

        <Link
          to="/directory"
          className="liquid-glass rounded-full px-6 py-2 text-white text-sm font-medium overflow-hidden hover:bg-white/5 transition-colors"
        >
          Explorer
        </Link>
      </div>
    </div>
  )
}
