import { lazy, memo, Suspense } from 'react'
import { useEffectsMode } from './gpu.ts'

const GrainLayer = lazy(() => import('./GrainLayer.tsx'))

/**
 * Capa ambiental única y fija detrás de toda la app. Header, sidebar y contenido son translúcidos sobre ella,
 * por eso se leen como un mismo material. Se anima solo en la Home; detrás de la lectura queda quieta y atenuada.
 * Está memoizada y fuera de los componentes que se actualizan seguido (temporizador, editor).
 */
export const Ambient = memo(function Ambient({ live }: { live: boolean }) {
  const mode = useEffectsMode()
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0" style={{ zIndex: 'var(--z-ambient)' }}>
      {/* Base CSS: también es el fallback sin WebGL o con renderizado por software. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(60% 50% at 88% 6%, var(--ambient-glow), transparent 70%), radial-gradient(50% 45% at 4% 96%, var(--ambient-shade), transparent 70%), var(--color-bg)',
        }}
      />
      {mode !== 'css' && (
        <div className="absolute inset-0 transition-opacity duration-700 ease-out" style={{ opacity: live ? 0.75 : 0.35 }}>
          <Suspense fallback={null}>
            <GrainLayer animate={live && mode === 'animated'} />
          </Suspense>
        </div>
      )}
      {/* Integración con el fondo: el efecto se disuelve hacia abajo y en los bordes. */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(180deg, transparent 0%, rgb(var(--material-veil) / 0.35) 55%, rgb(var(--material-veil) / 0.85) 100%)' }}
      />
    </div>
  )
})
