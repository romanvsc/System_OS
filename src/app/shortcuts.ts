import { useEffect, useRef } from 'react'
import { useUi } from '../lib/store.ts'
import { useNewNote } from '../study/useNewNote.ts'
import { useDocNeighbors } from '../features/subject/useDocNeighbors.ts'
import { useGameNavigate } from '../game/transition.tsx'

/** Lista documentada de atajos (también la muestra el diálogo "?"). */
export const SHORTCUTS: { keys: string[]; label: string }[] = [
  { keys: ['Ctrl', 'K'], label: 'Búsqueda global' },
  { keys: ['Alt', 'N'], label: 'Nuevo apunte (también Ctrl Shift N donde el navegador lo permita)' },
  { keys: ['Alt', 'P'], label: 'Iniciar o pausar el temporizador' },
  { keys: ['Alt', 'B'], label: 'Mostrar u ocultar la navegación' },
  { keys: ['['], label: 'Documento anterior' },
  { keys: [']'], label: 'Documento siguiente' },
  { keys: ['?'], label: 'Ver atajos' },
  { keys: ['Esc'], label: 'Cerrar búsqueda, diálogos o navegación' },
]

const isTyping = (t: EventTarget | null) =>
  t instanceof HTMLElement && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))

/** Un único listener global. Alt+letra usa e.code para no depender de la distribución del teclado. */
export function useGlobalShortcuts() {
  const newNote = useNewNote()
  const go = useGameNavigate()
  const { prev, next } = useDocNeighbors()
  const live = useRef({ go, newNote, prev, next })
  live.current = { go, newNote, prev, next }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.repeat) return
      const ui = useUi.getState()
      const { go, newNote, prev, next } = live.current
      const ctrl = e.ctrlKey || e.metaKey
      // AltGr en Windows llega como Ctrl+Alt: no es un atajo con Alt.
      const altOnly = e.altKey && !e.ctrlKey && !e.metaKey

      if (ctrl && !e.altKey && !e.shiftKey && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        return ui.setPalette(!ui.paletteOpen)
      }
      if ((altOnly && e.code === 'KeyN') || (ctrl && e.shiftKey && e.code === 'KeyN')) {
        e.preventDefault()
        return newNote()
      }
      if (altOnly && e.code === 'KeyP') {
        e.preventDefault()
        return ui.toggleTimer()
      }
      if (altOnly && e.code === 'KeyB') {
        e.preventDefault()
        return window.matchMedia('(max-width: 767px)').matches ? ui.setDrawer(!ui.drawerOpen) : ui.toggleSidebar()
      }

      const overlayOpen = ui.paletteOpen || ui.shortcutsOpen || ui.settingsOpen || ui.drawerOpen
      if (isTyping(e.target) || overlayOpen || e.metaKey) return
      if (e.key === '[' && prev) void go(prev, { exit: false })
      else if (e.key === ']' && next) void go(next, { exit: false })
      else if (e.key === '?') ui.setShortcuts(true)
      else if (e.key === '/' && !ctrl) {
        e.preventDefault()
        ui.setPalette(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])
}
