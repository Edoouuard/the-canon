import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Pause, Play, List, Workflow } from 'lucide-react'
import type { MechanismStep } from '../types'
import { roman } from './ui'
import { sfx } from '../lib/sound'

const H = 280
const BASE = 236
const AUTOPLAY_MS = 6500

function layout(n: number, W: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = n === 1 ? 0.5 : i / (n - 1)
    return { x: 60 + t * (W - 120), y: 168 - 92 * Math.sin(Math.PI * t) }
  })
}

/** Cubic segment between two nodes, bowing gently upward. */
function useWidth() {
  const [w, setW] = useState(() => (typeof window !== 'undefined' && window.innerWidth < 768 ? 560 : 1000))
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)')
    const on = () => setW(mq.matches ? 560 : 1000)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])
  return w
}

function segment(a: { x: number; y: number }, b: { x: number; y: number }) {
  const dx = (b.x - a.x) / 2
  return `M${a.x},${a.y} C${a.x + dx},${a.y - 26} ${b.x - dx},${b.y - 26} ${b.x},${b.y}`
}

export default function MechanismFlow({ steps }: { steps: MechanismStep[] }) {
  const n = steps.length
  const W = useWidth()
  const pts = layout(n, W)
  const [active, setActive] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [listView, setListView] = useState(false)
  const [tick, setTick] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-35% 0px' })
  const reduce = useReducedMotion()

  // Begin the tour automatically the first time the diagram comes into view
  useEffect(() => {
    if (inView && !reduce) setPlaying(true)
  }, [inView, reduce])

  useEffect(() => {
    if (!playing || listView) return
    const t = window.setTimeout(() => {
      if (active >= n - 1) setPlaying(false)
      else setActive((a) => a + 1)
    }, AUTOPLAY_MS)
    return () => window.clearTimeout(t)
  }, [playing, active, n, listView, tick])

  function go(i: number, user = true) {
    const next = Math.max(0, Math.min(n - 1, i))
    if (next === active) return
    if (user) {
      setPlaying(false)
      sfx('step')
    }
    setActive(next)
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      go(active + 1)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      go(active - 1)
    } else if (e.key === ' ') {
      e.preventDefault()
      togglePlay()
    }
  }

  function togglePlay() {
    if (!playing && active >= n - 1) setActive(0)
    setPlaying((p) => !p)
    setTick((t) => t + 1)
  }

  const step = steps[active]

  return (
    <div ref={ref} className="plate overflow-hidden" tabIndex={0} onKeyDown={onKey} aria-roledescription="interactive diagram" aria-label="The mechanism, step by step. Use the arrow keys to move between steps.">
      {/* toolbar */}
      <div className="flex items-center justify-between px-5 md:px-7 pt-5">
        <span className="caps text-[0.58rem] text-gold">
          Step {roman(active + 1)} <span className="text-parchment/40">of {roman(n)}</span>
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setListView((v) => !v)}
            className="h-8 px-2.5 flex items-center gap-1.5 border border-gold/25 text-parchment/70 hover:text-gold-light hover:border-gold/60 caps text-[0.52rem] transition-colors"
            aria-pressed={listView}
          >
            {listView ? <Workflow size={12} /> : <List size={12} />}
            {listView ? 'Diagram' : 'All steps'}
          </button>
        </div>
      </div>

      {listView ? (
        <ol className="px-5 md:px-7 py-6">
          {steps.map((s, i) => (
            <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-3 py-4 border-b border-gold/10 last:border-b-0">
              <span className="display text-xl text-gold">{roman(i + 1)}</span>
              <div>
                <p className="display text-xl text-parchment">{s.label}</p>
                <p className="text-parchment/70 leading-relaxed mt-1">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <>
          {/* The aqueduct */}
          <div className="relative px-2 md:px-4">
            <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto select-none" role="presentation">
              <defs>
                <radialGradient id="mech-glow">
                  <stop offset="0%" stopColor="#f6dea0" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#f6dea0" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="mech-col" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#c8a25a" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#c8a25a" stopOpacity="0.05" />
                </linearGradient>
              </defs>

              {/* stylobate */}
              <line x1="20" x2={W - 20} y1={BASE} y2={BASE} stroke="#c8a25a" strokeOpacity="0.35" />
              <line x1="36" x2={W - 36} y1={BASE + 8} y2={BASE + 8} stroke="#c8a25a" strokeOpacity="0.18" />

              {/* columns */}
              {pts.map((p, i) => (
                <motion.rect
                  key={`c${i}`}
                  x={p.x - 7}
                  width="14"
                  y={p.y + 24}
                  height={BASE - p.y - 24}
                  fill="url(#mech-col)"
                  initial={{ scaleY: 0 }}
                  animate={inView ? { scaleY: 1 } : {}}
                  style={{ transformOrigin: '50% 100%', transformBox: 'fill-box' }}
                  transition={{ duration: 0.9, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
                />
              ))}

              {/* faint full course + gilded progress */}
              {pts.slice(1).map((p, i) => {
                const d = segment(pts[i], p)
                return (
                  <g key={`s${i}`}>
                    <path d={d} fill="none" stroke="#efe4cc" strokeOpacity="0.14" strokeWidth="2" strokeDasharray="3 7" />
                    <motion.path
                      d={d}
                      fill="none"
                      stroke="#e6cc8f"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: i < active ? 1 : 0 }}
                      transition={{ duration: 0.7, ease: 'easeInOut', delay: i < active ? 0 : 0 }}
                      style={{ filter: 'drop-shadow(0 0 6px rgba(230,204,143,0.7))' }}
                    />
                  </g>
                )
              })}

              {/* a mote of light travels to the newly active step */}
              {active > 0 && (
                <circle key={`mote${active}`} r="5" fill="#fff4d6" style={{ filter: 'drop-shadow(0 0 8px #f6dea0)' }}>
                  <animateMotion dur="0.7s" fill="freeze" path={segment(pts[active - 1], pts[active])} />
                  <animate attributeName="opacity" values="1;1;0" dur="0.9s" fill="freeze" />
                </circle>
              )}

              {/* medallions */}
              {pts.map((p, i) => {
                const done = i < active
                const isActive = i === active
                return (
                  <g key={`n${i}`} onClick={() => go(i)} className="cursor-pointer" role="button" aria-label={`Step ${i + 1}: ${steps[i].label}`}>
                    {isActive && (
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r="46"
                        fill="url(#mech-glow)"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: [0.45, 0.8, 0.45], scale: [0.95, 1.08, 0.95] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                      />
                    )}
                    <g transform={`rotate(45 ${p.x} ${p.y})`}>
                    <motion.rect
                      x={p.x - 22}
                      y={p.y - 22}
                      width="44"
                      height="44"
                      fill={isActive ? '#2a2318' : '#1d1912'}
                      stroke={isActive || done ? '#e6cc8f' : '#c8a25a'}
                      strokeOpacity={isActive || done ? 1 : 0.45}
                      strokeWidth={isActive ? 2 : 1.2}
                      animate={{ scale: isActive ? 1.15 : 1 }}
                      style={{ transformOrigin: 'center', transformBox: 'fill-box' }}
                      transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                    />
                    </g>
                    <text
                      x={p.x}
                      y={p.y + 7}
                      textAnchor="middle"
                      fontFamily="Cormorant Garamond, serif"
                      fontSize={W < 800 ? 24 : 22}
                      fill={isActive || done ? '#f3e2b4' : '#c8a25a'}
                      opacity={isActive || done ? 1 : 0.7}
                    >
                      {roman(i + 1)}
                    </text>
                    {/* hit area */}
                    <circle cx={p.x} cy={p.y} r="34" fill="transparent" />
                  </g>
                )
              })}
            </svg>

            {/* labels under the arches, desktop only */}
            <div className="hidden md:block absolute inset-x-2 md:inset-x-4 bottom-1 pointer-events-none">
              {pts.map((p, i) => (
                <span
                  key={i}
                  className={`absolute -translate-x-1/2 caps text-[0.5rem] text-center w-32 leading-tight transition-colors ${
                    i === active ? 'text-gold-light' : 'text-parchment/40'
                  }`}
                  style={{ left: `clamp(4rem, ${(p.x / W) * 100}%, calc(100% - 4rem))`, bottom: 0 }}
                >
                  {steps[i].label.length > 34 ? steps[i].label.slice(0, 32) + '…' : steps[i].label}
                </span>
              ))}
            </div>
          </div>

          {/* Detail panel */}
          <div className="relative border-t border-gold/20 bg-ink/40 px-5 md:px-9 py-7 md:py-9 min-h-[220px] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 14, filter: 'blur(4px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="relative grid md:grid-cols-[6.5rem_1fr] gap-4 md:gap-8 items-start"
              >
                <span className="display text-6xl md:text-8xl leading-none text-gold/25 select-none" aria-hidden>
                  {roman(active + 1)}
                </span>
                <div>
                  <h3 className="display text-2xl md:text-[2rem] leading-tight text-parchment mb-3">{step.label}</h3>
                  <p className="text-parchment/75 text-[1.08rem] leading-relaxed">{step.detail}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* autoplay timer */}
            {playing && (
              <motion.span
                key={`bar${active}-${tick}`}
                className="absolute left-0 bottom-0 h-[2px] bg-gold-light/80"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: AUTOPLAY_MS / 1000, ease: 'linear' }}
              />
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-3 px-5 md:px-7 py-4 border-t border-gold/15">
            <button
              onClick={() => go(active - 1)}
              disabled={active === 0}
              className="h-10 px-3 flex items-center gap-1.5 border border-gold/25 caps text-[0.55rem] text-parchment/75 hover:text-gold-light hover:border-gold/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft size={14} /> Previous
            </button>
            <button
              onClick={togglePlay}
              className="h-10 px-4 flex items-center gap-2 border border-gold/50 bg-gold/10 caps text-[0.55rem] text-gold-light hover:bg-gold/20 transition-colors"
              aria-label={playing ? 'Pause the tour' : 'Play the tour'}
            >
              {playing ? <Pause size={13} /> : <Play size={13} />}
              {playing ? 'Pause' : active >= n - 1 ? 'Replay' : 'Play'}
            </button>
            <button
              onClick={() => go(active + 1)}
              disabled={active === n - 1}
              className="h-10 px-3 flex items-center gap-1.5 border border-gold/25 caps text-[0.55rem] text-parchment/75 hover:text-gold-light hover:border-gold/60 disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              Next <ChevronRight size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  )
}
