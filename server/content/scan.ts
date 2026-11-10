import fs from 'node:fs/promises'
import path from 'node:path'
import { flattenDocs } from '../../shared/docs.ts'
import { resolveInside } from '../paths.ts'
import type { CorpusEntry, DocFormat, DocKind, DocNode, Practico, Subject, SubjectMeta, Topic } from '../../shared/types.ts'

export const META_FILE = 'materia.json'
const FONDO_EXT = /\.(webp|avif|jpe?g|png)$/i
const FONDO_FILE = /^fondo\.(webp|avif|jpe?g|png)$/i
const IMAGE_EXT = new Set(['.svg', '.png', '.jpg', '.jpeg', '.gif', '.webp'])
// Ocultos, privados y carpetas de herramientas no son contenido académico.
const IGNORED = /^(\.|_|~\$)|^(node_modules|materia\.json|desktop\.ini|thumbs\.db)$/i
const collator = new Intl.Collator('es', { numeric: true, sensitivity: 'base' })

const isTheory = (name: string) => /^teor/i.test(name)
const isPractico = (name: string) => /^(tp|trabajo)/i.test(name)
const toPosix = (p: string) => p.split(path.sep).join('/')

export function formatOf(name: string): DocFormat {
  const ext = path.extname(name).toLowerCase()
  if (ext === '.md') return 'md'
  if (ext === '.pdf') return 'pdf'
  if (IMAGE_EXT.has(ext)) return 'image'
  return 'other'
}

export function prettify(name: string): string {
  const base = name.replace(/\.[^.]+$/, '').replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim()
  return base.charAt(0).toLocaleUpperCase('es') + base.slice(1)
}

/** Quita la sintaxis Markdown más común para obtener texto plano (búsqueda y títulos). */
export function stripMarkdown(md: string): string {
  return md
    .replace(/```[^\n]*\n?/g, '')
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^\s{0,3}(#{1,6}|>|[-*+]|\d+\.)\s+/gm, '')
    .replace(/[*_`|]/g, '')
    .replace(/[ \t]+/g, ' ')
}

export function titleFromMarkdown(md: string): string | null {
  const h1 = /^#\s+(.+)$/m.exec(md)
  if (h1) return stripMarkdown(h1[1]).trim() || null
  // Sin H1, la primera línea vale como título solo si parece uno ("Trabajo Práctico Nº 1"), no una oración larga.
  const first = stripMarkdown(md.split(/\r?\n/).find((l) => l.trim().length > 0) ?? '').trim()
  return first && first.length <= 60 && !/[.:;]$/.test(first) ? first : null
}

interface Entry {
  name: string
  abs: string
}

async function listDir(abs: string) {
  const entries = await fs.readdir(abs, { withFileTypes: true })
  const visible = entries.filter((e) => !IGNORED.test(e.name)).sort((a, b) => collator.compare(a.name, b.name))
  const toEntry = (e: { name: string }): Entry => ({ name: e.name, abs: path.join(abs, e.name) })
  return { dirs: visible.filter((e) => e.isDirectory()).map(toEntry), files: visible.filter((e) => e.isFile()).map(toEntry) }
}

/**
 * Documentos de una sola carpeta. Las imágenes se adjuntan como diagramas al .md con el mismo nombre
 * (o al primero de la carpeta); solo si no hay ningún .md se listan como documentos propios.
 */
async function docsInFolder(absDir: string, root: string, kind: DocKind, opts: { theoryFirst?: boolean } = {}) {
  const { files } = await listDir(absDir)
  const mds = files.filter((f) => formatOf(f.name) === 'md')
  const images = files.filter((f) => formatOf(f.name) === 'image')
  const others = files.filter((f) => formatOf(f.name) !== 'md' && formatOf(f.name) !== 'image')
  const rel = (abs: string) => toPosix(path.relative(root, abs))
  const folderLabel = prettify(path.basename(absDir))

  const docs: DocNode[] = []
  for (const f of mds) {
    const title = titleFromMarkdown(await fs.readFile(f.abs, 'utf8')) ?? prettify(f.name)
    docs.push({ path: rel(f.abs), title, label: title, kind, format: 'md', assets: [] })
  }
  for (const img of images) {
    const stem = img.name.replace(/\.[^.]+$/, '').toLowerCase()
    const owner = docs.find((d) => path.posix.basename(d.path, '.md').toLowerCase() === stem) ?? docs[0]
    if (owner) owner.assets.push(rel(img.abs))
  }
  if (docs.length === 0) others.push(...images)
  for (const f of others) {
    docs.push({ path: rel(f.abs), title: prettify(f.name), label: prettify(f.name), kind, format: formatOf(f.name), assets: [] })
  }
  // Un ejercicio suele ser una carpeta con un único .md: el nombre de la carpeta ("Ejercicio 01") es la mejor etiqueta.
  if (kind === 'ejercicio' && mds.length === 1) docs[0].label = folderLabel
  if (opts.theoryFirst) docs.sort((a, b) => Number(isTheory(path.posix.basename(b.path))) - Number(isTheory(path.posix.basename(a.path))))
  return docs
}

async function walkDocs(absDir: string, root: string, kind: DocKind): Promise<DocNode[]> {
  const docs = await docsInFolder(absDir, root, kind)
  for (const sub of (await listDir(absDir)).dirs) docs.push(...(await walkDocs(sub.abs, root, kind)))
  return docs
}

