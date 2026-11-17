import { createStore, useStore } from './store'

/**
 * Procedural audio, no asset files: a garden ambience (wind through cypresses, a distant fountain,
 * an occasional far-off bell) and small UI sounds for the examination. Everything is synthesized
 * with Web Audio and only starts after a user gesture.
 */

export const soundStore = createStore<{ ambience: boolean; effects: boolean }>('canon.sound.v1', {
  ambience: false,
  effects: true,
})

let ctx: AudioContext | null = null
let master: GainNode | null = null
let ambienceNodes: { stop: () => void } | null = null

function audio(): AudioContext | null {
  if (typeof window === 'undefined') return null
  if (!ctx) {
    const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
    if (!AC) return null
    ctx = new AC()
    master = ctx.createGain()
    master.gain.value = 0.9
    master.connect(ctx.destination)
  }
  if (ctx.state === 'suspended') void ctx.resume()
  return ctx
}

function noiseBuffer(c: AudioContext, seconds = 4, brown = true) {
  const buf = c.createBuffer(1, c.sampleRate * seconds, c.sampleRate)
  const d = buf.getChannelData(0)
  let last = 0
  for (let i = 0; i < d.length; i++) {
    const white = Math.random() * 2 - 1
    if (brown) {
      last = (last + 0.02 * white) / 1.02
      d[i] = last * 3.5
    } else d[i] = white
  }
  return buf
}

function bell(c: AudioContext, out: AudioNode, freq: number, when: number, gain = 0.05, decay = 5) {
  ;[1, 2.76, 5.4].forEach((ratio, k) => {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.value = freq * ratio
    g.gain.setValueAtTime(0, when)
    g.gain.linearRampToValueAtTime(gain / (k + 1), when + 0.01)
    g.gain.exponentialRampToValueAtTime(0.0001, when + decay / (k + 1))
    o.connect(g).connect(out)
    o.start(when)
    o.stop(when + decay)
  })
}

function startAmbience() {
  const c = audio()
  if (!c || !master || ambienceNodes) return
  const bus = c.createGain()
  bus.gain.setValueAtTime(0, c.currentTime)
  bus.gain.linearRampToValueAtTime(1, c.currentTime + 3)
  bus.connect(master)

  // Wind: brown noise through a slowly sweeping low-pass filter
  const wind = c.createBufferSource()
  wind.buffer = noiseBuffer(c, 6, true)
  wind.loop = true
  const windFilter = c.createBiquadFilter()
  windFilter.type = 'lowpass'
  windFilter.frequency.value = 500
  windFilter.Q.value = 0.7
  const windGain = c.createGain()
  windGain.gain.value = 0.22
  const lfo = c.createOscillator()
  const lfoGain = c.createGain()
  lfo.frequency.value = 0.07
  lfoGain.gain.value = 260
  lfo.connect(lfoGain).connect(windFilter.frequency)
  wind.connect(windFilter).connect(windGain).connect(bus)

  // Fountain: white noise in a high band, gently modulated
  const water = c.createBufferSource()
  water.buffer = noiseBuffer(c, 3, false)
  water.loop = true
  const waterFilter = c.createBiquadFilter()
  waterFilter.type = 'bandpass'
  waterFilter.frequency.value = 2600
  waterFilter.Q.value = 0.6
  const waterGain = c.createGain()
  waterGain.gain.value = 0.018
  const waterLfo = c.createOscillator()
  const waterLfoGain = c.createGain()
  waterLfo.frequency.value = 0.31
  waterLfoGain.gain.value = 0.008
  waterLfo.connect(waterLfoGain).connect(waterGain.gain)
  water.connect(waterFilter).connect(waterGain).connect(bus)

  wind.start()
  water.start()
  lfo.start()
  waterLfo.start()

  // A far-off bell every 18 to 40 seconds
  const reverb = c.createDelay()
  reverb.delayTime.value = 0.23
  const fb = c.createGain()
  fb.gain.value = 0.35
  reverb.connect(fb).connect(reverb)
  reverb.connect(bus)
  let timer = 0
  const scale = [196, 220, 261.63, 293.66, 329.63]
  const ring = () => {
    bell(c, reverb, scale[Math.floor(Math.random() * scale.length)], c.currentTime + 0.05, 0.035, 7)
    timer = window.setTimeout(ring, 18000 + Math.random() * 22000)
  }
  timer = window.setTimeout(ring, 5000)

  ambienceNodes = {
    stop() {
      window.clearTimeout(timer)
      const t = c.currentTime
      bus.gain.cancelScheduledValues(t)
      bus.gain.setValueAtTime(bus.gain.value, t)
      bus.gain.linearRampToValueAtTime(0, t + 1.2)
      window.setTimeout(() => {
        ;[wind, water, lfo, waterLfo].forEach((n) => n.stop())
        bus.disconnect()
      }, 1300)
    },
  }
}

function stopAmbience() {
  ambienceNodes?.stop()
  ambienceNodes = null
}

export function setAmbience(on: boolean) {
  soundStore.set((s) => ({ ...s, ambience: on }))
  if (on) startAmbience()
  else stopAmbience()
}

export function setEffects(on: boolean) {
  soundStore.set((s) => ({ ...s, effects: on }))
}

type Sfx = 'correct' | 'wrong' | 'tick' | 'step' | 'triumph'

export function sfx(kind: Sfx) {
  if (!soundStore.get().effects) return
  const c = audio()
  if (!c || !master) return
  const t = c.currentTime + 0.01
  const out = c.createGain()
  out.gain.value = 0.9
  out.connect(master)
  if (kind === 'correct') {
    bell(c, out, 523.25, t, 0.09, 1.6)
    bell(c, out, 783.99, t + 0.09, 0.07, 1.8)
  } else if (kind === 'wrong') {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'triangle'
    o.frequency.setValueAtTime(150, t)
    o.frequency.exponentialRampToValueAtTime(70, t + 0.35)
    g.gain.setValueAtTime(0.18, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.4)
    o.connect(g).connect(out)
    o.start(t)
    o.stop(t + 0.45)
  } else if (kind === 'tick' || kind === 'step') {
    const o = c.createOscillator()
    const g = c.createGain()
    o.type = 'sine'
    o.frequency.value = kind === 'tick' ? 1400 : 880
    g.gain.setValueAtTime(kind === 'tick' ? 0.025 : 0.04, t)
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.12)
    o.connect(g).connect(out)
    o.start(t)
    o.stop(t + 0.15)
  } else if (kind === 'triumph') {
    ;[392, 523.25, 659.25, 783.99].forEach((f, i) => bell(c, out, f, t + i * 0.13, 0.07, 2.4))
  }
}

export function useSound() {
  return useStore(soundStore)
}

/** Ambience preference persists, but audio may only start after a gesture: resume on first interaction. */
export function resumeAmbienceOnGesture() {
  if (!soundStore.get().ambience) return
  const go = () => {
    startAmbience()
    window.removeEventListener('pointerdown', go)
    window.removeEventListener('keydown', go)
  }
  window.addEventListener('pointerdown', go, { once: true })
  window.addEventListener('keydown', go, { once: true })
}
