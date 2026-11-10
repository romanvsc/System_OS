import { useEffect, useRef, useState } from 'react'
import { GrainGradient } from '@paper-design/shaders-react'
import type { PaperShaderElement } from '@paper-design/shaders'
import { token } from './palette.ts'

const FPS = 30
const SPEED = 0.35 // ms de animación por ms real: movimiento lento, casi imperceptible

/**
 * Grain Gradient (Paper Shaders, Apache-2.0; referencia: Craftwork "Grain Gradient").
 * El shader no corre su propio bucle (speed=0): lo avanzamos nosotros a 30 fps y solo cuando `animate` es true.
 */
export default function GrainLayer({ animate }: { animate: boolean }) {
  const ref = useRef<PaperShaderElement>(null)
  const [lost, setLost] = useState(false)

  useEffect(() => {
    if (!animate) return
    let raf = 0
    let lastDraw = performance.now()
    let frame = ref.current?.paperShaderMount?.getCurrentFrame() ?? 0
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick)
      if (now - lastDraw < 1000 / FPS - 1) return
      frame += Math.min(now - lastDraw, 100) * SPEED
      lastDraw = now
      ref.current?.paperShaderMount?.setFrame(frame)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [animate])

  // Si el navegador descarta el contexto WebGL, se oculta el canvas y queda visible el fondo CSS de abajo.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onLost = () => setLost(true)
    el.addEventListener('webglcontextlost', onLost, true)
    return () => el.removeEventListener('webglcontextlost', onLost, true)
  }, [])

  if (lost) return null
  return (
    <GrainGradient
      ref={ref}
      speed={0}
      frame={12_000}
      colorBack={token('--color-bg', '#0b0d12')}
      colors={[token('--color-grain-1', '#1a1e27'), token('--color-grain-2', '#4a230b'), token('--color-grain-3', '#11141b')]}
      shape="corners"
      softness={1}
      intensity={0.18}
      noise={0.16}
      minPixelRatio={1}
      maxPixelCount={1_600_000}
      style={{ position: 'absolute', inset: 0 }}
    />
  )
}
