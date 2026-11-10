import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from 'react'
import { Link } from 'react-router'
import { cx } from '../ui/primitives.tsx'
import { sfx } from './sound.ts'
import { prewarm, useGameNavigate } from './transition.tsx'

export interface MenuItem {
  id: string
  label: ReactNode
  /** Texto accesible cuando `label` no es solo texto. */
  ariaLabel?: string
  /** Texto secundario dentro del ítem (por ejemplo, el documento a continuar). */
  hint?: ReactNode
  /** Ícono o estado al final del ítem (por ejemplo, completado). */
  trailing?: ReactNode
  to?: string
  onSelect?: () => void
  /** Deja un respiro antes de este ítem (separa grupos sin líneas). */
  gapBefore?: boolean
}

/** Marca de selección propia: el trazo de la "S" de System OS. */
function SelectionMark() {
  return (
    <svg viewBox="0 0 32 32" aria-hidden className="size-[1.05em] shrink-0">
      <path
        className="mark-draw"
        pathLength={1}
        d="M9 21.5c2.2 1.6 4.4 2.3 6.8 2.3 3.4 0 5.6-1.7 5.6-4.3 0-5.6-11.6-3.4-11.6-9 0-2.5 2.2-4.3 5.5-4.3 2.1 0 4 .6 5.8 1.8"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="3.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

interface Props {
  label: string
  items: MenuItem[]
  activeId?: string
  onActiveChange?: (id: string) => void
  /** Esc, Retroceso o ← vuelven un nivel (submenús). */
  onBack?: () => void
  size?: 'lg' | 'md'
  autoFocus?: boolean
  className?: string
}

/**
 * Menú de pantalla de título: ↑↓ mueven, Enter activa, Inicio/Fin van a los extremos.
 * Una sola banda de luz se traslada con transform hasta el ítem activo; el ítem activo es también el enfocado.
 */
export function TitleMenu({ label, items, activeId, onActiveChange, onBack, size = 'lg', autoFocus = true, className }: Props) {
  const [internal, setInternal] = useState(items[0]?.id)
  const active = items.some((i) => i.id === activeId) ? activeId! : items.some((i) => i.id === internal) ? internal! : items[0]?.id
  const refs = useRef(new Map<string, HTMLElement>())
  const listRef = useRef<HTMLUListElement>(null)
  const [band, setBand] = useState<{ y: number; h: number } | null>(null)
  const [confirming, setConfirming] = useState(false)
  const go = useGameNavigate()

  // Enter o clic sobre un destino: la banda destella, suena y recién entonces cambia la escena.
  const enter = (to: string) => {
    sfx.confirm()
    setConfirming(true)
    void go(to, { minDelay: 160 }).finally(() => setConfirming(false))
  }

  const activate = useCallback(
    (id: string, focus: 'teclado' | 'mouse' | false, sound: boolean) => {
      if (id !== active && sound) sfx.move()
      setInternal(id)
      onActiveChange?.(id)
      // Con el mouse, el foco acompaña a la selección (Enter activa lo que se ve marcado) sin desplazar la lista.
      if (focus) refs.current.get(id)?.focus({ preventScroll: focus === 'mouse' })
      const to = items.find((i) => i.id === id)?.to
      if (to) void prewarm(to).catch(() => {})
    },
    [active, onActiveChange, items],
  )

  // La banda se mide contra el ítem real: sigue al texto aunque cambie el tamaño o la fuente.
  useLayoutEffect(() => {
    const measure = () => {
      const el = active ? refs.current.get(active) : undefined
      if (el) setBand({ y: el.offsetTop, h: el.offsetHeight })
    }
    measure()
    const ro = new ResizeObserver(measure)
    if (listRef.current) ro.observe(listRef.current)
    return () => ro.disconnect()
  }, [active, items])

  useEffect(() => {
    if (autoFocus && active) refs.current.get(active)?.focus({ preventScroll: true })
    // El destino marcado de entrada (por ejemplo, Continuar) ya queda precargado.
    const to = items.find((i) => i.id === active)?.to
    if (to) void prewarm(to).catch(() => {})
    // Solo al montar o al cambiar de nivel (items nuevos).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.id).join('|')])

  // Si el foco quedó en la página (por ejemplo, al cerrar un diálogo), las flechas igual manejan el menú.
  const keyRef = useRef<(e: KeyboardEvent | globalThis.KeyboardEvent) => void>(() => {})
  useEffect(() => {
    const onWindowKey = (e: globalThis.KeyboardEvent) => {
      if (e.defaultPrevented || (document.activeElement && document.activeElement !== document.body)) return
      if (!['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', 'Escape', 'Backspace', 'ArrowLeft'].includes(e.key)) return
      if (e.key === 'Enter') {
        e.preventDefault()
        if (active) refs.current.get(active)?.focus({ preventScroll: true })
        return
      }
      keyRef.current(e)
    }
    window.addEventListener('keydown', onWindowKey)
    return () => window.removeEventListener('keydown', onWindowKey)
  }, [active])

  const onKeyDown = (e: KeyboardEvent | globalThis.KeyboardEvent) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return
    const i = items.findIndex((it) => it.id === active)
    const go = (n: number) => {
      e.preventDefault()
      activate(items[(n + items.length) % items.length].id, 'teclado', true)
    }
    if (e.key === 'ArrowDown') go(i + 1)
    else if (e.key === 'ArrowUp') go(i - 1)
    else if (e.key === 'Home') go(0)
    else if (e.key === 'End') go(items.length - 1)
    else if (onBack && (e.key === 'Escape' || e.key === 'Backspace' || e.key === 'ArrowLeft')) {
      e.preventDefault()
      e.stopPropagation()
      sfx.back()
      onBack()
    }
  }
  keyRef.current = onKeyDown

  const itemClass = (isActive: boolean) =>
    cx(
      'relative flex w-full items-center justify-end gap-3 rounded-sm py-1.5 pl-10 pr-3 text-right outline-none transition-[color,translate,scale] duration-200 ease-[var(--ease-out)] active:scale-[0.98] pointer-coarse:min-h-11',
      size === 'lg' ? 'text-[clamp(1.25rem,2.1vw,1.625rem)] leading-tight' : 'text-lg leading-snug',
      isActive ? '-translate-x-1 text-ink' : 'text-ink-2 hover:text-ink',
    )

  return (
    <nav aria-label={label} className={className}>
      <ul ref={listRef} className="relative" onKeyDown={onKeyDown}>
        {band && (
          <span
            aria-hidden
            className={cx('menu-band pointer-events-none absolute inset-x-0 top-0', confirming && 'menu-band--confirm')}
            style={{ transform: `translateY(${band.y}px)`, height: band.h }}
          />
        )}
        {items.map((item, index) => {
          const isActive = item.id === active
          const content = (
            <>
              {isActive && <SelectionMark />}
              {item.hint && <span className="min-w-0 truncate text-sm text-ink-2">{item.hint}</span>}
              <span className="truncate">{item.label}</span>
              {item.trailing}
            </>
          )
          const common = {
            ref: (el: HTMLElement | null) => {
              if (el) refs.current.set(item.id, el)
              else refs.current.delete(item.id)
            },
            tabIndex: isActive ? 0 : -1,
            'aria-current': isActive ? ('true' as const) : undefined,
            'aria-label': item.ariaLabel,
            className: itemClass(isActive),
            onFocus: () => item.id !== active && activate(item.id, false, false),
            onMouseEnter: () => item.id !== active && activate(item.id, 'mouse', true),
          }
          return (
            <li key={item.id} className={cx('menu-item-in', item.gapBefore && 'mt-5')} style={{ animationDelay: `${Math.min(index, 10) * 30}ms` }}>
              {item.to ? (
                <Link
                  to={item.to}
                  {...common}
                  onClick={(e) => {
                    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
                    e.preventDefault()
                    enter(item.to!)
                  }}
                >
                  {content}
                </Link>
              ) : (
                <button
                  type="button"
                  {...common}
                  onClick={() => {
                    sfx.confirm()
                    item.onSelect?.()
                  }}
                >
                  {content}
                </button>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
