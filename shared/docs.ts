import type { DocNode, Subject, Workspace } from './types.ts'

/** Todos los documentos de una materia en orden de lectura (también define anterior/siguiente). */
export function flattenDocs(subject: Subject): DocNode[] {
  return [
    ...subject.topics.flatMap((t) => [...t.docs, ...t.practicos.flatMap((p) => [...(p.statement ? [p.statement] : []), ...p.exercises])]),
    ...subject.resources,
  ]
}

export const progressKey = (subject: string, path: string) => `${subject}/${path}`

/** Progreso real: documentos de estudio marcados como completados. Los recursos no cuentan. */
export function progressOf(subjectId: string, docs: DocNode[], progress: Workspace['progress']) {
  const countable = docs.filter((d) => d.kind !== 'recurso')
  const done = countable.filter((d) => progress[progressKey(subjectId, d.path)]).length
  return { done, total: countable.length, ratio: countable.length ? done / countable.length : 0 }
}

/** Nombre corto dentro de su tema: "Colas — busqueda" → "Busqueda", "Colas: teoría básica" → "Teoría básica". */
export function shortLabel(label: string): string {
  const rest = /^.{2,}?\s+[—–]\s+(.+)$/.exec(label)?.[1] ?? /^.{2,}?:\s*(teor.+)$/i.exec(label)?.[1]
  return rest ? rest.charAt(0).toLocaleUpperCase('es') + rest.slice(1) : label
}
