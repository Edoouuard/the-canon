import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Eyebrow } from '../components/ui'
import { AchievementBadge, Flame, GoalRing } from '../components/game'
import { Laurel } from '../components/immersive'
import { PATH_UNITS } from '../data/path'
import { CATEGORY_LABELS } from '../types'
import { ACHIEVEMENTS, levelOf, setDailyGoal, streakOf, todayXP, useGame, weekOf } from '../lib/game'

const GOALS = [
  { xp: 10, label: 'Casual' },
  { xp: 20, label: 'Regular' },
  { xp: 30, label: 'Serious' },
  { xp: 50, label: 'Intense' },
]

export default function Profile() {
  const g = useGame()
  const lv = levelOf(g.xp)
  const week = weekOf(g)
  const maxDay = Math.max(g.dailyGoal, ...week.map((d) => d.xp))
  const lessons = Object.values(g.lessons)
  const perfect = lessons.filter((l) => l.stars === 3).length

  return (
    <div className="bg-ink min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto px-5 md:px-8 pt-28 md:pt-32 pb-24">
        <div className="flex flex-col md:flex-row md:items-center gap-8">
          <div className="relative w-32 h-32 shrink-0">
            <GoalRing value={lv.into} goal={lv.span} size={128} stroke={6}>
              <span className="flex flex-col items-center">
                <Laurel size={46} />
                <span className="display text-3xl text-gold-light leading-none mt-1">{lv.level}</span>
              </span>
            </GoalRing>
          </div>
          <div>
            <Eyebrow className="mb-2">Your honours</Eyebrow>
            <h1 className="display text-5xl text-parchment">Level {lv.level} reader</h1>
            <p className="italic text-parchment/60 mt-2">
              {g.xp} XP earned · {lv.span - lv.into} XP to level {lv.level + 1}
            </p>
          </div>
        </div>

        {/* stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
          {[
            { k: 'Day streak', v: streakOf(g), icon: <Flame size={22} lit={todayXP(g) > 0} /> },
            { k: 'Total XP', v: g.xp, icon: <Zap size={20} className="text-gold-light fill-gold-light" /> },
            { k: 'Lessons completed', v: lessons.length, icon: <Laurel size={24} /> },
            { k: 'Perfect lessons', v: perfect, icon: <span className="text-gold-light text-xl">★</span> },
          ].map((s, i) => (
            <motion.div key={s.k} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="plate p-5 flex items-center gap-4">
              {s.icon}
              <div>
                <p className="display text-3xl text-parchment leading-none">{s.v}</p>
                <p className="caps text-[0.5rem] text-parchment/50 mt-1.5">{s.k}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* week */}
          <div className="plate p-6">
            <p className="caps text-[0.58rem] text-parchment/50 mb-5">This week</p>
            <div className="flex items-end justify-between gap-2 h-40">
              {week.map((d) => (
                <div key={d.key} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
                  <span className="caps text-[0.48rem] text-parchment/50">{d.xp || ''}</span>
                  <motion.div
                    className={`w-full ${d.xp >= g.dailyGoal ? 'bg-gradient-to-t from-gold to-gold-light' : 'bg-gold/40'}`}
                    initial={{ height: 0 }}
                    animate={{ height: `${(d.xp / maxDay) * 100}%` }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    style={{ minHeight: d.xp ? 4 : 0 }}
                  />
                  <span className={`caps text-[0.5rem] ${d.today ? 'text-gold-light' : 'text-parchment/45'}`}>{d.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* goal */}
          <div className="plate p-6">
            <p className="caps text-[0.58rem] text-parchment/50 mb-5">Daily goal</p>
            <div className="grid grid-cols-2 gap-3">
              {GOALS.map((goal) => {
                const active = g.dailyGoal === goal.xp
                return (
                  <button
                    key={goal.xp}
                    onClick={() => setDailyGoal(goal.xp)}
                    className={`border-2 px-4 py-3 text-left transition-all ${active ? 'border-gold-light bg-gold/10 shadow-[0_4px_0_0_rgba(200,162,90,0.45)]' : 'border-gold/20 hover:border-gold/50'}`}
                  >
                    <p className="display text-xl text-parchment">{goal.label}</p>
                    <p className="caps text-[0.5rem] text-parchment/50">{goal.xp} XP per day</p>
                  </button>
                )
              })}
            </div>
            <p className="italic text-parchment/55 text-sm mt-4">
              Today: {todayXP(g)} / {g.dailyGoal} XP
            </p>
          </div>
        </div>

        {/* achievements */}
        <section className="mt-14">
          <div className="flex items-baseline justify-between mb-6">
            <h2 className="display text-3xl text-parchment">Achievements</h2>
            <p className="caps text-[0.55rem] text-parchment/50">
              {ACHIEVEMENTS.filter((a) => g.achievements[a.id]).length} of {ACHIEVEMENTS.length}
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {ACHIEVEMENTS.map((a) => {
              const u = !!g.achievements[a.id]
              return (
                <div key={a.id} className={`plate p-5 flex flex-col items-center text-center gap-4 ${u ? '' : 'opacity-60'}`}>
                  <AchievementBadge a={a} unlocked={u} size={52} />
                  <div>
                    <p className={`display text-lg ${u ? 'text-parchment' : 'text-parchment/60'}`}>{a.title}</p>
                    <p className="text-parchment/50 text-[0.85rem] leading-snug mt-1">{a.detail}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* mastery */}
        <section className="mt-14">
          <h2 className="display text-3xl text-parchment mb-6">Mastery by gallery</h2>
          <div className="grid md:grid-cols-2 gap-x-10 gap-y-4">
            {PATH_UNITS.map((u) => {
              const done = u.lessons.filter((d) => g.lessons[d.slug]).length
              return (
                <Link key={u.gallery.category} to={`/directory?cat=${u.gallery.category}`} className="group">
                  <div className="flex justify-between text-[0.95rem]">
                    <span className="text-parchment/80 group-hover:text-gold-light transition-colors">{CATEGORY_LABELS[u.gallery.category]}</span>
                    <span className="text-parchment/50">
                      {done}/{u.lessons.length}
                    </span>
                  </div>
                  <div className="h-2 bg-parchment/10 mt-1.5">
                    <motion.div className="h-full" style={{ background: u.gallery.accent }} initial={{ width: 0 }} animate={{ width: `${(done / u.lessons.length) * 100}%` }} transition={{ duration: 0.9 }} />
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        <div className="text-center mt-16">
          <Link to="/path" className="btn-gilt">
            Continue on the path
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
