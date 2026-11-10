import type { Note } from '../../shared/types.ts'

/** Todos los apuntes en un único Markdown legible, con su vínculo a materia y documento. */
export function notesToMarkdown(notes: Note[]) {
  const date = (ts: number) => new Date(ts).toLocaleString('es')
  return [
    `# Apuntes — System OS`,
    `Exportado el ${date(Date.now())}. ${notes.length} apunte(s).`,
    ...notes.map((n) =>
      [
        `---\n\n## ${n.title || 'Apunte sin título'}`,
        [n.subject && `Materia: ${n.subject}`, n.docPath && `Documento: ${n.docPath}`, `Editado: ${date(n.updatedAt)}`].filter(Boolean).join(' · '),
        n.body,
      ].join('\n\n'),
    ),
  ].join('\n\n')
}
