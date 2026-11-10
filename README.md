# System OS

Espacio de estudio personal, local y sin conexión. Lee las materias directamente desde las carpetas de `iAes/` y guarda apuntes y progreso en un archivo propio. Los documentos originales nunca se modifican.

## Ejecutar

Requiere Node.js 22 o superior (probado con Node 24).

```bash
cd iAes/system-os
npm install        # solo la primera vez (es el único paso que usa internet)
npm run dev        # abre http://127.0.0.1:4317
```

- `npm start` compila y sirve la versión optimizada en http://127.0.0.1:4318.
- `npm test` corre las pruebas del servidor local (escáner de materias, protección de rutas, guardado de datos).
- `npm run typecheck` revisa los tipos.

El servidor escucha solo en `127.0.0.1`: no es accesible desde otras computadoras. Una vez instaladas las dependencias, la app funciona sin internet: fuentes, íconos y librerías están dentro del proyecto.

El puerto 4317 es fijo a propósito. Así no choca con otros proyectos de Vite (que usan 5173 y pueden dejar un service worker registrado en ese puerto), y las preferencias que guarda el navegador no se pierden.

## Cómo se organizan las materias

La app recorre la carpeta que contiene a `system-os` (o sea `iAes/`). Una carpeta cuenta como materia **solo si tiene un `materia.json`**. Por eso `Sistemas/`, `estadistica/` y los PDF sueltos no aparecen hasta que lo decidas.

```
iAes/
├── system-os/                  ← esta app
└── tecnicas_programacion/      ← materia
    ├── materia.json            ← metadatos (lo único que agrega la app a tu carpeta)
    ├── pautas.md               ← archivos sueltos en la raíz → "Recursos"
    └── Pilas/                  ← cada carpeta de primer nivel → un TEMA
        ├── Teoria.md           ← un archivo que empieza con "Teor" → teoría del tema (va primero)
        ├── Busqueda/           ← otras carpetas → SUBTEMAS
        │   ├── busqueda.md
        │   ├── busqueda.svg    ← imágenes con el mismo nombre → diagramas del documento
        │   └── busqueda.png
        └── TPN-1/              ← carpetas que empiezan con "TP" o "Trabajo" → TRABAJO PRÁCTICO
            ├── TpN1.md         ← el .md de la raíz del TP → enunciado
            └── Ejercicio 01/   ← cada subcarpeta → un EJERCICIO (la etiqueta es el nombre de la carpeta)
                ├── ejercicio-01.md
                ├── ejercicio-01.svg
                └── ejercicio-01.png
```

- **Títulos:** se toman del primer `# Título` del archivo. Si no hay, de la primera línea y, si tampoco hay, del nombre del archivo.
- **Orden:** natural (Ejercicio 2 va antes que Ejercicio 10). La teoría va primero.
- **Formatos:**
  - Markdown (con tablas, listas y código) se muestra integrado.
  - PDF se abre con el visor del navegador.
  - Imágenes se muestran como diagrama.
  - Cualquier otro formato (DOCX, PPTX…) se puede abrir o descargar.
- **Se ignoran:** archivos y carpetas que empiezan con `.`, `_` o `~$`, `node_modules`, `desktop.ini`.

### `materia.json`

```json
{
  "nombre": "Técnicas de Programación",
  "descripcion": "Estructuras de datos y su resolución con diagramas de flujo.",
  "acento": "#F97316",
  "orden": 1
}
```

Solo `nombre` es recomendable. `acento` (color `#RRGGBB`), `orden` (número), `descripcion`, `icono` (una o dos letras), `lema` (frase de la intro) y `fondo` (ruta a la ilustración, si no es `fondo.webp` en la raíz) son opcionales. Si el archivo tiene un error, la materia sigue apareciendo y la app muestra cuál es el problema.

## Pantallas de título, fondos e intro

El Inicio y el menú de cada materia funcionan como la pantalla de título de un juego.

