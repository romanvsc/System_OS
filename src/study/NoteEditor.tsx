import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useQueryClient } from '@tanstack/react-query'
import { Link2, Trash2 } from 'lucide-react'
import type { Note, Subject } from '../../shared/types.ts'
import { saveNote, useDeleteNote } from '../lib/api.ts'
import { docRoute, locateDoc } from '../lib/subject.ts'
import { cx } from '../ui/primitives.tsx'

type SaveState = 'guardado' | 'pendiente' | 'guardando' | 'error'
const DEBOUNCE = 600

/**
 * Editor de apunte con guardado automático. Los cambios pendientes se envían también al cambiar de apunte
 * o cerrar la pestaña (fetch keepalive), para no perder lo último que se escribió.
 */
export function NoteEditor({ note, subjects, onDeleted }: { note: Note; subjects: Subject[]; onDeleted: () => void }) {
  const qc = useQueryClient()
  const del = useDeleteNote()
  const [title, setTitle] = useState(note.title)
  const [body, setBody] = useState(note.body)
  const [mode, setMode] = useState<'editar' | 'vista'>(note.body ? 'vista' : 'editar')
  const [state, setState] = useState<SaveState>('guardado')
  const [confirming, setConfirming] = useState(false)
  const pending = useRef<{ title: string; body: string } | null>(null)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const titleRef = useRef<HTMLInputElement>(null)

  const flush = useCallback(
    async (keepalive = false) => {
      clearTimeout(timer.current)
      const patch = pending.current
      if (!patch) return
      pending.current = null
      setState('guardando')
      try {
        const { workspace } = await saveNote(note.id, patch, keepalive)
        qc.setQueryData(['workspace'], workspace)
        if (!pending.current) setState('guardado')
      } catch {
        // Se conserva lo escrito para reintentar con el próximo cambio.
        pending.current ??= patch
        setState('error')
      }
    },
    [note.id, qc],
  )

  const change = (next: { title?: string; body?: string }) => {
    const t = next.title ?? title
    const b = next.body ?? body
    setTitle(t)
    setBody(b)
    pending.current = { title: t, body: b }
    setState('pendiente')
    clearTimeout(timer.current)
    timer.current = setTimeout(() => void flush(), DEBOUNCE)
  }

  // Un apunte recién creado (vacío) arranca con el foco en el título. Solo al montar.
  const startsEmpty = useRef(!note.title && !note.body)
  useEffect(() => {
    if (startsEmpty.current) titleRef.current?.focus()
  }, [])

  useEffect(() => {
    const onHide = () => void flush(true)
    window.addEventListener('pagehide', onHide)
    return () => {
      window.removeEventListener('pagehide', onHide)
      void flush(true)
    }
  }, [flush])

  const subject = subjects.find((s) => s.id === note.subject)
  const linked = subject && note.docPath ? locateDoc(subject, note.docPath)?.doc : undefined

  return (
    <div className="flex h-full flex-col rounded-[var(--radius-panel)] border border-note/15 bg-note-soft">
      <div className="flex flex-wrap items-center gap-2 border-b border-line px-4 py-2.5 sm:px-6">
        <div role="tablist" aria-label="Modo del editor" className="flex rounded-md bg-bg/40 p-0.5">
          {(['editar', 'vista'] as const).map((m) => (
            <button
              key={m}
              type="button"
              role="tab"
              aria-selected={mode === m}
              onClick={() => setMode(m)}
              className={cx('pressable rounded px-2.5 py-1 text-xs', mode === m ? 'bg-surface-2 text-ink' : 'text-ink-2 hover:text-ink')}
            >
              {m === 'editar' ? 'Escribir' : 'Vista previa'}
            </button>
          ))}
        </div>
        <span role="status" className={cx('ml-auto text-xs', state === 'error' ? 'text-danger' : 'text-ink-3')}>
          {state === 'guardado' ? 'Guardado' : state === 'error' ? 'No se pudo guardar; se reintentará' : 'Guardando…'}
        </span>
        {confirming ? (
          <span className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                clearTimeout(timer.current)
                pending.current = null
                del.mutate(note.id, { onSuccess: onDeleted })
              }}
              className="pressable rounded-md bg-danger/15 px-2.5 py-1 text-xs font-medium text-danger hover:bg-danger/25"
            >
              Eliminar definitivamente
            </button>
            <button type="button" onClick={() => setConfirming(false)} className="pressable rounded-md px-2 py-1 text-xs text-ink-2 hover:text-ink">
              Cancelar
            </button>
          </span>
        ) : (
          <button
            type="button"
            onClick={() => setConfirming(true)}
            aria-label="Eliminar apunte"
            className="pressable inline-flex size-8 items-center justify-center rounded-md text-ink-3 hover:bg-danger/10 hover:text-danger"
          >
            <Trash2 size={15} aria-hidden />
          </button>
        )}
      </div>

      <div className="flex flex-1 flex-col px-4 py-5 sm:px-6">
        <label className="sr-only" htmlFor={`t-${note.id}`}>
          Título
        </label>
        <input
          id={`t-${note.id}`}
          ref={titleRef}
          value={title}
          onChange={(e) => change({ title: e.target.value })}
          placeholder="Título del apunte"
          maxLength={300}
          className="w-full bg-transparent font-display text-3xl tracking-tight text-ink outline-none placeholder:text-ink-3"
        />
        {note.docPath && (
          <p className="mt-2 flex items-center gap-1.5 text-xs text-ink-3">
            <Link2 size={12} aria-hidden />
            {linked && subject ? (
              <Link to={docRoute(subject.id, linked.path)} className="text-ink-2 hover:text-ink hover:underline">
                {linked.title}
              </Link>
            ) : (
              <span>Documento no encontrado ({note.docPath})</span>
            )}
          </p>
        )}
        <div className="mt-5 flex-1">
          {mode === 'editar' ? (
            <>
              <label className="sr-only" htmlFor={`b-${note.id}`}>
                Contenido
              </label>
              <textarea
                id={`b-${note.id}`}
                value={body}
                onChange={(e) => change({ body: e.target.value })}
                placeholder="Escribí tu apunte. Admite Markdown: **negrita**, listas, `código`…"
                className="min-h-[50vh] w-full resize-y bg-transparent font-mono text-[0.9rem] leading-relaxed text-ink outline-none placeholder:text-ink-3"
              />
            </>
          ) : body.trim() ? (
            <div className="prose-read">
              <Markdown remarkPlugins={[remarkGfm]}>{body}</Markdown>
            </div>
          ) : (
            <p className="text-sm text-ink-3">Nada para mostrar todavía.</p>
          )}
        </div>
      </div>
    </div>
  )
}
