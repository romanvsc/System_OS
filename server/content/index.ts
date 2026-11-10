import fs from 'node:fs'
import path from 'node:path'
import type { CorpusEntry, Subject } from '../../shared/types.ts'
import { buildCorpus, discoverSubjects, META_FILE } from './scan.ts'

/**
 * Índice en memoria de las materias. Se reconstruye solo cuando cambia algo dentro de una materia
 * (o aparece un materia.json nuevo), así que agregar archivos no requiere reiniciar.
 */
export function createContentIndex(contentRoot: string, appDir: string) {
  let subjects: Promise<Subject[]> | null = null
  let corpus: Promise<CorpusEntry[]> | null = null
  const listeners = new Set<() => void>()
  const appFolder = path.relative(contentRoot, appDir).split(path.sep)[0]

  const getSubjects = () => (subjects ??= discoverSubjects(contentRoot).catch((e) => ((subjects = null), Promise.reject(e))))
  const getCorpus = () =>
    (corpus ??= getSubjects()
      .then((s) => buildCorpus(s, contentRoot))
      .catch((e) => ((corpus = null), Promise.reject(e))))

  let timer: NodeJS.Timeout | undefined
  const invalidate = () => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      subjects = corpus = null
      listeners.forEach((fn) => fn())
    }, 200)
  }

  let watcher: fs.FSWatcher | null = null
  try {
    // fs.watch recursivo es nativo en Windows y macOS: barato aun con carpetas grandes.
    watcher = fs.watch(contentRoot, { recursive: true }, async (_event, filename) => {
      if (!filename) return invalidate()
      const top = filename.split(/[\\/]/)[0]
      if (top === appFolder) return
      if (filename.endsWith(META_FILE)) return invalidate()
      const known = await getSubjects().catch(() => [])
      if (known.some((s) => s.id === top)) invalidate()
    })
    watcher.on('error', (e) => console.warn('[system-os] El vigilante de archivos se detuvo:', e.message))
  } catch (e) {
    console.warn('[system-os] No se pudo vigilar la carpeta de contenidos; los cambios aparecerán al recargar.', (e as Error).message)
  }

  return {
    subjects: getSubjects,
    corpus: getCorpus,
    onChange: (fn: () => void) => listeners.add(fn),
    close: () => watcher?.close(),
  }
}

export type ContentIndex = ReturnType<typeof createContentIndex>
