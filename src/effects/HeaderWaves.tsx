import { lazy, Suspense, useEffect, useState } from 'react'
import { useEffectsMode } from './gpu.ts'
import { token } from './palette.ts'

const LineWaves = lazy(() => import('./LineWaves.tsx'))
const PLAY_MS = 7000

/** Line Waves como estado visual de bienvenida de una materia: se mueve unos segundos y luego se congela. */
export function HeaderWaves({ accent }: { accent: string }) {
  const mode = useEffectsMode()
  const [playing, setPlaying] = useState(mode === 'animated')

  useEffect(() => {
    if (mode !== 'animated') return setPlaying(false)
    setPlaying(true)
    const t = setTimeout(() => setPlaying(false), PLAY_MS)
    return () => clearTimeout(t)
  }, [mode])

  if (mode === 'css') return null
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0"
      style={{
        maskImage: 'linear-gradient(180deg, black 0%, black 35%, transparent 100%), linear-gradient(90deg, transparent, black 30%, black 70%, transparent)',
        maskComposite: 'intersect',
        WebkitMaskComposite: 'source-in',
        opacity: 0.7,
      }}
    >
      <Suspense fallback={null}>
        <LineWaves
          color1={accent}
          color2={token('--color-ink-2', '#9ca3af')}
          color3={token('--color-surface-2', '#1e232c')}
          speed={playing ? 0.18 : 0}
          lineCount={46}
          lineWidth={1}
          glow={0.35}
          brightness={1.1}
          highlight={0.55}
          warpIntensity={0.8}
          rotation={-12}
          edgeFade={0.4}
          enableMouseInteraction={false}
          clickRipple={false}
          intro={mode === 'animated'}
          maxDevicePixelRatio={1.5}
        />
      </Suspense>
    </div>
  )
}
