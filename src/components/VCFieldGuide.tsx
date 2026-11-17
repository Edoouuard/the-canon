import { motion } from 'framer-motion'
import type { VCFieldGuide as VCFieldGuideType } from '../types'

function PlayerList({ title, items }: { title: string; items: { name: string; detail: string }[] }) {
  return (
    <div>
      <p className="caps text-[0.6rem] text-gold mb-4 pb-3 border-b border-gold/25">{title}</p>
      <ul>
        {items.map((item, i) => (
          <motion.li
            key={i}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            className="py-4 border-b border-gold/10 last:border-b-0"
          >
            <p className="display text-xl text-parchment">{item.name}</p>
            <p className="text-parchment/65 text-[0.97rem] leading-relaxed mt-1">{item.detail}</p>
          </motion.li>
        ))}
      </ul>
    </div>
  )
}

export default function VCFieldGuide({ guide }: { guide: VCFieldGuideType }) {
  const two = guide.startups.length > 0 && guide.funds.length > 0
  return (
    <div className="plate p-7 md:p-9">
      <p className="italic text-parchment/80 text-lg leading-relaxed mb-8">{guide.framing}</p>
      <div className={two ? 'grid md:grid-cols-2 gap-10' : 'grid gap-10'}>
        {guide.startups.length > 0 && <PlayerList title="Building it" items={guide.startups} />}
        {guide.funds.length > 0 && <PlayerList title="Funding it" items={guide.funds} />}
      </div>
    </div>
  )
}
