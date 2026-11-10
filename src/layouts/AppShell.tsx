import { Outlet, useLocation } from 'react-router'
import * as Tooltip from '@radix-ui/react-tooltip'
import { Ambient } from '../effects/Ambient.tsx'
import { useGlobalShortcuts } from '../app/shortcuts.ts'
import { Header } from './Header.tsx'
import { CommandPalette } from '../study/CommandPalette.tsx'
import { ShortcutsDialog } from '../study/ShortcutsDialog.tsx'
import { SettingsDialog } from '../study/SettingsDialog.tsx'
import { RouteProgress } from '../ui/RouteProgress.tsx'

export function AppShell() {
  const { pathname } = useLocation()
  useGlobalShortcuts()
  return (
    <Tooltip.Provider delayDuration={350} skipDelayDuration={150}>
      <Ambient live={pathname === '/'} />
      <RouteProgress />
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[var(--z-toast)] focus:rounded-md focus:bg-surface-2 focus:px-3 focus:py-2 focus:text-sm"
      >
        Saltar al contenido
      </a>
      <div className="relative flex min-h-dvh flex-col" style={{ zIndex: 'var(--z-base)' }}>
        <Header />
        <Outlet />
      </div>
      <CommandPalette />
      <ShortcutsDialog />
      <SettingsDialog />
    </Tooltip.Provider>
  )
}
