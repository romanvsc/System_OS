import { Link } from 'react-router'
import { PencilLine, Plus } from 'lucide-react'
import { useWorkspace } from '../lib/api.ts'
import { notesRoute } from '../lib/subject.ts'
import { relativeTime } from '../ui/primitives.tsx'
import { useNewNote } from './useNewNote.ts'

/** Apuntes personales vinculados al documento: separados visualmente del contenido original. */
export function DocNotes({ subject, docPath }: { subject: string; docPath: string }) {
  const workspace = useWorkspace()
  const newNote = useNewNote()
  const notes = workspace.data?.notes.filter((n) => n.subject === subject && n.docPath === docPath) ?? []

  return (
    <section aria-labelledby="mis-apuntes" className="mt-10">
      <div className="mb-3 flex items-center justify-between">
        <h2 id="mis-apuntes" className="flex items-center gap-2 text-base font-semibold tracking-tight text-ink">
          <PencilLine size={15} aria-hidden className="text-note" /> Mis apuntes
        </h2>
        <button
          type="button"
          onClick={() => newNote({ subject, docPath })}
          className="pressable tap inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-xs text-ink-2 hover:bg-surface-2/60 hover:text-ink"
        >
          <Plus size={13} aria-hidden /> Nuevo apunte <span className="text-ink-3">· Alt N</span>
        </button>
      </div>
      {notes.length === 0 ? (
        <p className="rounded-[var(--radius-card)] border border-dashed border-line px-4 py-4 text-sm text-ink-3">
          Todavía no escribiste apuntes sobre este documento.
        </p>
      ) : (
        <ul className="space-y-2">
          {notes.map((n) => (
            <li key={n.id}>
              <Link
                to={notesRoute(subject, n.id)}
                className="pressable block rounded-[var(--radius-card)] border border-note/15 bg-note-soft px-4 py-3 hover:border-note/30"
              >
                <span className="flex items-baseline justify-between gap-3">
                  <span className="truncate text-sm font-medium text-ink">{n.title || 'Apunte sin título'}</span>
                  <span className="shrink-0 text-2xs text-ink-3">{relativeTime(n.updatedAt)}</span>
                </span>
                {n.body && <span className="mt-1 line-clamp-2 block text-sm text-ink-2">{n.body}</span>}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
