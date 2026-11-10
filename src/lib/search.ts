import type { CorpusEntry, DocKind, Note, Subject } from '../../shared/types.ts'

/** Minúsculas y sin tildes: "Búsqueda" encuentra "busqueda". */
export const normalize = (s: string) => s.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase()

export type SearchHit =
  | { type: 'subject'; subject: string; title: string; snippet: string; score: number }
  | { type: 'doc'; subject: string; path: string; kind: DocKind; title: string; context: string; snippet: string; score: number }
  | { type: 'note'; note: Note; title: string; snippet: string; score: number }

function snippet(text: string, normText: string, token: string, radius = 70) {
  const i = normText.indexOf(token)
  if (i < 0) return text.slice(0, radius * 2).trim()
  const start = Math.max(0, i - radius)
  const end = Math.min(text.length, i + token.length + radius)
  return `${start > 0 ? '…' : ''}${text.slice(start, end).replace(/\s+/g, ' ').trim()}${end < text.length ? '…' : ''}`
}

/** Todos los términos deben aparecer; los aciertos en el título pesan más. NFD conserva las posiciones en español. */
function score(title: string, body: string, tokens: string[]) {
  const t = normalize(title)
  const b = normalize(body)
  let total = 0
  for (const tok of tokens) {
    const inTitle = t.includes(tok)
    if (!inTitle && !b.includes(tok)) return 0
    total += inTitle ? (t.startsWith(tok) ? 12 : 8) : 1
  }
  return total
}

export function search(query: string, subjects: Subject[], corpus: CorpusEntry[], notes: Note[], limit = 40): SearchHit[] {
  const tokens = normalize(query).split(/\s+/).filter(Boolean)
  if (tokens.length === 0) return []
  const names = new Map(subjects.map((s) => [s.id, s.meta.nombre]))
  const hits: SearchHit[] = []

  for (const s of subjects) {
    const sc = score(s.meta.nombre, `${s.meta.descripcion} ${s.topics.map((t) => t.title).join(' ')}`, tokens)
    if (sc) hits.push({ type: 'subject', subject: s.id, title: s.meta.nombre, snippet: s.meta.descripcion, score: sc + 5 })
  }
  for (const c of corpus) {
    const sc = score(c.title, `${c.path} ${c.text}`, tokens)
    if (!sc) continue
    const topic = c.path.split('/')[0]
    hits.push({
      type: 'doc',
      subject: c.subject,
      path: c.path,
      kind: c.kind,
      title: c.title,
      context: [names.get(c.subject), c.kind === 'recurso' ? 'Recursos' : topic].filter(Boolean).join(' · '),
      snippet: snippet(c.text, normalize(c.text), tokens[0]),
      score: sc,
    })
  }
  for (const n of notes) {
    const title = n.title || 'Apunte sin título'
    const sc = score(title, n.body, tokens)
    if (sc) hits.push({ type: 'note', note: n, title, snippet: snippet(n.body, normalize(n.body), tokens[0]), score: sc + 1 })
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, limit)
}
