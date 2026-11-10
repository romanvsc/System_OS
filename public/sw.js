/*
 * Service worker de la versión publicada (solo se registra en el build estático).
 * - Al instalarse, guarda la app y todo el contenido (lista en /api/precache.json): funciona sin internet.
 * - Navegación: red primero y, sin conexión, la copia de index.html.
 * - Resto (assets y contenido): copia guardada al instante y actualización en segundo plano.
 */
const CACHE = 'system-os-v1'

self.addEventListener('install', (event) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE)
      const list = await fetch('/api/precache.json', { cache: 'no-store' }).then((r) => r.json()).catch(() => ['/'])
      // Uno por uno: si un archivo falla, el resto igual queda guardado.
      await Promise.all(list.map((url) => cache.add(new Request(url, { cache: 'reload' })).catch(() => {})))
      await self.skipWaiting()
    })(),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      for (const key of await caches.keys()) if (key !== CACHE) await caches.delete(key)
      await self.clients.claim()
    })(),
  )
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)
  if (request.method !== 'GET' || url.origin !== self.location.origin) return

  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put('/', copy))
          return res
        })
        .catch(() => caches.match('/')),
    )
    return
  }

  event.respondWith(
    caches.open(CACHE).then(async (cache) => {
      const cached = await cache.match(request, { ignoreSearch: true })
      const network = fetch(request)
        .then((res) => {
          if (res.ok) cache.put(request, res.clone())
          return res
        })
        .catch(() => cached)
      return cached ?? network
    }),
  )
})
