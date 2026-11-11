import { useState } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router'
import { CircleCheck } from 'lucide-react'
import { navLabel, progressKey, progressOf } from '../../../shared/docs.ts'
import type { DocNode, Practico } from '../../../shared/types.ts'
import { useSubjectContext } from '../../layouts/SubjectLayout.tsx'
import { fileUrl } from '../../lib/api.ts'
import { docRoute, firstDoc, locateDoc, notesRoute, practicoDocs, topicDocs, type MenuLevel } from '../../lib/subject.ts'
import { HeaderWaves } from '../../effects/HeaderWaves.tsx'
import { Backdrop } from '../../game/Backdrop.tsx'
import { HINT_KEYS, MenuHints } from '../../game/MenuHints.tsx'
import { TitleMenu, type MenuItem } from '../../game/TitleMenu.tsx'
import { MenuStage } from '../../game/MenuStage.tsx'

const clean = (l: MenuLevel) => Object.fromEntries(Object.entries(l).filter(([, v]) => v)) as Record<string, string>
const same = (a: MenuLevel, b: MenuLevel) => JSON.stringify(clean(a)) === JSON.stringify(clean(b))

/**
 * Menú de la materia como pantalla de título, organizado por tema (como se cursa):
 * raíz → Temas → un tema (teoría, operaciones, su TP) → el TP (enunciado y ejercicios).
 * El nivel vive en la URL: "atrás" del navegador o del celular sube un nivel, y al volver de un documento
 * el menú reabre donde estaba.
 */
