import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ArrowDown } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { catalogueNo } from '../components/DocumentCard'
import { Eyebrow, Ornament, PaintedCrop, Reveal, roman } from '../components/ui'
import { documents } from '../data/documents'
import { richContent } from '../data/richContent'
import { ART, GALLERIES, galleryOf } from '../data/galleries'
import { CATEGORY_LABELS } from '../types'

const RECENT_COUNT = 8

export default function Home() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 800], [0, 160])
  const heroScale = useTransform(scrollY, [0, 800], [1.06, 1.16])
  const heroFade = useTransform(scrollY, [0, 500], [1, 0])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    navigate(`/directory${query ? `?q=${encodeURIComponent(query)}` : ''}`)
  }

  const counts = new Map<string, number>()
  documents.forEach((d) => counts.set(d.category, (counts.get(d.category) ?? 0) + 1))
  const galleries = GALLERIES.filter((g) => counts.get(g.category))

  // Most recent additions: 2026 documents, newest additions first (later in the file = added later)
  const recent = documents
    .map((d, i) => ({ d, i }))
    .filter(({ d }) => d.year >= 2026)
    .sort((a, b) => b.i - a.i)
    .slice(0, RECENT_COUNT)
    .map(({ d }) => d)

  const minYear = Math.min(...documents.map((d) => d.year))
  const maxYear = Math.max(...documents.map((d) => d.year))

  return (
    <div className="bg-ink min-h-screen">
      <Navbar overlay />

      {/* HERO — the painting is the room */}
      <section className="relative h-[100svh] min-h-[640px] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY, scale: heroScale }}>
          <img src={ART.temple} alt="" className="w-full h-full object-cover object-[60%_50%]" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/10 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(20,17,12,0.7)_100%)]" />

        <motion.div style={{ opacity: heroFade }} className="relative z-10 h-full max-w-7xl mx-auto px-5 md:px-8 flex flex-col justify-end pb-20 md:pb-28">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.1 }}>
            <Eyebrow className="mb-5 text-gold-light">A gallery of ideas · Anno {roman(maxYear)}</Eyebrow>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="display text-[3.2rem] sm:text-7xl lg:text-[7.5rem] leading-[0.95] text-parchment max-w-5xl drop-shadow-[0_4px_30px_rgba(0,0,0,0.6)]"
          >
            Ideas that moved
            <br />
            <em className="text-gold-light">billions</em>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-6 max-w-xl text-lg md:text-xl text-parchment/80 italic leading-relaxed"
          >
            {documents.length} papers, memos, essays and threat reports, from {minYear} to today, each one dissected so it stays with you.
          </motion.p>

          <motion.form
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            onSubmit={handleSearch}
            className="mt-10 flex flex-col sm:flex-row gap-3 max-w-2xl"
          >
            <label className="flex-1 flex items-center border-b border-parchment/40 focus-within:border-gold-light transition-colors bg-ink/30 backdrop-blur-sm px-4">
              <span className="sr-only">Search the collection</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                type="text"
                placeholder="Search a title, an author, a thesis…"
                className="flex-1 bg-transparent outline-none py-4 text-parchment placeholder:text-parchment/45 text-lg italic"
              />
            </label>
            <button type="submit" className="btn-gilt justify-center">
              Enter the galleries <ArrowRight size={14} />
            </button>
          </motion.form>
        </motion.div>

        <motion.a
          href="#galleries"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 6, 0] }}
          transition={{ opacity: { delay: 1.2 }, y: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' } }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 text-parchment/60 hover:text-gold-light"
          aria-label="Scroll to the galleries"
        >
          <ArrowDown size={18} strokeWidth={1.25} />
        </motion.a>
      </section>

      {/* LEDGER */}
      <section className="border-y border-gold/15 bg-umber/60">
        <div className="max-w-7xl mx-auto px-5 md:px-8 grid grid-cols-2 md:grid-cols-4 divide-x divide-gold/15">
          {[
            { k: 'Works in the collection', v: documents.length },
            { k: 'Galleries', v: galleries.length },
            { k: 'Fully annotated', v: Object.keys(richContent).length },
            { k: 'Span of the collection', v: `${minYear}–${maxYear}` },
          ].map((s) => (
            <div key={s.k} className="py-6 md:py-8 px-4 text-center">
              <p className="display text-3xl md:text-4xl text-gold-light">{s.v}</p>
              <p className="caps text-[0.58rem] text-parchment/55 mt-2">{s.k}</p>
            </div>
          ))}
        </div>
      </section>

      {/* GALLERIES */}
      <section id="galleries" className="scroll-mt-20 py-24 md:py-32 px-5 md:px-8">
        <div className="max-w-7xl mx-auto">
          <Reveal className="text-center mb-16">
            <Eyebrow className="mb-4">The galleries</Eyebrow>
            <h2 className="display text-4xl md:text-6xl text-parchment">Choose a room</h2>
            <p className="italic text-parchment/60 mt-4 max-w-xl mx-auto text-lg">
              {galleries.length} rooms, from the founding papers of the internet to this autumn’s research on cyber and AI safety.
            </p>
            <Ornament className="mt-8" />
          </Reveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {galleries.map((g, i) => (
              <Reveal
                key={g.category}
                delay={Math.min(i * 0.04, 0.3)}
                className={i < 2 || (i === galleries.length - 1 && (galleries.length - 2) % 4 === 3) ? 'lg:col-span-2' : ''}
              >
                <Link
                  to={`/directory?cat=${g.category}`}
                  className="group relative block overflow-hidden border border-gold/25 hover:border-gold-light/70 transition-colors h-64 md:h-72"
                >
                  <PaintedCrop
                    category={g.category}
                    zoom={i < 2 || i === galleries.length - 1 ? '170%' : '260%'}
                    className="absolute inset-0 transition-transform duration-[1400ms] ease-out group-hover:scale-[1.07]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" />
                  <div className="absolute inset-[6px] border border-parchment/10 pointer-events-none" />
                  <div className="relative h-full flex flex-col justify-between p-6">
                    <div className="flex items-start justify-between">
                      <span className="caps text-[0.62rem] text-gold-light">Gallery {roman(i + 1)}</span>
                      <span className="caps text-[0.6rem] text-parchment/70 border border-parchment/25 px-2 py-1 bg-ink/40">
                        {counts.get(g.category)} works
                      </span>
                    </div>
                    <div>
                      <h3 className="display text-3xl md:text-[2.1rem] leading-none text-parchment mb-2">{CATEGORY_LABELS[g.category]}</h3>
                      <p className="italic text-parchment/70 text-[0.98rem] leading-snug max-w-sm">{g.description}</p>
                      <span className="caps text-[0.6rem] text-gold mt-4 inline-flex items-center gap-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                        Enter <ArrowRight size={12} />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT ACQUISITIONS */}
      <section className="relative py-24 md:py-32 px-5 md:px-8 bg-umber/50 border-y border-gold/15 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-[0.9fr_1.6fr] gap-12 lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 self-start">
            <Eyebrow className="mb-4">Recent acquisitions</Eyebrow>
            <h2 className="display text-4xl md:text-6xl text-parchment leading-[1.02]">
              New to the
              <br />
              <em className="text-gold-light">collection</em>
            </h2>
            <p className="italic text-parchment/60 mt-6 text-lg leading-relaxed max-w-md">
              The latest research from frontier labs and threat intelligence teams: formal verification, autonomous attacks, AI-made mathematics and the debate over pacing the frontier.
            </p>
            <div className="mt-8 aspect-[4/3] relative overflow-hidden border border-gold/25 hidden lg:block">
              <img src={ART.terrace} alt="" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-[6px] border border-parchment/15" />
            </div>
          </Reveal>

          <ol className="border-t border-gold/20">
            {recent.map((d, i) => {
              const g = galleryOf(d.category)
              return (
                <Reveal key={d.slug} delay={i * 0.05}>
                  <li>
                    <Link
                      to={`/doc/${d.slug}`}
                      className="group grid grid-cols-[3.5rem_1fr_auto] md:grid-cols-[4.5rem_1fr_auto] items-baseline gap-4 py-6 border-b border-gold/20 hover:bg-gold/[0.04] transition-colors px-2"
                    >
                      <span className="caps text-[0.62rem] text-gold/80">No. {roman(catalogueNo(d.slug))}</span>
                      <span>
                        <span className="block display text-2xl md:text-[1.75rem] leading-tight text-parchment group-hover:text-gold-light transition-colors">
                          {d.title}
                        </span>
                        <span className="block italic text-parchment/55 mt-1">{d.author}</span>
                      </span>
                      <span className="caps text-[0.56rem] text-parchment/60 flex items-center gap-2 whitespace-nowrap">
                        <span className="w-1.5 h-1.5 rotate-45" style={{ background: g.accent }} />
                        <span className="hidden sm:inline">{CATEGORY_LABELS[d.category]}</span>
                      </span>
                    </Link>
                  </li>
                </Reveal>
              )
            })}
          </ol>
        </div>
      </section>

      {/* METHOD */}
      <section className="py-24 md:py-32 px-5 md:px-8">
        <div className="max-w-6xl mx-auto">
          <Reveal className="text-center mb-16">
            <Eyebrow className="mb-4">The method</Eyebrow>
            <h2 className="display text-4xl md:text-6xl text-parchment">
              Every work, <em className="text-gold-light">annotated</em>
            </h2>
            <Ornament className="mt-8" />
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-gold/20 border border-gold/20">
            {[
              { t: 'Context', d: 'Why the document was written, when, by whom, and what was at stake at the time.' },
              { t: 'Mechanism', d: 'The core idea broken into five steps you can see, instead of a wall of prose to memorize.' },
              { t: 'Examination', d: 'A short quiz with an explanation behind every answer, so the idea actually sticks.' },
            ].map((s, i) => (
              <Reveal key={s.t} delay={i * 0.1} className="bg-ink p-8 md:p-10">
                <p className="display text-6xl text-gold/80 leading-none mb-6">{roman(i + 1)}</p>
                <h3 className="caps text-sm text-parchment mb-3">{s.t}</h3>
                <p className="text-parchment/65 leading-relaxed">{s.d}</p>
              </Reveal>
            ))}
          </div>
          <div className="text-center mt-14">
            <Link to="/directory" className="btn-gilt">
              Browse all {documents.length} works <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
