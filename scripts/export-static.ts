/**
 * Contenido para la versión publicada (móvil / Vercel), reutilizando el mismo escáner que el servidor local.
 *
 *   node --import tsx scripts/export-static.ts <origen> <destino> --copia
 *     Copia cada materia (materia.json y archivos con formato conocido) a <destino>/<materia>/.
 *     Se usa para llevar las materias de iAes/ a content/, que es lo que se sube al repo.
 *
 *   node --import tsx scripts/export-static.ts <origen> <dist>
 *     Genera <dist>/api/subjects.json y corpus.json, y copia los archivos a <dist>/api/file/<materia>/…,
 *     las mismas rutas que sirve el servidor local.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { buildCorpus, discoverSubjects, IGNORED, META_FILE } from '../server/content/scan.ts'
import { MIME } from '../server/routes.ts'

const [source, target, flag] = process.argv.slice(2)
if (!source || !target) {
  console.error('Uso: export-static.ts <origen> <destino> [--copia]')
  process.exit(1)
}
const copyMode = flag === '--copia'

async function copyTree(from: string, to: string): Promise<number> {
  let count = 0
  for (const e of await fs.readdir(from, { withFileTypes: true })) {
    if (IGNORED.test(e.name) && e.name !== META_FILE) continue
    const src = path.join(from, e.name)
    const dst = path.join(to, e.name)
    if (e.isDirectory()) count += await copyTree(src, dst)
    else if (e.isFile() && (e.name === META_FILE || MIME[path.extname(e.name).toLowerCase()])) {
      await fs.mkdir(to, { recursive: true })
      await fs.copyFile(src, dst)
      count++
    }
  }
  return count
}

const root = path.resolve(source)
const subjects = await discoverSubjects(root)
if (subjects.length === 0) console.warn(`[export-static] No hay materias (carpetas con ${META_FILE}) en ${root}`)

if (copyMode) {
  await fs.rm(target, { recursive: true, force: true })
  for (const s of subjects) console.log(`${s.id}: ${await copyTree(path.join(root, s.id), path.join(target, s.id))} archivos`)
} else {
  const api = path.join(target, 'api')
  await fs.mkdir(api, { recursive: true })
  await fs.writeFile(path.join(api, 'subjects.json'), JSON.stringify(subjects))
  await fs.writeFile(path.join(api, 'corpus.json'), JSON.stringify(await buildCorpus(subjects, root)))
  for (const s of subjects) console.log(`${s.id}: ${await copyTree(path.join(root, s.id), path.join(api, 'file', s.id))} archivos`)

  // Lista para el service worker: la app y todo el contenido quedan disponibles sin conexión.
  const urls: string[] = []
  const walk = async (dir: string) => {
    for (const e of await fs.readdir(dir, { withFileTypes: true })) {
      const abs = path.join(dir, e.name)
      if (e.isDirectory()) await walk(abs)
      else urls.push('/' + path.relative(target, abs).split(path.sep).map(encodeURIComponent).join('/'))
    }
  }
  await walk(target)
  const precache = ['/', ...urls.filter((u) => !/\/(index\.html|sw\.js)$/.test(u))]
  await fs.writeFile(path.join(api, 'precache.json'), JSON.stringify(precache))
  console.log(`precache: ${precache.length} URLs`)
}
