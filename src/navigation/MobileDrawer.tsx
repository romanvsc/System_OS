import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import type { SubjectContext } from '../layouts/SubjectLayout.tsx'
import { useUi } from '../lib/store.ts'
import { useMediaQuery } from '../effects/gpu.ts'
import { SidebarPanel } from './Sidebar.tsx'

/** En móvil la navegación es un drawer accesible: foco atrapado, Esc o tocar afuera lo cierran. */
export function MobileDrawer(props: SubjectContext) {
  const open = useUi((s) => s.drawerOpen)
  const setOpen = useUi((s) => s.setDrawer)
  const mobile = useMediaQuery('(max-width: 767px)')
  return (
    <Dialog.Root open={open && mobile} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="anim-overlay fixed inset-0 bg-black/55" style={{ zIndex: 'var(--z-overlay)' }} />
        <Dialog.Content
          aria-describedby={undefined}
          className="anim-drawer fixed inset-y-0 left-0 flex w-[min(88vw,20rem)] flex-col border-r border-line bg-surface shadow-[var(--shadow-float)]"
          style={{ zIndex: 'var(--z-overlay)' }}
        >
          <Dialog.Title className="sr-only">Navegación de {props.subject.meta.nombre}</Dialog.Title>
          <Dialog.Close
            aria-label="Cerrar navegación"
            className="pressable absolute right-2 top-3 inline-flex size-10 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2"
          >
            <X size={18} aria-hidden />
          </Dialog.Close>
          <SidebarPanel {...props} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
