import { useState } from 'react'
import { Link, NavLink } from 'react-router'
import { ArrowLeft, Home, NotebookPen, PanelLeftClose, PanelLeftOpen, Search } from 'lucide-react'
import { progressOf } from '../../shared/docs.ts'
import type { SubjectContext } from '../layouts/SubjectLayout.tsx'
import { useUi } from '../lib/store.ts'
import { menuRoute, monogram, notesRoute, subjectRoute, topicDocs } from '../lib/subject.ts'
import { useCurrentDoc } from '../features/subject/useDocNeighbors.ts'
import { IconButton, ProgressBar, ProgressRing, Tip, cx } from '../ui/primitives.tsx'
import { SidebarTree } from './SidebarTree.tsx'
import { GameLink } from '../game/transition.tsx'

function SubjectBadge({ name, accent, size = 'md' }: { name: string; accent: string; size?: 'sm' | 'md' }) {
  return (
    <span
      aria-hidden
      className={cx('inline-flex shrink-0 items-center justify-center rounded-lg font-display', size === 'md' ? 'size-9 text-lg' : 'size-8 text-base')}
      style={{ background: `${accent}1a`, color: accent, boxShadow: `inset 0 0 0 1px ${accent}33` }}
    >
      {monogram(name)}
    </span>
  )
}

/** Navegación completa (escritorio expandido y drawer móvil). */
export function SidebarPanel({ subject, docs, workspace, onCollapse, morph }: SubjectContext & { onCollapse?: () => void; morph?: boolean }) {
  const [filter, setFilter] = useState('')
  const { path } = useCurrentDoc()
  const { done, total, ratio } = progressOf(subject.id, docs, workspace?.progress ?? {})
  const notes = workspace?.notes.filter((n) => n.subject === subject.id).length ?? 0

  return (
    <nav aria-label={`Contenidos de ${subject.meta.nombre}`} className="flex h-full w-[var(--width-sidebar)] max-w-full flex-col">
      <div className="side-in space-y-4 px-3 pb-3 pt-4">
        <div className="flex items-center justify-between">
          <GameLink to="/" className="pressable tap inline-flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs text-ink-3 hover:text-ink">
            <ArrowLeft size={13} aria-hidden /> Inicio
          </GameLink>
          {onCollapse && (
            <IconButton label="Contraer navegación" tip="Contraer (Alt B)" onClick={onCollapse} className="size-8">
              <PanelLeftClose size={16} aria-hidden />
            </IconButton>
          )}
        </div>
        <GameLink to={subjectRoute(subject.id)} className="pressable flex items-center gap-3 rounded-lg px-1.5 py-1 hover:bg-surface-2/40">
          <SubjectBadge name={subject.meta.nombre} accent={subject.meta.acento} />
          {/* En escritorio, el nombre comparte transición con el título del menú de la materia. */}
          <span className="min-w-0 text-sm font-semibold leading-snug text-ink" style={morph ? { viewTransitionName: 'subject-title' } : undefined}>
            {subject.meta.nombre}
          </span>
        </GameLink>
        <div className="px-1.5">
          <ProgressBar ratio={ratio} />
          <p className="mt-1.5 text-2xs tabular-nums text-ink-3">
            {done} de {total} completados
          </p>
        </div>
        <label className="flex h-8 items-center gap-2 rounded-md border border-line bg-bg/40 px-2.5 text-ink-3 focus-within:border-accent/60">
          <Search size={13} aria-hidden />
          <span className="sr-only">Filtrar contenidos</span>
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && filter && (e.stopPropagation(), setFilter(''))}
            placeholder="Filtrar contenidos"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
          />
        </label>
      </div>
      <div className="side-in scene-exit min-h-0 flex-1 overflow-y-auto overscroll-contain px-2 pb-4" style={{ animationDelay: '60ms' }}>
        <SidebarTree subject={subject} workspace={workspace} currentPath={path} filter={filter} />
      </div>
      <div className="side-in scene-exit p-2 pt-3" style={{ animationDelay: '120ms' }}>
        <NavLink
          to={notesRoute(subject.id)}
          className={({ isActive }) =>
            cx(
              'pressable flex items-center gap-2.5 rounded-md px-3 py-2 text-sm',
              isActive ? 'bg-surface-2/70 text-ink' : 'text-ink-2 hover:bg-surface-2/40 hover:text-ink',
            )
          }
        >
          <NotebookPen size={15} aria-hidden className="text-note" />
          <span className="flex-1">Apuntes de la materia</span>
          <span className="text-2xs tabular-nums text-ink-3">{notes}</span>
        </NavLink>
      </div>
    </nav>
  )
}

