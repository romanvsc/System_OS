import fs from 'node:fs/promises'
import path from 'node:path'
import { randomUUID } from 'node:crypto'
import type { Note, Workspace } from '../../shared/types.ts'

const empty = (): Workspace => ({ version: 1, notes: [], progress: {}, lastVisit: {} })

function isWorkspace(v: unknown): v is Workspace {
  const w = v as Workspace
  return !!w && w.version === 1 && Array.isArray(w.notes) && typeof w.progress === 'object' && typeof w.lastVisit === 'object'
}

async function readJson(file: string): Promise<{ ok: true; value: Workspace } | { ok: false; missing: boolean }> {
  let raw: string
  try {
    raw = await fs.readFile(file, 'utf8')
  } catch {
    return { ok: false, missing: true }
  }
  try {
    const value = JSON.parse(raw)
    return isWorkspace(value) ? { ok: true, value } : { ok: false, missing: false }
  } catch {
    return { ok: false, missing: false }
  }
}

async function renameWithRetry(from: string, to: string) {
  // En Windows el antivirus o el indexador pueden bloquear el archivo un instante.
  for (let i = 0; ; i++) {
    try {
      return await fs.rename(from, to)
    } catch (e) {
      if (i >= 5 || !['EPERM', 'EBUSY', 'EACCES'].includes((e as NodeJS.ErrnoException).code ?? '')) throw e
      await new Promise((r) => setTimeout(r, 50 * (i + 1)))
    }
  }
}

/**
 * Datos personales en un único JSON (data/workspace.json).
 * Escritura atómica (tmp + rename) y copia previa en workspace.prev.json: nunca se pierde lo ya guardado.
 */
export function createWorkspaceStore(dataDir: string) {
  const file = path.join(dataDir, 'workspace.json')
  const prev = path.join(dataDir, 'workspace.prev.json')
  let cache: Workspace | null = null
  // Solo se copia a .prev un workspace.json que se leyó bien: nunca se pisa la copia buena con uno dañado.
  let mainIsValid = false
  let queue: Promise<unknown> = Promise.resolve()

  async function load(): Promise<Workspace> {
    if (cache) return cache
    await fs.mkdir(dataDir, { recursive: true })
    const main = await readJson(file)
    if (main.ok) {
      mainIsValid = true
      return (cache = main.value)
    }
    if (!main.missing) {
      // Archivo dañado: se aparta (no se borra) y se intenta recuperar la copia previa.
      const aside = path.join(dataDir, `workspace.danado-${Date.now()}.json`)
      await fs.copyFile(file, aside)
      console.warn(`[system-os] workspace.json estaba dañado; se guardó una copia en ${aside}`)
    }
    const backup = await readJson(prev)
    return (cache = backup.ok ? backup.value : empty())
  }

  async function save(ws: Workspace) {
    const tmp = `${file}.tmp`
    await fs.writeFile(tmp, JSON.stringify(ws, null, 2), 'utf8')
    if (mainIsValid) await fs.copyFile(file, prev).catch(() => undefined)
    await renameWithRetry(tmp, file)
    mainIsValid = true
    cache = ws
  }

  /** Serializa las modificaciones para que dos peticiones simultáneas no se pisen. */
  function update<T>(fn: (ws: Workspace) => T): Promise<{ ws: Workspace; result: T }> {
    const run = queue.then(async () => {
      const ws: Workspace = structuredClone(await load())
      const result = fn(ws)
      await save(ws)
      return { ws, result }
    })
    queue = run.catch(() => undefined)
    return run
  }

  return {
    file,
    read: load,
    setProgress: (key: string, done: boolean) =>
      update((ws) => {
        if (done) ws.progress[key] = Date.now()
        else delete ws.progress[key]
      }),
    visit: (subject: string, docPath?: string) =>
      update((ws) => {
        ws.lastVisit[subject] = Date.now()
        if (docPath) (ws.lastDoc ??= {})[subject] = docPath
      }),
    createNote: (input: Pick<Note, 'title' | 'body' | 'subject' | 'docPath'>) =>
      update((ws) => {
        const now = Date.now()
        const note: Note = { id: randomUUID(), ...input, createdAt: now, updatedAt: now }
        ws.notes.unshift(note)
        return note
      }),
    updateNote: (id: string, patch: Partial<Pick<Note, 'title' | 'body'>>) =>
      update((ws) => {
        const note = ws.notes.find((n) => n.id === id)
        if (!note) return null
        Object.assign(note, patch, { updatedAt: Date.now() })
        return note
      }),
    deleteNote: (id: string) =>
      update((ws) => {
        const before = ws.notes.length
        ws.notes = ws.notes.filter((n) => n.id !== id)
        return ws.notes.length < before
      }),
  }
}

export type WorkspaceStore = ReturnType<typeof createWorkspaceStore>
