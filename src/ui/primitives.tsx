import { forwardRef, useEffect, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import * as Tooltip from '@radix-ui/react-tooltip'
import { RotateCcw } from 'lucide-react'

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(' ')
export { cx }

/** Tooltip accesible. El hijo debe ser un elemento enfocable. */
export function Tip({ label, side = 'bottom', children }: { label: ReactNode; side?: 'top' | 'right' | 'bottom' | 'left'; children: ReactNode }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side={side}
          sideOffset={8}
          className="anim-pop glass-float z-[var(--z-toast)] rounded-md px-2.5 py-1.5 text-xs text-ink"
        >
          {label}
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  )
}

type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tip?: ReactNode; active?: boolean }

/** Botón de ícono con nombre accesible y tooltip. */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  { label, tip, active, className, children, ...rest },
  ref,
) {
  const button = (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      className={cx(
        'pressable tap inline-flex size-9 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2/70 hover:text-ink',
        active && 'bg-surface-2/70 text-ink',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
  return <Tip label={tip ?? label}>{button}</Tip>
})

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded border border-line-strong bg-surface-2/60 px-1.5 font-mono text-2xs text-ink-2">
      {children}
    </kbd>
  )
}

/** Anillo de progreso real. El trazo se anima con stroke-dashoffset (barato: solo repinta el SVG). */
export function ProgressRing({ ratio, size = 40, stroke = 3, label }: { ratio: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  const done = ratio >= 1
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={label ?? `${Math.round(ratio * 100)} % completado`} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-line-strong)" strokeWidth={stroke} />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={done ? 'var(--color-done)' : 'var(--color-accent)'}
        strokeWidth={stroke}
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={c * (1 - Math.min(1, Math.max(0, ratio)))}
        style={{ transition: 'stroke-dashoffset 600ms var(--ease-out), stroke 300ms' }}
      />
    </svg>
  )
}

/** Barra de progreso fina; la animación usa transform (scaleX), no width. */
export function ProgressBar({ ratio }: { ratio: number }) {
  const done = ratio >= 1
  return (
    <div className="h-1 w-full overflow-hidden rounded-full bg-line" aria-hidden>
      <div
        className={cx('h-full origin-left rounded-full', done ? 'bg-done' : 'bg-accent')}
        style={{ transform: `scaleX(${Math.min(1, Math.max(0, ratio))})`, transition: 'transform 600ms var(--ease-out)' }}
      />
    </div>
  )
}

/** Skeleton solo si la espera real supera 150 ms: las cargas instantáneas no parpadean. */
export function DelayedSkeleton({ lines = 6 }: { lines?: number }) {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 150)
    return () => clearTimeout(t)
  }, [])
  if (!show) return null
  return (
    <div className="fade-enter space-y-4" aria-busy="true" aria-label="Cargando">
      <div className="skeleton h-9 w-2/3" />
      {Array.from({ length: lines }, (_, i) => (
        <div key={i} className="skeleton h-4" style={{ width: `${70 + ((i * 37) % 30)}%` }} />
      ))}
    </div>
  )
}

export function ErrorState({ title, message, onRetry }: { title: string; message?: string; onRetry?: () => void }) {
  return (
    <div role="alert" className="mx-auto max-w-md py-16 text-center">
      <p className="text-lg font-medium text-ink">{title}</p>
      {message && <p className="mt-2 text-sm text-ink-2">{message}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="pressable mt-6 inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-1.5 text-sm text-ink hover:bg-surface-2"
        >
          <RotateCcw size={14} aria-hidden /> Reintentar
        </button>
      )}
    </div>
  )
}

export function relativeTime(ts: number | undefined, now = Date.now()) {
  if (!ts) return null
  const diff = Math.max(0, now - ts)
  const rtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' })
  const min = Math.round(diff / 60_000)
  if (min < 1) return 'hace un momento'
  if (min < 60) return rtf.format(-min, 'minute')
  const h = Math.round(min / 60)
  if (h < 24) return rtf.format(-h, 'hour')
  const d = Math.round(h / 24)
  if (d < 30) return rtf.format(-d, 'day')
  return new Date(ts).toLocaleDateString('es', { day: 'numeric', month: 'short' })
}
