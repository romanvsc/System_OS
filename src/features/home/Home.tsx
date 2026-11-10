import { useMemo, useState } from 'react'
import { m, useReducedMotion } from 'motion/react'
import { CircleCheck } from 'lucide-react'
import { flattenDocs, progressOf } from '../../../shared/docs.ts'
import type { Subject, Workspace } from '../../../shared/types.ts'
import { fileUrl, useSubjects, useWorkspace } from '../../lib/api.ts'
import { useUi } from '../../lib/store.ts'
import { docRoute, firstDoc, locateDoc, subjectRoute } from '../../lib/subject.ts'
import { DelayedSkeleton, ErrorState, ProgressBar, relativeTime } from '../../ui/primitives.tsx'
import { Backdrop } from '../../game/Backdrop.tsx'
import { HINT_KEYS, MenuHints } from '../../game/MenuHints.tsx'
import { TitleMenu, type MenuItem } from '../../game/TitleMenu.tsx'
import { MenuStage } from '../../game/MenuStage.tsx'
import { useGameNavigate } from '../../game/transition.tsx'

/** Fondo propio del Inicio (lo aporta Roman en public/; si falta, queda el ambiente). */
const HOME_FONDO = '/fondo-inicio.webp'

function greeting(hour: number) {
  if (hour < 6) return 'Buenas noches'
  if (hour < 13) return 'Buen día'
  if (hour < 20) return 'Buenas tardes'
  return 'Buenas noches'
}

/**
 * Inicio como pantalla de título con partida guardada: Continuar retoma el último documento de
 * cualquier materia; Materias abre el selector, donde el fondo pasa a la ilustración de cada una.
 */
export function Home() {
  const subjects = useSubjects()
  const workspace = useWorkspace()
  const go = useGameNavigate()
  const reduce = useReducedMotion()
  const setSettings = useUi((s) => s.setSettings)
  const now = useMemo(() => new Date(), [])
  const today = now.toLocaleDateString('es', { weekday: 'long', day: 'numeric', month: 'long' })
  const [level, setLevel] = useState<'raiz' | 'materias'>('raiz')
  const [rootActive, setRootActive] = useState<string>()
  const [subjectActive, setSubjectActive] = useState<string>()

  const list = subjects.data ?? []
  const ws = workspace.data
  const progress = ws?.progress ?? {}

  // La "partida guardada": la materia visitada más recientemente que tenga un documento abierto válido.
  const save = useMemo(() => {
    const byVisit = [...list].sort((a, b) => (ws?.lastVisit[b.id] ?? 0) - (ws?.lastVisit[a.id] ?? 0))
    for (const s of byVisit) {
      const path = ws?.lastDoc?.[s.id]
      const doc = path && locateDoc(s, path)?.doc
      if (doc) return { subject: s, doc, resume: true }
    }
    const s = list[0]
    const doc = s && firstDoc(flattenDocs(s))
    return doc ? { subject: s, doc, resume: false } : null
  }, [list, ws])

  const rootItems: MenuItem[] = [
    ...(save
      ? [{
          id: 'continuar',
          label: save.resume ? 'Continuar' : 'Empezar',
          ariaLabel: `${save.resume ? 'Continuar' : 'Empezar'}: ${save.doc.label}, ${save.subject.meta.nombre}`,
          to: docRoute(save.subject.id, save.doc.path),
        }]
      : []),
    ...(list.length > 0 ? [{ id: 'materias', label: 'Materias', onSelect: () => setLevel('materias') }] : []),
    { id: 'apuntes', label: 'Mis apuntes', onSelect: () => void go('/apuntes') },
    { id: 'configuracion', label: 'Configuración', onSelect: () => setSettings(true) },
  ]

  const subjectItems: MenuItem[] = [
    ...list.map((s) => ({
      id: s.id,
      label: s.meta.nombre,
      to: subjectRoute(s.id),
      trailing: progressOf(s.id, flattenDocs(s), progress).ratio >= 1 ? <CircleCheck size={18} className="shrink-0 text-done" aria-label="Completada" /> : undefined,
    })),
    { id: 'volver', label: 'Volver', onSelect: () => back(), gapBefore: true },
  ]

  const back = () => {
    setLevel('raiz')
    setRootActive('materias')
  }

  const highlighted = level === 'materias' ? list.find((s) => s.id === (subjectActive ?? list[0]?.id)) : undefined
  const fondo = highlighted?.meta.fondo ? fileUrl(highlighted.id, highlighted.meta.fondo) : HOME_FONDO

  return (
    <main id="contenido" className="relative flex w-full flex-1 flex-col px-[clamp(1.25rem,6vw,6.5rem)] pb-6">
      <Backdrop src={fondo} />

      <div className="scene-exit grid flex-1 grid-rows-[1fr_auto] gap-10 pt-[8vh] md:grid-cols-[1fr_minmax(20rem,30rem)] md:grid-rows-1 md:items-end md:pb-10">
        <m.div initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="self-end">
          <h1 className="font-display text-[clamp(3.5rem,10vw,11rem)] leading-[0.92] tracking-tight text-ink">
            System <span className="italic text-ink-2">OS</span>
          </h1>
          <p className="mt-8 text-base text-ink-2">
            {greeting(now.getHours())}. <span className="inline-block first-letter:uppercase">{today}</span>.
          </p>
        </m.div>

        <div className="self-end">
          {subjects.isPending && <DelayedSkeleton lines={3} />}
          {subjects.isError && <ErrorState title="No se pudieron cargar las materias" message={subjects.error.message} onRetry={() => subjects.refetch()} />}
          {subjects.data && (
            <MenuStage stageKey={level}>
              <div className="mb-8 min-h-28 pr-3" aria-live="polite">
                {level === 'raiz' && save && <SaveSlot key="save" subject={save.subject} docLabel={save.doc.label} resume={save.resume} progress={progress} lastVisit={ws?.lastVisit[save.subject.id]} />}
                {highlighted && <SubjectSlot key={highlighted.id} subject={highlighted} progress={progress} lastVisit={ws?.lastVisit[highlighted.id]} />}
              </div>
              {level === 'raiz' ? (
                <TitleMenu key="raiz" label="Menú principal" items={rootItems} activeId={rootActive} onActiveChange={setRootActive} />
              ) : (
                <TitleMenu key="materias" label="Materias" items={subjectItems} activeId={subjectActive} onActiveChange={(id) => id !== 'volver' && setSubjectActive(id)} onBack={back} />
              )}
              {list.length === 0 && (
                <p className="mt-4 pr-3 text-right text-sm leading-relaxed text-ink-3">
                  Todavía no hay materias. Creá un <code className="font-mono text-xs text-ink-2">materia.json</code> en la carpeta de una materia (ver README).
                </p>
              )}
            </MenuStage>
          )}
        </div>
      </div>

      <MenuHints
        hints={[
          { keys: HINT_KEYS.move, label: 'Elegir' },
          { keys: HINT_KEYS.enter, label: 'Entrar' },
          ...(level === 'materias' ? [{ keys: [<span key="e">Esc</span>], label: 'Volver' }] : []),
          { keys: [<span key="c">Ctrl</span>, <span key="k">K</span>], label: 'Buscar' },
        ]}
      />
      <span className="sr-only">Usá las flechas para moverte por el menú y Enter para entrar.</span>
    </main>
  )
}

