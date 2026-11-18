import { createStore, useStore } from './store'
import { documents } from '../data/documents'
import { richContent } from '../data/richContent'
import { BRIEFS } from '../data/watch'

/* ------------------------------------------------------------------ */
/* State                                                               */
/* ------------------------------------------------------------------ */

export interface LessonRecord {
  stars: number // 1–3
  bestAccuracy: number // 0–1
  completions: number
  lastAt: number
}

export interface GameState {
  xp: number
  daily: Record<string, number> // YYYY-MM-DD -> XP earned that day
  lessons: Record<string, LessonRecord>
  tours: Record<string, number> // mechanism tours completed
  briefs: Record<string, number> // watch briefs read
  achievements: Record<string, number> // id -> unlocked at
  dailyGoal: number
}

const INITIAL: GameState = { xp: 0, daily: {}, lessons: {}, tours: {}, briefs: {}, achievements: {}, dailyGoal: 20 }

export const gameStore = createStore<GameState>('canon.game.v1', INITIAL)

export function useGame() {
  return useStore(gameStore)
}

/* ------------------------------------------------------------------ */
/* Dates, streak, level                                                */
/* ------------------------------------------------------------------ */

export function dayKey(d = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

function addDays(d: Date, n: number) {
  const c = new Date(d)
  c.setDate(c.getDate() + n)
  return c
}

/** Consecutive days with XP, counting today if active, otherwise ending yesterday. */
export function streakOf(s: GameState, now = new Date()) {
  let cursor = (s.daily[dayKey(now)] ?? 0) > 0 ? now : addDays(now, -1)
  let n = 0
  while ((s.daily[dayKey(cursor)] ?? 0) > 0) {
    n++
    cursor = addDays(cursor, -1)
  }
  return n
}

export function activeToday(s: GameState) {
  return (s.daily[dayKey()] ?? 0) > 0
}

export function todayXP(s: GameState) {
  return s.daily[dayKey()] ?? 0
}

/** Last 7 days, oldest first. */
export function weekOf(s: GameState) {
  return Array.from({ length: 7 }, (_, i) => {
    const d = addDays(new Date(), i - 6)
    return { key: dayKey(d), label: d.toLocaleDateString('en-GB', { weekday: 'short' }).slice(0, 2), xp: s.daily[dayKey(d)] ?? 0, today: i === 6 }
  })
}

export const levelThreshold = (level: number) => 15 * (level - 1) * level

export function levelOf(xp: number) {
  let level = 1
  while (xp >= levelThreshold(level + 1)) level++
  const base = levelThreshold(level)
  const next = levelThreshold(level + 1)
  return { level, into: xp - base, span: next - base, progress: (xp - base) / (next - base) }
}

/* ------------------------------------------------------------------ */
/* Events (toasts)                                                     */
/* ------------------------------------------------------------------ */

export type GameEvent =
  | { kind: 'xp'; amount: number; reason: string }
  | { kind: 'achievement'; id: string }
  | { kind: 'goal'; goal: number }
  | { kind: 'level'; level: number }

const listeners = new Set<(e: GameEvent) => void>()
export function onGameEvent(l: (e: GameEvent) => void) {
  listeners.add(l)
  return () => {
    listeners.delete(l)
  }
}
function emit(e: GameEvent) {
  listeners.forEach((l) => l(e))
}

/* ------------------------------------------------------------------ */
/* Achievements                                                        */
/* ------------------------------------------------------------------ */

export const lessonSlugs = documents.filter((d) => richContent[d.slug]).map((d) => d.slug)

interface Ctx {
  perfect?: boolean
  seconds?: number
}

export interface Achievement {
  id: string
  title: string
  detail: string
  icon: 'flame' | 'star' | 'book' | 'crown' | 'bolt' | 'compass' | 'target' | 'moon' | 'laurel' | 'eye'
  check: (s: GameState, ctx: Ctx) => boolean
}

const lessonsDone = (s: GameState) => Object.keys(s.lessons).length

function galleriesMastered(s: GameState) {
  const by = new Map<string, string[]>()
  documents.forEach((d) => {
    if (!richContent[d.slug]) return
    by.set(d.category, [...(by.get(d.category) ?? []), d.slug])
  })
  return [...by.values()].filter((slugs) => slugs.every((sl) => s.lessons[sl])).length
}

function galleriesTouched(s: GameState) {
  return new Set(documents.filter((d) => s.lessons[d.slug]).map((d) => d.category)).size
}

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'first-lesson', title: 'First Steps', detail: 'Complete your first lesson', icon: 'book', check: (s) => lessonsDone(s) >= 1 },
  { id: 'flawless', title: 'Flawless', detail: 'Finish a lesson without a single mistake', icon: 'star', check: (_s, c) => !!c.perfect },
  { id: 'speed', title: 'Quick Study', detail: 'Finish a lesson in under 90 seconds', icon: 'bolt', check: (_s, c) => (c.seconds ?? 999) < 90 },
  { id: 'goal', title: 'Goal Getter', detail: 'Reach your daily goal', icon: 'target', check: (s) => todayXP(s) >= s.dailyGoal },
  { id: 'streak-3', title: 'Kindling', detail: 'Reach a 3-day streak', icon: 'flame', check: (s) => streakOf(s) >= 3 },
  { id: 'streak-7', title: 'Week on Fire', detail: 'Reach a 7-day streak', icon: 'flame', check: (s) => streakOf(s) >= 7 },
  { id: 'lessons-5', title: 'Apprentice', detail: 'Complete 5 lessons', icon: 'book', check: (s) => lessonsDone(s) >= 5 },
  { id: 'lessons-20', title: 'Scholar', detail: 'Complete 20 lessons', icon: 'laurel', check: (s) => lessonsDone(s) >= 20 },
  { id: 'explorer', title: 'Explorer', detail: 'Complete lessons in 5 different galleries', icon: 'compass', check: (s) => galleriesTouched(s) >= 5 },
  { id: 'gallery-master', title: 'Curator', detail: 'Complete every lesson in one gallery', icon: 'crown', check: (s) => galleriesMastered(s) >= 1 },
  { id: 'xp-100', title: 'Hundred', detail: 'Earn 100 XP', icon: 'bolt', check: (s) => s.xp >= 100 },
  { id: 'xp-500', title: 'Five Hundred', detail: 'Earn 500 XP', icon: 'bolt', check: (s) => s.xp >= 500 },
  { id: 'sentinel', title: 'Sentinel', detail: 'Read 5 briefs in the Watch', icon: 'eye', check: (s) => Object.keys(s.briefs).length >= 5 },
  { id: 'watchtower', title: 'Watchtower', detail: 'Read every brief in the Watch', icon: 'eye', check: (s) => BRIEFS.every((b) => s.briefs[b.id]) },
  { id: 'night-owl', title: 'Night Reader', detail: 'Finish a lesson after 10 pm', icon: 'moon', check: () => new Date().getHours() >= 22 },
]

