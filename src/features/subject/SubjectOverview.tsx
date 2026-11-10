import { useMemo, useState } from 'react'
import { CircleCheck } from 'lucide-react'
import { progressKey, progressOf } from '../../../shared/docs.ts'
import type { DocNode, Practico } from '../../../shared/types.ts'
import { useSubjectContext } from '../../layouts/SubjectLayout.tsx'
import { fileUrl } from '../../lib/api.ts'
import { docRoute, firstDoc, locateDoc, notesRoute } from '../../lib/subject.ts'
import { HeaderWaves } from '../../effects/HeaderWaves.tsx'
import { Backdrop } from '../../game/Backdrop.tsx'
import { HINT_KEYS, MenuHints } from '../../game/MenuHints.tsx'
import { TitleMenu, type MenuItem } from '../../game/TitleMenu.tsx'
import { MenuStage } from '../../game/MenuStage.tsx'

type Level = { kind: 'raiz' } | { kind: 'teoria' } | { kind: 'tps' } | { kind: 'tp'; id: string } | { kind: 'recursos' }

/** Menú de la materia como pantalla de título: Continuar, Teoría, Trabajos prácticos, Apuntes y Recursos, con submenús. */
export function SubjectOverview() {
  const { subject, docs, workspace } = useSubjectContext()
  const [level, setLevel] = useState<Level>({ kind: 'raiz' })
  // Al volver de un submenú, la selección regresa al ítem que lo abrió.
  const [rootActive, setRootActive] = useState<string>()
  const progress = workspace?.progress ?? {}
  const { done, total } = progressOf(subject.id, docs, progress)
  const lastPath = workspace?.lastDoc?.[subject.id]
  const resume = (lastPath && locateDoc(subject, lastPath)?.doc) || null
  const start = resume ?? firstDoc(docs)
  const multiTopic = subject.topics.length > 1

  const practicos = useMemo(() => subject.topics.flatMap((t) => t.practicos.map((p) => ({ p, topic: t.title }))), [subject])
  const theory = useMemo(() => subject.topics.flatMap((t) => t.docs.map((d) => ({ d, topic: t.title }))), [subject])

  const doneMark = (d: DocNode) =>
    progress[progressKey(subject.id, d.path)] ? <CircleCheck size={17} className="shrink-0 text-done" aria-label="Completado" /> : undefined
  const docItem = (d: DocNode, label = d.label, hint?: string): MenuItem => ({ id: d.path, label, hint, to: docRoute(subject.id, d.path), trailing: doneMark(d) })
  const back = () => setLevel(level.kind === 'tp' && practicos.length > 1 ? { kind: 'tps' } : { kind: 'raiz' })
  const tpItems = (p: Practico): MenuItem[] => [...(p.statement ? [docItem(p.statement, 'Enunciado')] : []), ...p.exercises.map((e) => docItem(e))]

  let title = subject.meta.nombre
  let items: MenuItem[]
  if (level.kind === 'teoria') {
    title = 'Teoría'
    items = theory.map(({ d, topic }) => docItem(d, d.label, multiTopic ? topic : undefined))
  } else if (level.kind === 'tps') {
    title = 'Trabajos prácticos'
    items = practicos.map(({ p, topic }) => ({ id: p.id, label: p.title, hint: multiTopic ? topic : undefined, onSelect: () => setLevel({ kind: 'tp', id: p.id }) }))
  } else if (level.kind === 'tp') {
    const p = practicos.find((x) => x.p.id === level.id)?.p
    title = p?.title ?? 'Trabajo práctico'
    items = p ? tpItems(p) : []
  } else if (level.kind === 'recursos') {
    title = 'Recursos'
    items = subject.resources.map((r) => docItem(r))
  } else {
    items = [
      ...(start ? [{ id: 'continuar', label: resume ? 'Continuar' : 'Empezar', ariaLabel: `${resume ? 'Continuar' : 'Empezar'}: ${start.label}`, hint: start.label, to: docRoute(subject.id, start.path) }] : []),
      ...(theory.length ? [{ id: 'teoria', label: 'Teoría', onSelect: () => setLevel({ kind: 'teoria' }) }] : []),
      ...(practicos.length
        ? [
            {
              id: 'tps',
              label: practicos.length === 1 ? practicos[0].p.title : 'Trabajos prácticos',
              onSelect: () => setLevel(practicos.length === 1 ? { kind: 'tp', id: practicos[0].p.id } : { kind: 'tps' }),
            },
          ]
        : []),
      { id: 'apuntes', label: 'Apuntes', to: notesRoute(subject.id) },
      ...(subject.resources.length ? [{ id: 'recursos', label: 'Recursos', onSelect: () => setLevel({ kind: 'recursos' }) }] : []),
      { id: 'inicio', label: 'Volver al inicio', to: '/', gapBefore: true },
    ]
  }
  const isRoot = level.kind === 'raiz'
  const long = items.length > 7

  return (
    <div className="relative flex min-h-[calc(100dvh-var(--height-header))] w-full flex-col px-[clamp(1.25rem,6vw,6.5rem)] pb-6">
      {subject.meta.fondo ? (
        <Backdrop src={fileUrl(subject.id, subject.meta.fondo)} />
      ) : (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh]">
          <HeaderWaves accent={subject.meta.acento} />
        </div>
      )}

      <div className="relative grid flex-1 gap-10 pt-[6vh] md:grid-cols-[1fr_minmax(20rem,30rem)] md:items-end md:pb-10">
        <div className="self-end">
          <h1 className="w-fit font-display text-[clamp(2.75rem,7vw,7.5rem)] leading-[0.92] tracking-tight text-ink text-balance" style={{ viewTransitionName: 'subject-title' }}>{subject.meta.nombre}</h1>
          {(subject.meta.lema || subject.meta.descripcion) && (
            <p className="scene-exit mt-4 max-w-md text-base leading-relaxed text-ink-2">{subject.meta.lema ?? subject.meta.descripcion}</p>
          )}
          <p className="scene-exit mt-6 text-sm tabular-nums text-ink-3">
            {done} de {total} completados
          </p>
          {subject.warnings.length > 0 && (
            <p role="status" className="mt-3 text-sm text-danger">
              materia.json: {subject.warnings.join(' ')}
            </p>
          )}
        </div>

        <div className="scene-exit self-end">
          <MenuStage stageKey={level.kind + ('id' in level ? level.id : '')}>
          {!isRoot && <h2 className="mb-3 pr-3 text-right text-sm font-semibold text-ink">{title}</h2>}
          <div className={long ? 'max-h-[min(60vh,32rem)] overflow-y-auto overscroll-contain pr-1' : undefined}>
            <TitleMenu
              key={level.kind + ('id' in level ? level.id : '')}
              label={isRoot ? `Menú de ${subject.meta.nombre}` : title}
              items={items}
              size={isRoot ? 'lg' : 'md'}
              activeId={isRoot ? rootActive : undefined}
              onActiveChange={isRoot ? setRootActive : undefined}
              onBack={isRoot ? undefined : back}
            />
          </div>
          </MenuStage>
        </div>
      </div>

      <MenuHints
        hints={[
          { keys: HINT_KEYS.move, label: 'Elegir' },
          { keys: HINT_KEYS.enter, label: 'Entrar' },
          ...(isRoot ? [] : [{ keys: [<span key="esc">Esc</span>], label: 'Volver' }]),
        ]}
      />
    </div>
  )
}
