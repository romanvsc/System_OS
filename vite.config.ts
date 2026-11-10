import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'
import { systemOs } from './server/plugin.ts'

// Carpeta donde viven las materias (cada una con su materia.json). Por defecto, la carpeta que contiene a system-os.
const contentRoot = path.resolve(process.env.CONTENT_ROOT ?? path.resolve(import.meta.dirname, '..'))
const dataDir = path.resolve(process.env.DATA_DIR ?? path.resolve(import.meta.dirname, 'data'))

// Puerto propio y fijo: el origen (y con él las preferencias guardadas en el navegador) no cambia, y no choca con otros proyectos Vite en 5173.
export default defineConfig({
  plugins: [react(), tailwindcss(), systemOs({ contentRoot, dataDir })],
  server: { host: '127.0.0.1', port: 4317, strictPort: true, open: !process.env.NO_OPEN },
  build: { chunkSizeWarningLimit: 700 }, // app local: el bundle principal (~180 kB gzip) se carga desde disco
  preview: { host: '127.0.0.1', port: 4318, strictPort: true, open: !process.env.NO_OPEN },
})
