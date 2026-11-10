import path from 'node:path'
import type { Plugin } from 'vite'
import { createContentIndex } from './content/index.ts'
import { createWorkspaceStore } from './store/workspace.ts'
import { createApi } from './routes.ts'

/** Servidor local de System OS: se monta dentro de Vite (dev y preview), sin procesos aparte. */
export function systemOs(opts: { contentRoot: string; dataDir: string }): Plugin {
  const appDir = path.resolve(import.meta.dirname, '..')
  let index: ReturnType<typeof createContentIndex> | null = null
  const setup = () => {
    index ??= createContentIndex(opts.contentRoot, appDir)
    return createApi({ contentRoot: opts.contentRoot, index, store: createWorkspaceStore(opts.dataDir) })
  }

  return {
    name: 'system-os-local-server',
    configureServer(server) {
      const api = setup()
      index!.onChange(() => server.ws.send({ type: 'custom', event: 'content:changed' }))
      server.middlewares.use(api)
      server.httpServer?.on('close', () => index?.close())
      server.config.logger.info(`  Contenidos: ${opts.contentRoot}\n  Datos personales: ${opts.dataDir}`)
    },
    configurePreviewServer(server) {
      server.middlewares.use(setup())
      server.httpServer?.on('close', () => index?.close())
    },
  }
}
