# Auditoría visual y norma de diseño — System OS

Fecha: 2026-11-09. Herramienta: Impeccable `audit` (detector mecánico y revisión manual en Chrome a 1440, 860, 820 y 390 px).

Este documento es la **norma general de diseño** de la app. Cualquier pantalla o componente nuevo tiene que cumplir las reglas de la sección "Norma".

## Resultado

| # | Dimensión | Primera auditoría | Después de las correcciones |
|---|---|---|---|
| 1 | Accesibilidad | 3 | 4 |
| 2 | Rendimiento | 3 | 3 |
| 3 | Responsive | 3 | 4 |
| 4 | Theming | 3 | 4 |
| 5 | Integridad | 3 | 4 |
| **Total** | | **15/20, Bueno** | **19/20, Excelente** |

El detector mecánico de Impeccable no encontró problemas en `src/` ni antes ni después de las correcciones. Este puntaje es una autoevaluación: conviene confirmarlo volviendo a pedir la auditoría (`$impeccable audit`).

## Qué se corrigió

| Prioridad | Hallazgo | Corrección |
|---|---|---|
| P1 | Cortes entre sidebar, header y contenido (bordes de 1 px y una banda oscura) | Material continuo sin bordes. El header (`.material-top`) tiene un velo con desenfoque que se disuelve con una máscara. La sidebar (`.material-side`) tiene un tinte que se funde con el contenido. La portada de la materia ya no tiene borde |
| P1 | Recurso titulado "Copiá y pegá este prompt…" | Sin `#` título, la primera línea solo se usa si es corta (60 caracteres o menos) y no termina en puntuación. Si no, se usa el nombre del archivo. Hay un test que lo cubre |
| P1 | Áreas táctiles de 28–36 px | Clase `.tap`: en pantallas táctiles el área sensible crece a 44 × 44 px sin cambiar el ícono. Los ítems de la sidebar usan `pointer-coarse:py-3`, y los botones de ejercicio y "Continuar" usan `min-h-11` |
| P2 | Etiquetas en mayúsculas sobre los títulos | Se quitaron todas. La fecha pasó al subtítulo de la Home, "Materias" es un título real, el tipo de documento ya no aparece sobre el título y las secciones de Configuración y Apuntes tienen títulos normales |
| P2 | Progreso repetido cuatro veces | Una sola expresión por vista: barra y "n de N completados". El avance por tema solo aparece si hay más de un tema. Los anillos se reemplazaron por barras (salvo en el riel contraído, donde no entra texto) |
| P2 | "Teoría · Teoría · Teoría…" en el índice | Se quitaron las etiquetas por fila; ya lo dicen el ícono y el agrupamiento |
| P2 | Colores sueltos (unos 10) | Todo vive en `tokens.css`: código, sintaxis, papel de los diagramas, materiales (`--material-veil`, `--material-tint`), ambiente y paleta del Grain Gradient. Los shaders leen los tokens en tiempo de ejecución (`src/effects/palette.ts`) y el acento de cada materia se mezcla con `color-mix` |
| P2 | Movimiento reducido demasiado brusco | En lugar de anular todo, se conservan fundidos cortos de opacidad (paleta, diálogos, drawer) y se quitan desplazamientos, escalas y bucles |
| P2 | Sin zoom con dos dedos en los diagramas | El visor ahora acepta pellizcar para hacer zoom, además de arrastrar, la rueda del mouse, los botones y el teclado. Los punteros se liberan al cancelar el gesto o perder el foco |
| P2 | Header móvil con 6 controles | "Mis apuntes" se oculta en móvil; sigue disponible en la paleta, la sidebar y el drawer |
| P3 | Motion completo en el bundle | `LazyMotion` con `domAnimation`. El indicador activo de la sidebar pasó a CSS. El bundle principal bajó de 183 a 168 kB gzip |
| — | Riel contraído con "Pi" | Ícono de libro con el nombre del tema en el tooltip |

**Corrección de la auditoría:** el hallazgo "aparece Continuar sin haber leído nada" era un falso positivo. `Continuar` solo aparece si hay un último documento abierto, y abrir la portada no lo registra.

### Pendiente, decisión consciente (P3)

