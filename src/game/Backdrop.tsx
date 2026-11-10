import { useEffect, useState } from 'react'
import { useUi } from '../lib/store.ts'
import { cx } from '../ui/primitives.tsx'

/**
 * Ilustración de fondo a sangre, por encima del ambiente global. Cambia de imagen con un fundido y
 * entra con un acercamiento lento. Sin imagen no dibuja nada y queda visible el ambiente de siempre.
 * `eco`: la misma ilustración detrás del lector, quieta, oscura y desenfocada, enmascarada arriba y en el
 * borde de la sidebar; la columna de texto queda sobre fondo liso.
 */
export function Backdrop({ src, alt = '', variant = 'escena' }: { src?: string; alt?: string; variant?: 'escena' | 'eco' }) {
  const effects = useUi((s) => s.effects)
  const still = effects !== 'completo'
  const eco = variant === 'eco'
  if (eco && effects === 'apagado') src = undefined
  // Se conservan la imagen actual y la anterior para el fundido entre ambas.
  const [layers, setLayers] = useState<{ src: string; key: number }[]>([])

  useEffect(() => {
    if (!src) return setLayers([])
    let alive = true
    const img = new Image()
    img.src = src
    const show = () => alive && setLayers((prev) => (prev.at(-1)?.src === src ? prev : [...prev.slice(-1), { src, key: Date.now() }]))
    // Solo se muestra cuando ya decodificó: el fundido nunca revela una imagen a medio cargar.
    img.decode().then(show, () => alive && setLayers([]))
    return () => {
      alive = false
    }
  }, [src])

  return (
    <div
      aria-hidden
      className="scene-backdrop pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      // La capa entera (imagen y degradado de legibilidad) viaja junta: sin destello de la imagen sin oscurecer.
      style={{ viewTransitionName: layers.length > 0 ? 'subject-backdrop' : undefined }}
    >
      {layers.map((l, i) => (
        <img
          key={l.key}
          src={l.src}
          alt={alt}
          decoding="async"
          className={cx('absolute inset-0 size-full object-cover', eco ? 'backdrop-eco' : i === layers.length - 1 && 'backdrop-in')}
          style={still && !eco ? { animationName: 'fade-in' } : undefined}
        />
      ))}
      {layers.length > 0 && !eco && <div className="backdrop-legibility absolute inset-0" />}
    </div>
  )
}
