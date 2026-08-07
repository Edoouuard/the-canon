import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search } from 'lucide-react'
import Navbar from '../components/Navbar'
import DocumentCard from '../components/DocumentCard'
import { documents } from '../data/documents'
import { richContent } from '../data/richContent'
import type { Category, Era } from '../types'
import { CATEGORY_LABELS, ERA_LABELS, eraOf } from '../types'

export default function Directory() {
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') ?? '')
  const [era, setEra] = useState<Era | 'ALL'>('ALL')
  const [category, setCategory] = useState<Category | 'ALL'>('ALL')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return documents.filter((doc) => {
      if (era !== 'ALL' && eraOf(doc.year) !== era) return false
      if (category !== 'ALL' && doc.category !== category) return false
      if (q && !(doc.title.toLowerCase().includes(q) || doc.author.toLowerCase().includes(q) || doc.blurb.toLowerCase().includes(q))) {
        return false
      }
      return true
    })
  }, [query, era, category])

  const categories = Object.keys(CATEGORY_LABELS) as Category[]
  const eras = Object.keys(ERA_LABELS) as Era[]

  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      <div className="px-6 pt-8 pb-6">
        <div className="max-w-6xl mx-auto">
          <h1
            className="text-4xl md:text-6xl text-white tracking-tight mb-2"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Le répertoire
          </h1>
          <p className="text-white/50 text-sm md:text-base mb-8">
            {filtered.length} document{filtered.length > 1 ? 's' : ''} sur {documents.length}
          </p>

          {/* Filters */}
          <div className="liquid-glass rounded-2xl p-4 md:p-5 overflow-hidden flex flex-col md:flex-row gap-3 mb-10">
            <div className="flex items-center gap-3 flex-1 bg-white/[0.03] rounded-full px-4 py-2">
              <Search size={16} className="text-white/40 shrink-0" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Titre, auteur, thèse…"
                className="bg-transparent outline-none text-white placeholder:text-white/40 text-sm w-full"
              />
            </div>
            <select
              value={era}
              onChange={(e) => setEra(e.target.value as Era | 'ALL')}
              className="bg-white/[0.03] text-white text-sm rounded-full px-4 py-2 outline-none border-none [&>option]:bg-neutral-900"
            >
              <option value="ALL">Toutes les époques</option>
              {eras.map((e) => (
                <option key={e} value={e}>
                  {ERA_LABELS[e]}
                </option>
              ))}
            </select>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as Category | 'ALL')}
              className="bg-white/[0.03] text-white text-sm rounded-full px-4 py-2 outline-none border-none [&>option]:bg-neutral-900"
            >
              <option value="ALL">Toutes les catégories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {CATEGORY_LABELS[c]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {filtered.length === 0 ? (
            <p className="text-white/40 text-sm py-20 text-center">Aucun document ne correspond à cette recherche.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((doc, i) => (
                <DocumentCard key={doc.slug} doc={doc} rich={!!richContent[doc.slug]} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
