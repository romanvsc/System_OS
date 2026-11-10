import { useUi } from '../lib/store.ts'

/**
 * Sonidos de menú sintetizados con Web Audio: sin archivos ni red.
 * El AudioContext se crea recién en la primera llamada (siempre dentro de un gesto del usuario) y solo si el sonido está activado.
 */
let ctx: AudioContext | null = null

function audio() {
  if (!useUi.getState().soundEnabled) return null
  try {
    ctx ??= new AudioContext()
    if (ctx.state === 'suspended') void ctx.resume()
    return ctx
  } catch {
    return null
  }
}

function tone(freq: number, start: number, duration: number, volume: number, type: OscillatorType = 'sine') {
  const c = audio()
  if (!c) return
  const t = c.currentTime + start
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, t)
  gain.gain.setValueAtTime(0, t)
  gain.gain.linearRampToValueAtTime(volume, t + 0.006)
  gain.gain.exponentialRampToValueAtTime(0.0001, t + duration)
  osc.connect(gain).connect(c.destination)
  osc.start(t)
  osc.stop(t + duration + 0.03)
}

export const sfx = {
  move: () => tone(1100, 0, 0.035, 0.03),
  confirm: () => {
    tone(660, 0, 0.09, 0.045)
    tone(990, 0.07, 0.16, 0.045)
  },
  back: () => tone(440, 0, 0.12, 0.04),
  intro: () => [220, 330, 440, 660].forEach((f, i) => tone(f, i * 0.09, 1.8, 0.022, 'triangle')),
}
