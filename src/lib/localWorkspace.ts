import type { Note, Workspace } from '../../shared/types.ts'

/**
 * Datos personales en la versión publicada (móvil): mismas operaciones que server/store/workspace.ts,
 * guardadas en este navegador. No se sincronizan con la PC.
 */
const KEY = 'system-os-workspace'
const empty = (): Workspace => ({ version: 1, notes: [], progress: {}, lastVisit: {} })

function load(): Workspace {
  try {
    const ws = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    if (ws && ws.version === 1 && Array.isArray(ws.notes) && typeof ws.progress === 'object' && typeof ws.lastVisit === 'object') return ws
  } catch {
    // Dato ilegible o almacenamiento bloqueado: se arranca vacío.
  }
  return empty()
}

function update<T>(fn: (ws: Workspace) => T): { ws: Workspace; result: T } {
  const ws = load()
  const result = fn(ws)
  try {
    localStorage.setItem(KEY, JSON.stringify(ws))
  } catch {
    throw new Error('No se pudo guardar en este dispositivo (almacenamiento lleno o bloqueado).')
  }
  return { ws, result }
}

export const localWorkspace = {
  read: async () => load(),
  setProgress: async (key: string, done: boolean) =>
    update((ws) => {
      if (done) ws.progress[key] = Date.now()
      else delete ws.progress[key]
    }).ws,
  visit: async (subject: string, docPath?: string) =>
    update((ws) => {
      ws.lastVisit[subject] = Date.now()
      if (docPath) (ws.lastDoc ??= {})[subject] = docPath
    }).ws,
  createNote: async (input: Pick<Note, 'title' | 'body' | 'subject' | 'docPath'>) => {
    const { ws, result } = update((ws) => {
      const now = Date.now()
      const note: Note = { id: crypto.randomUUID(), ...input, createdAt: now, updatedAt: now }
      ws.notes.unshift(note)
      return note
    })
    return { workspace: ws, note: result }
  },
  updateNote: async (id: string, patch: Partial<Pick<Note, 'title' | 'body'>>) => {
    const { ws, result } = update((ws) => {
      const note = ws.notes.find((n) => n.id === id)
      if (note) Object.assign(note, patch, { updatedAt: Date.now() })
      return note
    })
    if (!result) throw new Error('El apunte ya no existe.')
    return { workspace: ws, note: result }
  },
  deleteNote: async (id: string) =>
    update((ws) => {
      ws.notes = ws.notes.filter((n) => n.id !== id)
    }).ws,
}
