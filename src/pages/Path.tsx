import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Check, Crown, Play, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Eyebrow, PaintedCrop } from '../components/ui'
import { Flame, GoalRing, StarRow } from '../components/game'
import { PATH_ORDER, PATH_UNITS } from '../data/path'
import { CATEGORY_LABELS, formatDate } from '../types'
import { levelOf, nextLessonSlug, streakOf, todayXP, useGame, ACHIEVEMENTS } from '../lib/game'

const OFFSETS = [0, 52, 84, 52, 0, -52, -84, -52]

function PathNode({ slug, title, author, date, state, stars, offset, index }: { slug: string; title: string; author: string; date: string; state: 'done' | 'current' | 'open'; stars: number; offset: number; index: number }) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [open])

  return (
    <div ref={ref} className="relative flex flex-col items-center" style={{ transform: `translateX(${offset}px)` }} id={state === 'current' ? 'path-current' : undefined}>
      {state === 'current' && !open && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
          className="absolute -top-11 caps text-[0.6rem] text-ink bg-gold-light px-3 py-1.5 shadow-lg whitespace-nowrap after:content-[''] after:absolute after:left-1/2 after:-bottom-1.5 after:-translate-x-1/2 after:border-x-[6px] after:border-x-transparent after:border-t-[6px] after:border-t-gold-light"
        >
          Start
        </motion.div>
      )}
      <motion.button
        initial={{ scale: 0.6, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: Math.min(index * 0.03, 0.3) }}
        whileTap={{ y: 4 }}
        onClick={() => setOpen((o) => !o)}
        aria-label={`${title}: ${state === 'done' ? 'completed' : 'not started'}`}
        className={`relative w-[74px] h-[68px] rounded-[50%] flex items-center justify-center transition-colors ${
          state === 'done'
            ? 'bg-gradient-to-b from-gold-light to-gold text-ink shadow-[0_7px_0_0_#8a6d36]'
            : state === 'current'
              ? 'bg-gradient-to-b from-gold-light to-gold text-ink shadow-[0_7px_0_0_#8a6d36,0_0_0_8px_rgba(230,204,143,0.18)]'
              : 'bg-umber-2 border-2 border-gold/35 text-gold/80 shadow-[0_7px_0_0_#120f0a] hover:border-gold/70'
        }`}
      >
        {state === 'current' && (
          <motion.span className="absolute -inset-3 rounded-[50%] border-2 border-gold-light/60" animate={{ scale: [1, 1.15, 1], opacity: [0.8, 0, 0.8] }} transition={{ repeat: Infinity, duration: 2 }} />
        )}
        {state === 'done' ? stars === 3 ? <Crown size={28} strokeWidth={2} /> : <Check size={30} strokeWidth={3} /> : state === 'current' ? <Play size={26} className="fill-ink" /> : <BookOpen size={24} strokeWidth={1.75} />}
      </motion.button>
      {state === 'done' && <StarRow stars={stars} size={12} className="mt-3" />}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            className="absolute top-[88px] z-30 w-72 bg-ink border-2 border-gold/50 p-5 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)]"
            style={{ left: '50%', marginLeft: -144 - offset * 0.6 }}
          >
            <p className="caps text-[0.52rem] text-gold mb-2">{date}</p>
            <p className="display text-xl leading-snug text-parchment">{title}</p>
            <p className="italic text-parchment/55 text-sm mt-1">{author}</p>
            {state === 'done' && <StarRow stars={stars} size={14} className="mt-3" />}
            <Link to={`/lesson/${slug}`} className="btn-gilt w-full justify-center mt-4">
              {state === 'done' ? 'Practise again' : 'Start lesson'} <span className="opacity-70">+{state === 'done' ? 10 : 15} XP</span>
            </Link>
            <Link to={`/doc/${slug}`} className="block text-center caps text-[0.55rem] text-parchment/60 hover:text-gold-light mt-3">
              Read the work first
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function Path() {
  const g = useGame()
  const current = nextLessonSlug(g, PATH_ORDER)
  const lv = levelOf(g.xp)
  const streak = streakOf(g)
  const doneCount = PATH_ORDER.filter((s) => g.lessons[s]).length
  const unlocked = ACHIEVEMENTS.filter((a) => g.achievements[a.id]).length

  function jump() {
    document.getElementById('path-current')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  let counter = 0
  return (
    <div className="bg-ink min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-24 grid lg:grid-cols-[1fr_320px] gap-12">
        {/* PATH */}
        <div>
          <Eyebrow className="mb-3">The path</Eyebrow>
          <h1 className="display text-4xl md:text-6xl text-parchment">Learn the canon, one lesson a day</h1>
          <p className="italic text-parchment/60 text-lg mt-3 max-w-xl">
            {PATH_ORDER.length} lessons across {PATH_UNITS.length} units. Each lesson takes about two minutes: answer questions, match the figures, rebuild the mechanism.
          </p>
          <button onClick={jump} className="btn-gilt mt-6">
            {doneCount ? 'Continue where you left off' : 'Start your first lesson'}
          </button>

          <div className="mt-14 flex flex-col gap-16">
            {PATH_UNITS.map((u, ui) => {
              const unitDone = u.lessons.filter((d) => g.lessons[d.slug]).length
              return (
                <section key={u.gallery.category}>
                  <div className="relative overflow-hidden border-2 border-gold/30 mb-16">
                    <PaintedCrop category={u.gallery.category} zoom="200%" className="absolute inset-0" />
                    <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/30" />
                    <div className="relative px-6 py-5 flex items-center justify-between gap-4">
                      <div>
                        <p className="caps text-[0.55rem] text-gold-light">Unit {ui + 1}</p>
                        <h2 className="display text-3xl text-parchment leading-tight">{CATEGORY_LABELS[u.gallery.category]}</h2>
                        <p className="italic text-parchment/65 text-sm">{u.gallery.description}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="display text-3xl text-gold-light">
                          {unitDone}/{u.lessons.length}
                        </p>
                        <div className="w-24 h-1.5 bg-parchment/15 mt-1">
                          <div className="h-full bg-gold-light" style={{ width: `${(unitDone / u.lessons.length) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col items-center gap-9">
                    {u.lessons.map((d) => {
                      const i = counter++
                      const rec = g.lessons[d.slug]
                      return (
                        <PathNode
                          key={d.slug}
                          slug={d.slug}
                          title={d.title}
                          author={d.author}
                          date={formatDate(d)}
                          state={rec ? 'done' : d.slug === current ? 'current' : 'open'}
                          stars={rec?.stars ?? 0}
                          offset={OFFSETS[i % OFFSETS.length]}
                          index={i}
                        />
                      )
                    })}
                  </div>
                </section>
              )
            })}
          </div>
        </div>

        {/* SIDEBAR */}
        <aside className="hidden lg:block">
          <div className="sticky top-28 flex flex-col gap-5">
            <Link to="/profile" className="plate plate-hover p-5 flex items-center gap-4">
              <Flame size={40} lit={todayXP(g) > 0} />
              <div>
                <p className="display text-3xl text-parchment leading-none">{streak} day streak</p>
                <p className="caps text-[0.52rem] text-parchment/50 mt-1.5">{todayXP(g) > 0 ? 'Flame lit for today' : 'Do a lesson to light today’s flame'}</p>
              </div>
            </Link>
            <div className="plate p-5 flex items-center gap-4">
              <GoalRing value={todayXP(g)} goal={g.dailyGoal} size={56} stroke={5}>
                <Zap size={18} className="text-gold-light" />
              </GoalRing>
              <div>
                <p className="caps text-[0.52rem] text-parchment/50">Daily goal</p>
                <p className="display text-2xl text-parchment">
                  {Math.min(todayXP(g), g.dailyGoal)} / {g.dailyGoal} XP
                </p>
              </div>
            </div>
            <div className="plate p-5">
              <div className="flex items-baseline justify-between">
                <p className="display text-2xl text-parchment">Level {lv.level}</p>
                <p className="caps text-[0.52rem] text-parchment/50">{g.xp} XP total</p>
              </div>
              <div className="h-2.5 bg-parchment/10 mt-3">
                <motion.div className="h-full bg-gradient-to-r from-gold to-gold-light" initial={{ width: 0 }} animate={{ width: `${lv.progress * 100}%` }} transition={{ duration: 1 }} />
              </div>
              <p className="caps text-[0.5rem] text-parchment/45 mt-2">
                {lv.span - lv.into} XP to level {lv.level + 1}
              </p>
            </div>
            <Link to="/profile" className="plate plate-hover p-5 flex items-center justify-between">
              <span>
                <span className="caps text-[0.52rem] text-parchment/50 block">Achievements</span>
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
  )
}
