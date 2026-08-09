import { motion } from 'framer-motion'
import { Rocket, Landmark } from 'lucide-react'
import type { VCFieldGuide as VCFieldGuideType } from '../types'

function PlayerList({ items, icon: Icon }: { items: { name: string; detail: string }[]; icon: typeof Rocket }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          whileHover={{ x: 3 }}
          transition={{ duration: 0.35, delay: i * 0.05 }}
          className="liquid-glass rounded-xl p-4 overflow-hidden flex gap-3 items-start"
        >
          <Icon size={15} className="text-white/50 shrink-0 mt-0.5" strokeWidth={1.75} />
          <div>
            <p className="text-white text-sm font-medium mb-1">{item.name}</p>
            <p className="text-white/50 text-sm leading-relaxed">{item.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default function VCFieldGuide({ guide }: { guide: VCFieldGuideType }) {
  const hasStartups = guide.startups.length > 0
  const hasFunds = guide.funds.length > 0
  const twoColumns = hasStartups && hasFunds

  return (
    <div className="liquid-glass rounded-3xl p-6 md:p-8 overflow-hidden">
      <p className="text-white/50 text-sm leading-relaxed mb-8">{guide.framing}</p>
      <div className={twoColumns ? 'grid grid-cols-1 md:grid-cols-2 gap-8' : 'grid grid-cols-1 gap-8'}>
        {hasStartups && (
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <Rocket size={12} />
              Building it
            </p>
            <PlayerList items={guide.startups} icon={Rocket} />
          </div>
        )}
        {hasFunds && (
          <div>
            <p className="text-white/40 text-xs tracking-widest uppercase mb-4 flex items-center gap-2">
              <Landmark size={12} />
              Funding it
            </p>
            <PlayerList items={guide.funds} icon={Landmark} />
          </div>
        )}
      </div>
    </div>
  )
}
