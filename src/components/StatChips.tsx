import type { StatChip } from '../types'

export default function StatChips({ stats }: { stats: StatChip[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {stats.map((stat, i) => (
        <div key={i} className="liquid-glass rounded-xl p-4 overflow-hidden">
          <p className="text-white/40 text-xs tracking-widest uppercase mb-2">{stat.label}</p>
          <p className="text-white text-sm md:text-base leading-snug">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}
