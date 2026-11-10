import { forwardRef, useCallback, type ComponentProps, type MouseEvent } from 'react'
import { Link, useNavigate } from 'react-router'
import { loaders } from '../app/loaders.ts'
import { markdownQuery, queryClient } from '../lib/api.ts'

const PRELOAD_CAP_MS = 400
/** Salida de la escena actual (menú, ayudas, contenido) antes del cambio: lo que se va se nota. */
const EXIT_MS = 280

/** Carga por adelantado lo que necesita el destino (chunk y documento), así el salto no muestra un cuadro vacío. */
export function prewarm(to: string): Promise<unknown> {
  const parts = to.split('/').filter(Boolean)
  if (parts[0] !== 'm' || !parts[1]) return parts[0] === 'apuntes' ? loaders.notes() : Promise.resolve()
  const subject = decodeURIComponent(parts[1])
  if (parts[2] === 'd') {
    const path = parts.slice(3).map(decodeURIComponent).join('/')
    return Promise.all([loaders.doc(), /\.md$/i.test(path) ? queryClient.prefetchQuery(markdownQuery(subject, path)) : null])
  }
  return parts[2] === 'apuntes' ? loaders.notes() : loaders.overview()
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Navegación de "escena": precarga con tope de tiempo y después cambia de ruta dentro de una view transition,
 * para que la ilustración, el nombre de la materia y el resto se fundan entre pantallas.
 * Sin soporte del navegador o con movimiento reducido, navega directo.
 */
export function useGameNavigate() {
  const navigate = useNavigate()
  return useCallback(
    async (to: string, { minDelay = 0, exit = true }: { minDelay?: number; exit?: boolean } = {}) => {
      const scene = reducedMotion() || !document.startViewTransition ? false : exit
      const root = document.documentElement
      if (scene) root.dataset.scene = 'saliendo'
      await Promise.all([
        Promise.race([prewarm(to).catch(() => {}), new Promise((r) => setTimeout(r, PRELOAD_CAP_MS))]),
        new Promise((r) => setTimeout(r, Math.max(minDelay, scene ? EXIT_MS : 0))),
      ])
      if (!document.startViewTransition || reducedMotion()) {
        delete root.dataset.scene
        return navigate(to)
      }
      const t = document.startViewTransition(async () => {
        navigate(to)
        // La escena nueva entra visible; la vieja ya quedó capturada en su estado de salida.
        delete root.dataset.scene
        // Se espera a que React confirme la ruta nueva antes de capturarla.
        await new Promise((r) => setTimeout(r, 32))
      })
      t.finished.finally(() => delete root.dataset.scene)
    },
    [navigate],
  )
}

/** Link que salta con transición de escena. Con Ctrl/Shift/clic medio se comporta como un link normal. */
export const GameLink = forwardRef<HTMLAnchorElement, ComponentProps<typeof Link> & { to: string; exit?: boolean }>(function GameLink({ to, onClick, exit, ...rest }, ref) {
  const go = useGameNavigate()
  return (
    <Link
      ref={ref}
      to={to}
      {...rest}
      onPointerEnter={() => void prewarm(to).catch(() => {})}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        void go(to, { exit })
      }}
    />
  )
})