- **Navegación:** ↑ y ↓ eligen, Enter entra, Esc (o ← o Retroceso) vuelve de un submenú.
- **Inicio:** Continuar (retoma el último documento abierto, en cualquier materia), Materias, Mis apuntes y Configuración. Arriba del menú se ve qué vas a continuar y cuánto llevás. El fondo es `public/fondo-inicio.webp`; dentro de Materias pasa al fondo de cada una.
- **Menú de la materia:** Continuar, Teoría, Trabajos prácticos, Apuntes y Recursos.
- **Intro:** al entrar a una materia hay una intro de unos 3 segundos. Cualquier tecla o clic la saltea. Por defecto se ve una vez por sesión; en Configuración podés elegir siempre o nunca. Con movimiento reducido no se muestra.
- **Fondo de cada materia:** poné una ilustración `fondo.webp` (también sirven `.avif`, `.jpg` o `.png`) en la raíz de la carpeta de la materia. Los prompts para generarla y el tamaño recomendado están en [`docs/fondos-prompts.md`](docs/fondos-prompts.md). Sin imagen, se usa el ambiente de la app.
- **Lema:** en `materia.json` podés agregar `"lema": "frase corta"`, que aparece en la intro, y `"fondo": "ruta/imagen.webp"` si la imagen no está en la raíz.
- **Sonidos de menú:** suaves y generados por la app. Vienen apagados; se activan en Configuración → Sonidos de menú.

## Versión para el celular (Vercel)

Además de la versión local, la app se puede publicar como sitio estático e instalar en el celular. Una vez abierta, funciona sin internet.

- **Contenido:** se publica la copia de las materias que está en `content/`. Para actualizarla después de cambiar algo en `iAes/`:
  ```bash
  npm run content:sync   # copia las materias de iAes/ a content/
  git add content && git commit -m "Actualizar contenido" && git push
  ```
  Vercel vuelve a publicar solo con cada push.
- **Build:** `npm run build:static`, configurado en `vercel.json`. Genera `dist/` con el contenido en `/api/subjects.json`, `/api/corpus.json` y `/api/file/…`.
- **Tus datos en el celular:** apuntes y progreso se guardan en el navegador del celular y **no se sincronizan** con la PC. Exportá un respaldo desde Configuración. Borrar los datos del sitio los elimina.
- **Instalar:** abrí el sitio en el celular y usá "Agregar a pantalla de inicio". La primera visita descarga todo el contenido, y después funciona sin conexión.
- **Privacidad:** el contenido de `content/` queda publicado en la web y en el repositorio.

## Agregar contenido

- **Una materia nueva:** creá su carpeta dentro de `iAes/` con un `materia.json`. Por ejemplo, para que aparezca `Sistemas`, alcanza con crear `Sistemas/materia.json`.
- **Un tema:** creá una carpeta dentro de la materia (`Colas/`) con su `Teoria.md`.
- **Un subtema:** creá una carpeta dentro del tema con su `.md` y, si los hay, sus diagramas con el mismo nombre.
- **Un trabajo práctico:** creá `TPN-2/` dentro del tema con el enunciado (`TpN2.md`) y una carpeta por ejercicio (`Ejercicio 01/ejercicio-01.md` + `.svg`/`.png`).

**No hace falta reiniciar ni recompilar.** El servidor vigila las carpetas de las materias y la app se actualiza sola en unos instantes. En `npm start`, el cambio aparece al volver a la pestaña o al recargarla.

## Tus datos: apuntes, progreso y respaldo

- Todo lo que generás se guarda en `system-os/data/workspace.json`: apuntes, documentos completados, último acceso y último documento abierto. Está separado del contenido académico, y la app nunca escribe en las carpetas de las materias.
- Cada guardado escribe primero un archivo temporal y lo renombra, así que un corte no deja el archivo a medias. Además conserva la versión anterior en `workspace.prev.json`. Si `workspace.json` se dañara, la app lo aparta como `workspace.danado-<fecha>.json`, sin borrarlo, y recupera la copia previa.
- **Respaldo:** en Configuración (el ícono de ajustes del header):
  - **Exportar respaldo (.json)** descarga todos tus datos.
  - **Exportar apuntes (.md)** descarga los apuntes en un Markdown legible.
  - También alcanza con copiar la carpeta `data/`.
- **Restaurar:** con la app cerrada, reemplazá `data/workspace.json` por el respaldo.
- El progreso y los vínculos de los apuntes se identifican por la **ruta del archivo**. Si renombrás o movés un `.md`, su marca de completado deja de contarse y el apunte vinculado muestra "documento no encontrado". El apunte no se pierde.

Las preferencias de interfaz (sidebar contraída, nivel de efectos, diagramas oscuros, estado del temporizador) se guardan en el navegador.

## Atajos de teclado

| Atajo | Acción |
|---|---|
| `Ctrl K` (o `/`) | Búsqueda global: materias, temas, contenidos y apuntes |
| `Alt N` | Nuevo apunte, vinculado al documento abierto |
| `Alt P` | Iniciar o pausar el temporizador |
| `Alt B` | Contraer o expandir la navegación (en móvil, abre el drawer) |
| `[` / `]` | Documento anterior / siguiente |
| `?` | Ver todos los atajos |
| `Esc` | Cerrar búsqueda, diálogos o drawer |

