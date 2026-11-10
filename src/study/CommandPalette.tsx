import { useDeferredValue, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import * as Dialog from '@radix-ui/react-dialog'
import { Command } from 'cmdk'
import { BookOpen, CornerDownLeft, FileText, Keyboard, Library, NotebookPen, PencilLine, Search, Timer } from 'lucide-react'
import { useCorpus, useSubjects, useWorkspace } from '../lib/api.ts'
import { search, type SearchHit } from '../lib/search.ts'
import { useUi } from '../lib/store.ts'
import { KIND_LABEL, docRoute, notesRoute, subjectRoute } from '../lib/subject.ts'
import { Kbd } from '../ui/primitives.tsx'
import { useNewNote } from './useNewNote.ts'

const itemClass =
  'flex cursor-pointer items-start gap-3 rounded-lg px-3 py-2.5 text-sm text-ink-2 data-[selected=true]:bg-surface-2/80 data-[selected=true]:text-ink'

function HitIcon({ hit }: { hit: SearchHit }) {
  const Icon = hit.type === 'subject' ? Library : hit.type === 'note' ? PencilLine : hit.kind === 'teoria' ? BookOpen : FileText
  return <Icon size={16} aria-hidden className={hit.type === 'note' ? 'mt-0.5 shrink-0 text-note' : 'mt-0.5 shrink-0 text-ink-3'} />
}

/** Búsqueda global estilo Command Palette: materias, documentos indexados y apuntes personales. */
export function CommandPalette() {
  const open = useUi((s) => s.paletteOpen)
  const setOpen = useUi((s) => s.setPalette)
  const [query, setQuery] = useState('')
  const deferred = useDeferredValue(query)
  const navigate = useNavigate()
  const newNote = useNewNote()
  const subjects = useSubjects()
  const corpus = useCorpus(open)
  const workspace = useWorkspace()

  const hits = useMemo(
    () => search(deferred, subjects.data ?? [], corpus.data ?? [], workspace.data?.notes ?? []),
    [deferred, subjects.data, corpus.data, workspace.data?.notes],
  )
  const groups = {
    Materias: hits.filter((h) => h.type === 'subject'),
    Contenidos: hits.filter((h) => h.type === 'doc'),
    Apuntes: hits.filter((h) => h.type === 'note'),
  }

  const close = () => {
    setOpen(false)
    setQuery('')
  }
  const go = (to: string) => {
    close()
    navigate(to)
  }
  const target = (h: SearchHit) =>
    h.type === 'subject' ? subjectRoute(h.subject) : h.type === 'doc' ? docRoute(h.subject, h.path) : notesRoute(h.note.subject, h.note.id)

  const actions = [
    { id: 'nota', label: 'Nuevo apunte', icon: PencilLine, keys: ['Alt', 'N'], run: () => (close(), newNote()) },
    { id: 'timer', label: 'Iniciar o pausar temporizador', icon: Timer, keys: ['Alt', 'P'], run: () => (close(), useUi.getState().toggleTimer()) },
    { id: 'apuntes', label: 'Ver mis apuntes', icon: NotebookPen, keys: [], run: () => go('/apuntes') },
    { id: 'atajos', label: 'Atajos de teclado', icon: Keyboard, keys: ['?'], run: () => (close(), useUi.getState().setShortcuts(true)) },
  ]
  const visibleActions = actions.filter((a) => !query || a.label.toLowerCase().includes(query.toLowerCase()))

  return (
    <Dialog.Root open={open} onOpenChange={(o) => (o ? setOpen(true) : close())}>
      <Dialog.Portal>
        <Dialog.Overlay className="anim-overlay fixed inset-0 bg-black/50" style={{ zIndex: 'var(--z-overlay)' }} />
        <Dialog.Content
          aria-describedby={undefined}
          className="anim-pop glass-float fixed inset-x-0 top-[12vh] mx-auto flex max-h-[70vh] w-[calc(100vw-2rem)] max-w-xl flex-col overflow-hidden rounded-[var(--radius-panel)]"
          style={{ zIndex: 'var(--z-overlay)' }}
        >
          <Dialog.Title className="sr-only">Búsqueda global</Dialog.Title>
          <Command shouldFilter={false} loop label="Búsqueda global" className="flex min-h-0 flex-1 flex-col">
            <div className="flex items-center gap-3 border-b border-line px-4">
              <Search size={17} className="text-ink-3" aria-hidden />
              <Command.Input
                value={query}
                onValueChange={setQuery}
                placeholder="Buscar en materias, contenidos y apuntes…"
                className="h-13 flex-1 bg-transparent text-base text-ink outline-none placeholder:text-ink-3"
              />
              <Kbd>Esc</Kbd>
            </div>
            <Command.List className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-2">
              {query && corpus.isLoading && <Command.Loading className="px-3 py-6 text-center text-sm text-ink-3">Indexando contenidos…</Command.Loading>}
              {query && !corpus.isLoading && hits.length === 0 && visibleActions.length === 0 && (
                <Command.Empty className="px-3 py-10 text-center text-sm text-ink-3">Sin resultados para “{query}”.</Command.Empty>
              )}
              {Object.entries(groups).map(([name, list]) =>
                list.length ? (
                  <Command.Group key={name} heading={name} className="mb-1 [&_[cmdk-group-heading]]:eyebrow [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                    {list.map((h) => (
                      <Command.Item key={target(h)} value={target(h)} onSelect={() => go(target(h))} className={itemClass}>
                        <HitIcon hit={h} />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-baseline gap-2">
                            <span className="truncate font-medium text-ink">{h.title}</span>
                            {h.type === 'doc' && <span className="shrink-0 text-2xs text-ink-3">{KIND_LABEL[h.kind]}</span>}
                          </span>
                          {h.type === 'doc' && <span className="block truncate text-xs text-ink-3">{h.context}</span>}
                          {h.snippet && <span className="mt-0.5 line-clamp-2 block text-xs leading-relaxed text-ink-2">{h.snippet}</span>}
                        </span>
                        <CornerDownLeft size={14} className="mt-1 shrink-0 opacity-0 [[data-selected=true]>&]:opacity-60" aria-hidden />
                      </Command.Item>
                    ))}
                  </Command.Group>
                ) : null,
              )}
              {visibleActions.length > 0 && (
                <Command.Group heading="Acciones" className="[&_[cmdk-group-heading]]:eyebrow [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-2">
                  {visibleActions.map((a) => (
                    <Command.Item key={a.id} value={`accion:${a.id}`} onSelect={a.run} className={itemClass}>
                      <a.icon size={16} className="mt-0.5 shrink-0 text-ink-3" aria-hidden />
                      <span className="flex-1">{a.label}</span>
                      <span className="flex gap-1">
                        {a.keys.map((k) => (
                          <Kbd key={k}>{k}</Kbd>
                        ))}
                      </span>
                    </Command.Item>
                  ))}
                </Command.Group>
              )}
            </Command.List>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
