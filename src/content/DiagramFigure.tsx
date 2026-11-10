import { useRef, useState, type PointerEvent, type WheelEvent } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { ExternalLink, Maximize2, Minus, Plus, RotateCcw, SunMoon, X } from 'lucide-react'
import { fileUrl } from '../lib/api.ts'
import { useUi } from '../lib/store.ts'
import { IconButton, cx } from '../ui/primitives.tsx'

// Los diagramas originales son de fondo blanco: invertir luminancia y rotar el tono conserva los colores y no encandila.
const DARK_FILTER = 'invert(1) hue-rotate(180deg) contrast(0.88)'
// Color en que queda el blanco con ese filtro: el marco usa el mismo para que no se note el borde de la imagen.
const DARK_PAPER = 'var(--color-paper-dark)'

const pick = (assets: string[]) => assets.find((a) => /\.svg$/i.test(a)) ?? assets.find((a) => /\.(png|jpe?g|webp|gif)$/i.test(a))

function DiagramViewer({ src, alt, filter, open, onOpenChange }: { src: string; alt: string; filter?: string; open: boolean; onOpenChange: (o: boolean) => void }) {
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 })
  const drag = useRef<{ x: number; y: number } | null>(null)
  // Pellizcar para hacer zoom: dos punteros activos escalan según la distancia entre ellos.
  const pointers = useRef(new Map<number, { x: number; y: number }>())
  const pinch = useRef<{ dist: number; scale: number } | null>(null)
  const clampScale = (s: number) => Math.min(6, Math.max(0.5, s))
  const zoom = (factor: number) => setView((v) => ({ ...v, scale: clampScale(v.scale * factor) }))
  const reset = () => setView({ scale: 1, x: 0, y: 0 })
  const distance = () => {
    const [a, b] = [...pointers.current.values()]
    return Math.hypot(a.x - b.x, a.y - b.y) || 1
  }

  const onWheel = (e: WheelEvent) => zoom(e.deltaY < 0 ? 1.12 : 1 / 1.12)
  const onDown = (e: PointerEvent) => {
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    if (pointers.current.size === 2) {
      pinch.current = { dist: distance(), scale: view.scale }
      drag.current = null
    } else if (pointers.current.size === 1) drag.current = { x: e.clientX - view.x, y: e.clientY - view.y }
  }
  const onMove = (e: PointerEvent) => {
    if (!pointers.current.has(e.pointerId)) return
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
    const p = pinch.current
    if (p && pointers.current.size === 2) setView((v) => ({ ...v, scale: clampScale((p.scale * distance()) / p.dist) }))
    else if (drag.current) setView((v) => ({ ...v, x: e.clientX - drag.current!.x, y: e.clientY - drag.current!.y }))
  }
  const onEnd = (e: PointerEvent) => {
    pointers.current.delete(e.pointerId)
    if (pointers.current.size < 2) pinch.current = null
    drag.current = null
  }

  return (
    <Dialog.Root open={open} onOpenChange={(o) => (onOpenChange(o), o || reset())}>
      <Dialog.Portal>
        <Dialog.Overlay className="anim-overlay fixed inset-0" style={{ zIndex: 'var(--z-overlay)', background: filter ? DARK_PAPER : 'rgb(var(--material-veil) / 0.96)' }} />
        <Dialog.Content
          aria-describedby={undefined}
          className="anim-overlay fixed inset-0 flex flex-col"
          style={{ zIndex: 'var(--z-overlay)' }}
          onKeyDown={(e) => {
            if (e.key === '+' || e.key === '=') zoom(1.2)
            if (e.key === '-') zoom(1 / 1.2)
            if (e.key === '0') reset()
          }}
        >
          <div className="flex items-center gap-1 border-b border-line px-3 py-2">
            <Dialog.Title className="min-w-0 flex-1 truncate px-2 text-sm text-ink-2">{alt}</Dialog.Title>
            <IconButton label="Alejar" tip="Alejar (−)" onClick={() => zoom(1 / 1.2)}>
              <Minus size={16} aria-hidden />
            </IconButton>
            <span className="w-12 text-center font-mono text-xs tabular-nums text-ink-2">{Math.round(view.scale * 100)}%</span>
            <IconButton label="Acercar" tip="Acercar (+)" onClick={() => zoom(1.2)}>
              <Plus size={16} aria-hidden />
            </IconButton>
            <IconButton label="Restablecer" tip="Restablecer (0)" onClick={reset}>
              <RotateCcw size={15} aria-hidden />
            </IconButton>
            <Dialog.Close asChild>
              <IconButton label="Cerrar" tip="Cerrar (Esc)">
                <X size={17} aria-hidden />
              </IconButton>
            </Dialog.Close>
          </div>
          <div
            className="relative flex-1 cursor-grab touch-none overflow-hidden active:cursor-grabbing"
            onWheel={onWheel}
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onEnd}
            onPointerCancel={onEnd}
            onLostPointerCapture={onEnd}
          >
            <img
              src={src}
              alt={alt}
              draggable={false}
              className="absolute inset-0 m-auto max-h-[calc(100%-2rem)] max-w-[calc(100%-2rem)] select-none will-change-transform"
              style={{ transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`, filter }}
            />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

/** Diagrama de flujo de un documento: vista integrada, versión oscura u original, ampliación con zoom y apertura del archivo. */
export function DiagramFigure({ subject, assets, title }: { subject: string; assets: string[]; title: string }) {
  const dark = useUi((s) => s.diagramDark)
  const toggleDark = useUi((s) => s.toggleDiagramDark)
  const [open, setOpen] = useState(false)
  const main = pick(assets)
  if (!main) return null
  const src = fileUrl(subject, main)
  const filter = dark ? DARK_FILTER : undefined
  const alt = `Diagrama: ${title}`

  return (
    <figure className="wide not-prose my-10">
      <div className={cx('group relative overflow-hidden rounded-[var(--radius-card)] border border-line transition-colors duration-300', dark ? 'bg-paper-dark' : 'bg-white')}>
        <button type="button" onClick={() => setOpen(true)} className="block w-full cursor-zoom-in p-3 sm:p-5" aria-label={`Ampliar ${alt.toLowerCase()}`}>
          <img src={src} alt={alt} loading="lazy" decoding="async" className="mx-auto max-h-[75vh] w-auto max-w-full" style={{ filter }} />
        </button>
        <div className="absolute right-2 top-2 flex gap-1 rounded-lg border border-line bg-surface/85 p-1 opacity-100 transition-opacity duration-200 sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          <IconButton label={dark ? 'Ver colores originales' : 'Adaptar al modo oscuro'} onClick={toggleDark} className="size-8" active={!dark}>
            <SunMoon size={15} aria-hidden />
          </IconButton>
          <IconButton label="Ampliar" onClick={() => setOpen(true)} className="size-8">
            <Maximize2 size={15} aria-hidden />
          </IconButton>
        </div>
      </div>
      <figcaption className="mt-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 text-xs text-ink-3">
        <span>Diagrama de flujo{dark ? ' · adaptado al modo oscuro' : ''}</span>
        <span className="flex gap-3">
          {assets.map((a) => (
            <a key={a} href={fileUrl(subject, a)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-ink-2 hover:text-ink">
              {a.split('.').pop()!.toUpperCase()} <ExternalLink size={11} aria-hidden />
            </a>
          ))}
        </span>
      </figcaption>
      <DiagramViewer src={src} alt={alt} filter={filter} open={open} onOpenChange={setOpen} />
    </figure>
  )
}
