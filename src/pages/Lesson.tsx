import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { X, Heart, Check, Zap, Target, Clock, ArrowRight, RotateCcw, Bell, BellOff } from 'lucide-react'
import { documents } from '../data/documents'
import { richContent } from '../data/richContent'
import { ART, galleryOf } from '../data/galleries'
import { nextInPath } from '../data/path'
import type { QuizQuestion, RichContent } from '../types'
import { ACHIEVEMENTS, completeLesson, todayXP, useGame, weekOf, type LessonSummary } from '../lib/game'
import { sfx, setEffects, useSound } from '../lib/sound'
import { AchievementBadge, Flame, GoalRing, StarRow } from '../components/game'
import { Laurel } from '../components/immersive'

/* ------------------------------------------------------------------ */
/* Exercises                                                           */
/* ------------------------------------------------------------------ */

type Ex =
  | { id: string; kind: 'mcq'; q: QuizQuestion }
  | { id: string; kind: 'match'; pairs: { a: string; b: string }[] }
  | { id: string; kind: 'order'; items: string[] }

function seeded(seed: number) {
  let s = seed
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}
function shuffle<T>(arr: T[], seed: number) {
  const r = seeded(seed)
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(r() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function build(rich: RichContent): Ex[] {
  const q = rich.quiz.slice(0, 3)
  const list: Ex[] = []
  if (q[0]) list.push({ id: 'mcq0', kind: 'mcq', q: q[0] })
  if (rich.stats.length >= 3) list.push({ id: 'match', kind: 'match', pairs: rich.stats.slice(0, 4).map((s) => ({ a: s.label, b: s.value })) })
  if (q[1]) list.push({ id: 'mcq1', kind: 'mcq', q: q[1] })
  if (rich.mechanism.length >= 3) list.push({ id: 'order', kind: 'order', items: rich.mechanism.map((m) => m.label) })
  if (q[2]) list.push({ id: 'mcq2', kind: 'mcq', q: q[2] })
  return list
}

const PRAISE = ['Excellent!', 'Well done!', 'Precisely.', 'Bravo!', 'Spot on!', 'Brilliant!']
const MAX_HEARTS = 3

/* ---------- Multiple choice ---------- */
function MCQ({ q, seed, selected, onSelect, revealed }: { q: QuizQuestion; seed: number; selected: number | null; onSelect: (i: number) => void; revealed: boolean }) {
  const order = useMemo(() => shuffle(q.options.map((_, i) => i), seed), [q, seed])
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (revealed) return
      const n = Number(e.key)
      if (n >= 1 && n <= order.length) onSelect(order[n - 1])
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [order, onSelect, revealed])

  return (
    <div>
      <p className="caps text-[0.62rem] text-gold mb-3">Choose the right answer</p>
      <h2 className="display text-[1.8rem] md:text-[2.3rem] leading-tight text-parchment mb-8">{q.question}</h2>
      <div className="grid gap-3">
        {order.map((orig, pos) => {
          const isSel = selected === orig
          const isCorrect = orig === q.correctIndex
          let cls = isSel ? 'border-gold-light bg-gold/[0.12] -translate-y-0.5 shadow-[0_6px_0_0_rgba(200,162,90,0.45)]' : 'border-gold/25 hover:border-gold/60 hover:bg-gold/[0.04] shadow-[0_4px_0_0_rgba(200,162,90,0.15)]'
          if (revealed && isCorrect) cls = 'border-gold-light bg-gold/[0.16] shadow-[0_4px_0_0_rgba(230,204,143,0.6)]'
          else if (revealed && isSel) cls = 'border-terracotta bg-terracotta/[0.12] shadow-[0_4px_0_0_rgba(184,105,63,0.5)]'
          else if (revealed) cls = 'border-gold/10 opacity-45'
          return (
            <motion.button
              key={orig}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * pos }}
              whileTap={revealed ? undefined : { scale: 0.98, y: 2 }}
              disabled={revealed}
              onClick={() => {
                sfx('tick')
                onSelect(orig)
              }}
              className={`text-left flex items-center gap-4 border-2 px-4 py-3.5 transition-all duration-150 ${cls}`}
            >
              <span className={`w-8 h-8 shrink-0 flex items-center justify-center border text-sm display ${isSel || (revealed && isCorrect) ? 'border-gold-light text-gold-light' : 'border-gold/30 text-gold/70'}`}>
                {pos + 1}
              </span>
              <span className="text-parchment/90 text-[1.05rem] leading-snug">{q.options[orig]}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

/* ---------- Match pairs ---------- */
function Match({ pairs, seed, onDone, onMiss }: { pairs: { a: string; b: string }[]; seed: number; onDone: () => void; onMiss: () => void }) {
  const left = useMemo(() => shuffle(pairs.map((_, i) => i), seed), [pairs, seed])
  const right = useMemo(() => shuffle(pairs.map((_, i) => i), seed + 17), [pairs, seed])
  const [selL, setSelL] = useState<number | null>(null)
  const [selR, setSelR] = useState<number | null>(null)
  const [matched, setMatched] = useState<Set<number>>(new Set())
  const [wrong, setWrong] = useState<[number, number] | null>(null)
  const finished = useRef(false)

  useEffect(() => {
    if (selL === null || selR === null) return
    if (selL === selR) {
      sfx('correct')
      const next = new Set(matched).add(selL)
      setMatched(next)
      setSelL(null)
      setSelR(null)
      if (next.size === pairs.length && !finished.current) {
        finished.current = true
        window.setTimeout(onDone, 350)
      }
    } else {
      sfx('wrong')
      onMiss()
      setWrong([selL, selR])
      const t = window.setTimeout(() => {
        setWrong(null)
        setSelL(null)
        setSelR(null)
      }, 650)
      return () => window.clearTimeout(t)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selL, selR])

  const tile = (text: string, i: number, side: 'L' | 'R') => {
    const done = matched.has(i)
    const sel = side === 'L' ? selL === i : selR === i
    const bad = wrong && (side === 'L' ? wrong[0] === i : wrong[1] === i)
    return (
      <motion.button
        key={`${side}${i}`}
        layout
        disabled={done || !!wrong}
        onClick={() => {
          sfx('tick')
          if (side === 'L') setSelL(sel ? null : i)
          else setSelR(sel ? null : i)
        }}
        animate={bad ? { x: [0, -6, 6, -4, 4, 0] } : done ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 0.4 }}
        className={`w-full text-left border-2 px-3.5 py-3 min-h-[3.5rem] transition-all duration-150 text-[0.98rem] leading-snug ${
          done
            ? 'border-gold/15 text-parchment/30 bg-transparent'
            : bad
              ? 'border-terracotta bg-terracotta/10 text-parchment'
              : sel
                ? 'border-gold-light bg-gold/[0.14] text-parchment shadow-[0_4px_0_0_rgba(200,162,90,0.45)]'
                : 'border-gold/25 hover:border-gold/60 text-parchment/90 shadow-[0_4px_0_0_rgba(200,162,90,0.15)]'
        } ${side === 'R' ? 'display text-[1.1rem]' : ''}`}
      >
        {done && <Check size={14} className="inline mr-2 text-gold/50" />}
        {text}
      </motion.button>
    )
  }

  return (
    <div>
      <p className="caps text-[0.62rem] text-gold mb-3">Match the pairs</p>
      <h2 className="display text-[1.8rem] md:text-[2.3rem] leading-tight text-parchment mb-8">Link each figure to what it measures</h2>
      <div className="grid grid-cols-2 gap-3 md:gap-5">
        <div className="flex flex-col gap-3">{left.map((i) => tile(pairs[i].a, i, 'L'))}</div>
        <div className="flex flex-col gap-3">{right.map((i) => tile(pairs[i].b, i, 'R'))}</div>
      </div>
    </div>
  )
}

/* ---------- Order the steps ---------- */
function Order({ items, seed, picked, setPicked, revealed }: { items: string[]; seed: number; picked: number[]; setPicked: (p: number[]) => void; revealed: boolean }) {
  const bank = useMemo(() => shuffle(items.map((_, i) => i), seed), [items, seed])
  return (
    <div>
      <p className="caps text-[0.62rem] text-gold mb-3">Rebuild the mechanism</p>
      <h2 className="display text-[1.8rem] md:text-[2.3rem] leading-tight text-parchment mb-7">Put the steps in the right order</h2>

      <ol className="min-h-[13rem] border-y border-gold/20 py-3 mb-6 flex flex-col gap-2">
        <AnimatePresence>
          {picked.map((idx, pos) => {
            const right = revealed && idx === pos
            const wrongPos = revealed && idx !== pos
            return (
              <motion.li key={idx} layout initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9 }}>
                <button
                  disabled={revealed}
                  onClick={() => {
                    sfx('tick')
                    setPicked(picked.filter((p) => p !== idx))
                  }}
                  className={`w-full flex items-center gap-3 text-left border-2 px-3 py-2.5 transition-colors ${
                    right ? 'border-gold-light bg-gold/10' : wrongPos ? 'border-terracotta bg-terracotta/10' : 'border-gold/40 hover:border-gold-light bg-umber'
                  }`}
                >
                  <span className="display text-lg text-gold w-6 text-center">{pos + 1}</span>
                  <span className="text-parchment/90">{items[idx]}</span>
                </button>
              </motion.li>
            )
          })}
        </AnimatePresence>
        {picked.length === 0 && <li className="italic text-parchment/35 text-center py-10">Tap the steps below in order</li>}
      </ol>

      <div className="flex flex-wrap gap-2.5">
        {bank.map((idx) => {
          const used = picked.includes(idx)
          return (
            <motion.button
              key={idx}
              layout
              whileTap={{ scale: 0.96 }}
              disabled={used || revealed}
              onClick={() => {
                sfx('tick')
                setPicked([...picked, idx])
              }}
              className={`border-2 px-3.5 py-2.5 text-[0.97rem] transition-all ${
                used ? 'border-parchment/10 text-transparent bg-parchment/[0.03] shadow-none' : 'border-gold/30 text-parchment/90 hover:border-gold/70 shadow-[0_4px_0_0_rgba(200,162,90,0.2)]'
              }`}
            >
              <span className={used ? 'invisible' : ''}>{items[idx]}</span>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/* End screens                                                         */
/* ------------------------------------------------------------------ */

function CountUp({ to, suffix = '' }: { to: number; suffix?: string }) {
  const v = useMotionValue(0)
  const r = useTransform(v, (x) => `${Math.round(x)}${suffix}`)
  useEffect(() => {
    const c = animate(v, to, { duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.3 })
    return () => c.stop()
  }, [to, v])
  return <motion.span>{r}</motion.span>
}

function Confetti() {
  const bits = useMemo(
    () =>
      Array.from({ length: 36 }, (_, i) => ({
        x: (Math.random() - 0.5) * 900,
        y: -200 - Math.random() * 300,
        r: Math.random() * 720 - 360,
        d: 1.6 + Math.random() * 1.2,
        s: 5 + Math.random() * 7,
        c: ['#e6cc8f', '#c8a25a', '#f3e2b4', '#b8693f', '#7b98b6'][i % 5],
      })),
    [],
  )
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/3" aria-hidden>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute"
          style={{ width: b.s, height: b.s * 0.5, background: b.c }}
          initial={{ x: 0, y: 0, opacity: 1, rotate: 0 }}
          animate={{ x: b.x, y: [0, b.y, 600], opacity: [1, 1, 0], rotate: b.r }}
          transition={{ duration: b.d, ease: 'easeOut' }}
        />
      ))}
    </div>
  )
}

function fmtTime(s: number) {
  const m = Math.floor(s / 60)
  return `${m}:${String(Math.round(s % 60)).padStart(2, '0')}`
}

/* ------------------------------------------------------------------ */
/* Lesson page                                                         */
/* ------------------------------------------------------------------ */

type Status = 'answering' | 'correct' | 'wrong'
type Phase = 'play' | 'out' | 'complete' | 'streak' | 'achievements'

export default function Lesson() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const doc = documents.find((d) => d.slug === slug)
  const rich = richContent[slug]
  const base = useMemo(() => (rich ? build(rich) : []), [rich])
  const [attempt, setAttempt] = useState(1)
  const [queue, setQueue] = useState<Ex[]>(base)
  const [idx, setIdx] = useState(0)
  const [hearts, setHearts] = useState(MAX_HEARTS)
  const [mistakes, setMistakes] = useState(0)
  const [combo, setCombo] = useState(0)
  const [maxCombo, setMaxCombo] = useState(0)
  const [done, setDone] = useState(0)
  const [status, setStatus] = useState<Status>('answering')
  const [phase, setPhase] = useState<Phase>('play')
  const [mcqSel, setMcqSel] = useState<number | null>(null)
  const [picked, setPicked] = useState<number[]>([])
  const [matchMissed, setMatchMissed] = useState(false)
  const [praise, setPraise] = useState(PRAISE[0])
  const [summary, setSummary] = useState<LessonSummary | null>(null)
  const requeued = useRef(new Set<string>())
  const started = useRef(performance.now())
  const seconds = useRef(0)
  const { effects } = useSound()
  const game = useGame()

  const ex = queue[idx]
  const total = base.length
  const next = nextInPath(slug)

  const reset = useCallback(() => {
    setAttempt((a) => a + 1)
    setQueue(base)
    setIdx(0)
    setHearts(MAX_HEARTS)
    setMistakes(0)
    setCombo(0)
    setMaxCombo(0)
    setDone(0)
    setStatus('answering')
    setPhase('play')
    setMcqSel(null)
    setPicked([])
    setMatchMissed(false)
    setSummary(null)
    requeued.current = new Set()
    started.current = performance.now()
  }, [base])

  useEffect(() => {
    reset()
  }, [slug, reset])

  const loseHeart = useCallback(() => {
    setHearts((h) => h - 1)
    setMistakes((m) => m + 1)
    setCombo(0)
  }, [])

  const markCorrect = useCallback(() => {
    setStatus('correct')
    setDone((d) => d + 1)
    setPraise(PRAISE[Math.floor(Math.random() * PRAISE.length)])
    setCombo((c) => {
      const n = c + 1
      setMaxCombo((m) => Math.max(m, n))
      return n
    })
  }, [])

  const canCheck = ex?.kind === 'mcq' ? mcqSel !== null : ex?.kind === 'order' ? picked.length === ex.items.length : false

  const check = useCallback(() => {
    if (!ex || status !== 'answering' || !canCheck) return
    const ok = ex.kind === 'mcq' ? mcqSel === ex.q.correctIndex : ex.kind === 'order' ? picked.every((p, i) => p === i) : false
    if (ok) {
      sfx('correct')
      markCorrect()
    } else {
      sfx('wrong')
      setStatus('wrong')
      loseHeart()
      if (!requeued.current.has(ex.id)) {
        requeued.current.add(ex.id)
        setQueue((q) => [...q, { ...ex, id: `${ex.id}-again` } as Ex])
      }
    }
  }, [ex, status, canCheck, mcqSel, picked, markCorrect, loseHeart])

  const proceed = useCallback(() => {
    if (status === 'answering') return
    if (hearts <= 0) {
      setPhase('out')
      return
    }
    if (idx + 1 >= queue.length) {
      seconds.current = (performance.now() - started.current) / 1000
      const s = completeLesson({ slug, exercises: total, mistakes, seconds: seconds.current, maxCombo })
      setSummary(s)
      sfx('triumph')
      setPhase('complete')
      return
    }
    setIdx((i) => i + 1)
    setStatus('answering')
    setMcqSel(null)
    setPicked([])
    setMatchMissed(false)
  }, [status, hearts, idx, queue.length, slug, total, mistakes, maxCombo])

  // Enter to check / continue
  useEffect(() => {
    if (phase !== 'play') return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Enter') return
      e.preventDefault()
      if (status === 'answering') check()
      else proceed()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, status, check, proceed])

  if (!doc || !rich) {
    return (
      <div className="min-h-svh bg-ink flex flex-col items-center justify-center gap-6 text-center px-6">
        <p className="display text-3xl text-parchment">There is no lesson for this work yet.</p>
        <Link to="/path" className="btn-gilt">
          Back to the path
        </Link>
      </div>
    )
  }

  const g = galleryOf(doc.category)
  const progress = Math.min(1, done / total)

  return (
    <div className="relative min-h-svh bg-ink flex flex-col overflow-hidden">
      {/* faint painted room */}
      <div
        className="absolute inset-0 painted opacity-[0.09] blur-[2px] pointer-events-none"
        style={{ backgroundImage: `url(${ART[g.art]})`, backgroundSize: 'cover', backgroundPosition: g.focus }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,162,90,0.08),transparent_60%)] pointer-events-none" aria-hidden />

      {phase === 'play' && ex && (
        <>
          {/* top bar */}
          <header className="relative z-10 w-full max-w-3xl mx-auto px-5 pt-6 md:pt-8 flex items-center gap-4">
            <button onClick={() => navigate(-1)} aria-label="Quit the lesson" className="text-parchment/50 hover:text-parchment transition-colors">
              <X size={24} strokeWidth={1.5} />
            </button>
            <div className="relative flex-1 h-4 bg-parchment/10 overflow-hidden">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold-dark via-gold to-gold-light"
                initial={false}
                animate={{ width: `${progress * 100}%` }}
                transition={{ type: 'spring', stiffness: 120, damping: 20 }}
              >
                <span className="absolute top-1 left-2 right-2 h-[3px] bg-white/30" />
              </motion.div>
              <AnimatePresence>
                {combo >= 3 && status === 'correct' && (
                  <motion.span
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 caps text-[0.5rem] text-ink font-semibold"
                  >
                    {combo} in a row
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="flex items-center gap-1" aria-label={`${hearts} hearts left`}>
              {Array.from({ length: MAX_HEARTS }).map((_, i) => (
                <motion.span key={i} animate={i === hearts ? { scale: [1, 1.4, 0.8], opacity: [1, 1, 0.25] } : {}} transition={{ duration: 0.5 }}>
                  <Heart size={20} className={i < hearts ? 'text-terracotta fill-terracotta' : 'text-parchment/20'} />
                </motion.span>
              ))}
            </div>
            <button onClick={() => setEffects(!effects)} aria-label={effects ? 'Mute sounds' : 'Enable sounds'} className="text-parchment/40 hover:text-parchment hidden sm:block">
              {effects ? <Bell size={16} /> : <BellOff size={16} />}
            </button>
          </header>

          {/* exercise */}
          <main className="relative z-10 flex-1 w-full max-w-2xl mx-auto px-5 pt-10 md:pt-14 pb-56">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${attempt}-${idx}-${ex.id}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                {ex.id.endsWith('-again') && (
                  <p className="caps text-[0.55rem] text-terracotta mb-4 flex items-center gap-2">
                    <RotateCcw size={11} /> Previous mistake
                  </p>
                )}
                {ex.kind === 'mcq' && <MCQ q={ex.q} seed={attempt * 13 + idx} selected={mcqSel} onSelect={setMcqSel} revealed={status !== 'answering'} />}
                {ex.kind === 'order' && <Order items={ex.items} seed={attempt * 7 + idx + 3} picked={picked} setPicked={setPicked} revealed={status !== 'answering'} />}
                {ex.kind === 'match' && (
                  <Match
                    pairs={ex.pairs}
                    seed={attempt * 5 + idx}
                    onMiss={() => {
                      if (!matchMissed) {
                        setMatchMissed(true)
                        loseHeart()
                      }
                    }}
                    onDone={() => {
                      if (matchMissed) {
                        setStatus('correct')
                        setDone((d) => d + 1)
                        setPraise('All matched')
                      } else markCorrect()
                    }}
                  />
                )}
              </motion.div>
            </AnimatePresence>
          </main>

          {/* footer */}
          <footer
            className={`fixed bottom-0 inset-x-0 z-20 border-t transition-colors duration-300 ${
              status === 'correct' ? 'bg-[#2a2414] border-gold/50' : status === 'wrong' ? 'bg-[#2a1a12] border-terracotta/50' : 'bg-ink/95 border-gold/15'
            }`}
          >
            <div className="max-w-3xl mx-auto px-5 py-5 md:py-6 flex flex-col md:flex-row md:items-center gap-4 md:justify-between">
              <AnimatePresence mode="wait">
                {status === 'answering' ? (
                  <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="hidden md:block caps text-[0.55rem] text-parchment/35">
                    {ex.kind === 'mcq' ? 'Keys 1–4 to choose · Enter to check' : ex.kind === 'order' ? 'Tap a placed step to remove it' : 'Tap one tile on each side'}
                  </motion.p>
                ) : (
                  <motion.div key="fb" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="flex items-start gap-4 flex-1 min-w-0">
                    <span className={`w-12 h-12 shrink-0 rounded-full flex items-center justify-center ${status === 'correct' ? 'bg-gold-light text-ink' : 'bg-terracotta text-ink'}`}>
                      {status === 'correct' ? <Check size={26} strokeWidth={3} /> : <X size={26} strokeWidth={3} />}
                    </span>
                    <div className="min-w-0">
                      <p className={`display text-2xl ${status === 'correct' ? 'text-gold-light' : 'text-terracotta'}`}>
                        {status === 'correct' ? praise : 'Not quite'}
                        {status === 'correct' && combo >= 3 && <span className="caps text-[0.55rem] text-gold ml-3 align-middle">{combo} in a row</span>}
                      </p>
                      {status === 'wrong' && ex.kind === 'mcq' && (
                        <p className="text-parchment/80 text-[0.98rem] mt-1">
                          <span className="caps text-[0.55rem] text-parchment/50 mr-2">Answer</span>
                          {ex.q.options[ex.q.correctIndex]}
                        </p>
                      )}
                      {status === 'wrong' && ex.kind === 'order' && (
                        <p className="text-parchment/75 text-[0.95rem] mt-1">{ex.items.map((s, i) => `${i + 1}. ${s}`).join('  ·  ')}</p>
                      )}
                      {ex.kind === 'mcq' && <p className="italic text-parchment/60 text-[0.95rem] mt-1 line-clamp-3">{ex.q.explanation}</p>}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {status === 'answering' ? (
                ex.kind !== 'match' && (
                  <button
                    onClick={check}
                    disabled={!canCheck}
                    className="btn-gilt justify-center md:min-w-[12rem] disabled:opacity-35 disabled:grayscale disabled:pointer-events-none"
                  >
                    Check
                  </button>
                )
              ) : (
                <motion.button
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  onClick={proceed}
                  autoFocus
                  className={`justify-center md:min-w-[12rem] ${status === 'correct' ? 'btn-gilt' : 'btn-ghost !border-terracotta !text-parchment'}`}
                >
                  Continue
                </motion.button>
              )}
            </div>
          </footer>
        </>
      )}

      {/* OUT OF HEARTS */}
      {phase === 'out' && (
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 gap-5">
          <div className="flex gap-2">
            {Array.from({ length: MAX_HEARTS }).map((_, i) => (
              <Heart key={i} size={40} className="text-parchment/15" />
            ))}
          </div>
          <h1 className="display text-4xl md:text-5xl text-parchment">You ran out of hearts</h1>
          <p className="italic text-parchment/65 max-w-md">Review the mechanism once more, then try again. Every mistake is a lesson in itself.</p>
          <div className="flex flex-wrap gap-3 justify-center mt-4">
            <button onClick={reset} className="btn-gilt">
              <RotateCcw size={14} /> Try again
            </button>
            <Link to={`/doc/${slug}#mechanism`} className="btn-ghost">
              Review the work
            </Link>
          </div>
        </motion.div>
      )}

      {/* LESSON COMPLETE */}
      {phase === 'complete' && summary && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-14">
          <Confetti />
          <motion.div initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }}>
            <Laurel size={120} tone={summary.stars === 3 ? 'gold' : summary.stars === 2 ? 'silver' : 'bronze'} className="drop-shadow-[0_0_30px_rgba(230,204,143,0.5)]" />
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="display text-5xl md:text-6xl text-gold-light mt-4">
            Lesson complete!
          </motion.h1>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="mt-4">
            <StarRow stars={summary.stars} size={30} />
          </motion.div>
          <p className="italic text-parchment/60 mt-3">{doc.title}</p>

          <div className="grid grid-cols-3 gap-3 mt-10 w-full max-w-md">
            {[
              { k: 'Total XP', v: <CountUp to={summary.xp} />, icon: <Zap size={14} className="fill-current" />, c: 'border-gold-light text-gold-light' },
              { k: 'Accuracy', v: <CountUp to={Math.round(summary.accuracy * 100)} suffix="%" />, icon: <Target size={14} />, c: 'border-sky text-sky' },
              { k: 'Time', v: fmtTime(seconds.current), icon: <Clock size={14} />, c: 'border-olive text-olive' },
            ].map((s, i) => (
              <motion.div key={s.k} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 + i * 0.12 }} className={`border-2 ${s.c}`}>
                <p className="caps text-[0.52rem] py-1.5 flex items-center justify-center gap-1.5 bg-current/10">
                  {s.icon}
                  {s.k}
                </p>
                <p className="display text-3xl text-parchment py-3 bg-ink">{s.v}</p>
              </motion.div>
            ))}
          </div>

          <ul className="mt-6 text-sm text-parchment/55 space-y-1">
            {summary.breakdown.map((b) => (
              <li key={b.label}>
                {b.label} <span className="text-gold-light">+{b.xp}</span>
              </li>
            ))}
          </ul>

          <button
            onClick={() => setPhase(summary.extendedStreak ? 'streak' : summary.achievements.length ? 'achievements' : 'achievements')}
            className="btn-gilt mt-10 min-w-[14rem] justify-center"
          >
            Continue <ArrowRight size={14} />
          </button>
        </motion.div>
      )}

      {/* STREAK */}
      {phase === 'streak' && summary && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-14">
          <motion.div initial={{ scale: 0.3, y: 30 }} animate={{ scale: 1, y: 0 }} transition={{ type: 'spring', stiffness: 160, damping: 10 }}>
            <Flame size={130} />
          </motion.div>
          <div className="relative h-24 overflow-hidden mt-2">
            <motion.p initial={{ y: 0 }} animate={{ y: -96 }} transition={{ delay: 0.7, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className="display text-8xl leading-[6rem] text-gold-light">
              <span className="block">{summary.streakBefore}</span>
              <span className="block">{summary.streakAfter}</span>
            </motion.p>
          </div>
          <h1 className="display text-4xl text-parchment">day streak!</h1>
          <p className="italic text-parchment/60 mt-2">{summary.streakAfter === 1 ? 'The first flame is lit. Come back tomorrow to keep it burning.' : 'Keep reading every day to keep your flame alive.'}</p>
          <div className="flex gap-2 mt-8">
            {weekOf(game).map((d) => (
              <div key={d.key} className="flex flex-col items-center gap-1.5">
                <span className={`caps text-[0.5rem] ${d.today ? 'text-gold-light' : 'text-parchment/45'}`}>{d.label}</span>
                <span className={`w-9 h-9 rounded-full flex items-center justify-center border-2 ${d.xp > 0 ? 'bg-gold border-gold-light text-ink' : 'border-parchment/15'}`}>
                  {d.xp > 0 && <Check size={16} strokeWidth={3} />}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 text-parchment/70">
            <GoalRing value={todayXP(game)} goal={game.dailyGoal} size={44} stroke={4}>
              <Zap size={14} className="text-gold-light" />
            </GoalRing>
            <span className="text-left">
              <span className="block caps text-[0.55rem] text-parchment/50">Daily goal</span>
              <span className="display text-xl text-parchment">
                {Math.min(todayXP(game), game.dailyGoal)} / {game.dailyGoal} XP
              </span>
            </span>
          </div>
          <button onClick={() => setPhase('achievements')} className="btn-gilt mt-10 min-w-[14rem] justify-center">
            Continue <ArrowRight size={14} />
          </button>
        </motion.div>
      )}

      {/* ACHIEVEMENTS + NEXT */}
      {phase === 'achievements' && summary && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-6 py-14">
          {summary.achievements.length > 0 ? (
            <>
              <p className="caps text-[0.6rem] text-gold mb-6">New achievement{summary.achievements.length > 1 ? 's' : ''}</p>
              <div className="flex flex-wrap justify-center gap-8">
                {summary.achievements.map((id, i) => {
                  const a = ACHIEVEMENTS.find((x) => x.id === id)!
                  return (
                    <motion.div
                      key={id}
                      initial={{ scale: 0, rotate: -90 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 220, damping: 12, delay: 0.15 * i }}
                      className="flex flex-col items-center w-40"
                    >
                      <AchievementBadge a={a} unlocked size={76} />
                      <p className="display text-2xl text-parchment mt-6">{a.title}</p>
                      <p className="text-parchment/55 text-sm mt-1">{a.detail}</p>
                    </motion.div>
                  )
                })}
              </div>
            </>
          ) : (
            <>
              <p className="caps text-[0.6rem] text-gold mb-4">What next?</p>
              <h1 className="display text-4xl md:text-5xl text-parchment">Keep the momentum</h1>
              {summary.goalReached && <p className="italic text-gold-light mt-3">Daily goal reached. Anything more is a bonus.</p>}
            </>
          )}
          <div className="flex flex-wrap gap-3 justify-center mt-12">
            {next && (
              <Link to={`/lesson/${next}`} className="btn-gilt">
                Next lesson <ArrowRight size={14} />
              </Link>
            )}
            <Link to="/path" className="btn-ghost">
              Back to the path
            </Link>
            <Link to={`/doc/${slug}`} className="btn-ghost">
              Back to the work
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  )
}
