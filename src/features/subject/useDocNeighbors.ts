import { useLocation, useMatch } from 'react-router'
import { docRoute, useSubjectData } from '../../lib/subject.ts'

/** Ruta del documento actual (decodificada) a partir de la URL /m/:subject/d/*. */
export function useCurrentDoc() {
  const match = useMatch('/m/:subject/*')
  const { pathname } = useLocation()
  const subject = match?.params.subject
  const prefix = subject ? `/m/${encodeURIComponent(subject)}/d/` : null
  const path = prefix && pathname.startsWith(prefix) ? decodeURIComponent(pathname.slice(prefix.length)) : undefined
  return { subject, path }
}

export function useDocNeighbors() {
  const { subject, path } = useCurrentDoc()
  const { docs } = useSubjectData(subject)
  const i = path ? docs.findIndex((d) => d.path === path) : -1
  const prevDoc = i > 0 ? docs[i - 1] : undefined
  const nextDoc = i >= 0 && i < docs.length - 1 ? docs[i + 1] : undefined
  return {
    prevDoc,
    nextDoc,
    prev: subject && prevDoc ? docRoute(subject, prevDoc.path) : undefined,
    next: subject && nextDoc ? docRoute(subject, nextDoc.path) : undefined,
  }
}