async function scanPractico(absDir: string, root: string): Promise<Practico> {
  const own = await docsInFolder(absDir, root, 'practico')
  const statement = own.find((d) => d.format === 'md') ?? null
  const exercises = own.filter((d) => d !== statement)
  for (const sub of (await listDir(absDir)).dirs) exercises.push(...(await walkDocs(sub.abs, root, 'ejercicio')))
  return { id: toPosix(path.relative(root, absDir)), title: statement?.title ?? prettify(path.basename(absDir)), statement, exercises }
}

async function scanTopic(absDir: string, root: string): Promise<Topic | null> {
  const docs = await docsInFolder(absDir, root, 'teoria', { theoryFirst: true })
  const practicos: Practico[] = []
  for (const sub of (await listDir(absDir)).dirs) {
    if (isPractico(sub.name)) practicos.push(await scanPractico(sub.abs, root))
    else docs.push(...(await walkDocs(sub.abs, root, 'teoria')))
  }
  if (docs.length === 0 && practicos.length === 0) return null
  return { id: toPosix(path.relative(root, absDir)), title: prettify(path.basename(absDir)), docs, practicos }
}

export function parseMeta(raw: string | null, id: string): { meta: SubjectMeta; warnings: string[] } {
  const meta: SubjectMeta = { nombre: prettify(id), descripcion: '', acento: '#F97316', orden: 100 }
  const warnings: string[] = []
  if (raw === null) return { meta, warnings }
  let data: unknown
  try {
    data = JSON.parse(raw.replace(/^﻿/, ''))
  } catch (e) {
    return { meta, warnings: [`${META_FILE} no es JSON válido: ${(e as Error).message}`] }
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return { meta, warnings: [`${META_FILE} debe ser un objeto.`] }
  const d = data as Record<string, unknown>
  const str = (k: string) => (typeof d[k] === 'string' && (d[k] as string).trim() ? (d[k] as string).trim() : undefined)
  meta.nombre = str('nombre') ?? meta.nombre
  meta.descripcion = str('descripcion') ?? ''
  meta.icono = str('icono')
  meta.lema = str('lema')
  if (d.fondo !== undefined) {
    if (typeof d.fondo === 'string' && FONDO_EXT.test(d.fondo)) meta.fondo = d.fondo.replace(/\\/g, '/')
    else warnings.push('"fondo" debe ser una imagen .webp, .avif, .jpg o .png.')
  }
  if (d.acento !== undefined) {
    if (typeof d.acento === 'string' && /^#[0-9a-f]{6}$/i.test(d.acento)) meta.acento = d.acento
    else warnings.push('"acento" debe ser un color #RRGGBB.')
  }
  if (d.orden !== undefined) {
    if (typeof d.orden === 'number' && Number.isFinite(d.orden)) meta.orden = d.orden
    else warnings.push('"orden" debe ser un número.')
  }
  if (!str('nombre')) warnings.push('Falta "nombre"; se usa el nombre de la carpeta.')
  return { meta, warnings }
}

export async function scanSubject(absDir: string, id: string): Promise<Subject> {
  const raw = await fs.readFile(path.join(absDir, META_FILE), 'utf8').catch(() => null)
  const { meta, warnings } = parseMeta(raw, id)
  const { dirs } = await listDir(absDir)
  const topics: Topic[] = []
  for (const dir of dirs) {
    const topic = await scanTopic(dir.abs, absDir)
    if (topic) topics.push(topic)
  }
  const resources = await docsInFolder(absDir, absDir, 'recurso')
  const subject: Subject = { id, meta, topics, resources, warnings }
  await resolveFondo(subject, absDir)
  return subject
}

/**
 * El fondo es "fondo".{webp,avif,jpg,png} en la raíz o la ruta de materia.json (siempre dentro de la materia).
 * Es decoración de la app: se quita de los recursos y de los diagramas para no mezclarlo con el contenido.
 */
async function resolveFondo(subject: Subject, absDir: string) {
  const { meta, warnings } = subject
  let fondo: string | undefined
  if (meta.fondo) {
    const abs = resolveInside(absDir, meta.fondo)
    const ok = abs && (await fs.stat(abs).then((s) => s.isFile(), () => false))
    if (ok) fondo = toPosix(path.relative(absDir, abs))
    else warnings.push(`No se encontró el fondo "${meta.fondo}" dentro de la materia.`)
  } else {
    fondo = (await listDir(absDir)).files.find((f) => FONDO_FILE.test(f.name))?.name
  }
  meta.fondo = fondo
  if (!fondo) return
  subject.resources = subject.resources.filter((r) => r.path !== fondo)
  for (const doc of flattenDocs(subject)) doc.assets = doc.assets.filter((a) => a !== fondo)
}

/** Una carpeta de primer nivel es materia solo si contiene materia.json. */
export async function discoverSubjects(contentRoot: string): Promise<Subject[]> {
  const { dirs } = await listDir(contentRoot)
  const subjects: Subject[] = []
  for (const dir of dirs) {
    const isSubject = await fs.stat(path.join(dir.abs, META_FILE)).then((s) => s.isFile(), () => false)
    if (isSubject) subjects.push(await scanSubject(dir.abs, dir.name))
  }
  return subjects.sort((a, b) => a.meta.orden - b.meta.orden || collator.compare(a.meta.nombre, b.meta.nombre))
}

export async function buildCorpus(subjects: Subject[], contentRoot: string): Promise<CorpusEntry[]> {
  const corpus: CorpusEntry[] = []
  for (const s of subjects) {
    for (const d of flattenDocs(s)) {
      const text = d.format === 'md' ? stripMarkdown(await fs.readFile(path.join(contentRoot, s.id, d.path), 'utf8').catch(() => '')) : ''
      corpus.push({ subject: s.id, path: d.path, title: d.title, kind: d.kind, text })
    }
  }
  return corpus
}
