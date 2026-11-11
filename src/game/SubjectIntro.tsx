import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Kbd } from '../ui/primitives.tsx'
import { sfx } from './sound.ts'

/** Debe coincidir con --intro-duration (tokens.css): ahí la intro ya terminó de apagarse. */
const DURATION = 3400
/** Salida al saltearla: un fundido corto, no un corte. */
const SKIP_OUT_MS = 260
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

/** Mientras está `html[data-intro]`, los ítems del menú de abajo esperan (index.css); al quitarlo entran escalonados. */
const holdMenu = (on: boolean) => {
  if (on) document.documentElement.dataset.intro = 'on'
  else delete document.documentElement.dataset.intro
}

/**
 * Intro de materia: la ilustración se acerca, una línea de acento se dibuja y el nombre aparece con un barrido.
 * Al final se apaga sobre el menú, que entra escalonado mientras tanto. Cualquier tecla, clic o toque la saltea
 * con un fundido corto. Con movimiento reducido no se muestra (lo decide quien la monta).
 */
export function SubjectIntro({ subject, name, lema, image, onDone }: { subject: string; name: string; lema?: string; image?: string; onDone: () => void }) {
  const [skipped, setSkipped] = useState(false)
  const done = useRef(false)
  const skipRef = useRef<HTMLButtonElement>(null)
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone
  const finish = useRef((_skip: boolean) => {})
  finish.current = (skip) => {
    if (done.current) return
    done.current = true
    markSeen(subject)
    holdMenu(false)
    if (!skip) return onDoneRef.current()
    setSkipped(true)
    setTimeout(() => onDoneRef.current(), SKIP_OUT_MS)
  }

  // Antes del primer cuadro: los ítems del menú no llegan a arrancar su entrada debajo de la intro.
  useLayoutEffect(() => {
    holdMenu(true)
    return () => holdMenu(false)
  }, [])

  useEffect(() => {
    skipRef.current?.focus({ preventScroll: true })
    sfx.intro()
    // El menú se libera cuando la intro empieza a apagarse (420 ms antes del final), así entra mientras ella se va.
    const release = setTimeout(() => holdMenu(false), DURATION - 420)
    const end = setTimeout(() => finish.current(false), DURATION)
    const skip = (e: Event) => {
      if (e instanceof KeyboardEvent && (e.ctrlKey || e.altKey || e.metaKey)) return
      e.preventDefault()
      finish.current(true)
    }
    window.addEventListener('keydown', skip, { capture: true })
    return () => {
      clearTimeout(release)
      clearTimeout(end)
      window.removeEventListener('keydown', skip, { capture: true })
    }
  }, [])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Entrando a ${name}`}
      className={skipped ? 'intro intro--skip fixed inset-0 overflow-hidden bg-bg' : 'intro fixed inset-0 overflow-hidden bg-bg'}
      style={{ zIndex: 'var(--z-overlay)' }}
      onPointerDown={() => finish.current(true)}
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
        onClick={() => finish.current(true)}
        className="pressable tap absolute bottom-6 right-6 inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-ink-2 hover:text-ink"
      >
        Saltar <Kbd>Esc</Kbd>
      </button>
    </div>
  )
}
