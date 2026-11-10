import { useEffect, useState } from 'react'
import { useIsFetching } from '@tanstack/react-query'
import { create } from 'zustand'

/** Cuántos fallbacks de Suspense hay montados (rutas cuyo chunk todavía carga). */
const useSuspended = create<{ n: number }>(() => ({ n: 0 }))

/** Fallback de Suspense: no pinta nada propio, solo enciende la línea de carga. */
export function SuspenseSignal() {
  useEffect(() => {
    useSuspended.setState((s) => ({ n: s.n + 1 }))
    return () => useSuspended.setState((s) => ({ n: s.n - 1 }))
  }, [])
  return null
}

/**
 * Línea de carga fina arriba de todo, como la barra de un juego. Aparece solo si la espera supera 150 ms:
 * lo que carga al instante no parpadea.
 */
export function RouteProgress() {
  const busy = useIsFetching() + useSuspended((s) => s.n) > 0
  const [shown, setShown] = useState(false)
  useEffect(() => {
    if (!busy) return setShown(false)
    const t = setTimeout(() => setShown(true), 150)
    return () => clearTimeout(t)
  }, [busy])
  return (
    <div
      role="progressbar"
      aria-label="Cargando"
      aria-hidden={!shown}
      aria-busy={shown}
      data-on={shown || undefined}
      className="route-progress pointer-events-none fixed inset-x-0 top-0 h-0.5 overflow-hidden"
      style={{ zIndex: 'var(--z-toast)' }}
    >
      <span className="route-progress-bar absolute inset-y-0 left-0 w-1/3 bg-accent" />
    </div>
  )
}
