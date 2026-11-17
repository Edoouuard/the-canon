import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import DocumentCard from '../components/DocumentCard'
import { Eyebrow, Ornament, roman } from '../components/ui'
import { documents } from '../data/documents'
import { richContent } from '../data/richContent'
import { ART, GALLERIES, galleryOf } from '../data/galleries'
import type { Category, Era } from '../types'
import { CATEGORY_LABELS, ERA_LABELS, eraOf } from '../types'

type Sort = 'newest' | 'oldest' | 'title'

export default function Directory() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [era, setEra] = useState<Era | 'ALL'>('ALL')
  const [sort, setSort] = useState<Sort>('newest')
  const catParam = searchParams.get('cat') as Category | null
  const category: Category | 'ALL' = catParam && catParam in CATEGORY_LABELS ? catParam : 'ALL'
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchParams.get('focus') === 'search') inputRef.current?.focus()
  }, [searchParams])

  function setCategory(c: Category | 'ALL') {
    const next = new URLSearchParams(searchParams)
    next.delete('focus')
    if (c === 'ALL') next.delete('cat')
    else next.set('cat', c)
    setSearchParams(next, { replace: true })
  }

  const counts = useMemo(() => {
    const m = new Map<string, number>()
    documents.forEach((d) => m.set(d.category, (m.get(d.category) ?? 0) + 1))
    return m
  }, [])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = documents.filter((doc) => {
      if (era !== 'ALL' && eraOf(doc.year) !== era) return false
      if (category !== 'ALL' && doc.category !== category) return false
      if (q && !`${doc.title} ${doc.author} ${doc.blurb}`.toLowerCase().includes(q)) return false
      return true
    })
    return list.sort((a, b) =>
      sort === 'title' ? a.title.localeCompare(b.title) : sort === 'oldest' ? a.year - b.year : b.year - a.year,
    )
  }, [query, era, category, sort])

  const eras = Object.keys(ERA_LABELS) as Era[]
  const galleries = GALLERIES.filter((g) => counts.get(g.category))
  const current = category === 'ALL' ? null : galleryOf(category)
  const galleryIndex = current ? galleries.findIndex((g) => g.category === current.category) + 1 : 0

  return (
    <div className="bg-ink min-h-screen">
      <Navbar overlay />

      {/* Header band */}
      <section className="relative pt-36 md:pt-44 pb-16 md:pb-20 px-5 md:px-8 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.category ?? 'all'}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.9 }}
            className="absolute inset-0 painted"
            style={{
              backgroundImage: `url(${ART[current?.art ?? 'terrace']})`,
              backgroundSize: 'cover',
              backgroundPosition: current?.focus ?? '50% 35%',
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink" />
        <div className="relative max-w-7xl mx-auto">
          <Eyebrow className="mb-4 text-gold-light">{current ? `Gallery ${roman(galleryIndex)}` : 'The complete collection'}</Eyebrow>
          <h1 className="display text-5xl md:text-7xl text-parchment leading-[0.98]">
            {current ? CATEGORY_LABELS[current.category] : 'The Galleries'}
          </h1>
          <p className="italic text-parchment/75 text-lg md:text-xl mt-4 max-w-2xl">
            {current ? current.description : 'Every paper, memo, essay and report in the canon, catalogued and annotated.'}
          </p>
        </div>
      </section>

      {/* Gallery rail */}
      <div className="sticky top-16 md:top-[72px] z-30 bg-ink/90 backdrop-blur-md border-y border-gold/15">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex gap-1 overflow-x-auto no-scrollbar py-3 -mx-1">
            {[{ category: 'ALL' as const }, ...galleries].map((g) => {
              const active = category === g.category
              const label = g.category === 'ALL' ? 'All works' : CATEGORY_LABELS[g.category]
              const n = g.category === 'ALL' ? documents.length : counts.get(g.category)
              return (
                <button
                  key={g.category}
                  onClick={() => setCategory(g.category)}
                  className={`relative shrink-0 px-4 py-2 caps text-[0.62rem] whitespace-nowrap transition-colors ${
                    active ? 'text-ink' : 'text-parchment/65 hover:text-parchment'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="gallery-pill"
                      className="absolute inset-0 bg-gradient-to-b from-gold-light to-gold"
                      transition={{ type: 'spring', stiffness: 400, damping: 34 }}
                    />
                  )}
                  <span className="relative">
                    {label} <span className={active ? 'text-ink/60' : 'text-parchment/35'}>{n}</span>
                  </span>
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Search + refine */}
      <section className="px-5 md:px-8 pt-10 pb-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:items-end">
          <label className="flex-1 flex items-center gap-3 border-b border-parchment/30 focus-within:border-gold-light transition-colors">
            <Search size={18} strokeWidth={1.5} className="text-gold shrink-0" />
            <span className="sr-only">Search</span>
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, author or thesis…"
              className="flex-1 bg-transparent outline-none py-3 text-xl italic text-parchment placeholder:text-parchment/40"
            />
            {query && (
              <button onClick={() => setQuery('')} aria-label="Clear search" className="text-parchment/50 hover:text-parchment">
                <X size={16} />
              </button>
            )}
          </label>

          <div className="flex gap-4 flex-wrap">
            <div>
              <p className="caps text-[0.55rem] text-parchment/45 mb-2">Era</p>
              <div className="flex border border-gold/25">
                {(['ALL', ...eras] as const).map((e) => (
                  <button
                    key={e}
                    onClick={() => setEra(e)}
                    className={`px-3 py-2 caps text-[0.56rem] transition-colors border-r border-gold/20 last:border-r-0 ${
                      era === e ? 'bg-gold/20 text-gold-light' : 'text-parchment/60 hover:text-parchment'
                    }`}
                  >
                    {e === 'ALL' ? 'All' : ERA_LABELS[e].replace(' to ', '–').replace('Before ', '<').replace('2020–now', '2020+')}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="caps text-[0.55rem] text-parchment/45 mb-2">Order</p>
              <div className="flex border border-gold/25">
                {(
                  [
                    ['newest', 'Newest'],
                    ['oldest', 'Oldest'],
                    ['title', 'A–Z'],
                  ] as const
                ).map(([k, l]) => (
                  <button
                    key={k}
                    onClick={() => setSort(k)}
                    className={`px-3 py-2 caps text-[0.56rem] transition-colors border-r border-gold/20 last:border-r-0 ${
                      sort === k ? 'bg-gold/20 text-gold-light' : 'text-parchment/60 hover:text-parchment'
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-6">
          <motion.p key={filtered.length} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="italic text-parchment/55">
            {filtered.length} work{filtered.length !== 1 ? 's' : ''} on display
          </motion.p>
        </div>
      </section>

      <section className="px-5 md:px-8 pb-28">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="py-24 text-center">
              <Ornament className="mb-6" />
              <p className="display italic text-3xl text-parchment/70">This room is empty.</p>
              <p className="text-parchment/50 mt-2">No work matches this search. Try another word or gallery.</p>
            </div>
          ) : (
            <div key={`${category}|${era}|${sort}`} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((doc, i) => (
                <DocumentCard key={doc.slug} doc={doc} rich={!!richContent[doc.slug]} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  )
}
