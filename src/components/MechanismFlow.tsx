import { motion } from 'framer-motion'
import type { MechanismStep } from '../types'

export default function MechanismFlow({ steps }: { steps: MechanismStep[] }) {
  return (
    <div className="flex flex-col">
      {steps.map((step, i) => (
        <div key={i} className="flex gap-4 md:gap-5">
          <div className="flex flex-col items-center shrink-0">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="liquid-glass w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-medium overflow-hidden shrink-0"
            >
              {i + 1}
            </motion.div>
            {i < steps.length - 1 && <div className="w-px flex-1 bg-gradient-to-b from-white/25 to-white/5 my-1" />}
          </div>
          <motion.div
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="pb-8"
          >
            <h4 className="text-white text-base md:text-lg mb-1.5 tracking-tight">{step.label}</h4>
            <p className="text-white/50 text-sm leading-relaxed">{step.detail}</p>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
