import type { ReactNode } from 'react'
import { AnimatePresence, m, useReducedMotion } from 'motion/react'

/**
 * Cambio de nivel dentro de una pantalla de título (Materias, Teoría, un TP): el menú que se va sale hacia la
 * izquierda y se apaga; recién entonces entra el nuevo, con sus ítems escalonados (TitleMenu). Sin cortes.
 */
export function MenuStage({ stageKey, children }: { stageKey: string; children: ReactNode }) {
  const reduce = useReducedMotion()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <m.div
        key={stageKey}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0 }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, x: -16 }}
        // Salida corta (140 ms); la entrada del contenedor es casi inmediata y el ritmo lo dan los ítems escalonados.
        transition={{ duration: reduce ? 0.12 : 0.14, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </m.div>
    </AnimatePresence>
  )
}
