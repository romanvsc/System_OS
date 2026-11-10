import { Link, useMatch } from 'react-router'
import { Menu, NotebookPen, Search, Settings2 } from 'lucide-react'
import { STATIC, useSubjects } from '../lib/api.ts'
import { useUi } from '../lib/store.ts'
import { IconButton, Kbd, Tip, cx } from '../ui/primitives.tsx'
import { StudyTimer } from '../study/StudyTimer.tsx'
import { GameLink } from '../game/transition.tsx'

export function BrandMark({ size = 22 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="9" fill="var(--color-surface-2)" />
      <path
        d="M9 21.5c2.2 1.6 4.4 2.3 6.8 2.3 3.4 0 5.6-1.7 5.6-4.3 0-5.6-11.6-3.4-11.6-9 0-2.5 2.2-4.3 5.5-4.3 2.1 0 4 .6 5.8 1.8"
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Indicador discreto: el servidor local responde (todo corre en esta computadora). */
function LocalStatus() {
  const { isError, isSuccess } = useSubjects()
  const label = STATIC ? 'Datos guardados en este dispositivo' : isError ? 'Servidor local detenido' : 'Funcionando en local, sin internet'
  return (
    <Tip label={label}>
      <span tabIndex={0} className="hidden items-center gap-1.5 rounded-md px-2 py-1 text-xs text-ink-3 lg:inline-flex" aria-label={label}>
        <span className={cx('size-1.5 rounded-full', isError ? 'bg-danger' : isSuccess ? 'bg-done/80' : 'bg-ink-3')} />
        Local
      </span>
    </Tip>
  )
}

export function Header() {
  const inSubject = useMatch('/m/:subject/*')
  const onHome = useMatch('/')
  const onSubjectMenu = useMatch('/m/:subject')
  const titleScreen = !!(onHome || onSubjectMenu)
  const setPalette = useUi((s) => s.setPalette)
  const setDrawer = useUi((s) => s.setDrawer)
  const setSettings = useUi((s) => s.setSettings)

  return (
    <header
      className={cx(
        'material-top sticky top-0 flex h-[var(--height-header)] items-center gap-2 px-3 sm:px-5',
      )}
      style={{ zIndex: 'var(--z-header)' }}
    >
      {inSubject && !titleScreen && (
        <IconButton label="Abrir navegación" tip="Navegación (Alt B)" className="enter-rise md:hidden" onClick={() => setDrawer(true)}>
          <Menu size={18} aria-hidden />
        </IconButton>
      )}
      {!titleScreen && (
      <GameLink to="/" className="enter-rise pressable tap flex items-center gap-2.5 rounded-md py-1 pr-2 text-ink" aria-label="System OS — Inicio">
        <BrandMark />
        <span className="hidden text-sm font-semibold tracking-tight sm:inline">
          System <span className="font-display text-base font-normal italic text-ink-2">OS</span>
        </span>
      </GameLink>
      )}

      <div className="flex flex-1 justify-center px-2">
        {!titleScreen && (
        <button
          type="button"
          onClick={() => setPalette(true)}
          className="enter-rise pressable hidden h-9 w-full max-w-sm items-center gap-2.5 rounded-lg border border-line bg-surface/50 px-3 text-sm text-ink-3 hover:border-line-strong hover:text-ink-2 sm:flex"
        >
          <Search size={15} aria-hidden />
          <span className="flex-1 text-left">Buscar materias, temas, apuntes…</span>
          <span className="flex gap-1" aria-hidden>
            <Kbd>Ctrl</Kbd>
            <Kbd>K</Kbd>
          </span>
        </button>
        )}
      </div>

      <div className="flex items-center gap-1">
        <IconButton label="Buscar" tip="Buscar (Ctrl K)" className={titleScreen ? undefined : 'sm:hidden'} onClick={() => setPalette(true)}>
          <Search size={18} aria-hidden />
        </IconButton>
        <StudyTimer />
        <Tip label="Mis apuntes">
          <Link
            to="/apuntes"
            aria-label="Mis apuntes"
            className="pressable tap hidden size-9 items-center justify-center rounded-md text-ink-2 hover:bg-surface-2/70 hover:text-ink sm:inline-flex"
          >
            <NotebookPen size={17} aria-hidden />
          </Link>
        </Tip>
        <IconButton label="Configuración" onClick={() => setSettings(true)}>
          <Settings2 size={17} aria-hidden />
        </IconButton>
        <LocalStatus />
      </div>
    </header>
  )
}
