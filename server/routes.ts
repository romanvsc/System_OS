import fs from 'node:fs'
import path from 'node:path'
import type { IncomingMessage, ServerResponse } from 'node:http'
import type { WorkspaceStore } from './store/workspace.ts'
import type { ContentIndex } from './content/index.ts'
import type { ServerInfo } from '../shared/types.ts'
import { resolveInside } from './paths.ts'

const MIME: Record<string, string> = {
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.pptx': 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
  '.xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}
const MAX_BODY = 1_000_000

class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message)
  }
}

function send(res: ServerResponse, status: number, body: unknown) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.end(JSON.stringify(body))
}

async function readBody(req: IncomingMessage): Promise<Record<string, unknown>> {
  if (!req.headers['content-type']?.startsWith('application/json')) throw new HttpError(415, 'Se esperaba JSON.')
  let size = 0
  const chunks: Buffer[] = []
  for await (const chunk of req) {
    size += (chunk as Buffer).length
    if (size > MAX_BODY) throw new HttpError(413, 'Contenido demasiado grande.')
    chunks.push(chunk as Buffer)
  }
  try {
    const value = JSON.parse(Buffer.concat(chunks).toString('utf8') || '{}')
    if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error()
    return value
  } catch {
    throw new HttpError(400, 'JSON inválido.')
  }
}

const optString = (v: unknown, field: string, max: number) => {
  if (v === undefined) return undefined
  if (typeof v !== 'string' || v.length > max) throw new HttpError(400, `"${field}" inválido.`)
  return v
}

export { resolveInside }

export function createApi(opts: { contentRoot: string; index: ContentIndex; store: WorkspaceStore }) {
  const { contentRoot, index, store } = opts

  async function serveFile(req: IncomingMessage, res: ServerResponse, rest: string, download: boolean) {
    const [subjectId, ...parts] = rest.split('/').map((p) => decodeURIComponent(p))
    const subjects = await index.subjects()
    if (!subjects.some((s) => s.id === subjectId)) throw new HttpError(404, 'Materia no encontrada.')
    const file = resolveInside(path.join(contentRoot, subjectId), parts.join('/'))
    const type = file && MIME[path.extname(file).toLowerCase()]
    if (!file || !type) throw new HttpError(404, 'Archivo no disponible.')
    const stat = await fs.promises.stat(file).catch(() => null)
    if (!stat?.isFile()) throw new HttpError(404, 'Archivo no encontrado.')
    res.statusCode = 200
    res.setHeader('Content-Type', type)
    res.setHeader('Content-Length', stat.size)
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('X-Content-Type-Options', 'nosniff')
    // Un SVG abierto directamente no debe poder ejecutar scripts.
    if (type === 'image/svg+xml') res.setHeader('Content-Security-Policy', "default-src 'none'; style-src 'unsafe-inline'; img-src data:")
    if (download) res.setHeader('Content-Disposition', `attachment; filename*=UTF-8''${encodeURIComponent(path.basename(file))}`)
    if (req.method === 'HEAD') return void res.end()
    fs.createReadStream(file).pipe(res)
  }

  async function handle(req: IncomingMessage, res: ServerResponse) {
    const url = new URL(req.url ?? '/', 'http://localhost')
    const route = url.pathname.slice('/api/'.length)
    const method = req.method ?? 'GET'

    // Solo la propia app puede modificar datos (evita que otra página del navegador escriba en localhost).
    if (method !== 'GET' && method !== 'HEAD') {
      const origin = req.headers.origin
      const host = origin ? URL.parse(origin)?.host : req.headers.host
      if (host !== req.headers.host) throw new HttpError(403, 'Origen no permitido.')
    }

    if (route === 'info' && method === 'GET') return send(res, 200, { contentRoot, dataFile: store.file } satisfies ServerInfo)
    if (route === 'subjects' && method === 'GET') return send(res, 200, await index.subjects())
    if (route === 'corpus' && method === 'GET') return send(res, 200, await index.corpus())
    if (route.startsWith('file/') && (method === 'GET' || method === 'HEAD'))
      return serveFile(req, res, route.slice('file/'.length), url.searchParams.has('download'))

    if (route === 'workspace' && method === 'GET') {
      const ws = await store.read()
      if (url.searchParams.has('download')) {
        const stamp = new Date().toISOString().slice(0, 10)
        res.setHeader('Content-Disposition', `attachment; filename="system-os-respaldo-${stamp}.json"`)
      }
      return send(res, 200, ws)
    }
    if (route === 'progress' && method === 'PUT') {
      const body = await readBody(req)
      const key = optString(body.key, 'key', 1000)
      if (!key || typeof body.done !== 'boolean') throw new HttpError(400, 'Se esperaba { key, done }.')
      return send(res, 200, (await store.setProgress(key, body.done)).ws)
    }
    if (route === 'visit' && method === 'POST') {
      const body = await readBody(req)
      const subject = optString(body.subject, 'subject', 200)
      if (!subject) throw new HttpError(400, 'Falta "subject".')
      return send(res, 200, (await store.visit(subject, optString(body.path, 'path', 1000))).ws)
    }
    if (route === 'notes' && method === 'POST') {
      const body = await readBody(req)
      const input = {
        title: optString(body.title, 'title', 300) ?? '',
        body: optString(body.body, 'body', MAX_BODY) ?? '',
        subject: optString(body.subject, 'subject', 200),
        docPath: optString(body.docPath, 'docPath', 1000),
      }
      const { ws, result } = await store.createNote(input)
      return send(res, 201, { workspace: ws, note: result })
    }
    const noteMatch = /^notes\/([\w-]+)$/.exec(route)
    if (noteMatch && method === 'PUT') {
      const body = await readBody(req)
      const patch = { title: optString(body.title, 'title', 300), body: optString(body.body, 'body', MAX_BODY) }
      const { ws, result } = await store.updateNote(noteMatch[1], Object.fromEntries(Object.entries(patch).filter(([, v]) => v !== undefined)))
      if (!result) throw new HttpError(404, 'Apunte no encontrado.')
      return send(res, 200, { workspace: ws, note: result })
    }
    if (noteMatch && method === 'DELETE') {
      const { ws, result } = await store.deleteNote(noteMatch[1])
      if (!result) throw new HttpError(404, 'Apunte no encontrado.')
      return send(res, 200, ws)
    }
    throw new HttpError(404, 'Ruta desconocida.')
  }

  return async (req: IncomingMessage, res: ServerResponse, next: () => void) => {
    if (!req.url?.startsWith('/api/')) return next()
    try {
      await handle(req, res)
    } catch (e) {
      const status = e instanceof HttpError ? e.status : 500
      if (status === 500) console.error('[system-os]', e)
      if (!res.headersSent) send(res, status, { error: e instanceof HttpError ? e.message : 'Error interno del servidor local.' })
      else res.end()
    }
  }
}
