import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, BookOpen, Check, Crown, Play, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Eyebrow } from '../components/ui'
import { Flame, GoalRing, StarRow } from '../components/game'
import { LightRays, Motes, Laurel } from '../components/immersive'
import { ART } from '../data/galleries'
import { CHAPTERS, PATH_ORDER } from '../data/path'
import { formatDate, type DocMeta } from '../types'
import { ACHIEVEMENTS, levelOf, nextLessonSlug, streakOf, todayXP, useGame } from '../lib/game'

const NODE = 72

function useCompact() {
  const [compact, setCompact] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768)
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setCompact(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return compact
}

type NodeState = 'done' | 'current' | 'open'

function Trail({ offsets, row, done }: { offsets: number[]; row: number; done: boolean[] }) {
  const pts = [...offsets.map((o, i) => ({ x: 200 + o, y: i * row + NODE / 2 })), { x: 200, y: offsets.length * row + 36 }]
  const height = offsets.length * row + NODE
  return (
    <svg className="absolute left-1/2 -translate-x-1/2 top-0 pointer-events-none" width="400" height={height} viewBox={`0 0 400 ${height}`} aria-hidden>
      {pts.slice(1).map((p, i) => {
        const a = pts[i]
        const midY = (a.y + p.y) / 2
        const d = `M${a.x},${a.y} C${a.x},${midY} ${p.x},${midY} ${p.x},${p.y}`
        const lit = done[i]
        return (
          <g key={i}>
            <path d={d} fill="none" stroke="rgba(20,17,12,0.65)" strokeWidth="14" strokeLinecap="round" />
            <path
              d={d}
              fill="none"
              stroke={lit ? '#e6cc8f' : 'rgba(239,228,204,0.45)'}
              strokeWidth={lit ? 5 : 3}
              strokeDasharray={lit ? undefined : '2 12'}
              strokeLinecap="round"
              style={lit ? { filter: 'drop-shadow(0 0 6px rgba(230,204,143,0.7))' } : undefined}
            />
          </g>
        )
      })}
    </svg>
  )
}

