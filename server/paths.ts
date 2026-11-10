import path from 'node:path'

/** Resuelve una ruta pedida dentro de una carpeta; rechaza cualquier intento de salir de ella. */
export function resolveInside(baseDir: string, requested: string): string | null {
  if (requested.includes('\0')) return null
  const target = path.resolve(baseDir, requested)
  const rel = path.relative(baseDir, target)
  if (!rel || rel.startsWith('..') || path.isAbsolute(rel)) return null
  return target
}
