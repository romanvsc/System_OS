import { useSyncExternalStore } from 'react'
import { useUi } from '../lib/store.ts'

type WebGlSupport = 'gpu' | 'software' | 'none'
let support: WebGlSupport | null = null

/**
 * Detecta si WebGL2 corre en una GPU real. Con renderizado por software (SwiftShader, llvmpipe,
 * Microsoft Basic Render) un shader a pantalla completa consume la CPU: ahí se usa el fondo CSS.
 * Ver Cerebro_Roman/Errores/webgl-strictmode-y-sin-gpu.md.
 */
export function webglSupport(): WebGlSupport {
  if (support) return support
  try {
    const gl = document.createElement('canvas').getContext('webgl2')
    if (!gl) return (support = 'none')
    const info = gl.getExtension('WEBGL_debug_renderer_info')
    const renderer = String(gl.getParameter(info ? info.UNMASKED_RENDERER_WEBGL : gl.RENDERER))
    support = /swiftshader|llvmpipe|software|basic render/i.test(renderer) ? 'software' : 'gpu'
    // Este canvas de prueba es descartable: liberar su contexto no afecta a los fondos reales.
    gl.getExtension('WEBGL_lose_context')?.loseContext()
  } catch {
    support = 'none'
  }
  return support
}

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (cb) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', cb)
      return () => mql.removeEventListener('change', cb)
    },
    () => window.matchMedia(query).matches,
  )
}

/** animated: shader en movimiento · still: un único cuadro del shader · css: degradado estático, sin WebGL. */
export type EffectsMode = 'animated' | 'still' | 'css'

export function useEffectsMode(): EffectsMode {
  const setting = useUi((s) => s.effects)
  const reducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  const modestDevice = useMediaQuery('(pointer: coarse) and (max-width: 767px)')
  if (setting === 'apagado' || modestDevice || webglSupport() !== 'gpu') return 'css'
  if (setting === 'reducido' || reducedMotion) return 'still'
  return 'animated'
}
