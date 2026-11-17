import { useEffect, useRef, useState, type ReactNode } from 'react'
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { Monogram } from './ui'

/** Golden dust drifting in the light, drawn on a canvas. Cheap: ~60 particles, paused when off-screen. */
export function Motes({ density = 60, className = '' }: { density?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = ref.current
    if (!canvas || reduce) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ps = Array.from({ length: density }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      z: 0.3 + Math.random() * 0.7,
      vx: (Math.random() - 0.3) * 0.15,
      vy: -0.05 - Math.random() * 0.18,
      p: Math.random() * Math.PI * 2,
    }))
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      for (const q of ps) {
        q.p += 0.012
        q.x += q.vx * q.z + Math.sin(q.p) * 0.12
        q.y += q.vy * q.z
        if (q.y < -10) {
          q.y = h + 10
          q.x = Math.random() * w
        }
        if (q.x > w + 10) q.x = -10
        if (q.x < -10) q.x = w + 10
        const a = (0.25 + 0.55 * Math.abs(Math.sin(q.p * 1.3))) * q.z
        const r = 0.6 + q.z * 1.6
        const g = ctx.createRadialGradient(q.x, q.y, 0, q.x, q.y, r * 4)
        g.addColorStop(0, `rgba(246, 222, 160, ${a})`)
        g.addColorStop(1, 'rgba(246, 222, 160, 0)')
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(q.x, q.y, r * 4, 0, Math.PI * 2)
        ctx.fill()
      }
      if (visible) raf = requestAnimationFrame(draw)
    }
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(draw)
    })
    io.observe(canvas)
    window.addEventListener('resize', resize)
    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener('resize', resize)
    }
  }, [density, reduce])

  return <canvas ref={ref} className={`pointer-events-none absolute inset-0 w-full h-full mix-blend-screen ${className}`} aria-hidden />
}

