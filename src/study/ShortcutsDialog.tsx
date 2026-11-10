import { Fragment } from 'react'
import { SHORTCUTS } from '../app/shortcuts.ts'
import { useUi } from '../lib/store.ts'
import { Kbd } from '../ui/primitives.tsx'
import { Modal } from '../ui/Modal.tsx'

export function ShortcutsDialog() {
  const open = useUi((s) => s.shortcutsOpen)
  const setOpen = useUi((s) => s.setShortcuts)
  return (
    <Modal open={open} onOpenChange={setOpen} title="Atajos de teclado" description="Funcionan en toda la app; los de una sola tecla se ignoran mientras escribís.">
      <dl className="divide-y divide-line">
        {SHORTCUTS.map((s) => (
          <div key={s.label} className="flex items-center justify-between gap-4 py-2.5">
            <dt className="text-sm text-ink-2">{s.label}</dt>
            <dd className="flex shrink-0 items-center gap-1">
              {s.keys.map((k, i) => (
                <Fragment key={k}>
                  {i > 0 && <span className="text-2xs text-ink-3">+</span>}
                  <Kbd>{k}</Kbd>
                </Fragment>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      <p className="mt-4 text-xs leading-relaxed text-ink-3">
        Chrome y Edge reservan Ctrl Shift N para la ventana de incógnito y no dejan que una página lo use; por eso el atajo principal de nuevo apunte es Alt N.
      </p>
    </Modal>
  )
}
