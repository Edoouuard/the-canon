import { motion } from 'framer-motion'
import type { MechanismStep } from '../types'
import { roman } from './ui'

export default function MechanismFlow({ steps }: { steps: MechanismStep[] }) {
  return (
    <ol className="relative">
      {steps.map((step, i) => (
        <li key={i} className="grid grid-cols-[3.25rem_1fr] gap-5">
          <div className="flex flex-col items-center">
            <motion.span
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="w-12 h-12 shrink-0 rotate-45 border border-gold/60 bg-umber flex items-center justify-center shadow-[0_0_24px_-8px_rgba(200,162,90,0.6)]"
            >
              <span className="-rotate-45 display text-lg text-gold-light">{roman(i + 1)}</span>
            </motion.span>
            {i < steps.length - 1 && <span className="w-px flex-1 my-2 bg-gradient-to-b from-gold/50 to-gold/5" />}
          </div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.08 }}
            className="pb-10 pt-2"
          >
            <h3 className="display text-2xl text-parchment mb-2 leading-snug">{step.label}</h3>
            <p className="text-parchment/70 text-[1.05rem] leading-relaxed">{step.detail}</p>
          </motion.div>
        </li>
      ))}
    </ol>
  )
}
