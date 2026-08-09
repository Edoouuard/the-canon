import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Clock, ExternalLink, Download } from 'lucide-react'
import Navbar from '../components/Navbar'
import MechanismFlow from '../components/MechanismFlow'
import Timeline from '../components/Timeline'
import StatChips from '../components/StatChips'
import Quiz from '../components/Quiz'
import InfluenceMap from '../components/InfluenceMap'
import SectorSnapshot from '../components/SectorSnapshot'
import VCFieldGuide from '../components/VCFieldGuide'
import { documents } from '../data/documents'
import { richContent } from '../data/richContent'
import { vcFieldGuides } from '../data/vcFieldGuides'
import { CATEGORY_LABELS } from '../types'

function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6 }}
      className="mb-16 md:mb-20"
    >
      <p className="text-white/40 text-xs tracking-widest uppercase mb-3">{label}</p>
      <h2 className="text-2xl md:text-3xl text-white tracking-tight mb-8" style={{ fontFamily: "'Instrument Serif', serif" }}>
        {title}
      </h2>
      {children}
    </motion.section>
  )
}

export default function DocumentDetail() {
  const { slug } = useParams<{ slug: string }>()
  const doc = documents.find((d) => d.slug === slug)
  const rich = slug ? richContent[slug] : undefined
  const vcGuide = slug ? vcFieldGuides[slug] : undefined

  if (!doc) {
    return (
      <div className="bg-black min-h-screen">
        <Navbar />
        <div className="px-6 py-24 text-center">
          <p className="text-white/50 mb-6">Document not found.</p>
          <Link to="/directory" className="text-white underline">
            Back to the directory
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div whileHover={{ x: -3 }} className="inline-block">
            <Link to="/directory" className="inline-flex items-center gap-2 text-white/40 hover:text-white text-sm mb-8 transition-colors">
              <ArrowLeft size={14} />
              Directory
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mb-16">
            <div className="flex flex-wrap items-center gap-3 mb-5 text-white/40 text-xs tracking-widest uppercase">
              <span>{CATEGORY_LABELS[doc.category]}</span>
              <span>·</span>
              <span>{doc.medium}</span>
              <span>·</span>
              <span>{doc.year}</span>
            </div>
            <h1
              className="text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-5"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {doc.title}
            </h1>
            <p className="text-white/60 text-base mb-6">{doc.author}</p>
            <p className="text-white/50 text-base leading-relaxed mb-8">{doc.blurb}</p>

            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              href={doc.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="liquid-glass inline-flex items-center gap-2 rounded-full px-6 py-3 text-white text-sm font-medium overflow-hidden hover:bg-white/5 transition-colors"
            >
              {doc.sourceUrl.toLowerCase().endsWith('.pdf') ? <Download size={16} /> : <ExternalLink size={16} />}
              {doc.sourceUrl.toLowerCase().endsWith('.pdf') ? 'Download the original PDF' : 'Read the original'}
            </motion.a>
          </motion.div>

          {rich ? (
            <>
              <Section label="Context" title="Why this document exists">
                <p className="text-white/60 text-base leading-relaxed">{rich.context}</p>
              </Section>

              <Section label="The mechanism" title="The idea, step by step">
                <MechanismFlow steps={rich.mechanism} />
              </Section>

              {vcGuide && (
                <Section label="VC field guide" title="Who's in the game">
                  <VCFieldGuide guide={vcGuide} />
                </Section>
              )}

              <Section label="Deep dive" title="Going further on the subject">
                <div className="flex flex-col gap-4 mb-12">
                  {rich.deepDive.paragraphs.map((p, i) => (
                    <p key={i} className="text-white/60 text-base leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>

                <p className="text-white/40 text-xs tracking-widest uppercase mb-6">The sector today</p>
                <div className="mb-12">
                  <SectorSnapshot items={rich.sectorSnapshot} />
                </div>

                <p className="text-white/40 text-xs tracking-widest uppercase mb-6">Influence map</p>
                <InfluenceMap title={doc.title} connections={rich.deepDive.connections} />
              </Section>

              <Section label="Reference points" title="A few fixed numbers">
                <StatChips stats={rich.stats} />
              </Section>

              <Section label="Since then" title="What it led to">
                <Timeline entries={rich.since} />
              </Section>

              <Section label="Gamification" title="Quiz">
                <Quiz questions={rich.quiz} />
              </Section>
            </>
          ) : (
            <div className="liquid-glass rounded-3xl p-8 md:p-10 overflow-hidden flex items-start gap-4">
              <Clock size={20} className="text-white/40 shrink-0 mt-1" strokeWidth={1.5} />
              <div>
                <p className="text-white text-base mb-2">Enriched content coming soon</p>
                <p className="text-white/50 text-sm leading-relaxed">
                  This document is listed in the directory, but its detailed context, diagram and quiz have not been written yet. The{' '}
                  {Object.keys(richContent).length} documents marked Enriched already have their full page.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