Chrome y Edge reservan `Ctrl Shift N` para la ventana de incógnito y no permiten que una página lo use. Por eso el atajo de nuevo apunte es `Alt N` (`Ctrl Shift N` queda como alternativa donde el navegador lo deje pasar). Los atajos de una sola tecla no se activan mientras escribís.

## Cambiar el estilo visual

La norma de diseño de la app (bordes, materiales, color, métricas, tacto, movimiento) está en [`docs/auditoria-visual.md`](docs/auditoria-visual.md). Lo nuevo tiene que respetarla.

- **Colores, tipografías, tamaños, radios, sombras y tiempos de animación:** están en `src/styles/tokens.css`. Cada token genera también la clase de Tailwind correspondiente (`bg-surface`, `text-ink-2`, `rounded-card`…), así que cambiar un valor ahí lo cambia en toda la app.
- **Tipografía de lectura** (columna, títulos, listas, código, bloques de enunciado): `src/styles/prose.css`.
- **Fondos:**
  - `src/effects/GrainLayer.tsx`: Grain Gradient de la Home (colores, intensidad, grano).
  - `src/effects/HeaderWaves.tsx`: Line Waves en la portada de la materia.
  - `src/effects/Ambient.tsx`: capa ambiental y degradados de integración.
- **Configuración → Efectos visuales:**
  - **Completo:** fondo animado en la Home.
  - **Reducido:** fondos quietos.
  - **Apagado:** solo degradados CSS, sin WebGL.
- **Ajustes automáticos:**
  - Con `prefers-reduced-motion`, todo queda quieto.
  - Con renderizado por software (sin GPU real) o en un móvil chico, se usa el degradado CSS.
  - Los fondos animados se limitan a 30 fps y se pausan cuando la pestaña no está visible.

## Arquitectura

```
server/          servidor local, montado dentro de Vite (un solo proceso)
  content/       descubrimiento de materias (scan.ts) e índice en memoria con vigilancia de archivos (index.ts)
  store/         datos personales en data/workspace.json
  routes.ts      API local: /api/subjects, /api/corpus, /api/file/…, /api/workspace, /api/notes, /api/progress, /api/visit
shared/          tipos y cálculo de progreso compartidos entre servidor e interfaz
src/
  styles/        tokens, base y tipografía de lectura
  layouts/       AppShell (ambiente + header) y SubjectLayout (sidebar + contenido)
  navigation/    sidebar, árbol, riel contraído y drawer móvil
  content/       lector de Markdown, diagramas con zoom, bloques de código
  study/         búsqueda, apuntes, progreso, temporizador, atajos, configuración
  features/      Home y vistas de materia/documento
  effects/       fondos (Grain Gradient, Line Waves) y detección de GPU
  ui/            primitivas: botones con tooltip, modal, anillos de progreso
```

**Stack:** React 19, TypeScript, Vite, Tailwind 4, React Router, TanStack Query, Zustand, react-markdown, cmdk, Radix, Motion, Lucide.

La API rechaza rutas que intenten salir de la carpeta de la materia, sirve solo extensiones conocidas y acepta cambios únicamente desde la propia app.

## Limitaciones del MVP

- La clasificación del contenido sigue las convenciones de nombres de arriba. Una estructura distinta se muestra igual, pero como "subtema" o "recurso".
- DOCX y otros formatos de Office no se previsualizan: se abren con su programa o se descargan.
- No hay fórmulas matemáticas (no aparecen en el contenido actual). Para agregarlas: `npm i remark-math rehype-katex katex` y sumar los plugins en `src/content/MarkdownView.tsx`.
- No hay importación de respaldos desde la interfaz: restaurar es reemplazar el archivo.
- Los diagramas en modo oscuro son una inversión de colores del original. Con el botón del diagrama se ven los colores reales.
- El temporizador es un cronómetro simple, sin historial.
- La búsqueda es por coincidencia de palabras, sin distinguir acentos ni mayúsculas. No tolera errores de tipeo.

## Licencias de terceros

- **Line Waves:** [React Bits](https://reactbits.dev), MIT + Commons Clause. Copia local adaptada en `src/effects/LineWaves.tsx`; el texto de la licencia está en `src/effects/LICENSE-react-bits.md`.
- **Grain Gradient:** [Paper Shaders](https://github.com/paper-design/shaders), Apache-2.0. Es la referencia visual de Craftwork.
- **Fuentes:** Geist, Instrument Serif y JetBrains Mono, licencia SIL OFL, instaladas con Fontsource.
