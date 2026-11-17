import { useEffect, useState, type ReactNode } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowRight, ExternalLink, Download, Clock } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import MechanismFlow from '../components/MechanismFlow'
import Timeline from '../components/Timeline'
import StatChips from '../components/StatChips'
import Quiz from '../components/Quiz'
import InfluenceMap from '../components/InfluenceMap'
import SectorSnapshot from '../components/SectorSnapshot'
import VCFieldGuide from '../components/VCFieldGuide'
import { catalogueNo } from '../components/DocumentCard'
import { Eyebrow, Ornament, roman } from '../components/ui'
import { LightRays, Motes } from '../components/immersive'
import { documents } from '../data/documents'
import { richContent } from '../data/richContent'
import { vcFieldGuides } from '../data/vcFieldGuides'
import { ART, galleryOf } from '../data/galleries'
import { CATEGORY_LABELS } from '../types'

interface SectionDef {
  id: string
  label: string
  title: string
  render: () => ReactNode
}

function Section({ id, index, label, title, children }: { id: string; index: number; label: string; title: string; children: ReactNode }) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="scroll-mt-32 mb-20 md:mb-24"
    >
      <div className="flex items-baseline gap-4 mb-3">
        <span className="display text-2xl text-gold/80">{roman(index)}.</span>
        <Eyebrow>{label}</Eyebrow>
      </div>
      <h2 className="display text-3xl md:text-[2.6rem] leading-tight text-parchment mb-8">{title}</h2>
      {children}
    </motion.section>
  )
}

