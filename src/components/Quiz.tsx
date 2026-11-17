import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, animate, motion, useMotionValue, useTransform } from 'framer-motion'
import { Check, X, RotateCcw, Hourglass, Bell, BellOff, ArrowRight, ChevronDown } from 'lucide-react'
import type { QuizQuestion } from '../types'
import { Ornament, roman } from './ui'
import { Laurel } from './immersive'
import { sfx, setEffects, useSound } from '../lib/sound'
import { recordQuiz, useProgress } from '../lib/progress'

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F']
const TIME = 25 // seconds per question

type Phase = 'intro' | 'question' | 'done'

interface Answer {
  chosen: number | null // original option index, null = time ran out
  correct: boolean
  seconds: number
  points: number
}

function shuffle<T>(arr: T[], seed: number) {
  const a = [...arr]
  let s = seed
  for (let i = a.length - 1; i > 0; i--) {
    s = (s * 9301 + 49297) % 233280
    const j = Math.floor((s / 233280) * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function verdict(score: number, total: number) {
  const r = score / total
  if (r === 1) return { latin: 'Summa cum laude', tone: 'gold' as const, line: 'Flawless. This one belongs to you now.' }
  if (r >= 0.66) return { latin: 'Magna cum laude', tone: 'silver' as const, line: 'A fine reading, with one detail left to claim.' }
  if (r > 0) return { latin: 'Cum laude', tone: 'bronze' as const, line: 'The outline is there. A second pass will fix it.' }
  return { latin: 'Repetita iuvant', tone: null, line: 'Repetition helps. Revisit the mechanism and try again.' }
}

function Burst({ id }: { id: number }) {
  const bits = useMemo(() => Array.from({ length: 14 }, (_, i) => ({ a: (i / 14) * Math.PI * 2 + Math.random() * 0.4, d: 40 + Math.random() * 50, s: 4 + Math.random() * 5 })), [])
  return (
    <span key={id} className="pointer-events-none absolute right-6 top-1/2" aria-hidden>
      {bits.map((b, i) => (
        <motion.span
          key={i}
          className="absolute rotate-45 bg-gold-light"
          style={{ width: b.s, height: b.s, boxShadow: '0 0 8px rgba(246,222,160,0.9)' }}
          initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
          animate={{ x: Math.cos(b.a) * b.d, y: Math.sin(b.a) * b.d, opacity: 0, scale: 0.3 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      ))}
    </span>
  )
}

function CountUp({ to }: { to: number }) {
  const v = useMotionValue(0)
  const r = useTransform(v, (x) => Math.round(x).toLocaleString('en-US'))
  useEffect(() => {
    const c = animate(v, to, { duration: 1.4, ease: [0.22, 1, 0.36, 1] })
    return () => c.stop()
  }, [to, v])
  return <motion.span>{r}</motion.span>
}

export default function Quiz({ questions, slug, next }: { questions: QuizQuestion[]; slug: string; next?: { slug: string; title: string } }) {
  const [phase, setPhase] = useState<Phase>('intro')
  const [attempt, setAttempt] = useState(0)
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answer[]>([])
  const [selected, setSelected] = useState<number | null>(null) // original index
  const [timedOut, setTimedOut] = useState(false)
  const [remaining, setRemaining] = useState(TIME)
  const [burst, setBurst] = useState(0)
  const [shakeKey, setShakeKey] = useState(0)
  const [prevBest, setPrevBest] = useState<number | null>(null)
  const startedAt = useRef(0)
  const { effects } = useSound()
  const { records } = useProgress()
  const record = records[slug]

  const q = questions[step]
  const order = useMemo(() => shuffle(q.options.map((_, i) => i), attempt * 31 + step * 7 + 3), [q, attempt, step])
  const revealed = selected !== null || timedOut
  const streak = (() => {
    let s = 0
    for (let i = answers.length - 1; i >= 0 && answers[i].correct; i--) s++
    return s
  })()
  const score = answers.filter((a) => a.correct).length
  const points = answers.reduce((s, a) => s + a.points, 0)

  // Countdown
  useEffect(() => {
    if (phase !== 'question' || revealed) return
    startedAt.current = performance.now()
    setRemaining(TIME)
    const id = window.setInterval(() => {
      const left = TIME - (performance.now() - startedAt.current) / 1000
      if (left <= 0) {
        window.clearInterval(id)
        setRemaining(0)
        setTimedOut(true)
        setShakeKey((k) => k + 1)
        sfx('wrong')
        setAnswers((a) => [...a, { chosen: null, correct: false, seconds: TIME, points: 0 }])
      } else setRemaining(left)
    }, 100)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, step, attempt, revealed])

  const choose = useCallback(
    (orig: number) => {
      if (revealed || phase !== 'question') return
      const seconds = Math.min(TIME, (performance.now() - startedAt.current) / 1000)
      const correct = orig === q.correctIndex
      const mult = correct ? 1 + Math.min(streak, 2) * 0.5 : 0
      const pts = correct ? Math.round((100 + 100 * (1 - seconds / TIME)) * mult) : 0
      setSelected(orig)
      setAnswers((a) => [...a, { chosen: orig, correct, seconds, points: pts }])
      if (correct) {
        sfx('correct')
        setBurst((b) => b + 1)
      } else {
        sfx('wrong')
        setShakeKey((k) => k + 1)
      }
    },
    [revealed, phase, q, streak],
  )

  const advance = useCallback(() => {
    if (step + 1 >= questions.length) {
      const finalScore = answers.filter((a) => a.correct).length
      const finalPoints = answers.reduce((s, a) => s + a.points, 0)
      setPrevBest(record?.points ?? null)
      recordQuiz(slug, finalScore, questions.length, finalPoints)
      if (finalScore / questions.length >= 2 / 3) sfx('triumph')
      setPhase('done')
      return
    }
    setStep((s) => s + 1)
    setSelected(null)
    setTimedOut(false)
  }, [step, questions.length, answers, slug, record])

  function start() {
    setAttempt((a) => a + 1)
    setStep(0)
    setAnswers([])
    setSelected(null)
    setTimedOut(false)
    setPhase('question')
    sfx('tick')
  }

  // Keyboard: A–D or 1–4 to answer, Enter to continue
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (phase === 'question') {
        const k = e.key.toUpperCase()
        let pos = LETTERS.indexOf(k)
        if (pos < 0 && /^[1-6]$/.test(k)) pos = Number(k) - 1
        if (pos >= 0 && pos < order.length && !revealed) {
          e.preventDefault()
          choose(order[pos])
        } else if ((e.key === 'Enter' || e.key === ' ') && revealed) {
          e.preventDefault()
          advance()
        }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, order, revealed, choose, advance])

  const soundToggle = (
    <button
      onClick={() => setEffects(!effects)}
      aria-label={effects ? 'Mute sound effects' : 'Enable sound effects'}
      className="w-8 h-8 flex items-center justify-center border border-gold/25 text-parchment/60 hover:text-gold-light hover:border-gold/60 transition-colors"
    >
      {effects ? <Bell size={13} /> : <BellOff size={13} />}
    </button>
  )

  /* ---------- INTRO ---------- */
  if (phase === 'intro') {
    return (
      <div className="plate relative overflow-hidden p-8 md:p-12 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,162,90,0.16),transparent_60%)]" aria-hidden />
        <div className="relative">
          <div className="absolute right-0 top-0">{soundToggle}</div>
          <Laurel size={64} tone={record ? (record.best === record.total ? 'gold' : record.best / record.total >= 2 / 3 ? 'silver' : 'bronze') : 'gold'} className="mx-auto opacity-90" />
          <p className="caps text-[0.6rem] text-gold mt-5">The examination</p>
          <h3 className="display text-3xl md:text-4xl text-parchment mt-3">
            {roman(questions.length)} questions, {TIME} seconds each
          </h3>
          <p className="italic text-parchment/65 mt-4 max-w-md mx-auto leading-relaxed">
            Answer fast for a time bonus. Consecutive correct answers multiply your points. Earn two thirds or better to receive the laurel.
          </p>
          {record && (
            <p className="caps text-[0.58rem] text-parchment/55 mt-6">
              Your best · {record.best}/{record.total} · {record.points.toLocaleString('en-US')} points
            </p>
          )}
          <button onClick={start} className="btn-gilt mt-8">
            {record ? 'Sit it again' : 'Begin'} <ArrowRight size={14} />
          </button>
          <p className="caps text-[0.5rem] text-parchment/35 mt-5 hidden md:block">Keys · A–D to answer · Enter to continue</p>
        </div>
      </div>
    )
  }

  /* ---------- RESULTS ---------- */
  if (phase === 'done') {
    const v = verdict(score, questions.length)
    const newBest = prevBest === null || points > prevBest
    const avg = answers.reduce((s, a) => s + a.seconds, 0) / answers.length
    return (
      <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }} className="plate relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(200,162,90,0.22),transparent_65%)]" aria-hidden />
        <div className="relative p-8 md:p-12 text-center">
          {v.tone ? (
            <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 180, damping: 14, delay: 0.1 }}>
              <Laurel size={110} tone={v.tone} className="mx-auto drop-shadow-[0_0_24px_rgba(230,204,143,0.45)]" />
            </motion.div>
          ) : (
            <Ornament className="my-6" />
          )}
          <p className="display italic text-3xl md:text-4xl text-gold-light mt-4">{v.latin}</p>
          <p className="text-parchment/70 mt-2 italic">{v.line}</p>

          <div className="grid grid-cols-3 gap-px bg-gold/20 border border-gold/20 mt-9 max-w-lg mx-auto">
            {[
              { k: 'Correct', v: `${score}/${questions.length}` },
              { k: 'Points', v: <CountUp to={points} /> },
              { k: 'Avg. time', v: `${avg.toFixed(1)}s` },
            ].map((s) => (
              <div key={s.k} className="bg-umber py-4">
                <p className="display text-3xl text-parchment">{s.v}</p>
                <p className="caps text-[0.5rem] text-parchment/50 mt-1">{s.k}</p>
              </div>
            ))}
          </div>
          {newBest && points > 0 && (
            <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }} className="caps text-[0.58rem] text-gold mt-4">
              ✦ New personal best ✦
            </motion.p>
          )}
        </div>

        {/* Review */}
        <div className="relative border-t border-gold/20 px-6 md:px-10 py-6">
          <p className="caps text-[0.58rem] text-parchment/50 mb-3">Review</p>
          {questions.map((qq, i) => {
            const a = answers[i]
            return (
              <details key={i} className="group border-b border-gold/10 last:border-b-0">
                <summary className="flex items-start gap-3 py-4 cursor-pointer list-none">
                  <span className={`mt-0.5 w-6 h-6 shrink-0 flex items-center justify-center border ${a.correct ? 'border-gold-light text-gold-light' : 'border-terracotta/70 text-terracotta'}`}>
                    {a.correct ? <Check size={13} /> : <X size={13} />}
                  </span>
                  <span className="flex-1 text-parchment/85 leading-snug">{qq.question}</span>
                  <ChevronDown size={15} className="text-parchment/40 mt-1 transition-transform group-open:rotate-180" />
                </summary>
                <div className="pl-9 pb-5 text-[0.97rem] leading-relaxed">
                  {!a.correct && (
                    <p className="text-parchment/55">
                      Your answer: <span className="text-terracotta">{a.chosen === null ? 'time ran out' : qq.options[a.chosen]}</span>
                    </p>
                  )}
                  <p className="text-parchment/55">
                    Answer: <span className="text-gold-light">{qq.options[qq.correctIndex]}</span>
                  </p>
                  <p className="italic text-parchment/70 mt-2">{qq.explanation}</p>
                </div>
              </details>
            )
          })}
        </div>

        <div className="relative flex flex-wrap items-center justify-center gap-3 px-6 pb-9 pt-2">
          <button onClick={start} className="btn-ghost">
            <RotateCcw size={13} /> Try again
          </button>
          {next && (
            <Link to={`/doc/${next.slug}`} className="btn-gilt">
              Next work <ArrowRight size={14} />
            </Link>
          )}
        </div>
      </motion.div>
    )
  }

  /* ---------- QUESTION ---------- */
  const frac = remaining / TIME
  const urgent = remaining < 6 && !revealed
  return (
    <div className="plate relative overflow-hidden">
      {/* hourglass bar */}
      <div className="h-1 bg-parchment/10">
        <motion.div
          className="h-full"
          style={{ width: `${(revealed ? (answers[answers.length - 1]?.seconds ?? 0) / TIME : 1 - frac) * 100}%`, background: urgent ? 'var(--color-terracotta)' : 'linear-gradient(90deg,#8a6d36,#e6cc8f)' }}
        />
      </div>

      <div className="p-6 md:p-10">
        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <span className="caps text-[0.6rem] text-gold">
              Question {roman(step + 1)} <span className="text-parchment/40">of {roman(questions.length)}</span>
            </span>
            <AnimatePresence>
              {streak >= 1 && (
                <motion.span
                  key={streak}
                  initial={{ opacity: 0, scale: 0.6, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="caps text-[0.52rem] px-2 py-1 border border-gold/40 text-gold-light bg-gold/10"
                >
                  ×{(1 + Math.min(streak, 2) * 0.5).toFixed(1)} streak
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <div className="flex items-center gap-3">
            <span className={`flex items-center gap-1.5 caps text-[0.6rem] tabular-nums ${urgent ? 'text-terracotta' : 'text-parchment/60'}`}>
              <motion.span animate={urgent ? { rotate: [0, 180] } : {}} transition={{ repeat: Infinity, duration: 1 }}>
                <Hourglass size={13} />
              </motion.span>
              {Math.ceil(remaining)}s
            </span>
            <span className="display text-xl text-gold-light tabular-nums min-w-[3.5rem] text-right">{points}</span>
            {soundToggle}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`${attempt}-${step}`}
            initial={{ opacity: 0, x: 24, filter: 'blur(3px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, x: -24, filter: 'blur(3px)' }}
            transition={{ duration: 0.4 }}
          >
            <h3 className="display text-2xl md:text-[2rem] text-parchment mb-7 leading-snug">{q.question}</h3>

            <div key={shakeKey} className={`flex flex-col gap-3 ${shakeKey && revealed && !answers[answers.length - 1]?.correct ? 'shake' : ''}`}>
              {order.map((orig, pos) => {
                const opt = q.options[orig]
                const isCorrect = orig === q.correctIndex
                const isSelected = orig === selected
                let state = 'border-gold/20 hover:border-gold/60 hover:bg-gold/[0.05] hover:translate-x-1'
                if (revealed && isCorrect) state = 'border-gold-light bg-gold/[0.14] shadow-[0_0_30px_-10px_rgba(230,204,143,0.6)]'
                else if (revealed && isSelected) state = 'border-terracotta/70 bg-terracotta/[0.1]'
                else if (revealed) state = 'border-gold/10 opacity-45'
                return (
                  <motion.button
                    key={orig}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.06 * pos }}
                    onClick={() => choose(orig)}
                    disabled={revealed}
                    className={`relative text-left border px-4 py-3.5 flex items-center gap-4 transition-all duration-200 ${state}`}
                  >
                    <span
                      className={`caps text-[0.62rem] w-8 h-8 shrink-0 flex items-center justify-center border transition-colors ${
                        revealed && isCorrect ? 'border-gold-light bg-gold-light text-ink' : 'border-gold/35 text-gold/80'
                      }`}
                    >
                      {LETTERS[pos]}
                    </span>
                    <span className="flex-1 text-parchment/90 text-[1.03rem]">{opt}</span>
                    {revealed && isCorrect && <Check size={17} className="text-gold-light shrink-0" />}
                    {revealed && isSelected && !isCorrect && <X size={17} className="text-terracotta shrink-0" />}
                    {revealed && isSelected && isCorrect && <Burst id={burst} />}
                    {revealed && isSelected && isCorrect && (
                      <motion.span
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: [0, 1, 0], y: -34 }}
                        transition={{ duration: 1.3 }}
                        className="absolute right-12 top-0 display text-xl text-gold-light pointer-events-none"
                      >
                        +{answers[answers.length - 1]?.points}
                      </motion.span>
                    )}
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence>
              {revealed && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="overflow-hidden">
                  <div className="mt-7 pt-6 border-t border-gold/20">
                    <p className={`caps text-[0.6rem] mb-2 ${answers[answers.length - 1]?.correct ? 'text-gold-light' : 'text-terracotta'}`}>
                      {timedOut ? 'The sand ran out' : answers[answers.length - 1]?.correct ? 'Correct' : 'Not quite'}
                    </p>
                    <p className="text-parchment/75 leading-relaxed mb-6 italic">{q.explanation}</p>
                    <button onClick={advance} className="btn-gilt" autoFocus>
                      {step + 1 >= questions.length ? 'See the verdict' : 'Next question'} <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
