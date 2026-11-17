import { Link } from 'react-router-dom'
import { ART } from '../data/galleries'
import { Monogram, Ornament } from './ui'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/20">
      <img src={ART.terrace} alt="" className="absolute inset-0 w-full h-full object-cover object-[50%_70%] opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink/95" />
      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-20 md:py-24 text-center">
        <div className="flex justify-center mb-6">
          <Monogram size={40} />
        </div>
        <p className="display italic text-3xl md:text-4xl text-parchment/90">Ideae mundum movent.</p>
        <p className="caps text-[0.6rem] text-parchment/50 mt-3">Ideas move the world</p>
        <Ornament className="my-10" />
        <nav className="flex justify-center gap-8 caps text-[0.66rem] text-parchment/70">
          <Link to="/" className="hover:text-gold-light transition-colors">Atrium</Link>
          <Link to="/directory" className="hover:text-gold-light transition-colors">Galleries</Link>
          <a href="https://github.com/Edoouuard/the-canon" target="_blank" rel="noopener noreferrer" className="hover:text-gold-light transition-colors">
            Source
          </a>
        </nav>
        <p className="text-parchment/40 text-sm italic mt-10">A personal project · a growing canon of documents that moved billions.</p>
      </div>
    </footer>
  )
}
