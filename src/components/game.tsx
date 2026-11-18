import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { BookOpen, Compass, Crown, Eye, Moon, Star, Target, Zap } from 'lucide-react'
import { ACHIEVEMENTS, activeToday, onGameEvent, streakOf, todayXP, useGame, type Achievement, type GameEvent } from '../lib/game'
import { Laurel } from './immersive'

/* ---------- Flame ---------- */
export function Flame({ size = 22, lit = true, className = '' }: { size?: number; lit?: boolean; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className} aria-hidden>
      <defs>
        <linearGradient id={`fl-${lit ? 'on' : 'off'}`} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={lit ? '#ffd88a' : '#6e6658'} />
          <stop offset="100%" stopColor={lit ? '#d9692e' : '#3f3a31'} />
        </linearGradient>
      </defs>
      <path
        d="M12 2c1 3.5 4.8 5.6 4.8 10.4A4.8 4.8 0 0 1 12 22a6.2 6.2 0 0 1-6.2-6.3c0-3.4 2.2-5.3 3.2-7.6.5 1.7 1.4 2.8 2.5 3.3C11.6 8.4 11.3 5 12 2Z"
        fill={`url(#fl-${lit ? 'on' : 'off'})`}
      />
      {lit && <path d="M12 13.5c.9 1.2 2.2 2 2.2 3.8a2.2 2.2 0 0 1-4.4 0c0-1.3.8-2.1 1.3-3 .3.6.6.9.9 1-.2-.6-.2-1.2 0-1.8Z" fill="#fff1c9" opacity="0.9" />}
    </svg>
  )
}

/* ---------- Stars ---------- */
export function StarRow({ stars, size = 14, className = '' }: { stars: number; size?: number; className?: string }) {
  return (
    <span className={`inline-flex gap-0.5 ${className}`} aria-label={`${stars} of 3 stars`}>
      {[1, 2, 3].map((i) => (
        <Star key={i} size={size} className={i <= stars ? 'text-gold-light fill-gold-light' : 'text-parchment/25'} strokeWidth={1.5} />
      ))}
    </span>
  )
}

/* ---------- Daily goal ring ---------- */
export function GoalRing({ value, goal, size = 34, stroke = 3, children }: { value: number; goal: number; size?: number; stroke?: number; children?: React.ReactNode }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const p = Math.min(1, value / goal)
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90 absolute inset-0">
        <circle cx={size / 2} cy={size / 2} r={r} stroke="rgba(239,228,204,0.15)" strokeWidth={stroke} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={p >= 1 ? '#e6cc8f' : '#c8a25a'}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - p) }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <span className="relative">{children}</span>
    </span>
  )
}

/* ---------- Achievement badge ---------- */
const ICONS = { flame: null, star: Star, book: BookOpen, crown: Crown, bolt: Zap, compass: Compass, target: Target, moon: Moon, laurel: null, eye: Eye }

export function AchievementBadge({ a, unlocked, size = 56 }: { a: Achievement; unlocked: boolean; size?: number }) {
  const Icon = ICONS[a.icon]
  return (
    <span
      className={`relative inline-flex items-center justify-center rotate-45 border ${
        unlocked ? 'border-gold-light bg-gradient-to-br from-[#3a2f1c] to-[#1d1912] shadow-[0_0_24px_-6px_rgba(230,204,143,0.55)]' : 'border-parchment/15 bg-umber'
      }`}
      style={{ width: size, height: size }}
    >
      <span className="-rotate-45">
        {a.icon === 'flame' ? (
          <Flame size={size * 0.45} lit={unlocked} />
        ) : a.icon === 'laurel' ? (
          <Laurel size={size * 0.55} tone={unlocked ? 'gold' : 'silver'} className={unlocked ? '' : 'opacity-30'} />
        ) : Icon ? (
          <Icon size={size * 0.38} strokeWidth={1.5} className={unlocked ? 'text-gold-light' : 'text-parchment/25'} />
        ) : null}
      </span>
    </span>
  )
}

/* ---------- Navbar HUD ---------- */
export function GameHUD() {
  const g = useGame()
  const streak = streakOf(g)
  const lit = activeToday(g)
  const xp = todayXP(g)
  return (
    <Link
      to="/profile"
      className="flex items-center gap-2.5 h-9 pl-2 pr-2.5 border border-gold/30 hover:border-gold transition-colors"
      aria-label={`${streak} day streak, ${xp} of ${g.dailyGoal} XP today. Open your profile.`}
      title="Your streak and daily goal"
    >
      <span className="flex items-center gap-1">
        <motion.span key={`${streak}-${lit}`} initial={{ scale: 0.6 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, damping: 12 }}>
          <Flame size={18} lit={lit} />
        </motion.span>
        <span className={`display text-lg leading-none tabular-nums ${lit ? 'text-gold-light' : 'text-parchment/50'}`}>{streak}</span>
      </span>
      <span className="hidden sm:inline-flex">
        <GoalRing value={xp} goal={g.dailyGoal} size={24} stroke={2.5}>
          <Zap size={11} className={xp >= g.dailyGoal ? 'text-gold-light fill-gold-light' : 'text-gold/80'} />
        </GoalRing>
      </span>
    </Link>
  )
}

/* ---------- Toasts ---------- */
interface Toast {
  id: number
  e: GameEvent
}

export function GameToasts() {
  const [toasts, setToasts] = useState<Toast[]>([])
  useEffect(() => {
    let n = 0
    return onGameEvent((e) => {
      const id = ++n + Date.now()
      setToasts((t) => [...t.slice(-3), { id, e }])
      window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), e.kind === 'xp' ? 2200 : 4200)
    })
  }, [])

  return (
    <div className="fixed top-20 md:top-24 left-1/2 -translate-x-1/2 z-[80] flex flex-col items-center gap-2 pointer-events-none" aria-live="polite">
      <AnimatePresence>
        {toasts.map(({ id, e }) => (
          <motion.div
            key={id}
            layout
            initial={{ opacity: 0, y: -24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 28 }}
            className="pointer-events-auto flex items-center gap-3 px-4 py-2.5 bg-ink/95 border border-gold/50 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8),0_0_30px_-12px_rgba(230,204,143,0.6)] backdrop-blur"
          >
            {e.kind === 'xp' && (
              <>
                <Zap size={16} className="text-gold-light fill-gold-light" />
                <span className="display text-xl text-gold-light">+{e.amount} XP</span>
                <span className="caps text-[0.55rem] text-parchment/60">{e.reason}</span>
              </>
            )}
            {e.kind === 'goal' && (
              <>
                <Target size={16} className="text-gold-light" />
                <span className="caps text-[0.62rem] text-parchment">Daily goal reached · {e.goal} XP</span>
              </>
            )}
            {e.kind === 'level' && (
              <>
                <Crown size={16} className="text-gold-light" />
                <span className="caps text-[0.62rem] text-parchment">Level {e.level} reached</span>
              </>
            )}
            {e.kind === 'achievement' &&
              (() => {
                const a = ACHIEVEMENTS.find((x) => x.id === e.id)!
                return (
                  <>
                    <AchievementBadge a={a} unlocked size={26} />
                    <span className="flex flex-col leading-tight ml-1">
                      <span className="caps text-[0.5rem] text-gold">Achievement unlocked</span>
                      <span className="display text-lg text-parchment">{a.title}</span>
                    </span>
                  </>
                )
              })()}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
