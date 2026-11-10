# Fondos de materia: prompts para generar las ilustraciones

Cada materia puede tener una ilustración propia. Se usa como fondo de su pantalla de título y de su intro, y se ve en el Inicio cuando la seleccionás.

## Cómo agregarla

1. Generá la imagen con el prompt de abajo.
2. Exportala como **WebP, calidad ~80, 2560 × 1440 px, menos de 500 kB** (sirven también `.avif`, `.jpg` y `.png`).
3. Guardala como `fondo.webp` en la **raíz de la carpeta de la materia**, al lado de `materia.json`. Por ejemplo: `iAes/tecnicas_programacion/fondo.webp`.
4. Opcional: agregá `"lema": "una frase corta"` en `materia.json`. Aparece en la intro y bajo el nombre de la materia.

No hace falta reiniciar: la app la toma sola en unos segundos. Ese archivo no se lista como recurso.

## Plantilla común (todas las materias)

> Painterly digital illustration for a dark game title screen, 16:9, cinematic wide shot. Deep blue-graphite night palette (#0B0D12, #131720, #1E232C) with a single warm amber-orange light source (#F97316, softened), soft volumetric light, fine film grain. Keep the **left third calm, dark and uncluttered** (a title will sit there); the focal subject sits in the right half. Subtle depth and atmosphere, no harsh contrast. **No text, no letters, no logos, no UI, no recognizable characters or franchise elements.** [ESCENA]

Reemplazá `[ESCENA]` por la escena de la materia.

## Técnicas de Programación

> [ESCENA] A quiet study workshop at night: tall stacks of index cards and books rising like a vertical stack data structure, the top card glowing faintly in warm light; delicate flowchart lines (ovals, rectangles, diamonds connected by arrows) float in the air like constellations of thin light; a single desk lamp casts the orange glow; shelves fade into blue darkness on the left.

Variante más abstracta, si la primera queda muy cargada:

> [ESCENA] Minimal architectural space at night: a tower of floating translucent slabs stacked one on top of another (last in, first out), lit from below by a warm amber glow; faint luminous flowchart paths connect the slabs; vast calm darkness on the left.

## Inicio de System OS

Es el fondo propio del Inicio. Tiene que sentirse como la entrada a todas las materias, no como una más: más amplio, más calmo y sin objetos de una materia concreta. En el Inicio el texto va abajo a la izquierda (la marca) y a la derecha (el menú y el panel de Continuar), así que la franja de abajo también tiene que quedar oscura.

> Painterly digital illustration for a dark game title screen, 16:9, cinematic ultra-wide establishing shot. Deep blue-graphite night palette (#0B0D12, #131720, #1E232C) with a single warm amber-orange light source (#F97316, softened), soft volumetric light, fine film grain. A vast, quiet library hall at night seen from a low angle: tall shelves receding into blue darkness, a long central aisle leading to one distant doorway glowing with warm orange light, as if a study session waits beyond it. Faint dust motes and thin threads of light drift in the air. Keep the **left third and the bottom quarter calm, dark and uncluttered** (a title and a menu will sit there); the glowing doorway sits slightly right of center, in the upper half. Lots of negative space, low detail, no harsh contrast. **No text, no letters, no logos, no UI, no people, no recognizable characters or franchise elements.**

Guardala como `system-os/public/fondo-inicio.webp` (mismo formato y tamaño que los de materia).

## Próximas materias (ideas)

- **Sistemas:** sala de máquinas silenciosa, racks con luces tenues, cables como ríos de luz.
- **Estadística:** paisaje nocturno de colinas que dibujan una campana de Gauss, puntos de luz dispersos como una nube de datos.
- **Redes de computadoras:** ciudad nocturna vista desde arriba, rutas de luz que conectan nodos.

## Si todavía no hay imagen

La materia usa el ambiente de la app (Grain Gradient y Line Waves). Todo funciona igual.