interface SlotProps {
  subject: Subject
  progress: Workspace['progress']
  lastVisit?: number
}

/** Partida guardada: qué se retoma, de qué materia y cuánto falta. */
function SaveSlot({ subject, docLabel, resume, progress, lastVisit }: SlotProps & { docLabel: string; resume: boolean }) {
  const stats = progressOf(subject.id, flattenDocs(subject), progress)
  const opened = relativeTime(lastVisit)
  return (
    <div className="fade-enter ml-auto max-w-80 text-right">
      <p className="truncate text-lg text-ink">{docLabel}</p>
      <p className="truncate text-sm text-ink-2">{subject.meta.nombre}</p>
      <div className="mt-3 ml-auto w-40">
        <ProgressBar ratio={stats.ratio} />
      </div>
      <p className="mt-2 text-sm text-ink-3">
        {stats.done} de {stats.total} completados
        {resume && opened ? ` · ${opened}` : resume ? '' : ' · sin empezar'}
      </p>
    </div>
  )
}

/** En el selector de materias: el avance de la materia marcada. */
function SubjectSlot({ subject, progress, lastVisit }: SlotProps) {
  const stats = progressOf(subject.id, flattenDocs(subject), progress)
  const opened = relativeTime(lastVisit)
  return (
    <div className="fade-enter ml-auto max-w-80 text-right">
      {subject.meta.descripcion && <p className="text-sm leading-relaxed text-ink-2">{subject.meta.descripcion}</p>}
      <div className="mt-3 ml-auto w-40">
        <ProgressBar ratio={stats.ratio} />
      </div>
      <p className="mt-2 text-sm text-ink-3">
        {stats.done} de {stats.total} completados{opened ? ` · abierta ${opened}` : ''}
      </p>
    </div>
  )
}