export function SubjectOverview() {
  const { subject, docs, workspace } = useSubjectContext()
  const [params, setParams] = useSearchParams()
  const location = useLocation()
  const navigate = useNavigate()
  // Ítem marcado por nivel: al subir, la selección vuelve al que abrió el submenú.
  const [actives, setActives] = useState<Record<string, string>>({})
  const progress = workspace?.progress ?? {}
  const { done, total } = progressOf(subject.id, docs, progress)
  const lastPath = workspace?.lastDoc?.[subject.id]
  const resume = (lastPath && locateDoc(subject, lastPath)) || null
  const start = resume?.doc ?? firstDoc(docs)
  const single = subject.topics.length === 1

  const topicIndex = subject.topics.findIndex((t) => t.id === params.get('tema'))
  const topic = topicIndex >= 0 ? subject.topics[topicIndex] : undefined
  const practico = topic?.practicos.find((p) => p.id === params.get('tp'))
  const ver = params.get('ver')
  const level: MenuLevel = topic
    ? { tema: topic.id, tp: practico?.id }
    : ver === 'temas' || ver === 'recursos'
      ? { ver }
      : {}
  const levelKey = JSON.stringify(clean(level))
  const parent: MenuLevel = level.tp ? { tema: level.tema } : level.tema && !single ? { ver: 'temas' } : {}
  const isRoot = !level.tema && !level.ver

  const enter = (l: MenuLevel) => setParams(clean(l), { state: { menu: true } })
  // Si se llegó desde el nivel de arriba, volver es el atrás del historial; si se entró directo (link, recarga), se reemplaza.
  const goTo = (target: MenuLevel) => {
    if ((location.state as { menu?: boolean } | null)?.menu && same(target, parent)) navigate(-1)
    else setParams(clean(target), { replace: true })
  }

  const check = <CircleCheck size={17} className="shrink-0 text-done" aria-label="Completado" />
  const doneMark = (d: DocNode) => (progress[progressKey(subject.id, d.path)] ? check : undefined)
  const tally = (list: DocNode[]) => {
    const s = progressOf(subject.id, list, progress)
    if (s.total > 0 && s.done === s.total) return check
    return (
      <span className="shrink-0 text-xs tabular-nums text-ink-3" aria-label={`${s.done} de ${s.total} completados`}>
        {s.done}/{s.total}
      </span>
    )
  }
  const docItem = (d: DocNode, label = navLabel(d)): MenuItem => ({ id: d.path, label, to: docRoute(subject.id, d.path), trailing: doneMark(d) })
  const tpItem = (p: Practico, gapBefore: boolean): MenuItem => ({
    id: p.id,
    label: p.title,
    gapBefore,
    trailing: tally(practicoDocs(p)),
    onSelect: () => enter({ tema: topic!.id, tp: p.id }),
  })

  let items: MenuItem[]
  let crumbs: { label: string; level: MenuLevel }[] = []
  let suggested: string | undefined
  if (practico && topic) {
    crumbs = [...(single ? [] : [{ label: 'Temas', level: { ver: 'temas' as const } }]), { label: topic.title, level: { tema: topic.id } }, { label: practico.title, level }]
    items = [...(practico.statement ? [docItem(practico.statement, 'Enunciado')] : []), ...practico.exercises.map((e) => docItem(e))]
    suggested = lastPath
  } else if (topic) {
    crumbs = [...(single ? [] : [{ label: 'Temas', level: { ver: 'temas' as const } }]), { label: topic.title, level }]
    items = [...topic.docs.map((d) => docItem(d)), ...topic.practicos.map((p, i) => tpItem(p, i === 0 && topic.docs.length > 0))]
    suggested = resume?.topic?.id === topic.id ? (resume.practico?.id ?? lastPath) : undefined
  } else if (level.ver === 'temas') {
    crumbs = [{ label: 'Temas', level }]
    items = subject.topics.map((t, i) => ({
      id: t.id,
      label: (
        <>
          <span aria-hidden className="mr-3 inline-block w-[1.2em] text-right tabular-nums text-ink-3">
            {i + 1}
          </span>
          {t.title}
        </>
      ),
      ariaLabel: `Tema ${i + 1}: ${t.title}`,
      trailing: tally(topicDocs(t)),
      onSelect: () => enter({ tema: t.id }),
    }))
    suggested = resume?.topic?.id
  } else if (level.ver === 'recursos') {
    crumbs = [{ label: 'Recursos', level }]
    items = subject.resources.map((r) => docItem(r, r.label))
  } else {
    const topicsTarget: MenuLevel = single ? { tema: subject.topics[0].id } : { ver: 'temas' }
    items = [
      ...(start
        ? [{ id: 'continuar', label: resume ? 'Continuar' : 'Empezar', ariaLabel: `${resume ? 'Continuar' : 'Empezar'}: ${start.label}`, hint: start.label, to: docRoute(subject.id, start.path) }]
        : []),
      ...(subject.topics.length
        ? [{ id: 'temas', label: single ? subject.topics[0].title : 'Temas', hint: single ? undefined : `${subject.topics.length}`, onSelect: () => enter(topicsTarget) }]
        : []),
      { id: 'apuntes', label: 'Apuntes', to: notesRoute(subject.id) },
      ...(subject.resources.length ? [{ id: 'recursos', label: 'Recursos', onSelect: () => enter({ ver: 'recursos' }) }] : []),
      { id: 'inicio', label: 'Volver al inicio', to: '/', gapBefore: true },
    ]
  }
  // En pantallas táctiles no hay Esc: Volver queda como último ítem de cada submenú.
  if (!isRoot) items.push({ id: 'volver', label: 'Volver', gapBefore: true, onSelect: () => goTo(parent) })
  const title = crumbs.at(-1)?.label ?? subject.meta.nombre
  const long = items.length > 7
  const activeId = actives[levelKey] ?? (items.some((i) => i.id === suggested) ? suggested : undefined)

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
          <MenuStage stageKey={levelKey}>
            {!isRoot && (
              <nav aria-label="Nivel del menú" className="mb-3 pr-3">
                <ol className="flex flex-wrap items-center justify-end gap-x-1.5 text-sm">
                  {crumbs.map((c, i) => (
                    <li key={i} className="flex items-center gap-1.5">
                      {i > 0 && <span aria-hidden className="text-ink-3">/</span>}
                      {i < crumbs.length - 1 ? (
                        <button type="button" onClick={() => goTo(c.level)} className="pressable rounded text-ink-3 hover:text-ink">
                          {c.label}
                        </button>
                      ) : (
                        <span aria-current="location" className="font-semibold text-ink">
                          {c.label}
                        </span>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            )}
            <div className={long ? 'max-h-[min(60vh,32rem)] overflow-y-auto overscroll-contain pr-1' : undefined}>
              <TitleMenu
                key={levelKey}
                label={isRoot ? `Menú de ${subject.meta.nombre}` : title}
                items={items}
                size={isRoot ? 'lg' : 'md'}
                activeId={activeId}
                onActiveChange={(id) => setActives((a) => ({ ...a, [levelKey]: id }))}
                onBack={isRoot ? undefined : () => goTo(parent)}
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