function LessonNode({
  doc,
  state,
  stars,
  offset,
  top,
  compact,
  open,
  onToggle,
  index,
}: {
  doc: DocMeta
  state: NodeState
  stars: number
  offset: number
  top: number
  compact: boolean
  open: boolean
  onToggle: () => void
  index: number
}) {
  const labelSide = offset > 0 ? 'left' : 'right'
  return (
    <div
      data-node
      className="absolute"
      style={{ top, left: `calc(50% + ${offset}px)`, width: NODE, marginLeft: -NODE / 2, zIndex: open ? 40 : 10 }}
      id={state === 'current' ? 'path-current' : undefined}
    >
      {state === 'current' && !open && (
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute -top-10 left-1/2 -translate-x-1/2 caps text-[0.6rem] text-ink bg-gold-light px-3 py-1.5 shadow-lg whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:-bottom-1.5 after:-translate-x-1/2 after:border-x-[6px] after:border-x-transparent after:border-t-[6px] after:border-t-gold-light"
        >
          Start here
        </motion.div>
      )}

      <motion.button
        initial={{ scale: 0.5, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: Math.min((index % 8) * 0.04, 0.3) }}
        whileTap={{ y: 4 }}
        onClick={onToggle}
        aria-expanded={open}
        aria-label={`${doc.title}. ${state === 'done' ? 'Completed' : 'Not started'}`}
        className={`relative flex items-center justify-center rounded-full ${
          state === 'open'
            ? 'bg-[#2b241a] border-2 border-gold/60 text-gold-light shadow-[0_7px_0_0_#0d0b07,0_10px_30px_-6px_rgba(0,0,0,0.9)] hover:border-gold-light'
            : 'bg-gradient-to-b from-[#f3dfa8] to-gold text-ink shadow-[0_7px_0_0_#7a5f2c,0_10px_30px_-6px_rgba(0,0,0,0.9)]'
        }`}
        style={{ width: NODE, height: NODE - 4 }}
      >
        {state === 'current' && (
          <motion.span className="absolute -inset-3 rounded-full border-2 border-gold-light/70" animate={{ scale: [1, 1.18, 1], opacity: [0.9, 0, 0.9] }} transition={{ repeat: Infinity, duration: 2 }} />
        )}
        {state === 'done' ? (
          stars === 3 ? (
            <Crown size={28} strokeWidth={2} />
          ) : (
            <Check size={30} strokeWidth={3} />
          )
        ) : state === 'current' ? (
          <Play size={26} className="fill-ink ml-1" />
        ) : (
          <BookOpen size={24} strokeWidth={1.75} />
        )}
      </motion.button>

      {/* title label: beside the node on desktop, below it on mobile */}
      <button
        onClick={onToggle}
        tabIndex={-1}
        className={`absolute bg-ink/80 backdrop-blur-sm border border-gold/25 hover:border-gold/60 transition-colors px-3 py-2 ${
          compact ? 'top-[82px] left-1/2 -translate-x-1/2 w-44 text-center' : `top-1/2 -translate-y-1/2 w-60 text-left ${labelSide === 'right' ? 'left-[92px]' : 'right-[92px]'}`
        }`}
      >
        <span className="block display text-[1.02rem] leading-snug text-parchment line-clamp-2">{doc.title}</span>
        <span className={`flex items-center gap-2 mt-1 ${compact ? 'justify-center' : ''}`}>
          <span className="caps text-[0.5rem] text-parchment/55">{doc.year}</span>
          {state === 'done' && <StarRow stars={stars} size={10} />}
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute w-[19rem] max-w-[88vw] bg-ink border-2 border-gold/60 p-5 shadow-[0_24px_60px_-10px_rgba(0,0,0,0.95)]"
            style={{ top: compact ? 150 : 86, left: '50%', marginLeft: compact ? `calc(-9.5rem - ${offset}px)` : '-9.5rem' }}
          >
            <p className="caps text-[0.52rem] text-gold mb-2">
              {doc.medium} · {formatDate(doc)}
            </p>
            <p className="display text-xl leading-snug text-parchment">{doc.title}</p>
            <p className="italic text-parchment/55 text-sm mt-1">{doc.author}</p>
            <p className="text-parchment/70 text-[0.92rem] leading-snug mt-3 line-clamp-3">{doc.blurb}</p>
            {state === 'done' && <StarRow stars={stars} size={14} className="mt-3" />}
            <Link to={`/lesson/${doc.slug}`} className="btn-gilt w-full justify-center mt-4">
              {state === 'done' ? 'Practise again' : 'Start lesson'} <span className="opacity-70">+{state === 'done' ? 10 : 15} XP</span>
            </Link>
            <Link to={`/doc/${doc.slug}`} className="block text-center caps text-[0.55rem] text-parchment/60 hover:text-gold-light mt-3">
              Read the full annotated work
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const panel = 'bg-ink/70 backdrop-blur-md border border-gold/30'

export default function Path() {
  const g = useGame()
  const compact = useCompact()
  const current = nextLessonSlug(g, PATH_ORDER)
  const lv = levelOf(g.xp)
  const streak = streakOf(g)
  const doneCount = PATH_ORDER.filter((s) => g.lessons[s]).length
  const unlocked = ACHIEVEMENTS.filter((a) => g.achievements[a.id]).length
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [activeChapter, setActiveChapter] = useState(0)
  const sectionRefs = useRef<(HTMLElement | null)[]>([])

  const ROW = compact ? 214 : 132
  const OFFSETS = compact ? [0, 46, 70, 46, 0, -46, -70, -46] : [0, 70, 110, 70, 0, -70, -110, -70]

  // close the pop-up when clicking elsewhere
  useEffect(() => {
    if (!openSlug) return
    const onDown = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('[data-node]')) setOpenSlug(null)
    }
    document.addEventListener('mousedown', onDown)
    return () => document.removeEventListener('mousedown', onDown)
  }, [openSlug])

  // the painting behind the path follows the chapter in view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveChapter(Number((e.target as HTMLElement).dataset.index))
        })
      },
      { rootMargin: '-45% 0px -45% 0px' },
    )
    sectionRefs.current.forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  function jump() {
    document.getElementById('path-current')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const bg = CHAPTERS[activeChapter] ?? CHAPTERS[0]

  return (
    <div className="relative min-h-screen bg-ink">
      {/* Immersive painted backdrop that changes with each chapter */}
      <div className="fixed inset-0 z-0 overflow-hidden" aria-hidden>
        <AnimatePresence>
          <motion.div
            key={bg.id}
            className="absolute inset-0 painted"
            style={{ backgroundImage: `url(${ART[bg.art]})`, backgroundSize: 'cover', backgroundPosition: bg.focus }}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1.02 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(20,17,12,0.75)_100%)]" />
        <LightRays className="opacity-70" />
        <Motes density={50} />
      </div>

      <div className="relative z-10">
        <Navbar />
        <div className="max-w-6xl mx-auto px-4 md:px-8 pt-28 md:pt-32 pb-24 grid lg:grid-cols-[1fr_300px] gap-10">
          <div className="min-w-0">
            {/* intro */}
            <div className={`${panel} p-6 md:p-9`}>
              <Eyebrow className="mb-3">The path</Eyebrow>
              <h1 className="display text-4xl md:text-6xl leading-[1.05] text-parchment">From the first chip to the AI frontier</h1>
              <p className="text-parchment/80 text-lg mt-4 max-w-2xl leading-relaxed">
                {CHAPTERS.length} chapters and {PATH_ORDER.length} lessons, in an order where each idea prepares the next. Every lesson first teaches you the work, then checks
                what you remember. About three minutes each.
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <button onClick={jump} className="btn-gilt">
                  {doneCount ? 'Continue where you left off' : 'Start the first lesson'} <ArrowRight size={14} />
                </button>
                <span className="caps text-[0.55rem] text-parchment/60">
                  {doneCount} / {PATH_ORDER.length} lessons completed
                </span>
              </div>
            </div>

            {/* chapters */}
            {CHAPTERS.map((c, ci) => {
              const done = c.lessons.filter((d) => g.lessons[d.slug]).length
              const complete = done === c.lessons.length
              const offsets = c.lessons.map((_, i) => OFFSETS[i % OFFSETS.length])
              const height = c.lessons.length * ROW + 150
              return (
                <section
                  key={c.id}
                  data-index={ci}
                  ref={(el) => {
                    sectionRefs.current[ci] = el
                  }}
                  className="mt-20 md:mt-24"
                >
                  <div className="relative bg-ink/75 backdrop-blur-md border-2 border-gold/40 p-6 md:p-8 text-center max-w-2xl mx-auto">
                    <div className="absolute inset-[5px] border border-gold/15 pointer-events-none" />
                    <p className="caps text-[0.6rem] text-gold-light">Chapter {ci + 1}</p>
                    <h2 className="display text-3xl md:text-[2.6rem] leading-[1.1] text-parchment mt-2">{c.title}</h2>
                    <p className="italic text-parchment/80 mt-3 leading-relaxed">{c.intro}</p>
                    <div className="flex items-center justify-center gap-3 mt-5">
                      <div className="w-40 h-2 bg-parchment/15">
                        <motion.div className="h-full bg-gold-light" initial={false} animate={{ width: `${(done / c.lessons.length) * 100}%` }} />
                      </div>
                      <span className="caps text-[0.55rem] text-parchment/70">
                        {done} / {c.lessons.length} lessons
                      </span>
                    </div>
                  </div>

                  <div className="relative mt-16" style={{ height }}>
                    <Trail offsets={offsets} row={ROW} done={c.lessons.map((d) => !!g.lessons[d.slug])} />
                    {c.lessons.map((d, i) => {
                      const rec = g.lessons[d.slug]
                      return (
                        <LessonNode
                          key={d.slug}
                          doc={d}
                          index={i}
                          state={rec ? 'done' : d.slug === current ? 'current' : 'open'}
                          stars={rec?.stars ?? 0}
                          offset={offsets[i]}
                          top={i * ROW}
                          compact={compact}
                          open={openSlug === d.slug}
                          onToggle={() => setOpenSlug((s) => (s === d.slug ? null : d.slug))}
                        />
                      )
                    })}
                    {/* chapter reward */}
                    <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ top: c.lessons.length * ROW }}>
                      <div
                        className={`w-[76px] h-[76px] rotate-45 flex items-center justify-center border-2 ${
                          complete ? 'border-gold-light bg-gradient-to-br from-[#4a3b20] to-ink shadow-[0_0_40px_-6px_rgba(230,204,143,0.8)]' : 'border-gold/30 bg-ink/85'
                        }`}
                      >
                        <span className="-rotate-45">
                          <Laurel size={42} tone={complete ? 'gold' : 'silver'} className={complete ? '' : 'opacity-35'} />
                        </span>
                      </div>
                      <span className="caps text-[0.5rem] text-parchment/70 mt-5 bg-ink/75 px-2 py-1 whitespace-nowrap">{complete ? 'Chapter complete' : 'Chapter laurel'}</span>
                    </div>
                  </div>
                </section>
              )
            })}
          </div>

          {/* sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 flex flex-col gap-4">
              <Link to="/profile" className={`${panel} hover:border-gold p-5 flex items-center gap-4 transition-colors`}>
                <Flame size={40} lit={todayXP(g) > 0} />
                <div>
                  <p className="display text-3xl text-parchment leading-none">{streak} day streak</p>
                  <p className="caps text-[0.5rem] text-parchment/60 mt-2 leading-relaxed">{todayXP(g) > 0 ? 'Flame lit for today' : 'Do a lesson to light today’s flame'}</p>
                </div>
              </Link>
              <div className={`${panel} p-5 flex items-center gap-4`}>
                <GoalRing value={todayXP(g)} goal={g.dailyGoal} size={56} stroke={5}>
                  <Zap size={18} className="text-gold-light" />
                </GoalRing>
                <div>
                  <p className="caps text-[0.5rem] text-parchment/60">Daily goal</p>
                  <p className="display text-2xl text-parchment">
                    {Math.min(todayXP(g), g.dailyGoal)} / {g.dailyGoal} XP
                  </p>
                </div>
              </div>
              <div className={`${panel} p-5`}>
                <div className="flex items-baseline justify-between">
                  <p className="display text-2xl text-parchment">Level {lv.level}</p>
                  <p className="caps text-[0.5rem] text-parchment/60">{g.xp} XP total</p>
                </div>
                <div className="h-2.5 bg-parchment/10 mt-3">
                  <motion.div className="h-full bg-gradient-to-r from-gold to-gold-light" initial={{ width: 0 }} animate={{ width: `${lv.progress * 100}%` }} transition={{ duration: 1 }} />
                </div>
                <p className="caps text-[0.5rem] text-parchment/55 mt-2">
                  {lv.span - lv.into} XP to level {lv.level + 1}
                </p>
              </div>
              <div className={`${panel} p-5`}>
                <p className="caps text-[0.5rem] text-parchment/60 mb-2">You are in</p>
                <p className="display text-xl text-parchment leading-snug">
                  Chapter {activeChapter + 1} · {bg.title}
                </p>
              </div>
              <Link to="/profile" className={`${panel} hover:border-gold p-5 flex items-center justify-between transition-colors`}>
                <span>
                  <span className="caps text-[0.5rem] text-parchment/60 block">Achievements</span>
                  <span className="display text-2xl text-parchment">
                    {unlocked} / {ACHIEVEMENTS.length}
                  </span>
                </span>
                <span className="caps text-[0.55rem] text-gold">View all</span>
              </Link>
            </div>
          </aside>
        </div>
        <Footer />
      </div>
    </div>
  )
}
