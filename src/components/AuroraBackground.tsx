import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

export default function AuroraBackground() {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  const layer1X = useTransform(springX, [-1, 1], [-24, 24])
  const layer1Y = useTransform(springY, [-1, 1], [-16, 16])
  const layer2X = useTransform(springX, [-1, 1], [20, -20])
  const layer2Y = useTransform(springY, [-1, 1], [16, -16])

  useEffect(() => {
    function handleMove(e: PointerEvent) {
      const nx = (e.clientX / window.innerWidth) * 2 - 1
      const ny = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(nx)
      mouseY.set(ny)
    }
    window.addEventListener('pointermove', handleMove)
    return () => window.removeEventListener('pointermove', handleMove)
  }, [mouseX, mouseY])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 100%)',
        }}
      />

      {/* Parallax layer (mouse driven) wraps an independently drifting blob (time driven), so the two transforms never fight on the same element. */}
      <motion.div className="absolute inset-0" style={{ x: layer1X, y: layer1Y }}>
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 700,
            height: 700,
            left: '10%',
            top: '-10%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ x: [0, 40, 0], y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <motion.div className="absolute inset-0" style={{ x: layer2X, y: layer2Y }}>
        <motion.div
          className="absolute rounded-full"
          style={{
            width: 600,
            height: 600,
            right: '5%',
            top: '5%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
          animate={{ x: [0, -30, 0], y: [0, 40, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.05)_0%,_transparent_60%)]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black to-transparent" />
    </div>
  )
}