function checkAchievements(ctx: Ctx = {}) {
  const s = gameStore.get()
  const fresh = ACHIEVEMENTS.filter((a) => !s.achievements[a.id] && a.check(s, ctx))
  if (!fresh.length) return []
  gameStore.set((p) => ({ ...p, achievements: { ...p.achievements, ...Object.fromEntries(fresh.map((a) => [a.id, Date.now()])) } }))
  fresh.forEach((a) => emit({ kind: 'achievement', id: a.id }))
  return fresh.map((a) => a.id)
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

function award(amount: number, reason: string) {
  const before = gameStore.get()
  const k = dayKey()
  const wasBelowGoal = todayXP(before) < before.dailyGoal
  const levelBefore = levelOf(before.xp).level
  gameStore.set((p) => ({ ...p, xp: p.xp + amount, daily: { ...p.daily, [k]: (p.daily[k] ?? 0) + amount } }))
  const after = gameStore.get()
  emit({ kind: 'xp', amount, reason })
  const goalReached = wasBelowGoal && todayXP(after) >= after.dailyGoal
  if (goalReached) emit({ kind: 'goal', goal: after.dailyGoal })
  const levelAfter = levelOf(after.xp).level
  if (levelAfter > levelBefore) emit({ kind: 'level', level: levelAfter })
  return { goalReached, levelUp: levelAfter > levelBefore ? levelAfter : null }
}

export interface LessonResult {
  slug: string
  exercises: number
  mistakes: number
  seconds: number
  maxCombo: number
}

export interface LessonSummary {
  xp: number
  breakdown: { label: string; xp: number }[]
  stars: number
  prevStars: number
  accuracy: number
  streakBefore: number
  streakAfter: number
  extendedStreak: boolean
  goalReached: boolean
  levelUp: number | null
  achievements: string[]
}

export function starsFor(mistakes: number) {
  return mistakes === 0 ? 3 : mistakes <= 2 ? 2 : 1
}

export function completeLesson(r: LessonResult): LessonSummary {
  const before = gameStore.get()
  const prev = before.lessons[r.slug]
  const streakBefore = streakOf(before)
  const wasActive = activeToday(before)
  const accuracy = r.exercises / (r.exercises + r.mistakes)
  const stars = starsFor(r.mistakes)

  const breakdown = [{ label: 'Lesson complete', xp: 10 }]
  if (r.mistakes === 0) breakdown.push({ label: 'Perfect lesson', xp: 5 })
  if (!prev) breakdown.push({ label: 'First time', xp: 5 })
  if (r.maxCombo >= 4) breakdown.push({ label: `Combo ×${r.maxCombo}`, xp: 3 })
  const xp = breakdown.reduce((s, b) => s + b.xp, 0)

  gameStore.set((p) => ({
    ...p,
    lessons: {
      ...p.lessons,
      [r.slug]: {
        stars: Math.max(prev?.stars ?? 0, stars),
        bestAccuracy: Math.max(prev?.bestAccuracy ?? 0, accuracy),
        completions: (prev?.completions ?? 0) + 1,
        lastAt: Date.now(),
      },
    },
  }))
  const { goalReached, levelUp } = award(xp, 'Lesson complete')
  const achievements = checkAchievements({ perfect: r.mistakes === 0, seconds: r.seconds })
  const streakAfter = streakOf(gameStore.get())

  return {
    xp,
    breakdown,
    stars,
    prevStars: prev?.stars ?? 0,
    accuracy,
    streakBefore,
    streakAfter,
    extendedStreak: !wasActive,
    goalReached,
    levelUp,
    achievements,
  }
}

/** Finishing the guided tour of a mechanism earns a little XP, once per work. */
export function completeTour(slug: string) {
  if (gameStore.get().tours[slug]) return
  gameStore.set((p) => ({ ...p, tours: { ...p.tours, [slug]: Date.now() } }))
  award(2, 'Mechanism explored')
  checkAchievements()
}

/** Reading a brief in the Watch earns 2 XP, once per brief. */
export function readBrief(id: string) {
  if (gameStore.get().briefs[id]) return
  gameStore.set((p) => ({ ...p, briefs: { ...p.briefs, [id]: Date.now() } }))
  award(2, 'Brief read')
  checkAchievements()
}

export function setDailyGoal(goal: number) {
  gameStore.set((p) => ({ ...p, dailyGoal: goal }))
}

/** The next lesson to suggest: first unfinished lesson in path order. */
export function nextLessonSlug(s: GameState, order: string[]) {
  return order.find((sl) => !s.lessons[sl]) ?? order[0]
}
