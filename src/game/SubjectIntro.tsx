import { useEffect, useRef } from 'react'
import { Kbd } from '../ui/primitives.tsx'
import { sfx } from './sound.ts'

const DURATION = 3400
const SEEN_KEY = 'system-os:intros'

/** ¿Ya se vio la intro de esta materia en esta sesión? (sessionStorage puede no estar disponible). */
export function introSeen(subject: string) {
  try {
    return (JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? '[]') as string[]).includes(subject)
  } catch {
    return false
  }
}
function markSeen(subject: string) {
  try {
    const seen = new Set(JSON.parse(sessionStorage.getItem(SEEN_KEY) ?? '[]') as string[])
    seen.add(subject)
    sessionStorage.setItem(SEEN_KEY, JSON.stringify([...seen]))
  } catch {
    /* sin almacenamiento: la intro puede repetirse, no es crítico */
  }
}

/**
 * Intro de materia: la ilustración se acerca, una línea de acento se dibuja y el nombre aparece con un barrido.
 * Cualquier tecla, clic o toque la saltea. Con movimiento reducido no se muestra (lo decide quien la monta).
 */
export function SubjectIntro({ subject, name, lema, image, onDone }: { subject: string; name: string; lema?: string; image?: string; onDone: () => void }) {
  const done = useRef(false)
  const skipRef = useRef<HTMLButtonElement>(null)
  const finish = useRef(() => {})
  finish.current = () => {
    if (done.current) return
    done.current = true
    markSeen(subject)
    onDone()
  }

  useEffect(() => {
    skipRef.current?.focus({ preventScroll: true })
    sfx.intro()
    const t = setTimeout(() => finish.current(), DURATION)
    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.ctrlKey || e.altKey || e.metaKey)) return
      e.preventDefault()
      finish.current()
    }
    window.addEventListener('keydown', skip, { capture: true })
    return () => {
      clearTimeout(t)
      window.removeEventListener('keydown', skip, { capture: true })
    }
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Entrando a ${name}`}
      className="intro fixed inset-0 overflow-hidden bg-bg"
      style={{ zIndex: 'var(--z-overlay)', animationDuration: `${DURATION}ms` }}
      onPointerDown={() => finish.current()}
    >
      {image ? (
        <img src={image} alt="" className="intro-image absolute inset-0 size-full object-cover" />
      ) : (
        <div className="intro-image intro-fallback absolute inset-0" />
      )}
      <div className="backdrop-legibility absolute inset-0" />
      <div className="absolute inset-x-0 bottom-[18vh] w-full px-[clamp(1.25rem,6vw,6.5rem)]">
        <span className="intro-line block h-px w-40 origin-left bg-accent" />
        <p aria-live="polite" className="intro-title mt-6 font-display text-[clamp(2.75rem,7vw,6rem)] leading-[0.95] tracking-tight text-ink text-balance">
          {name}
        </p>
        {lema && <p className="intro-lema mt-4 max-w-xl text-lg text-ink-2">{lema}</p>}
      </div>
      <button
        ref={skipRef}
        type="button"
        onClick={() => finish.current()}
        className="pressable tap absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-2 hover:text-ink"
      >
        Saltar <Kbd>Esc</Kbd>
      </button>
    </div>
  )
}
