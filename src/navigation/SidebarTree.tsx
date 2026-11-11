import { useState, type ReactNode } from 'react'
import { NavLink } from 'react-router'
import * as Collapsible from '@radix-ui/react-collapsible'
import { ChevronRight, CircleCheck, Circle } from 'lucide-react'
import { navLabel, progressKey, progressOf } from '../../shared/docs.ts'
import type { DocNode, Subject, Workspace } from '../../shared/types.ts'
import { normalize } from '../lib/search.ts'
import { docRoute } from '../lib/subject.ts'
import { cx } from '../ui/primitives.tsx'

function NavItem({ subject, doc, label, done, current }: { subject: string; doc: DocNode; label?: string; done: boolean; current: boolean }) {
  return (
    <li>
      <NavLink
        to={docRoute(subject, doc.path)}
        aria-current={current ? 'page' : undefined}
        className={cx(
          'group relative flex items-center gap-2.5 rounded-md py-1.5 pl-3 pr-2 text-sm transition-colors duration-150 pointer-coarse:py-3',
          current ? 'bg-surface-2/70 text-ink' : 'text-ink-2 hover:bg-surface-2/40 hover:text-ink',
        )}
      >
        {current && <span aria-hidden className="absolute inset-y-1.5 left-0 w-0.5 rounded-full bg-accent animate-[nav-mark_260ms_var(--ease-out)]" />}
        {done ? (
          <CircleCheck size={14} className="shrink-0 text-done" aria-label="Completado" />
        ) : (
          <Circle size={14} className="shrink-0 text-ink-3/60" aria-hidden />
        )}
        <span className="min-w-0 flex-1 truncate" title={doc.title}>{label ?? navLabel(doc)}</span>
      </NavLink>
    </li>
  )
}

function Group({ title, num, meta, defaultOpen, forceOpen, level = 0, children }: { title: string; num?: number; meta?: ReactNode; defaultOpen: boolean; forceOpen: boolean; level?: number; children: ReactNode }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <Collapsible.Root open={forceOpen || open} onOpenChange={setOpen}>
      <Collapsible.Trigger
        className={cx(
          'pressable flex w-full items-center gap-1.5 rounded-md py-1.5 pr-2 text-left hover:bg-surface-2/40 pointer-coarse:py-3',
          level === 0 ? 'pl-1.5 text-sm font-medium text-ink' : 'pl-3 text-xs font-medium text-ink-2',
        )}
      >
        <ChevronRight size={14} aria-hidden className="shrink-0 text-ink-3 transition-transform duration-200 [[data-state=open]>&]:rotate-90" />
        {num !== undefined && <span aria-hidden className="w-4 shrink-0 text-right text-xs tabular-nums text-ink-3">{num}</span>}
        <span className="min-w-0 flex-1 truncate">{title}</span>
        {meta}
      </Collapsible.Trigger>
      <Collapsible.Content className="overflow-hidden data-[state=open]:animate-[fade-in_200ms_ease-out]">
        <ul className={cx('mt-0.5 space-y-px', level === 0 ? 'ml-2 border-l border-line pl-1' : 'ml-3 border-l border-line pl-1')}>{children}</ul>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}

/** Árbol jerárquico: tema → teoría y subtemas → práctico → ejercicios; luego recursos. Filtro local por nombre. */
export function SidebarTree({ subject, workspace, currentPath, filter }: { subject: Subject; workspace?: Workspace; currentPath?: string; filter: string }) {
  const progress = workspace?.progress ?? {}
  const q = normalize(filter.trim())
  const match = (d: DocNode, extra = '') => !q || normalize(`${d.label} ${d.title} ${extra}`).includes(q)
  const isDone = (d: DocNode) => !!progress[progressKey(subject.id, d.path)]
  const item = (d: DocNode, label?: string) => (
    <NavItem key={d.path} subject={subject.id} doc={d} label={label} done={isDone(d)} current={d.path === currentPath} />
  )
  const contains = (docs: DocNode[]) => !!currentPath && docs.some((d) => d.path === currentPath)

  const topics = subject.topics.map((topic, index) => {
    const all = [...topic.docs, ...topic.practicos.flatMap((p) => [...(p.statement ? [p.statement] : []), ...p.exercises])]
    const { done, total } = progressOf(subject.id, all, progress)
    const docs = topic.docs.filter((d) => match(d, topic.title))
    const practicos = topic.practicos
      .map((p) => ({ p, statement: p.statement && match(p.statement, `enunciado ${p.title}`) ? p.statement : null, exercises: p.exercises.filter((e) => match(e, p.title)) }))
      .filter((x) => x.statement || x.exercises.length)
    if (!docs.length && !practicos.length) return null
    return (
      <Group
        key={topic.id}
        title={topic.title}
        num={subject.topics.length > 1 ? index + 1 : undefined}
        defaultOpen={subject.topics.length === 1 || contains(all) || !currentPath}
        forceOpen={!!q}
        meta={subject.topics.length > 1 ? <span className="text-2xs tabular-nums text-ink-3">{done}/{total}</span> : undefined}
      >
        {docs.map((d) => item(d))}
        {practicos.map(({ p, statement, exercises }) => (
          <li key={p.id} className="pt-1">
            <Group title={p.title} level={1} defaultOpen={contains([...(p.statement ? [p.statement] : []), ...p.exercises])} forceOpen={!!q}>
              {statement && item(statement, 'Enunciado')}
              {exercises.map((e) => item(e))}
            </Group>
          </li>
        ))}
      </Group>
    )
  })

  const resources = subject.resources.filter((r) => match(r, 'recursos'))
  const empty = topics.every((t) => !t) && !resources.length

  return (
    <div className="space-y-1">
      {topics}
      {resources.length > 0 && (
        <Group title="Recursos" defaultOpen={contains(resources)} forceOpen={!!q}>
          {resources.map((r) => item(r))}
        </Group>
      )}
      {empty && <p className="px-3 py-6 text-sm text-ink-3">Nada coincide con “{filter}”.</p>}
    </div>
  )
}
