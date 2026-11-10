import { useState } from 'react'
import { Check, Circle } from 'lucide-react'
import { progressKey } from '../../shared/docs.ts'
import { useSetProgress, useWorkspace } from '../lib/api.ts'
import { cx } from '../ui/primitives.tsx'

/** Marca un documento como completado. El estado sale del archivo de datos, nunca de valores simulados. */
export function ProgressToggle({ subject, path, compact }: { subject: string; path: string; compact?: boolean }) {
  const workspace = useWorkspace()
  const mutation = useSetProgress()
  const key = progressKey(subject, path)
  const done = !!workspace.data?.progress[key]
  // Mientras se guarda, se muestra el estado pedido (respuesta inmediata); si falla, vuelve al real.
  const shown = mutation.isPending ? mutation.variables.done : done
  // El pulso solo acompaña la acción del usuario, no el estado ya guardado al abrir el documento.
  const [popped, setPopped] = useState(0)

  return (
    <button
      type="button"
      aria-pressed={shown}
      disabled={!workspace.data}
      onClick={() => {
        if (!shown) setPopped((n) => n + 1)
        mutation.mutate({ key, done: !shown })
      }}
      className={cx(
        'pressable inline-flex items-center gap-2 rounded-full border font-medium',
        compact ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm',
        shown && popped > 0 && 'check-pop',
        shown ? 'border-done/40 bg-done-soft text-done' : 'border-line-strong text-ink-2 hover:border-ink-3 hover:text-ink',
      )}
    >
      {shown ? <Check key={popped} size={compact ? 13 : 15} aria-hidden /> : <Circle size={compact ? 13 : 15} aria-hidden />}
      {shown ? 'Completado' : 'Marcar como completado'}
      {mutation.isError && <span className="sr-only">No se pudo guardar.</span>}
    </button>
  )
}