/** Riel contraído: íconos con tooltip; ningún destino queda inaccesible. */
function SidebarRail({ subject, docs, workspace, onExpand }: SubjectContext & { onExpand: () => void }) {
  const { path } = useCurrentDoc()
  const { done, total, ratio } = progressOf(subject.id, docs, workspace?.progress ?? {})
  const linkClass = 'pressable inline-flex size-10 items-center justify-center rounded-lg text-ink-2 hover:bg-surface-2/60 hover:text-ink'
  return (
    <nav aria-label={`Contenidos de ${subject.meta.nombre}`} className="flex h-full w-[var(--width-rail)] flex-col items-center gap-1 py-3">
      <Tip label="Inicio" side="right">
        <GameLink to="/" className={linkClass} aria-label="Inicio">
          <Home size={17} aria-hidden />
        </GameLink>
      </Tip>
      <Tip label={subject.meta.nombre} side="right">
        <GameLink to={subjectRoute(subject.id)} className="pressable mt-1 rounded-lg" aria-label={subject.meta.nombre}>
          <SubjectBadge name={subject.meta.nombre} accent={subject.meta.acento} size="sm" />
        </GameLink>
      </Tip>
      <span className="h-3" aria-hidden />
      {/* Cada tema con su número (el mismo del menú y del árbol): se distinguen sin abrir el panel. */}
      {subject.topics.map((t, i) => {
        const here = !!path && topicDocs(t).some((d) => d.path === path)
        return (
          <Tip key={t.id} label={`${i + 1}. ${t.title}`} side="right">
            <GameLink
              to={menuRoute(subject.id, { tema: t.id })}
              aria-label={`Tema ${i + 1}: ${t.title}`}
              aria-current={here ? 'location' : undefined}
              className={cx(linkClass, 'text-sm font-semibold tabular-nums', here && 'bg-surface-2/70 text-ink shadow-[inset_2px_0_0_var(--color-accent)]')}
            >
              {i + 1}
            </GameLink>
          </Tip>
        )
      })}
      <Tip label="Apuntes de la materia" side="right">
        <Link to={notesRoute(subject.id)} className={linkClass} aria-label="Apuntes de la materia">
          <NotebookPen size={16} aria-hidden className="text-note" />
        </Link>
      </Tip>
      <div className="mt-auto flex flex-col items-center gap-2">
        <Tip label={`${done} de ${total} completados`} side="right">
          <span tabIndex={0} className="rounded-full">
            <ProgressRing ratio={ratio} size={28} stroke={2.5} label={`${done} de ${total} completados`} />
          </span>
        </Tip>
        <IconButton label="Expandir navegación" tip="Expandir (Alt B)" onClick={onExpand}>
          <PanelLeftOpen size={17} aria-hidden />
        </IconButton>
      </div>
    </nav>
  )
}

/**
 * Sidebar de escritorio: mismo material translúcido que el header, sobre el mismo ambiente.
 * Ocupa espacio en el flujo y anima su ancho una sola vez al contraer/expandir: el contenido se acomoda
 * con el mismo movimiento, sin saltos.
 */
export function Sidebar(props: SubjectContext) {
  const collapsed = useUi((s) => s.sidebarCollapsed)
  const toggle = useUi((s) => s.toggleSidebar)
  return (
    <aside
      className="material-side sticky top-[var(--height-header)] hidden h-[calc(100dvh-var(--height-header))] shrink-0 overflow-hidden transition-[width] duration-300 ease-[var(--ease-out)] md:block"
      style={{ width: collapsed ? 'var(--width-rail)' : 'var(--width-sidebar)' }}
    >
      {collapsed ? <SidebarRail {...props} onExpand={toggle} /> : <SidebarPanel {...props} onCollapse={toggle} morph />}
    </aside>
  )
}
