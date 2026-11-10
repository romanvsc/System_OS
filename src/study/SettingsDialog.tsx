import { Download, FileDown } from 'lucide-react'
import { downloadBlob, useServerInfo, useWorkspace } from '../lib/api.ts'
import { useUi, type EffectsLevel, type IntroMode } from '../lib/store.ts'
import { Modal } from '../ui/Modal.tsx'
import { cx } from '../ui/primitives.tsx'
import { notesToMarkdown } from './exportNotes.ts'

const EFFECTS: { value: EffectsLevel; label: string; hint: string }[] = [
  { value: 'completo', label: 'Completo', hint: 'Fondo animado en el inicio' },
  { value: 'reducido', label: 'Reducido', hint: 'Fondos quietos' },
  { value: 'apagado', label: 'Apagado', hint: 'Sin WebGL, el más liviano' },
]

const INTROS: { value: IntroMode; label: string }[] = [
  { value: 'sesion', label: 'Una vez por sesión' },
  { value: 'siempre', label: 'Siempre' },
  { value: 'nunca', label: 'Nunca' },
]

export function SettingsDialog() {
  const open = useUi((s) => s.settingsOpen)
  const setOpen = useUi((s) => s.setSettings)
  const effects = useUi((s) => s.effects)
  const setEffects = useUi((s) => s.setEffects)
  const soundEnabled = useUi((s) => s.soundEnabled)
  const setSound = useUi((s) => s.setSound)
  const introMode = useUi((s) => s.introMode)
  const setIntroMode = useUi((s) => s.setIntroMode)
  const info = useServerInfo(open)
  const workspace = useWorkspace()
  const notes = workspace.data?.notes ?? []

  return (
    <Modal open={open} onOpenChange={setOpen} title="Configuración">
      <section aria-labelledby="cfg-efectos">
        <h3 id="cfg-efectos" className="mb-3 text-sm font-semibold text-ink">
          Efectos visuales
        </h3>
        <div role="radiogroup" aria-labelledby="cfg-efectos" className="grid grid-cols-3 gap-2">
          {EFFECTS.map((e) => (
            <button
              key={e.value}
              type="button"
              role="radio"
              aria-checked={effects === e.value}
              onClick={() => setEffects(e.value)}
              className={cx(
                'pressable rounded-lg border px-3 py-2.5 text-left',
                effects === e.value ? 'border-accent/50 bg-accent-soft' : 'border-line hover:border-line-strong',
              )}
            >
              <span className="block text-sm font-medium text-ink">{e.label}</span>
              <span className="mt-0.5 block text-xs text-ink-2">{e.hint}</span>
            </button>
          ))}
        </div>
      </section>

      <section aria-labelledby="cfg-intro" className="mt-7">
        <h3 id="cfg-intro" className="mb-3 text-sm font-semibold text-ink">
          Intro de cada materia
        </h3>
        <div role="radiogroup" aria-labelledby="cfg-intro" className="flex flex-wrap gap-2">
          {INTROS.map((o) => (
            <button
              key={o.value}
              type="button"
              role="radio"
              aria-checked={introMode === o.value}
              onClick={() => setIntroMode(o.value)}
              className={cx(
                'pressable tap rounded-md border px-3 py-1.5 text-sm',
                introMode === o.value ? 'border-accent/50 bg-accent-soft text-ink' : 'border-line text-ink-2 hover:border-line-strong',
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </section>

      <section className="mt-7 flex items-center justify-between gap-4">
        <div>
          <h3 id="cfg-sonido" className="text-sm font-semibold text-ink">
            Sonidos de menú
          </h3>
          <p className="mt-0.5 text-xs text-ink-2">Clics suaves al moverte y elegir. Generados en la app, sin archivos.</p>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={soundEnabled}
          aria-labelledby="cfg-sonido"
          onClick={() => setSound(!soundEnabled)}
          className={cx('pressable tap relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200', soundEnabled ? 'bg-accent' : 'bg-surface-3')}
        >
          <span
            aria-hidden
            className="absolute left-0.5 top-0.5 size-5 rounded-full bg-ink transition-transform duration-200 ease-[var(--ease-out)]"
            style={{ transform: soundEnabled ? 'translateX(1.25rem)' : 'none' }}
          />
        </button>
      </section>

      <section aria-labelledby="cfg-respaldo" className="mt-7">
        <h3 id="cfg-respaldo" className="mb-3 text-sm font-semibold text-ink">
          Copia de seguridad
        </h3>
        <div className="flex flex-wrap gap-2">
          <a
            href="/api/workspace?download"
            download
            className="pressable inline-flex items-center gap-2 rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-ink hover:bg-accent-hover"
          >
            <Download size={15} aria-hidden /> Exportar respaldo (.json)
          </a>
          <button
            type="button"
            disabled={notes.length === 0}
            onClick={() => downloadBlob(`apuntes-${new Date().toISOString().slice(0, 10)}.md`, notesToMarkdown(notes), 'text/markdown')}
            className="pressable inline-flex items-center gap-2 rounded-md border border-line-strong px-3 py-2 text-sm text-ink hover:bg-surface-2 disabled:opacity-40"
          >
            <FileDown size={15} aria-hidden /> Exportar apuntes (.md)
          </button>
        </div>
        <p className="mt-3 text-xs leading-relaxed text-ink-2">
          El respaldo incluye apuntes, progreso y últimos accesos. Para restaurarlo, reemplazá el archivo de datos por el respaldo con la app cerrada.
        </p>
      </section>

      <section aria-labelledby="cfg-ubicacion" className="mt-7">
        <h3 id="cfg-ubicacion" className="mb-3 text-sm font-semibold text-ink">
          Ubicación
        </h3>
        <dl className="space-y-2 text-xs">
          <div>
            <dt className="text-ink-3">Materias (originales, solo lectura)</dt>
            <dd className="mt-0.5 break-all font-mono text-ink-2">{info.data?.contentRoot ?? '…'}</dd>
          </div>
          <div>
            <dt className="text-ink-3">Datos personales</dt>
            <dd className="mt-0.5 break-all font-mono text-ink-2">{info.data?.dataFile ?? '…'}</dd>
          </div>
        </dl>
      </section>
    </Modal>
  )
}
