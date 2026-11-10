import type { ReactNode } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

/** Diálogo modal accesible (foco atrapado, Esc cierra, foco vuelve al disparador). */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="anim-overlay fixed inset-0 bg-black/50" style={{ zIndex: 'var(--z-overlay)' }} />
        <Dialog.Content
          className="anim-pop glass-float fixed inset-x-0 top-[10vh] mx-auto max-h-[80vh] w-[calc(100vw-2rem)] max-w-lg overflow-y-auto rounded-[var(--radius-panel)] p-6"
          style={{ zIndex: 'var(--z-overlay)' }}
          {...(description ? {} : { 'aria-describedby': undefined })}
        >
          <div className="mb-5 flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-lg font-semibold tracking-tight text-ink">{title}</Dialog.Title>
              {description && <Dialog.Description className="mt-1 text-sm text-ink-2">{description}</Dialog.Description>}
            </div>
            <Dialog.Close className="pressable -m-1 inline-flex size-8 items-center justify-center rounded-md text-ink-3 hover:bg-surface-2 hover:text-ink" aria-label="Cerrar">
              <X size={16} aria-hidden />
            </Dialog.Close>
          </div>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
