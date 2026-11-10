import { useNavigate } from 'react-router'
import { useCreateNote } from '../lib/api.ts'
import { notesRoute } from '../lib/subject.ts'
import { useCurrentDoc } from '../features/subject/useDocNeighbors.ts'

/** Crea un apunte vinculado a la materia y documento actuales (si los hay) y lo abre en el editor. */
export function useNewNote() {
  const create = useCreateNote()
  const navigate = useNavigate()
  const { subject, path } = useCurrentDoc()
  return (opts: { subject?: string; docPath?: string } = {}) => {
    if (create.isPending) return
    const target = { subject: opts.subject ?? subject, docPath: opts.docPath ?? path }
    create.mutate(
      { title: '', body: '', ...target },
      { onSuccess: ({ note }) => navigate(notesRoute(note.subject, note.id)) },
    )
  }
}
