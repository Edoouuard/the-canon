import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, BookOpen, Workflow, Brain, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar'
import AuroraBackground from '../components/AuroraBackground'
import DocumentCard from '../components/DocumentCard'
import { documents } from '../data/documents'
import { richContent } from '../data/richContent'

const FEATURED_SLUGS = [
  'bitcoin-whitepaper',
  'attention-is-all-you-need',
  'zero-to-one',
  'tesla-master-plan',
  'ethereum-whitepaper',
  'meditations-on-moloch',
]

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const howRef = useRef(null)
  const howInView = useInView(howRef, { once: true, margin: '-100px' })

  const featuredRef = useRef(null)
  const featuredInView = useInView(featuredRef, { once: true, margin: '-100px' })

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/directory${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  const featured = FEATURED_SLUGS.map((slug) => documents.find((d) => d.slug === slug)!).filter(Boolean)

  return (
    <div className="bg-black min-h-screen">
      {/* HERO */}
      <div className="min-h-screen relative overflow-hidden flex flex-col">
        <AuroraBackground />
        <Navbar />

        <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-12 text-center -translate-y-[6%]">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white/40 text-xs tracking-widest uppercase mb-6"
          >
            A gamified library
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-6xl md:text-7xl lg:text-8xl text-white tracking-tight leading-[1.05] mb-8"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Ideas that moved
            <br />
            <em className="italic">billions of dollars</em>.
          </motion.h1>

          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            onSubmit={handleSearch}
            className="max-w-xl w-full mb-6"
          >
            <div className="liquid-glass rounded-full pl-6 pr-2 py-2 flex items-center gap-3 overflow-hidden">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search a document, an author, a thesis"
                className="flex-1 bg-transparent outline-none text-white placeholder:text-white/40 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.94 }}
                type="submit"
                aria-label="Search"
                className="bg-white rounded-full p-3 text-black shrink-0"
              >
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.form>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="text-white/60 text-sm leading-relaxed px-4 max-w-lg mb-8"
          >
            89 memos, whitepapers, essays and decks that changed how money and ideas move. Turned into context,
            diagrams and quizzes so you can learn them faster.
          </motion.p>

          <motion.a
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            href="#how"
            className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors overflow-hidden"
          >
            How it works
          </motion.a>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div id="how" ref={howRef} className="pt-28 md:pt-36 pb-10 md:pb-14 px-6 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
        <div className="max-w-6xl mx-auto relative">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-white/40 text-sm tracking-widest uppercase mb-4"
          >
            How it works
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={howInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-6xl text-white leading-[1.1] tracking-tight mb-16 max-w-3xl"
          >
            Every document,{' '}
            <em className="italic text-white/60" style={{ fontFamily: "'Instrument Serif', serif" }}>
              dissected
            </em>{' '}
            so it sticks.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: BookOpen, title: 'Context', text: 'Why this document was written, exactly when, and by whom, without unnecessary jargon.' },
              { icon: Workflow, title: 'The mechanism', text: 'The core idea unpacked into a step by step diagram, so you visualize the reasoning instead of memorizing it.' },
              { icon: Brain, title: 'Quiz', text: 'A short quiz to check and lock in what you just read, with an explanation behind every answer.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                animate={howInView ? { opacity: 1, y: 0 } : {}}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.6, delay: 0.15 * i }}
                className="liquid-glass rounded-3xl p-8 overflow-hidden"
              >
                <item.icon size={24} className="text-white/70 mb-6" strokeWidth={1.5} />
                <h3 className="text-white text-xl mb-3 tracking-tight">{item.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* FEATURED */}
      <div ref={featuredRef} className="py-20 md:py-28 px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={featuredInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-3xl md:text-5xl text-white tracking-tight"
            >
              Start here
            </motion.h2>
            <Link to="/directory" className="text-white/50 hover:text-white text-sm transition-colors flex items-center gap-1">
              See all 89 documents <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((doc, i) => (
              <DocumentCard key={doc.slug} doc={doc} rich={!!richContent[doc.slug]} index={i} />
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-6 pb-16 pt-8">
        <div className="max-w-6xl mx-auto liquid-glass rounded-3xl p-8 md:p-10 overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center gap-2 justify-center md:justify-start mb-2">
              <Sparkles size={16} className="text-white/70" />
              <span className="text-white/50 text-xs tracking-widest uppercase">Personal project</span>
            </div>
            <p className="text-white text-lg">
              Inspired by the index at <span className="text-white/70">billiondollarpdf.com</span>.
            </p>
          </div>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="shrink-0">
            <Link
              to="/directory"
              className="liquid-glass rounded-full px-8 py-3 text-white text-sm font-medium hover:bg-white/5 transition-colors overflow-hidden block"
            >
              Explore the directory
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
