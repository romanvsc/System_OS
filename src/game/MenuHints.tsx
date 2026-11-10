import { Fragment, type ReactNode } from 'react'
import { ArrowDown, ArrowUp, CornerDownLeft } from 'lucide-react'
import { Kbd } from '../ui/primitives.tsx'

export interface Hint {
  keys: ReactNode[]
  label: string
}

export const HINT_KEYS = {
  move: [<ArrowUp key="u" size={11} aria-label="Arriba" />, <ArrowDown key="d" size={11} aria-label="Abajo" />],
  enter: [<CornerDownLeft key="e" size={11} aria-label="Enter" />],
}

/** Ayudas de teclas al pie de las pantallas de título. En pantallas táctiles no aplican y se ocultan. */
export function MenuHints({ hints }: { hints: Hint[] }) {
  return (
    <div className="scene-exit menu-hints pointer-events-none flex flex-wrap items-center justify-end gap-x-6 gap-y-2 pt-4 text-sm text-ink-2 pointer-coarse:hidden">
      {hints.map((h) => (
        <span key={h.label} className="flex items-center gap-2">
          <span className="flex gap-1">
            {h.keys.map((k, i) => (
              <Fragment key={i}>
                <Kbd>{k}</Kbd>
              </Fragment>
            ))}
          </span>
          {h.label}
        </span>
      ))}
    </div>
  )
}
