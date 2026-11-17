import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/** Rooms dissolve into one another: a soft blur and fade, like moving through a doorway into new light. */
export default function PageTransition({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(10px)', scale: 1.015 }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, filter: 'blur(0px)', scale: 1 }}
      exit={reduce ? { opacity: 0 } : { opacity: 0, filter: 'blur(8px)', scale: 0.99 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      onAnimationComplete={(def) => {
        // Drop the filter once settled so position: sticky / fixed children behave normally
        if (typeof def === 'object' && def && 'filter' in def) {
          const el = document.getElementById('page-root')
          if (el) el.style.filter = ''
        }
      }}
      id="page-root"
    >
      {children}
    </motion.div>
  )
}
