/** Resolución de enlaces relativos de un documento (las rutas del contenido usan siempre "/"). */
export function resolveRelative(docPath: string, href: string): string | null {
  const clean = href.split(/[?#]/)[0]
  if (!clean) return null
  let decoded: string
  try {
    decoded = decodeURI(clean)
  } catch {
    decoded = clean
  }
  const parts = docPath.split('/').slice(0, -1)
  for (const seg of decoded.replace(/\\/g, '/').split('/')) {
    if (seg === '' || seg === '.') continue
    if (seg === '..') {
      if (!parts.length) return null
      parts.pop()
    } else parts.push(seg)
  }
  return parts.join('/')
}

export const isExternal = (href: string) => /^[a-z][a-z0-9+.-]*:/i.test(href)
export const isImagePath = (p: string) => /\.(svg|png|jpe?g|gif|webp)$/i.test(p)

/** Si la primera línea con texto es el título del documento, se quita: el título se muestra aparte. */
export function stripLeadingTitle(md: string, title: string): string {
  const lines = md.split(/\r?\n/)
  const i = lines.findIndex((l) => l.trim())
  if (i < 0) return md
  const line = lines[i].trim()
  const plain = line.replace(/^#\s+/, '').replace(/[*_`]/g, '').trim()
  if (/^#\s/.test(line) || plain === title) lines.splice(i, 1)
  return lines.join('\n')
}

/** Rutas (resueltas) de todas las imágenes enlazadas desde el Markdown. */
export function linkedImages(docPath: string, md: string): string[] {
  const out: string[] = []
  for (const m of md.matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
    if (isExternal(m[1])) continue
    const p = resolveRelative(docPath, m[1])
    if (p && isImagePath(p)) out.push(p)
  }
  return out
}