/** Slowly breathing shafts of light, like late sun through the cypresses. */
export function LightRays({ className = '' }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden mix-blend-screen ${className}`} aria-hidden>
      <div className="light-rays absolute -inset-[20%]" />
    </div>
  )
}

/** Normalised pointer position (-1..1), smoothed, for a gentle 2.5D parallax. Inert on touch and reduced motion. */
export function usePointer() {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 50, damping: 20 })
  const sy = useSpring(y, { stiffness: 50, damping: 20 })
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce || !window.matchMedia('(pointer: fine)').matches) return
    const onMove = (e: PointerEvent) => {
      x.set((e.clientX / window.innerWidth - 0.5) * 2)
      y.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [x, y, reduce])
  return { sx, sy }
}

/** 3D tilt with a moving gilded sheen. */
export function Tilt({ children, className = '', max = 6 }: { children: ReactNode; className?: string; max?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const srx = useSpring(rx, { stiffness: 200, damping: 20 })
  const sry = useSpring(ry, { stiffness: 200, damping: 20 })
  const sheen = useTransform(gx, (v) => `linear-gradient(105deg, transparent ${v - 25}%, rgba(246,222,160,0.16) ${v}%, transparent ${v + 25}%)`)
  const reduce = useReducedMotion()

  function onMove(e: React.PointerEvent) {
    if (reduce || e.pointerType !== 'mouse') return
    const r = ref.current!.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    ry.set((px - 0.5) * 2 * max)
    rx.set(-(py - 0.5) * 2 * max)
    gx.set(px * 100)
  }
  function onLeave() {
    rx.set(0)
    ry.set(0)
    gx.set(-40)
  }

  return (
    <div style={{ perspective: 1000 }} className={className}>
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className="relative h-full will-change-transform"
      >
        {children}
        <motion.div className="pointer-events-none absolute inset-0 z-10" style={{ backgroundImage: sheen }} aria-hidden />
      </motion.div>
    </div>
  )
}

/** First visit of the session: the gallery doors open. */
export function EntryVeil() {
  const [show, setShow] = useState(() => {
    try {
      return !window.sessionStorage.getItem('canon.entered')
    } catch {
      return false
    }
  })
  const reduce = useReducedMotion()

  useEffect(() => {
    if (!show) return
    try {
      window.sessionStorage.setItem('canon.entered', '1')
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setShow(false), reduce ? 200 : 1900)
    return () => window.clearTimeout(t)
  }, [show, reduce])

  return (
    <AnimatePresence>
      {show && (
        <motion.div className="fixed inset-0 z-[70] flex pointer-events-auto" onClick={() => setShow(false)} exit={{ opacity: 0 }} transition={{ duration: 0.4, delay: 1 }}>
          {[0, 1].map((side) => (
            <motion.div
              key={side}
              className="relative flex-1 bg-ink border-gold/30"
              style={{ borderRightWidth: side === 0 ? 1 : 0, borderLeftWidth: side === 1 ? 1 : 0 }}
              exit={{ x: side === 0 ? '-100%' : '100%' }}
              transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
            >
              <div className="absolute inset-6 md:inset-10 border border-gold/15" />
            </motion.div>
          ))}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.04 }}
            transition={{ duration: 0.8 }}
          >
            <Monogram size={54} />
            <p className="caps text-parchment text-lg md:text-xl tracking-[0.5em] mt-6 pl-[0.5em]">The Canon</p>
            <motion.span
              className="block h-px bg-gold mt-5"
              initial={{ width: 0 }}
              animate={{ width: 160 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            />
            <p className="display italic text-parchment/60 mt-4">Ideas that moved billions</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** Laurel wreath, used for medals and earned honours. Two branches follow a circle and meet under a small tie. */
export function Laurel({ size = 64, tone = 'gold', className = '' }: { size?: number; tone?: 'gold' | 'silver' | 'bronze'; className?: string }) {
  const color = tone === 'gold' ? '#e6cc8f' : tone === 'silver' ? '#d6d1c4' : '#c48e5c'
  const cx = 32
  const cy = 33
  const r = 21
  const rad = (d: number) => (d * Math.PI) / 180
  // left branch runs from the bottom (100deg) up to the top-left (245deg); y grows downward
  const angles = Array.from({ length: 9 }, (_, i) => 104 + i * 17)
  const arc = (a0: number, a1: number) =>
    `M${cx + r * Math.cos(rad(a0))},${cy + r * Math.sin(rad(a0))} A${r},${r} 0 0 1 ${cx + r * Math.cos(rad(a1))},${cy + r * Math.sin(rad(a1))}`
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" className={className} aria-hidden>
      {[1, -1].map((m) => (
        <g key={m} transform={m === -1 ? 'translate(64 0) scale(-1 1)' : undefined}>
          <path d={arc(100, 250)} stroke={color} strokeWidth="1.3" fill="none" strokeLinecap="round" />
          {angles.map((a, i) => {
            const x = cx + r * Math.cos(rad(a))
            const y = cy + r * Math.sin(rad(a))
            const tangent = a + 90 // direction of travel along the arc
            const sz = 1 - i * 0.045
            return (
              <g key={i}>
                <ellipse cx={x} cy={y} rx={2.1 * sz} ry={5.2 * sz} fill={color} transform={`rotate(${tangent + 35} ${x} ${y}) translate(0 -4)`} />
                <ellipse cx={x} cy={y} rx={2.1 * sz} ry={5.2 * sz} fill={color} opacity="0.8" transform={`rotate(${tangent - 35 + 180} ${x} ${y}) translate(0 -4)`} />
              </g>
            )
          })}
        </g>
      ))}
      <path d={`M${cx - 4},${cy + r + 1} Q${cx},${cy + r - 3} ${cx + 4},${cy + r + 1}`} stroke={color} strokeWidth="1.6" fill="none" />
      <circle cx={cx} cy={cy + r - 1} r="1.8" fill={color} />
    </svg>
  )
}