- **La sidebar anima su ancho (300 ms).** Con `transform` el contenido saltaría de golpe al terminar, y eso contradice el requisito de no tener saltos. Se acepta el costo de layout porque es una animación corta, ocasional y sobre poco contenido.
- **Las áreas táctiles no se midieron en un dispositivo real.** Se verificaron por código, porque el navegador de prueba usa un puntero fino.

## Norma

1. **Sin bordes estructurales.** Header, navegación y contenido se separan con tinte, desenfoque y máscaras de degradado (`.material-top`, `.material-side`), nunca con líneas de lado a lado. Las líneas de 1 px solo se usan dentro de la columna de lectura, para separar secciones.
2. **Un solo ambiente.** Hay una capa de fondo fija para toda la app. Solo lo que flota (diálogos, paleta, drawer, tooltips) tiene superficie propia.
3. **El naranja es interacción, el cian es "completado" y el ámbar es "apunte personal".** Ningún otro uso.
4. **Los títulos se sostienen solos.** Nada de etiquetas en mayúsculas encima. Si hace falta contexto, va en un subtítulo o en las migas de pan.
5. **Una métrica por idea.** El progreso aparece una vez por vista, con barra y "n de N completados".
6. **Cada color sale de `tokens.css`.** Sin hex en componentes. Los shaders usan `token()` y los acentos dinámicos usan `color-mix`.
7. **44 px mínimos al tocar.** Se usa `.tap`, `pointer-coarse:` o `min-h-11`.
8. **Movimiento con propósito.** Hay un solo momento de entrada por vista. Se anima con `transform` y `opacity`, con curva de salida exponencial. Con movimiento reducido quedan fundidos, nunca cortes.
9. **Tipografía:** Instrument Serif solo para títulos cortos, Geist para la interfaz y la lectura, y JetBrains Mono sin ligaduras para código y notación.
10. **Lectura:** columna de 42 rem, cuerpo de 17 px con interlineado 1,75. Nada animado detrás del texto largo.
11. **Pantallas de título** (Inicio y menú de materia):
    - Composición a los bordes: el nombre abajo a la izquierda, el menú abajo a la derecha y las ayudas de teclas al pie, con íconos dentro de keycaps y sin caracteres Unicode sueltos.
    - Un solo `TitleMenu` (`src/game/`): la banda de luz y la marca "S" indican selección y foco a la vez, y las flechas funcionan aunque el foco esté en la página.
    - Sin tarjetas.
12. **Fondos de materia:**
    - Ilustración a sangre, bajo el degradado de legibilidad `--backdrop-shade`. El tercio izquierdo queda oscuro para el título.
    - En el lector solo aparece como **eco**: quieta, desenfocada y enmascarada arriba y en el borde de la sidebar, nunca detrás de la columna de texto.
    - Las imágenes las aporta Roman (ver `docs/fondos-prompts.md`); la app no inventa ilustraciones.
13. **Intro:**
    - Una sola secuencia orquestada (imagen, línea, barrido del nombre, lema), de unos 3 s.
    - Siempre se puede saltar y por defecto se ve una vez por sesión. Con movimiento reducido no hay intro.
14. **Sonido:** se sintetiza en la app, viene apagado por defecto y el `AudioContext` se crea solo tras un gesto del usuario.
15. **Transiciones:**
    - Cada salto es una sola escena: confirmación, precarga (con un tope de 400 ms) y view transition. La ilustración y el nombre de la materia viajan; el resto se funde.
    - Nunca hay un cuadro vacío: el loader es una línea fina que aparece solo después de 150 ms.
    - Con movimiento reducido, se navega con fundidos y sin escalonados.

## Lo que funciona y hay que mantener

- Tokens únicos, que generan las utilidades de Tailwind (`@theme static`).
- Secciones semánticas (Enunciado, Ejemplo, Supuestos) detectadas del contenido real, sin tocar los archivos.
- Diagramas adaptados al modo oscuro, con la opción de ver el original y zoom completo.
- Fondos WebGL a 30 fps, que se pausan cuando no se ven y pasan a CSS si no hay GPU.
- Accesibilidad de base: enlace para saltar al contenido, landmarks, diálogos de Radix, foco visible y `aria-current`.
- Cero peticiones externas.
