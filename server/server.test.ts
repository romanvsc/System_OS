import { test } from 'node:test'
import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { discoverSubjects, parseMeta, buildCorpus } from './content/scan.ts'
import { flattenDocs } from '../shared/docs.ts'
import { resolveInside } from './paths.ts'
import { scanSubject } from './content/scan.ts'
import { createWorkspaceStore } from './store/workspace.ts'

async function write(root: string, rel: string, content = '') {
  const file = path.join(root, rel)
  await fs.mkdir(path.dirname(file), { recursive: true })
  await fs.writeFile(file, content)
}

/** Réplica mínima de la estructura real de tecnicas_programacion. */
async function fixture() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'system-os-'))
  const s = 'tecnicas_programacion'
  await write(root, `${s}/materia.json`, JSON.stringify({ nombre: 'Técnicas de Programación', descripcion: 'd' }))
  await write(root, `${s}/pautas.md`, 'Copiá y pegá este prompt. Está adaptado para que resuelva cada ejercicio.')
  await write(root, `${s}/Pilas/Teoria.md`, '# Pilas: teoría básica\n\nUna **pila** es LIFO.')
  await write(root, `${s}/Pilas/Busqueda/busqueda.md`, '# Búsqueda en una pila enlazada')
  await write(root, `${s}/Pilas/Busqueda/busqueda.svg`, '<svg/>')
  await write(root, `${s}/Pilas/Busqueda/busqueda.png`)
  await write(root, `${s}/Pilas/Aaa/aaa.md`, '# Antes alfabéticamente')
  await write(root, `${s}/Pilas/TPN-1/TpN1.md`, 'Trabajo Práctico Nº 1\n1. Se cuenta con una pila')
  for (const n of ['02', '10', '01']) {
    await write(root, `${s}/Pilas/TPN-1/Ejercicio ${n}/ejercicio-${n}.md`, `# Trabajo práctico 1 — Ejercicio ${Number(n)}`)
    await write(root, `${s}/Pilas/TPN-1/Ejercicio ${n}/ejercicio-${n}.svg`, '<svg/>')
  }
  await write(root, 'Sistemas/README.md', '# Sin materia.json: no es materia')
  await write(root, 'suelto.pdf')
  return { root, s }
}

test('descubre solo carpetas con materia.json y respeta la estructura', async () => {
  const { root, s } = await fixture()
  const subjects = await discoverSubjects(root)
  assert.deepEqual(subjects.map((x) => x.id), [s])

  const [subject] = subjects
  assert.equal(subject.meta.nombre, 'Técnicas de Programación')
  assert.deepEqual(subject.resources.map((r) => [r.path, r.kind, r.title]), [['pautas.md', 'recurso', 'Pautas']], 'una oración larga no se usa como título')

  const [pilas] = subject.topics
  assert.equal(pilas.title, 'Pilas')
  // La teoría va primero aunque haya subtemas que la preceden alfabéticamente.
  assert.deepEqual(pilas.docs.map((d) => d.path), ['Pilas/Teoria.md', 'Pilas/Aaa/aaa.md', 'Pilas/Busqueda/busqueda.md'])
  assert.equal(pilas.docs[2].title, 'Búsqueda en una pila enlazada')
  assert.deepEqual(pilas.docs[2].assets.sort(), ['Pilas/Busqueda/busqueda.png', 'Pilas/Busqueda/busqueda.svg'])

  const [tp] = pilas.practicos
  assert.equal(tp.title, 'Trabajo práctico 1')
  assert.equal(tp.statement?.kind, 'practico')
  // Orden natural: 01, 02, 10.
  assert.deepEqual(tp.exercises.map((e) => e.label), ['Ejercicio 01', 'Ejercicio 02', 'Ejercicio 10'])
  assert.ok(tp.exercises.every((e) => e.kind === 'ejercicio' && e.assets.length === 1))

  assert.equal(flattenDocs(subject).length, 8)
  const corpus = await buildCorpus(subjects, root)
  assert.ok(corpus.find((c) => c.path === 'Pilas/Teoria.md')?.text.includes('Una pila es LIFO.'))
})

test('materia.json inválido no rompe la materia', () => {
  const { meta, warnings } = parseMeta('{ roto', 'mi_materia')
  assert.equal(meta.nombre, 'Mi materia')
  assert.equal(warnings.length, 1)
  assert.equal(parseMeta(JSON.stringify({ nombre: 'X', acento: 'rojo' }), 'x').warnings.length, 1)
})

test('resolveInside bloquea rutas fuera de la materia', () => {
  const base = path.resolve('/contenido/materia')
  assert.equal(resolveInside(base, 'Pilas/Teoria.md'), path.join(base, 'Pilas', 'Teoria.md'))
  assert.equal(resolveInside(base, '../otra/secreto.md'), null)
  assert.equal(resolveInside(base, '../../etc/passwd'), null)
  assert.equal(resolveInside(base, path.resolve('/otro/lado.md')), null)
  assert.equal(resolveInside(base, ''), null)
  assert.equal(resolveInside(base, 'a\0b'), null)
})

