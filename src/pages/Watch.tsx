import { useEffect, useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, ChevronDown, Eye, Radio, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Eyebrow, Ornament, Reveal } from '../components/ui'
import { LightRays, Motes } from '../components/immersive'
import { ART } from '../data/galleries'
import { documents } from '../data/documents'
import { BEATS, BRIEFS, THREADS, WATCH_UPDATED, beatOf, formatBriefDate, weekOfBrief, type Beat, type Brief } from '../data/watch'
import { readBrief, useGame } from '../lib/game'

const docBySlug = new Map(documents.map((d) => [d.slug, d]))
const NEWEST = new Date(BRIEFS[0].date + 'T12:00:00').getTime()
const OLDEST = new Date(BRIEFS[BRIEFS.length - 1].date + 'T12:00:00').getTime()

function scrollToBrief(id: string) {
  const el = document.getElementById(`brief-${id}`)
  if (!el) return
  const top = el.getBoundingClientRect().top + window.scrollY - 110
  window.scrollTo({ top, behavior: 'smooth' })
}

/* ---------- Signal map: every brief placed by beat (angle) and age (distance) ---------- */
function SignalMap({ read, onPick, size }: { read: Record<string, number>; onPick: (id: string) => void; size: number }) {
  const c = size / 2
  const inner = size * 0.12
  const outer = size * 0.44
  const sector = 360 / BEATS.length
  const [hover, setHover] = useState<Brief | null>(null)

  const points = BRIEFS.map((b, i) => {
    const bi = BEATS.findIndex((x) => x.id === b.beat)
    const sameBeat = BRIEFS.filter((x) => x.beat === b.beat)
    const k = sameBeat.indexOf(b)
    const jitter = ((k % 3) - 1) * sector * 0.24
    const angle = (bi * sector + sector / 2 + jitter - 90) * (Math.PI / 180)
    const age = (NEWEST - new Date(b.date + 'T12:00:00').getTime()) / Math.max(1, NEWEST - OLDEST)
    const r = inner + Math.sqrt(age) * (outer - inner) + (i % 2) * 4
    return { b, x: c + Math.cos(angle) * r, y: c + Math.sin(angle) * r }
  })

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible" role="img" aria-label="Signal map of the briefs by beat and recency">
        <defs>
          <radialGradient id="sm-bg">
            <stop offset="0%" stopColor="rgba(230,204,143,0.14)" />
            <stop offset="70%" stopColor="rgba(20,17,12,0.55)" />
            <stop offset="100%" stopColor="rgba(20,17,12,0.8)" />
          </radialGradient>
          <linearGradient id="sm-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(230,204,143,0)" />
            <stop offset="100%" stopColor="rgba(230,204,143,0.35)" />
          </linearGradient>
        </defs>
        <circle cx={c} cy={c} r={outer + 14} fill="url(#sm-bg)" stroke="rgba(200,162,90,0.45)" />
        {[0.33, 0.66, 1].map((f) => (
          <circle key={f} cx={c} cy={c} r={inner + (outer - inner) * f} fill="none" stroke="rgba(239,228,204,0.12)" strokeDasharray="2 5" />
        ))}
        {BEATS.map((beat, i) => {
          const a = (i * sector - 90) * (Math.PI / 180)
          const mid = (i * sector + sector / 2 - 90) * (Math.PI / 180)
          return (
            <g key={beat.id}>
              <line x1={c + Math.cos(a) * inner} y1={c + Math.sin(a) * inner} x2={c + Math.cos(a) * (outer + 14)} y2={c + Math.sin(a) * (outer + 14)} stroke="rgba(239,228,204,0.1)" />
              <text
                x={c + Math.cos(mid) * (outer + 30)}
                y={c + Math.sin(mid) * (outer + 30)}
                textAnchor="middle"
                dominantBaseline="middle"
                className="caps"
                style={{ fontSize: size < 300 ? 7.5 : 9, fill: beat.accent, letterSpacing: '0.18em' }}
              >
                {beat.label}
              </text>
            </g>
          )
        })}
        {/* the lighthouse sweep */}
        <g style={{ transformOrigin: `${c}px ${c}px`, animation: 'sweep 9s linear infinite' }}>
          <path d={`M${c},${c} L${c + outer + 14},${c} A${outer + 14},${outer + 14} 0 0,0 ${c + Math.cos(-0.55) * (outer + 14)},${c + Math.sin(-0.55) * (outer + 14)} Z`} fill="url(#sm-sweep)" />
          <line x1={c} y1={c} x2={c + outer + 14} y2={c} stroke="rgba(230,204,143,0.7)" strokeWidth="1" />
        </g>
        <circle cx={c} cy={c} r={inner * 0.55} fill="#14110c" stroke="rgba(230,204,143,0.6)" />
        <text x={c} y={c + 1} textAnchor="middle" dominantBaseline="middle" className="display" style={{ fontSize: size < 300 ? 9 : 11, fill: '#e6cc8f' }}>
          now
        </text>
        {points.map(({ b, x, y }) => {
          const beat = beatOf(b.beat)
          const isRead = !!read[b.id]
          return (
            <g key={b.id} className="cursor-pointer" onMouseEnter={() => setHover(b)} onMouseLeave={() => setHover(null)} onClick={() => onPick(b.id)}>
              {!isRead && (
                <circle cx={x} cy={y} r="5" fill="none" stroke={beat.accent} style={{ transformOrigin: `${x}px ${y}px`, animation: 'ping 2.4s ease-out infinite' }} />
              )}
              <circle cx={x} cy={y} r={hover?.id === b.id ? 7 : 5} fill={isRead ? 'rgba(20,17,12,0.9)' : beat.accent} stroke={beat.accent} strokeWidth="1.5" style={{ transition: 'r 0.2s' }} />
              <circle cx={x} cy={y} r="12" fill="transparent" />
            </g>
          )
        })}
      </svg>
      <AnimatePresence>
        {hover && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute left-1/2 -translate-x-1/2 -bottom-16 w-64 text-center pointer-events-none"
          >
            <p className="caps text-[0.5rem]" style={{ color: beatOf(hover.beat).accent }}>
              {beatOf(hover.beat).label} · {formatBriefDate(hover.date, true)}
            </p>
            <p className="display text-sm text-parchment leading-snug mt-1">{hover.title}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- Headline ticker ---------- */
function Ticker() {
  const items = [...BRIEFS, ...BRIEFS]
  return (
    <div className="relative overflow-hidden border-y border-gold/20 bg-ink/80 backdrop-blur-sm">
      <div className="absolute left-0 inset-y-0 z-10 flex items-center gap-2 pl-4 pr-4 bg-ink after:content-[''] after:absolute after:left-full after:inset-y-0 after:w-10 after:bg-gradient-to-r after:from-ink after:to-transparent">
        <Radio size={13} className="text-terracotta animate-pulse" />
        <span className="caps text-[0.55rem] text-gold-light">On the wire</span>
      </div>
      <div className="flex gap-10 py-3 whitespace-nowrap w-max" style={{ animation: 'ticker 90s linear infinite' }}>
        {items.map((b, i) => (
          <button key={i} onClick={() => scrollToBrief(b.id)} className="flex items-center gap-3 text-sm text-parchment/70 hover:text-parchment transition-colors">
            <span className="w-1.5 h-1.5 rotate-45" style={{ background: beatOf(b.beat).accent }} />
            <span className="caps text-[0.52rem]" style={{ color: beatOf(b.beat).accent }}>
              {formatBriefDate(b.date, true)}
            </span>
            <span className="italic">{b.title}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

/* ---------- One brief ---------- */
function BriefCard({ b, open, isRead, onToggle }: { b: Brief; open: boolean; isRead: boolean; onToggle: () => void }) {
  const beat = beatOf(b.beat)
  const related = b.related.map((s) => docBySlug.get(s)).filter(Boolean)
  return (
    <article id={`brief-${b.id}`} className="relative pl-12 md:pl-20 scroll-mt-28">
      {/* rail medallion */}
      <div className="absolute left-0 md:left-4 top-6 flex flex-col items-center">
        <span
          className={`w-9 h-9 rotate-45 border flex items-center justify-center transition-colors ${isRead ? 'bg-umber border-gold/40' : 'bg-ink'}`}
          style={{ borderColor: isRead ? undefined : beat.accent, boxShadow: isRead ? undefined : `0 0 18px -4px ${beat.accent}` }}
        >
          <span className="-rotate-45">{isRead ? <Check size={14} className="text-gold" /> : <span className="block w-2 h-2 rounded-full" style={{ background: beat.accent }} />}</span>
        </span>
      </div>

      <div className={`border bg-ink/70 backdrop-blur-md transition-colors ${open ? 'border-gold/50' : 'border-gold/20 hover:border-gold/40'}`}>
        <button onClick={onToggle} className="w-full text-left p-5 md:p-7" aria-expanded={open}>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mb-3">
            <span className="caps text-[0.55rem] px-2 py-1 border" style={{ color: beat.accent, borderColor: `${beat.accent}66` }}>
              {beat.label}
            </span>
            <span className="caps text-[0.55rem] text-parchment/50">{b.signal}</span>
            <span className="text-parchment/30">·</span>
            <time className="italic text-sm text-parchment/60" dateTime={b.date}>
              {formatBriefDate(b.date)}
            </time>
            {!isRead && <span className="caps text-[0.5rem] text-terracotta ml-auto">New</span>}
          </div>
          <div className="grid md:grid-cols-[1fr_auto] gap-5 md:gap-8 items-start">
            <div className="min-w-0">
              <h3 className="display text-2xl md:text-[1.7rem] text-parchment leading-tight">{b.title}</h3>
              <p className="text-parchment/70 leading-relaxed mt-3">{b.summary}</p>
            </div>
            <div className="md:w-40 md:text-right border-t md:border-t-0 md:border-l border-gold/15 pt-4 md:pt-0 md:pl-6">
              <p className="display text-3xl md:text-4xl text-gold-light leading-none whitespace-nowrap">{b.figure.value}</p>
              <p className="caps text-[0.5rem] text-parchment/50 mt-2 leading-relaxed">{b.figure.label}</p>
            </div>
          </div>
          <span className="mt-5 inline-flex items-center gap-2 caps text-[0.58rem] text-gold">
            {open ? 'Close' : isRead ? 'Read again' : 'Read the brief'}
            {!isRead && !open && (
              <span className="inline-flex items-center gap-1 text-gold-light">
                · <Zap size={11} className="fill-gold-light" /> 2 XP
              </span>
            )}
            <ChevronDown size={13} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
          </span>
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden">
              <div className="px-5 md:px-7 pb-6 md:pb-7 grid md:grid-cols-[1fr_1fr] gap-6 md:gap-10 border-t border-gold/15 pt-6">
                <div>
                  <p className="caps text-[0.58rem] text-gold mb-3">Why it matters</p>
                  <p className="display italic text-xl text-parchment/90 leading-snug">{b.why}</p>
                  <a href={b.source.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-parchment/60 hover:text-gold-light transition-colors">
                    Source: {b.source.name} <ArrowUpRight size={13} />
                  </a>
                </div>
                {related.length > 0 && (
                  <div>
                    <p className="caps text-[0.58rem] text-gold mb-3">Read it against the canon</p>
                    <div className="flex flex-col gap-2">
                      {related.map((d) => (
                        <Link key={d!.slug} to={`/doc/${d!.slug}`} className="group flex items-center justify-between gap-3 border border-gold/15 hover:border-gold/50 bg-umber/50 px-4 py-3 transition-colors">
                          <span className="min-w-0">
                            <span className="block text-parchment group-hover:text-gold-light transition-colors leading-snug">{d!.title}</span>
                            <span className="block italic text-xs text-parchment/50 mt-0.5">
                              {d!.author} · {d!.year}
                            </span>
                          </span>
                          <ArrowUpRight size={14} className="text-gold shrink-0" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </article>
  )
}

export default function Watch() {
  const game = useGame()
  const read = game.briefs ?? {}
  const location = useLocation()
  const [beat, setBeat] = useState<Beat | 'all'>('all')
  const [unreadOnly, setUnreadOnly] = useState(false)
  const [openId, setOpenId] = useState<string | null>(null)
  const [mapSize, setMapSize] = useState(340)

  useEffect(() => {
    const on = () => setMapSize(window.innerWidth < 768 ? 270 : 360)
    on()
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])

  // Deep links: /watch#brief-id
  useEffect(() => {
    const id = location.hash.replace('#', '')
    if (id && BRIEFS.some((b) => b.id === id)) {
      setOpenId(id)
      readBrief(id)
      setTimeout(() => scrollToBrief(id), 400)
    }
  }, [location.hash])

  const readCount = BRIEFS.filter((b) => read[b.id]).length

  const visible = useMemo(() => BRIEFS.filter((b) => (beat === 'all' || b.beat === beat) && (!unreadOnly || !read[b.id] || b.id === openId)), [beat, unreadOnly, read, openId])

  const weeks = useMemo(() => {
    const m = new Map<string, Brief[]>()
    visible.forEach((b) => {
      const k = weekOfBrief(b.date)
      m.set(k, [...(m.get(k) ?? []), b])
    })
    return [...m.entries()]
  }, [visible])

  function toggle(id: string) {
    setOpenId((cur) => (cur === id ? null : id))
    readBrief(id)
  }

  function pick(id: string) {
    setBeat('all')
    setUnreadOnly(false)
    setOpenId(id)
    readBrief(id)
    setTimeout(() => scrollToBrief(id), 60)
  }

  return (
    <div className="bg-ink min-h-screen">
      <Navbar overlay />

      {/* fixed painted backdrop */}
      <div className="fixed inset-0 -z-0 pointer-events-none" aria-hidden>
        <div className="absolute inset-0 bg-cover" style={{ backgroundImage: `url(${ART.terrace})`, backgroundPosition: '62% 30%', filter: 'saturate(0.85)' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/80 to-ink/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,transparent_0%,rgba(20,17,12,0.6)_70%)]" />
        <LightRays />
        <Motes density={30} />
      </div>

      <div className="relative z-10">
        {/* HERO */}
        <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-8">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">
            <div>
              <Eyebrow className="mb-5 flex items-center gap-2">
                <Eye size={13} /> Technology watch · updated {formatBriefDate(WATCH_UPDATED)}
              </Eyebrow>
              <h1 className="display text-5xl md:text-7xl text-parchment leading-[0.95]">The Watch</h1>
              <p className="display italic text-xl md:text-2xl text-parchment/75 mt-5 max-w-xl leading-snug">
                What moved this season in models, security, silicon and capital, each brief read against the works that explain it.
              </p>

              <div className="mt-9 max-w-md">
                <div className="flex items-end justify-between mb-2">
                  <p className="caps text-[0.58rem] text-parchment/60">
                    Briefs read <span className="text-gold-light">{readCount}</span> / {BRIEFS.length}
                  </p>
                  <p className="caps text-[0.52rem] text-gold flex items-center gap-1">
                    <Zap size={11} className="fill-gold" /> 2 XP each
                  </p>
                </div>
                <div className="h-2 bg-umber border border-gold/25 overflow-hidden">
                  <motion.div className="h-full bg-gradient-to-r from-gold to-gold-light" initial={{ width: 0 }} animate={{ width: `${(readCount / BRIEFS.length) * 100}%` }} transition={{ duration: 0.8 }} />
                </div>
                <div className="flex flex-wrap gap-3 mt-7">
                  <button onClick={() => pick((BRIEFS.find((b) => !read[b.id]) ?? BRIEFS[0]).id)} className="btn-gilt">
                    {readCount === 0 ? 'Start with the latest' : readCount < BRIEFS.length ? 'Next unread brief' : 'Back to the latest'}
                  </button>
                  <a href="#threads" className="btn-ghost">
                    The big threads
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center pb-14">
              <SignalMap read={read} onPick={pick} size={mapSize} />
              <p className="caps text-[0.5rem] text-parchment/40 mt-20 lg:mt-20 text-center">Closer to the centre = more recent · lit = unread</p>
            </div>
          </div>
        </section>

        <Ticker />

        {/* THREADS */}
        <section id="threads" className="scroll-mt-20 py-20 md:py-24 px-5 md:px-8">
          <div className="max-w-7xl mx-auto">
            <Reveal className="text-center mb-12">
              <Eyebrow className="mb-4">The big threads</Eyebrow>
              <h2 className="display text-4xl md:text-5xl text-parchment">What the season adds up to</h2>
              <Ornament className="mt-6" />
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
              {THREADS.map((t, i) => (
                <Reveal key={t.title} delay={i * 0.08}>
                  <div className="h-full border border-gold/25 bg-ink/70 backdrop-blur-md p-6 flex flex-col">
                    <p className="display text-5xl text-gold/30 leading-none">{String(i + 1).padStart(2, '0')}</p>
                    <h3 className="display text-2xl text-parchment leading-tight mt-3">{t.title}</h3>
                    <p className="text-parchment/65 leading-relaxed mt-3 flex-1">{t.body}</p>
                    <div className="flex flex-wrap gap-1.5 mt-5">
                      {t.briefs.map((id) => {
                        const b = BRIEFS.find((x) => x.id === id)!
                        return (
                          <button
                            key={id}
                            onClick={() => pick(id)}
                            title={b.title}
                            className={`caps text-[0.48rem] px-2 py-1 border transition-colors ${read[id] ? 'border-gold/20 text-parchment/40' : 'border-gold/40 text-gold-light hover:bg-gold/10'}`}
                          >
                            {formatBriefDate(b.date, true)}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* FEED */}
        <section className="pb-24 md:pb-32 px-5 md:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="sticky top-16 md:top-[72px] z-20 -mx-5 md:mx-0 px-5 md:px-0 py-4 bg-ink/85 backdrop-blur-md border-b border-gold/15 mb-10">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
                {[{ id: 'all' as const, label: 'All', accent: '#e6cc8f' }, ...BEATS].map((bt) => {
                  const count = bt.id === 'all' ? BRIEFS.length : BRIEFS.filter((b) => b.beat === bt.id).length
                  const active = beat === bt.id
                  return (
                    <button
                      key={bt.id}
                      onClick={() => setBeat(bt.id)}
                      className={`shrink-0 caps text-[0.56rem] px-3 py-2 border transition-colors ${active ? 'bg-gold/15 text-parchment' : 'text-parchment/60 hover:text-parchment border-gold/20'}`}
                      style={active ? { borderColor: bt.accent } : undefined}
                    >
                      {bt.label} <span className="text-parchment/40 ml-1">{count}</span>
                    </button>
                  )
                })}
                <span className="w-px h-6 bg-gold/20 shrink-0 mx-1" />
                <button
                  onClick={() => setUnreadOnly((v) => !v)}
                  aria-pressed={unreadOnly}
                  className={`shrink-0 caps text-[0.56rem] px-3 py-2 border transition-colors ${unreadOnly ? 'border-terracotta text-parchment bg-terracotta/15' : 'border-gold/20 text-parchment/60 hover:text-parchment'}`}
                >
                  Unread only
                </button>
              </div>
            </div>

            {weeks.length === 0 && (
              <div className="text-center py-16 border border-gold/20 bg-ink/70">
                <Check className="mx-auto text-gold mb-4" />
                <p className="display italic text-2xl text-parchment/80">You are up to date on this beat.</p>
              </div>
            )}

            <div className="relative">
              <div className="absolute left-[17px] md:left-[37px] top-0 bottom-0 w-px bg-gradient-to-b from-gold/60 via-gold/25 to-transparent" aria-hidden />
              {weeks.map(([week, items]) => (
                <div key={week} className="mb-12">
                  <div className="relative pl-12 md:pl-20 mb-5">
                    <p className="caps text-[0.62rem] text-gold">Week of {formatBriefDate(week)}</p>
                  </div>
                  <div className="flex flex-col gap-5">
                    {items.map((b) => (
                      <BriefCard key={b.id} b={b} open={openId === b.id} isRead={!!read[b.id]} onToggle={() => toggle(b.id)} />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center italic text-sm text-parchment/45 mt-12 max-w-2xl mx-auto">
              Briefs summarise the linked reporting in our own words; figures are those published by the companies or outlets cited. Threads are the curators’ reading.
            </p>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
