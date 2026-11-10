import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router'
import { ArrowLeft, Plus, Search } from 'lucide-react'
import { useSubjects, useWorkspace } from '../lib/api.ts'
import { normalize } from '../lib/search.ts'
import { DelayedSkeleton, ErrorState, cx, relativeTime } from '../ui/primitives.tsx'
import { NoteEditor } from './NoteEditor.tsx'
import { useNewNote } from './useNewNote.ts'

/** Apuntes personales: de una materia (/m/:materia/apuntes) o todos (/apuntes). Lista + editor. */
export function NotesView() {
  const { subject } = useParams()
  const [params, setParams] = useSearchParams()
  const selectedId = params.get('n')
  const workspace = useWorkspace()
  const subjects = useSubjects()
  const newNote = useNewNote()
  const [filter, setFilter] = useState('')
  const subjectName = (id?: string) => subjects.data?.find((s) => s.id === id)?.meta.nombre

  const notes = useMemo(() => {
    const all = workspace.data?.notes ?? []
    const scoped = subject ? all.filter((n) => n.subject === subject) : all
    const q = normalize(filter.trim())
    return [...scoped].filter((n) => !q || normalize(`${n.title} ${n.body}`).includes(q)).sort((a, b) => b.updatedAt - a.updatedAt)
  }, [workspace.data, subject, filter])
  const selected = workspace.data?.notes.find((n) => n.id === selectedId)
  const select = (id: string | null) => setParams(id ? { n: id } : {}, { replace: !!selectedId && !!id })

  if (workspace.isPending) {
    return (
      <div className="mx-auto w-full max-w-3xl px-5 py-16">
        <DelayedSkeleton />
      </div>
    )
  }
  if (workspace.isError) return <ErrorState title="No se pudieron cargar los apuntes" message={workspace.error.message} onRetry={() => workspace.refetch()} />

  return (
    <div className="mx-auto grid w-full max-w-[72rem] flex-1 gap-6 px-4 pb-16 pt-6 sm:px-8 md:grid-cols-[17rem_minmax(0,1fr)] md:pt-10">
      <aside className={cx('min-w-0', selected && 'hidden md:block')} aria-label="Lista de apuntes">
        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <h1 className="font-display text-2xl tracking-tight text-ink">Apuntes</h1>
            <p className="mt-0.5 truncate text-sm text-ink-2">{subject ? subjectName(subject) ?? subject : 'Todas las materias'}</p>
          </div>
          <button
            type="button"
            onClick={() => newNote({ subject })}
            className="pressable inline-flex shrink-0 items-center gap-1.5 rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-accent-ink hover:bg-accent-hover"
          >
            <Plus size={15} aria-hidden /> Nuevo
          </button>
        </div>
        <label className="mt-5 flex h-9 items-center gap-2 rounded-md border border-line bg-surface/40 px-2.5 text-ink-3 focus-within:border-accent/60">
          <Search size={14} aria-hidden />
          <span className="sr-only">Buscar en apuntes</span>
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            placeholder="Buscar en apuntes"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
          />
        </label>
        {notes.length === 0 ? (
          <p className="mt-6 text-sm leading-relaxed text-ink-3">
            {filter ? 'Ningún apunte coincide.' : 'Todavía no hay apuntes. Creá uno con “Nuevo” o con Alt N desde cualquier documento.'}
          </p>
        ) : (
          <ul className="mt-4 space-y-1">
            {notes.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  onClick={() => select(n.id)}
                  aria-current={n.id === selectedId ? 'true' : undefined}
                  className={cx(
                    'pressable w-full rounded-lg border px-3 py-2.5 text-left',
                    n.id === selectedId ? 'border-note/30 bg-note-soft' : 'border-transparent hover:bg-surface-2/40',
                  )}
                >
                  <span className="flex items-baseline justify-between gap-2">
                    <span className="truncate text-sm font-medium text-ink">{n.title || 'Apunte sin título'}</span>
                    <span className="shrink-0 text-2xs text-ink-3">{relativeTime(n.updatedAt)}</span>
                  </span>
                  <span className="mt-0.5 block truncate text-xs text-ink-2">{n.body || 'Vacío'}</span>
                  {!subject && n.subject && <span className="mt-1 block truncate text-2xs text-ink-3">{subjectName(n.subject) ?? n.subject}</span>}
                </button>
              </li>
            ))}
          </ul>
        )}
      </aside>

      <section className={cx('min-w-0', !selected && 'hidden md:block')} aria-label="Editor de apunte">
        {selected ? (
          <>
            <button type="button" onClick={() => select(null)} className="pressable mb-4 inline-flex items-center gap-1.5 text-sm text-ink-2 hover:text-ink md:hidden">
              <ArrowLeft size={14} aria-hidden /> Todos los apuntes
            </button>
            <NoteEditor key={selected.id} note={selected} subjects={subjects.data ?? []} onDeleted={() => select(null)} />
          </>
        ) : (
          <div className="flex h-full min-h-64 items-center justify-center rounded-[var(--radius-panel)] border border-dashed border-line p-8 text-center text-sm text-ink-3">
            {selectedId ? (
              <span>
                Este apunte ya no existe. <Link to="?" className="text-ink-2 underline">Volver a la lista</Link>
              </span>
            ) : (
              'Elegí un apunte de la lista o creá uno nuevo.'
            )}
          </div>
        )}
      </section>
    </div>
  )
}