test('el store persiste, conserva copia previa y recupera un archivo dañado', async () => {
  const dir = await fs.mkdtemp(path.join(os.tmpdir(), 'system-os-data-'))
  const store = createWorkspaceStore(dir)
  const { result: note } = await store.createNote({ title: 'Pilas', body: 'LIFO' })
  await Promise.all([store.setProgress('m/a.md', true), store.setProgress('m/b.md', true), store.visit('m')])

  const reopened = createWorkspaceStore(dir)
  const ws = await reopened.read()
  assert.equal(ws.notes[0].id, note.id)
  assert.deepEqual(Object.keys(ws.progress).sort(), ['m/a.md', 'm/b.md'])
  assert.ok(ws.lastVisit.m > 0)

  await fs.writeFile(path.join(dir, 'workspace.json'), '{ dañado')
  const recovered = await createWorkspaceStore(dir).read()
  assert.equal(recovered.notes.length, 1, 'recupera desde workspace.prev.json')
  const files = await fs.readdir(dir)
  assert.ok(files.some((f) => f.startsWith('workspace.danado-')), 'el archivo dañado se aparta, no se borra')
})

test('el fondo por convención se usa y no aparece en recursos ni como diagrama', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'system-os-fondo-'))
  await write(root, 'm/materia.json', JSON.stringify({ nombre: 'M', lema: 'Una frase' }))
  await write(root, 'm/notas.md', '# Notas')
  await write(root, 'm/fondo.webp')
  await write(root, 'm/Tema/Teoria.md', '# Teoría')
  const s = await scanSubject(path.join(root, 'm'), 'm')
  assert.equal(s.meta.fondo, 'fondo.webp')
  assert.equal(s.meta.lema, 'Una frase')
  assert.deepEqual(s.resources.map((r) => r.path), ['notas.md'])
  assert.deepEqual(s.resources[0].assets, [], 'el fondo no se adjunta como diagrama de notas.md')
})

test('fondo en materia.json: ruta propia válida, ausente o fuera de la materia', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'system-os-fondo2-'))
  await write(root, 'a/materia.json', JSON.stringify({ nombre: 'A', fondo: 'arte/portada.png' }))
  await write(root, 'a/arte/portada.png')
  await write(root, 'b/materia.json', JSON.stringify({ nombre: 'B', fondo: 'no-existe.webp' }))
  await write(root, 'c/materia.json', JSON.stringify({ nombre: 'C', fondo: '../a/arte/portada.png' }))
  await write(root, 'd/materia.json', JSON.stringify({ nombre: 'D', fondo: 'portada.gif' }))
  const [a, b, c, d] = await Promise.all(['a', 'b', 'c', 'd'].map((id) => scanSubject(path.join(root, id), id)))
  assert.equal(a.meta.fondo, 'arte/portada.png')
  assert.equal(b.meta.fondo, undefined)
  assert.equal(b.warnings.length, 1)
  assert.equal(c.meta.fondo, undefined, 'no se puede salir de la carpeta de la materia')
  assert.equal(d.meta.fondo, undefined)
  assert.ok(d.warnings.some((w) => w.includes('"fondo"')))
})

test('temas en orden de cursada, enunciado suelto dentro de su TP y nombre desde la teoría', async () => {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'system-os-temas-'))
  const s = path.join(root, 'm')
  await write(s, 'materia.json', JSON.stringify({ nombre: 'M' }))
  await write(s, 'Arboles/Teoria.md', '# Árboles: teoría básica')
  await write(s, 'Arboles/TpN7.md', '# Trabajo Práctico N.º 7 — “Árboles”')
  await write(s, 'Arboles/TPN-7/Ejercicio 01/e.md', '# E1')
  await write(s, 'Colas/Teoria.md', '# Colas: teoría básica')
  await write(s, 'Colas/TpN2.md', '# Trabajo Práctico Nº2 “Colas”')
  await write(s, 'Colas/TPN-2/Ejercicio 01/e.md', '# E1')
  await write(s, 'Extra/nota.md', '# Sin TP')
  const subject = await scanSubject(s, 'm')

  assert.deepEqual(subject.topics.map((t) => t.title), ['Colas', 'Árboles', 'Extra'])
  const [colas] = subject.topics
  assert.deepEqual(colas.docs.map((d) => d.path), ['Colas/Teoria.md'], 'el enunciado ya no figura como teoría')
  assert.equal(colas.practicos[0].statement?.path, 'Colas/TpN2.md')
  assert.equal(colas.practicos[0].statement?.kind, 'practico')
  assert.equal(colas.practicos[0].title, 'Trabajo práctico 2')
})