export default function DocumentDetail() {
  const { slug } = useParams<{ slug: string }>()
  const idx = documents.findIndex((d) => d.slug === slug)
  const doc = idx >= 0 ? documents[idx] : undefined
  const rich = slug ? richContent[slug] : undefined
  const vcGuide = slug ? vcFieldGuides[slug] : undefined
  const [active, setActive] = useState<string>('context')
  const { scrollY } = useScroll()
  const headerY = useTransform(scrollY, [0, 700], [0, 220])
  const headerDim = useTransform(scrollY, [0, 600], [0, 0.6])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug])

  const sections: SectionDef[] = rich
    ? [
        { id: 'context', label: 'Context', title: 'Why this document exists', render: () => <p className="text-parchment/80 text-lg leading-[1.8] first-letter:font-display first-letter:text-6xl first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:leading-[0.8] first-letter:text-gold-light">{rich.context}</p> },
        { id: 'mechanism', label: 'The mechanism', title: 'The idea, step by step', render: () => <MechanismFlow steps={rich.mechanism} /> },
        ...(vcGuide ? [{ id: 'players', label: 'Field guide', title: "Who's in the game", render: () => <VCFieldGuide guide={vcGuide} /> }] : []),
        {
          id: 'deep-dive',
          label: 'Deep dive',
          title: 'Going further',
          render: () => (
            <div className="flex flex-col gap-5">
              {rich.deepDive.paragraphs.map((p, i) => (
                <p key={i} className="text-parchment/75 text-lg leading-[1.8]">
                  {p}
                </p>
              ))}
            </div>
          ),
        },
        { id: 'sector', label: 'The field today', title: 'Where the sector stands', render: () => <SectorSnapshot items={rich.sectorSnapshot} /> },
        { id: 'influence', label: 'Lineage', title: 'Related works in the canon', render: () => <InfluenceMap title={doc!.title} connections={rich.deepDive.connections} /> },
        { id: 'figures', label: 'Reference points', title: 'A few figures to remember', render: () => <StatChips stats={rich.stats} /> },
        { id: 'since', label: 'Since then', title: 'What it led to', render: () => <Timeline entries={rich.since} /> },
        { id: 'quiz', label: 'Examination', title: 'Test yourself', render: () => <Quiz key={slug} slug={slug!} questions={rich.quiz} next={next && next.slug !== slug ? { slug: next.slug, title: next.title } : undefined} /> },
      ]
    : []

  useEffect(() => {
    if (!rich) return
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug, rich])

  if (!doc) {
    return (
      <div className="bg-ink min-h-screen">
        <Navbar />
        <div className="px-6 pt-44 pb-24 text-center">
          <Ornament className="mb-6" />
          <p className="display italic text-4xl text-parchment/80 mb-6">This work is not in the collection.</p>
          <Link to="/directory" className="btn-ghost">
            Back to the galleries
          </Link>
        </div>
      </div>
    )
  }

  const g = galleryOf(doc.category)
  const isPdf = doc.sourceUrl.toLowerCase().endsWith('.pdf')
  const words = rich ? [rich.context, ...rich.deepDive.paragraphs, ...rich.mechanism.map((m) => m.detail)].join(' ').split(/\s+/).length : 0
  const minutes = Math.max(3, Math.round(words / 200) + 2)

  // Prev / next within the same gallery, falling back to the whole collection
  const sameGallery = documents.filter((d) => d.category === doc.category)
  const pool = sameGallery.length > 1 ? sameGallery : documents
  const pi = pool.findIndex((d) => d.slug === doc.slug)
  const prev = pool[(pi - 1 + pool.length) % pool.length]
  const next = pool[(pi + 1) % pool.length]

  return (
    <div className="bg-ink min-h-screen">
      <Navbar overlay />

      {/* Painted header */}
      <header className="relative pt-36 md:pt-44 pb-16 md:pb-24 px-5 md:px-8 overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: headerY }}>
          <motion.div
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1.04, opacity: 1 }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 painted"
            style={{ backgroundImage: `url(${ART[g.art]})`, backgroundSize: 'cover', backgroundPosition: g.focus }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink" />
        <LightRays className="opacity-70" />
        <Motes density={40} />
        <motion.div className="absolute inset-0 bg-ink pointer-events-none" style={{ opacity: headerDim }} />
        <div className="relative max-w-4xl mx-auto text-center">
          <Link
            to={`/directory?cat=${doc.category}`}
            className="caps text-[0.62rem] text-gold-light hover:text-parchment transition-colors inline-flex items-center gap-2"
          >
            <ArrowLeft size={12} /> {CATEGORY_LABELS[doc.category]}
          </Link>
          <p className="caps text-[0.6rem] text-parchment/60 mt-6">
            No. {roman(catalogueNo(doc.slug))} · {doc.medium} · {doc.year}
          </p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-parchment mt-5 drop-shadow-[0_4px_24px_rgba(0,0,0,0.6)]"
          >
            {doc.title}
          </motion.h1>
          <p className="italic text-xl text-parchment/80 mt-5">{doc.author}</p>
          <Ornament className="my-8" />
          <p className="text-lg md:text-xl text-parchment/80 leading-relaxed max-w-2xl mx-auto">{doc.blurb}</p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a href={doc.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-gilt">
              {isPdf ? <Download size={14} /> : <ExternalLink size={14} />}
              {isPdf ? 'Download the original' : 'Read the original'}
            </a>
            {rich && (
              <span className="caps text-[0.6rem] text-parchment/55 inline-flex items-center gap-2">
                <Clock size={12} /> {minutes} min of annotation
              </span>
            )}
          </div>
        </div>
      </header>

      {rich ? (
        <div className="px-5 md:px-8 pb-12">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-[220px_1fr] gap-12 lg:gap-16">
            {/* Table of contents */}
            <aside className="hidden lg:block">
              <nav className="sticky top-32" aria-label="Contents">
                <p className="caps text-[0.58rem] text-parchment/45 mb-5">Contents</p>
                <ol className="border-l border-gold/20">
                  {sections.map((s, i) => (
                    <li key={s.id}>
                      <a
                        href={`#${s.id}`}
                        className={`relative flex gap-3 py-2 pl-4 text-[0.95rem] transition-colors ${
                          active === s.id ? 'text-gold-light' : 'text-parchment/55 hover:text-parchment'
                        }`}
                      >
                        {active === s.id && <motion.span layoutId="toc" className="absolute -left-px top-1 bottom-1 w-px bg-gold-light" />}
                        <span className="display w-6 text-gold/70">{roman(i + 1)}</span>
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <article className="max-w-3xl min-w-0">
              {sections.map((s, i) => (
                <Section key={s.id} id={s.id} index={i + 1} label={s.label} title={s.title}>
                  {s.render()}
                </Section>
              ))}
            </article>
          </div>
        </div>
      ) : (
        <div className="px-5 md:px-8 pb-24">
          <div className="max-w-2xl mx-auto plate p-10 text-center">
            <Clock size={22} strokeWidth={1.25} className="text-gold mx-auto mb-4" />
            <p className="display text-3xl text-parchment mb-3">Annotations forthcoming</p>
            <p className="text-parchment/65 leading-relaxed">
              This work is catalogued, but its context, mechanism and examination have not been written yet. {Object.keys(richContent).length} works in the collection are already fully annotated.
            </p>
          </div>
        </div>
      )}

      {/* Prev / next */}
      <nav className="px-5 md:px-8 pb-24" aria-label="More from this gallery">
        <div className="max-w-6xl mx-auto">
          <div className="hairline mb-10" />
          <p className="caps text-[0.6rem] text-parchment/45 text-center mb-6">Continue through {CATEGORY_LABELS[doc.category]}</p>
          <div className="grid md:grid-cols-2 gap-5">
            {[
              { d: prev, dir: 'Previous', icon: <ArrowLeft size={14} /> },
              { d: next, dir: 'Next', icon: <ArrowRight size={14} /> },
            ].map(({ d, dir, icon }) => (
              <Link key={dir} to={`/doc/${d.slug}`} className={`plate plate-hover p-6 group ${dir === 'Next' ? 'md:text-right' : ''}`}>
                <span className={`caps text-[0.58rem] text-gold flex items-center gap-2 ${dir === 'Next' ? 'md:justify-end' : ''}`}>
                  {dir === 'Previous' && icon}
                  {dir}
                  {dir === 'Next' && icon}
                </span>
                <span className="block display text-2xl text-parchment mt-3 group-hover:text-gold-light transition-colors">{d.title}</span>
                <span className="block italic text-parchment/55 mt-1">
                  {d.author}, {d.year}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <Footer />
    </div>
  )
}
