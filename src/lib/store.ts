import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type EffectsLevel = 'completo' | 'reducido' | 'apagado'
export type IntroMode = 'sesion' | 'siempre' | 'nunca'

interface UiState {
  sidebarCollapsed: boolean
  effects: EffectsLevel
  /** Diagramas: true = adaptados al modo oscuro; false = colores originales. */
  diagramDark: boolean
  /** Sonidos de menú (Web Audio). Apagados por defecto. */
  soundEnabled: boolean
  /** Cuándo se ve la intro de una materia. */
  introMode: IntroMode
  paletteOpen: boolean
  drawerOpen: boolean
  shortcutsOpen: boolean
  settingsOpen: boolean
  /** Temporizador: tiempo acumulado + inicio del tramo actual (null = pausado). Sobrevive recargas. */
  timerAccumulated: number
  timerStartedAt: number | null
  toggleSidebar: () => void
  setEffects: (e: EffectsLevel) => void
  toggleDiagramDark: () => void
  setSound: (on: boolean) => void
  setIntroMode: (m: IntroMode) => void
  setPalette: (open: boolean) => void
  setDrawer: (open: boolean) => void
  setShortcuts: (open: boolean) => void
  setSettings: (open: boolean) => void
  toggleTimer: () => void
  resetTimer: () => void
}

// shortcut: preferencias de interfaz en localStorage (por navegador); si hiciera falta compartirlas entre navegadores, moverlas a workspace.json.
export const useUi = create<UiState>()(
  persist(
    (set, get) => ({
      sidebarCollapsed: typeof window !== 'undefined' && window.innerWidth < 1024,
      effects: 'completo',
      diagramDark: true,
      soundEnabled: false,
      introMode: 'sesion',
      paletteOpen: false,
      drawerOpen: false,
      shortcutsOpen: false,
      settingsOpen: false,
      timerAccumulated: 0,
      timerStartedAt: null,
      toggleSidebar: () => set((s) => ({ sidebarCollapsed: !s.sidebarCollapsed })),
      setEffects: (effects) => set({ effects }),
      toggleDiagramDark: () => set((s) => ({ diagramDark: !s.diagramDark })),
      setSound: (soundEnabled) => set({ soundEnabled }),
      setIntroMode: (introMode) => set({ introMode }),
      setPalette: (paletteOpen) => set({ paletteOpen }),
      setDrawer: (drawerOpen) => set({ drawerOpen }),
      setShortcuts: (shortcutsOpen) => set({ shortcutsOpen }),
      setSettings: (settingsOpen) => set({ settingsOpen }),
      toggleTimer: () => {
        const { timerStartedAt, timerAccumulated } = get()
        if (timerStartedAt === null) set({ timerStartedAt: Date.now() })
        else set({ timerStartedAt: null, timerAccumulated: timerAccumulated + Date.now() - timerStartedAt })
      },
      resetTimer: () => set({ timerAccumulated: 0, timerStartedAt: null }),
    }),
    {
      name: 'system-os:ui',
      partialize: (s) => ({
        sidebarCollapsed: s.sidebarCollapsed,
        effects: s.effects,
        diagramDark: s.diagramDark,
        soundEnabled: s.soundEnabled,
        introMode: s.introMode,
        timerAccumulated: s.timerAccumulated,
        timerStartedAt: s.timerStartedAt,
      }),
    },
  ),
)

export const timerElapsed = (s: Pick<UiState, 'timerAccumulated' | 'timerStartedAt'>, now = Date.now()) =>
  s.timerAccumulated + (s.timerStartedAt === null ? 0 : now - s.timerStartedAt)
