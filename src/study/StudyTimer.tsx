import { useEffect, useState } from 'react'
import { Pause, Play, RotateCcw, Timer } from 'lucide-react'
import { timerElapsed, useUi } from '../lib/store.ts'
import { Tip, cx } from '../ui/primitives.tsx'

const format = (ms: number) => {
  const s = Math.floor(ms / 1000)
  const h = Math.floor(s / 3600)
  const mm = String(Math.floor((s % 3600) / 60)).padStart(2, '0')
  const ss = String(s % 60).padStart(2, '0')
  return h ? `${h}:${mm}:${ss}` : `${mm}:${ss}`
}

/** Cronómetro de estudio. Solo este componente se re-renderiza cada segundo, y solo mientras corre. */
export function StudyTimer() {
  const startedAt = useUi((s) => s.timerStartedAt)
  const accumulated = useUi((s) => s.timerAccumulated)
  const toggle = useUi((s) => s.toggleTimer)
  const reset = useUi((s) => s.resetTimer)
  const [now, setNow] = useState(Date.now)
  const running = startedAt !== null

  useEffect(() => {
    if (!running) return
    setNow(Date.now())
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [running])

  const elapsed = timerElapsed({ timerAccumulated: accumulated, timerStartedAt: startedAt }, now)
  const idle = !running && elapsed === 0

  return (
    <div
      role="group"
      aria-label="Temporizador de estudio"
      className={cx(
        'flex h-9 items-center rounded-lg border px-1 transition-colors duration-200',
        running ? 'border-accent/30 bg-accent-soft' : 'border-transparent',
      )}
    >
      <Tip label={running ? 'Pausar (Alt P)' : idle ? 'Iniciar temporizador (Alt P)' : 'Reanudar (Alt P)'}>
        <button
          type="button"
          onClick={toggle}
          aria-label={running ? 'Pausar temporizador' : 'Iniciar temporizador'}
          aria-pressed={running}
          className="pressable tap inline-flex h-7 items-center gap-1.5 rounded-md px-1.5 text-ink-2 hover:text-ink"
        >
          {running ? <Pause size={15} aria-hidden /> : idle ? <Timer size={17} aria-hidden /> : <Play size={15} aria-hidden />}
          {!idle && (
            <span className={cx('font-mono text-xs tabular-nums', running ? 'text-ink' : 'text-ink-2')} aria-live="off">
              {format(elapsed)}
            </span>
          )}
        </button>
      </Tip>
      {!idle && (
        <Tip label="Reiniciar">
          <button type="button" onClick={reset} aria-label="Reiniciar temporizador" className="pressable tap inline-flex size-7 items-center justify-center rounded-md text-ink-3 hover:text-ink">
            <RotateCcw size={13} aria-hidden />
          </button>
        </Tip>
      )}
    </div>
  )
}
