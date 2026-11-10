import { useMemo } from 'react'
import { flattenDocs } from '../../shared/docs.ts'
import type { DocKind, DocNode, Practico, Subject, Topic } from '../../shared/types.ts'
import { useSubjects, useWorkspace } from './api.ts'

const enc = encodeURIComponent
export const subjectRoute = (subject: string) => `/m/${enc(subject)}`
export const docRoute = (subject: string, path: string) => `/m/${enc(subject)}/d/${path.split('/').map(enc).join('/')}`
export const notesRoute = (subject?: string, noteId?: string) =>
  `${subject ? `/m/${enc(subject)}/apuntes` : '/apuntes'}${noteId ? `?n=${enc(noteId)}` : ''}`

export const KIND_LABEL: Record<DocKind, string> = {
  teoria: 'Teoría',
  practico: 'Trabajo práctico',
  ejercicio: 'Ejercicio',
  recurso: 'Recurso',
}

export function useSubjectData(id: string | undefined) {
  const subjects = useSubjects()
  const workspace = useWorkspace()
  const subject = subjects.data?.find((s) => s.id === id)
  const docs = useMemo(() => (subject ? flattenDocs(subject) : []), [subject])
  return { subjects, workspace, subject, docs }
}

export interface DocLocation {
  doc: DocNode
  topic?: Topic
  practico?: Practico
}

export function locateDoc(subject: Subject, path: string): DocLocation | null {
  for (const topic of subject.topics) {
    const doc = topic.docs.find((d) => d.path === path)
    if (doc) return { doc, topic }
    for (const practico of topic.practicos) {
      const hit = practico.statement?.path === path ? practico.statement : practico.exercises.find((d) => d.path === path)
      if (hit) return { doc: hit, topic, practico }
    }
  }
  const resource = subject.resources.find((d) => d.path === path)
  return resource ? { doc: resource } : null
}

/** Primer documento de estudio: punto de partida cuando todavía no hay historial. */
export const firstDoc = (docs: DocNode[]) => docs.find((d) => d.kind !== 'recurso') ?? docs[0]

export const monogram = (name: string) =>
  name
    .split(/\s+/)
    .filter((w) => w.length > 2 || /^[A-ZÁÉÍÓÚ]/.test(w))
    .slice(0, 2)
    .map((w) => w[0].toLocaleUpperCase('es'))
    .join('') || name.slice(0, 2).toUpperCase()
