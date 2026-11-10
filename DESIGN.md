---
name: System OS
description: App local de estudio con pantallas de título de videojuego y una columna de lectura tranquila.
colors:
  bg: "#0b0d12"
  surface: "#131720"
  surface-2: "#1e232c"
  surface-3: "#262c37"
  ink: "#f5f5f5"
  ink-2: "#9ca3af"
  ink-3: "#7b8391"
  line: "rgb(255 255 255 / 0.08)"
  line-strong: "rgb(255 255 255 / 0.14)"
  accent: "#f97316"
  accent-hover: "#fb923c"
  accent-ink: "#1a0d03"
  accent-soft: "rgb(249 115 22 / 0.12)"
  done: "#5dd6d1"
  done-soft: "rgb(93 214 209 / 0.12)"
  danger: "#f87171"
  note: "#f2c08a"
  note-soft: "rgb(242 192 138 / 0.06)"
  code-ink: "#e9e3dc"
  inline-code-ink: "#f3e6da"
  syntax-string: "#b9d99a"
  syntax-type: "#c4b5fd"
  paper-dark: "#0f0f0f"
  grain-1: "#1a1e27"
  grain-2: "#4a230b"
  grain-3: "#11141b"
typography:
  display:
    fontFamily: "Instrument Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(3.5rem, 10vw, 11rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Instrument Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(2.75rem, 7vw, 7.5rem)"
    fontWeight: 400
    lineHeight: 0.92
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Instrument Serif, Georgia, Times New Roman, serif"
    fontSize: "clamp(2rem, 4.5vw, 3rem)"
    fontWeight: 400
    lineHeight: 1.08
    letterSpacing: "-0.02em"
  menu:
    fontFamily: "Geist Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.1vw, 1.625rem)"
    fontWeight: 400
    lineHeight: 1.25
  read-heading:
    fontFamily: "Geist Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "1.3rem"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.02em"
  body-read:
    fontFamily: "Geist Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.75
  body:
    fontFamily: "Geist Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: "1.5rem"
  body-sm:
    fontFamily: "Geist Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: "1.375rem"
  label:
    fontFamily: "Geist Variable, Segoe UI, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: "1rem"
    letterSpacing: "0.08em"
  mono:
    fontFamily: "JetBrains Mono Variable, Cascadia Code, Consolas, monospace"
    fontSize: "0.86em"
    fontWeight: 400
    fontFeature: "'calt' 0, 'liga' 0"
rounded:
  kbd: "0.25rem"
  sm: "0.375rem"
  md: "0.5rem"
  card: "0.875rem"
  panel: "1.125rem"
  full: "9999px"
spacing:
  unit: "0.25rem"
  page-gutter: "clamp(1.25rem, 6vw, 6.5rem)"
  menu-group-gap: "1.25rem"
  title-columns-gap: "2.5rem"
  read-column: "42rem"
  sidebar: "18rem"
  rail: "4rem"
  header: "3.5rem"
components:
  title-menu-item:
    textColor: "{colors.ink-2}"
    typography: "{typography.menu}"
    rounded: "{rounded.sm}"
    padding: "6px 12px 6px 40px"
  title-menu-item-active:
    textColor: "{colors.ink}"
    typography: "{typography.menu}"
    rounded: "{rounded.sm}"
    padding: "6px 12px 6px 40px"
  icon-button:
    textColor: "{colors.ink-2}"
    rounded: "{rounded.md}"
    size: "36px"
  icon-button-hover:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
  button-outline:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  button-outline-hover:
    backgroundColor: "{colors.surface-2}"
  kbd:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.kbd}"
    height: "20px"
    padding: "0 6px"
  nav-row:
    textColor: "{colors.ink-2}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: "8px 12px"
  nav-row-active:
    backgroundColor: "{colors.surface-2}"
    textColor: "{colors.ink}"
  input-filter:
    backgroundColor: "{colors.bg}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: "32px"
    padding: "0 10px"
  tooltip:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "6px 10px"
  dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "24px"
  reader-link-card:
    textColor: "{colors.ink}"
    rounded: "{rounded.card}"
    padding: "14px 16px"
  progress-bar:
    backgroundColor: "{colors.accent}"
    rounded: "{rounded.full}"
    height: "4px"
---

# Design System: System OS

## Overview

**Creative North Star: "La pantalla de título en penumbra"**

System OS se entra como se entra a un juego: una penumbra azul-grafito a sangre, el nombre grande en serif abajo a la izquierda y un único menú abajo a la derecha que se recorre con el teclado. La selección es una banda de luz cálida que se desvanece en sus extremos, acompañada por la marca "S" en trazo naranja. Ese es el único foco cálido de la pantalla; todo lo demás es grafito, gris y blanco atenuado.

Detrás de la entrada hay un segundo modo, el de lectura: una columna de 42 rem, cuerpo de 17 px con interlineado 1,75, nada animado detrás del texto. Los dos modos comparten un solo ambiente (una capa de fondo fija para toda la app) y un material continuo sin costuras: header y navegación se separan del contenido con velo, tinte, desenfoque y máscaras de degradado, nunca con líneas de lado a lado.

La densidad es baja en las pantallas de título y media en la navegación. La norma vinculante es `docs/auditoria-visual.md`; este documento la traduce a tokens y no la contradice.

**Key Characteristics:**
- Oscuro por identidad (`color-scheme: dark`), con un acento naranja raro y significativo.
- Tres tipografías con roles cerrados: Instrument Serif para nombres, Geist para interfaz y lectura, JetBrains Mono sin ligaduras para código.
- Material continuo: profundidad por tinte y desenfoque, no por bordes ni sombras.
- Teclado primero: menú con flechas, keycaps propios y foco visible naranja.
- Movimiento con curva de salida exponencial, solo `transform` y `opacity`, con fundidos cuando se pide menos movimiento.

## Colors

Penumbra de grafito frío con un único rescoldo naranja y dos señales semánticas (cian y ámbar) que nunca se mezclan con él.

### Primary
- **Naranja Rescoldo** (accent): identidad e interacción. Marca "S" de selección, banda del menú, foco visible (contorno de 2 px), indicador de documento actual en la sidebar, barra de progreso en curso, subrayado de enlaces en la lectura. Su versión clara (accent-hover) es el hover de enlaces y el texto de palabras clave en el código.
- **Tinta de Rescoldo** (accent-ink): texto sobre relleno naranja sólido.
- **Halo Naranja** (accent-soft): fondos de estado activo de muy baja intensidad.

### Secondary
- **Cian Completado** (done): solo significa "completado". Íconos de check, barra de progreso al 100 %, punto de estado "Local" conectado. Su versión suave (done-soft) acompaña ese mismo significado.

### Tertiary
- **Ámbar Apunte** (note): solo significa "apunte personal". Ícono de apuntes, bordes y fondo (note-soft) de notas y del editor.

### Neutral
- **Penumbra Grafito** (bg): fondo de toda la app y base del velo del header.
- **Grafito Superficie** (surface): tinte de la sidebar y de lo que flota (tooltips, diálogos, paleta, drawer).
- **Grafito Elevado** (surface-2): hover y activo de filas e íconos, fondo de keycaps y de código en línea.
- **Grafito Profundo** (surface-3): barra de desplazamiento y detalles mínimos.
- **Tiza** (ink): títulos y texto principal. En la lectura el cuerpo baja a 86 % de opacidad.
- **Gris Niebla** (ink-2): texto secundario, ítems de menú no seleccionados, ayudas de teclas.
- **Gris Ceniza** (ink-3): texto auxiliar (fechas, contadores, migas). Contraste 5:1 sobre bg y 4,7:1 sobre surface; nunca sobre surface-2.
- **Línea Fantasma / Línea Firme** (line, line-strong): separadores dentro de la columna de lectura, contornos de lo que flota, keycaps y guías del árbol.
- **Rojo Aviso** (danger): errores y estado desconectado.
- **Paleta de lectura técnica** (code-ink, inline-code-ink, syntax-string, syntax-type, paper-dark): código, sintaxis y papel de diagramas invertidos en modo oscuro.
- **Paleta Grain** (grain-1, grain-2, grain-3): grises neutros con un rescoldo marrón-naranja para el fondo Grain Gradient de la Home.

### Named Rules
**The Three Signals Rule.** El naranja es interacción e identidad, el cian es "completado" y el ámbar es "apunte personal". Ningún otro uso, ninguna mezcla.

**The Tokens-Only Rule.** Cada color sale de `src/styles/tokens.css`. Sin hex en componentes; los shaders leen los tokens con `token()` y los acentos dinámicos de materia se derivan con `color-mix`.

## Typography

**Display Font:** Instrument Serif (con Georgia, Times New Roman)
**Body Font:** Geist Variable (con Segoe UI, system-ui)
**Label/Mono Font:** JetBrains Mono Variable (con Cascadia Code, Consolas)

**Character:** una serif de alto contraste y ojo estrecho para nombrar cosas, contra una sans técnica y neutra para todo lo que se lee y se toca. La itálica de la serif en gris ("System *OS*") es la firma de la marca.

### Hierarchy
- **Display** (400, clamp 3,5–11 rem, 0,92): el nombre "System OS" en la pantalla de título de Inicio.
- **Headline** (400, clamp 2,75–7,5 rem, 0,92): el nombre de la materia en su menú y en la intro (que usa hasta 6 rem, 0,95).
- **Title** (400, clamp 2–3 rem, 1,08): el título del documento en el lector.
- **Menu** (Geist 400, clamp 1,25–1,625 rem, 1,25): ítems del `TitleMenu`, alineados a la derecha. La variante media usa 1,25 rem.
- **Read heading** (Geist 600, 1,3 rem, 1,35, −0,02 em): h2 de la lectura; h1 a 1,75 rem, h3 a 1,1 rem, h4 a 1 rem.
- **Body read** (Geist 400, 17 px, 1,75, columna de 42 rem): cuerpo de documentos y apuntes.
- **Body / Body sm** (Geist 400, 16 px y 14 px): interfaz, subtítulos, filas de navegación, ayudas.
- **Label** (Geist 500, 11 px, +0,08 em, mayúsculas): solo encabezados de grupo en la paleta de comandos y el encabezado del recuadro de consigna. Nunca encima de un título.
- **Mono** (JetBrains Mono, 0,86 em en línea, 11 px en keycaps): código, notación de clases y teclas.

### Named Rules
**The Short Serif Rule.** Instrument Serif solo para títulos cortos y nombres; nunca para párrafos, menús ni botones.

**The Standalone Title Rule.** Los títulos se sostienen solos: nada de etiquetas en mayúsculas encima. El contexto va en un subtítulo o en las migas de pan.

**The Bare Notation Rule.** El código, `kbd` y la notación se ven sin ligaduras (`calt` y `liga` apagados): "<>", "<=" y "->" se ven como se escriben.

## Layout

Dos gramáticas. **Pantallas de título** (Inicio y menú de materia): composición a los bordes, a pantalla completa, con margen lateral fluido (page-gutter). Desde 768 px, una grilla de dos columnas (contenido libre y un menú de 20–30 rem) alineada abajo: el nombre abajo a la izquierda, el menú abajo a la derecha, una sola línea de progreso debajo del menú y las ayudas de teclas al pie, a la derecha. Debajo de 768 px se apilan en filas, nombre arriba y menú abajo. Los grupos del menú se separan con un respiro (menu-group-gap), no con líneas.

**Lectura y navegación**: header fijo de 3,5 rem; sidebar de 18 rem que se contrae a un riel de 4 rem (anima su ancho, 300 ms, decisión aceptada en la auditoría); debajo de 768 px se reemplaza por un drawer. El artículo mide hasta 60 rem, pero todo el texto vive en la columna de lectura de 42 rem centrada; solo los diagramas (`.wide`) la exceden.

El ritmo usa la unidad de 4 px de Tailwind. En pantallas táctiles todo lo que se toca alcanza 44 × 44 px con `.tap`, `pointer-coarse:` o `min-h-11`.

**The Edges Rule.** En las pantallas de título el contenido se apoya en los bordes inferiores; el centro queda para el fondo.

**The 42rem Column Rule.** Ningún texto largo supera la columna de lectura, y nada se anima detrás de él.

## Elevation & Depth

Sistema híbrido y casi plano. La profundidad del marco (header y sidebar) se logra con material continuo: un velo de bg de 86 % a 0 % que se disuelve con una máscara, desenfoque de 14 px solo desde 1024 px, y un tinte lateral de surface que se funde con el contenido. Las pantallas de título suman la ilustración de la materia a sangre bajo el degradado de legibilidad `--backdrop-shade`, que deja oscuro el tercio izquierdo y la base. Solo lo que flota tiene superficie propia y sombra.

### Shadow Vocabulary
- **Flotante** (`box-shadow: 0 1px 0 rgb(255 255 255 / 0.04) inset, 0 16px 40px -12px rgb(0 0 0 / 0.6)`): tooltips, diálogos, paleta de comandos y drawer, sobre un vidrio de surface al 82–94 % con desenfoque de 18 px.

### Named Rules
**The No-Seam Rule.** Header, navegación y contenido nunca se separan con líneas de lado a lado; se separan con tinte, desenfoque y máscaras de degradado.

**The Only-What-Floats Rule.** Hay un solo ambiente fijo para toda la app. Solo diálogos, paleta, drawer y tooltips tienen superficie y sombra propias.

## Shapes

Esquinas suaves y consistentes, sin geometría dura. Keycaps a 4 px; banda del menú, foco y código en línea a 6 px; botones, íconos, filas e inputs a 8 px; recuadros del lector (anterior/siguiente, notas, diagramas, PDF) a 14 px; diálogos, paleta y editor de notas a 18 px. Barras de progreso, puntos de estado y el indicador de documento actual son píldoras. Las líneas de 1 px aparecen solo dentro de la columna de lectura (entre secciones y en tablas), como contorno de lo que flota y de los recuadros del lector, y como guía vertical del árbol de la sidebar. Los vacíos usan borde punteado.

## Components

### Title Menu (componente insignia)
Un único `TitleMenu` (`src/game/`) para Inicio y para el menú de materia.
- **Forma:** ítems alineados a la derecha con 40 px de sangría izquierda para la marca, esquinas de 6 px.
- **Selección:** una banda de luz (`--menu-band`, degradado naranja de 0 % → 20 % → 0 % hacia la derecha) que se traslada con `transform` en 260 ms con curva de salida, más la marca "S" en trazo naranja de 18 px. El ítem activo pasa de ink-2 a ink; selección y foco son lo mismo.
- **Teclado:** ↑↓ mueven, Inicio/Fin van a los extremos, Enter entra, Esc/Retroceso/← vuelven en los submenús. Las flechas funcionan aunque el foco esté en la página.
- **Estado:** el check cian al final indica materia o documento completado; el texto secundario (hint) va en body-sm ink-2 antes del nombre.
- **Sonido:** se sintetiza en la app, viene apagado y el `AudioContext` se crea solo tras un gesto.

### Menu Hints
Ayudas de teclas al pie, alineadas a la derecha, en body-sm ink-2. Los íconos (flechas, Enter) van siempre dentro de keycaps; nunca caracteres Unicode sueltos. Se ocultan en pantallas táctiles.

### Keycaps
- **Estilo:** 20 px de alto, mono de 11 px, fondo surface-2 al 60 %, contorno line-strong, esquinas de 4 px.

### Buttons
- **Ícono:** 36 px, esquinas de 8 px, ink-2 sobre transparente; hover y activo pasan a surface-2 al 70 % con ink. Siempre con nombre accesible y tooltip.
- **Contorno:** contorno line-strong, 8 × 12 px, body-sm ink; hover con fondo surface-2 ("Reintentar", "Abrir con…").
- **Presión:** todo lo interactivo usa `.pressable`: escala 0,97 al presionar (120 ms) y transiciones de color de 200 ms con curva de salida.
- **Foco:** contorno naranja de 2 px con 2 px de separación, global.

### Cards / Containers
Solo existen en el lector y los apuntes, nunca en las pantallas de título.
- **Corner Style:** 14 px (recuadros) y 18 px (paneles).
- **Background:** transparente o surface al 40–50 %; notas en note-soft con contorno ámbar al 15 %.
- **Shadow Strategy:** ninguna (ver Elevation & Depth).
- **Border:** line, que pasa a line-strong en hover.
- **Internal Padding:** 14–16 px; 20–24 px en paneles.

### Inputs / Fields
- **Estilo:** filtro de la sidebar de 32 px, fondo bg al 40 %, contorno line, esquinas de 8 px, placeholder ink-3.
- **Foco:** el contorno pasa a naranja al 60 %.
- **Buscador del header:** 36 px, surface al 50 %, contorno line que pasa a line-strong en hover, con keycaps de atajo.

### Navigation
- **Sidebar:** material lateral sin borde. Filas body-sm de 8 × 12 px, ink-2; hover surface-2 al 40 %; activo surface-2 al 70 % con ink. El documento actual lleva una barra vertical naranja en píldora de 2 px a la izquierda, que aparece con un escalado de 260 ms.
- **Riel contraído:** íconos de 16 px; el progreso usa un anillo porque no entra texto.
- **Header:** material superior, logotipo "System *OS*" (sans semibold + serif itálica gris) y controles a la derecha.
- **Móvil:** drawer desde la izquierda (surface sólida, sombra flotante, 360 ms al abrir).

### Progress
Una sola expresión por vista: barra de 4 px sobre line, naranja en curso y cian al completar, animada con `scaleX` en 600 ms, más el texto "n de N completados".

### Subject Intro
Una sola secuencia orquestada de 3,4 s: la ilustración se acerca, se dibuja una línea naranja de 1 px, el nombre aparece con un barrido de máscara y entra el lema. Siempre se puede saltar (cualquier tecla, clic o toque), se ve una vez por sesión y con movimiento reducido no se muestra.

### Scene Transitions
Cada salto entre pantallas es una sola escena (`src/game/transition.tsx`):
- **Confirmación:** la banda destella con `--menu-band-confirm`.
- **Precarga:** se precargan el chunk de la ruta y el documento, con un tope de 400 ms.
- **Cambio de ruta:** ocurre dentro de una view transition de `--duration-scene` (440 ms). La ilustración (`subject-backdrop`) se acerca hasta quedar como eco del lector, y el nombre de la materia (`subject-title`) viaja del h1 a la sidebar. El resto se funde.

Sin soporte del navegador o con movimiento reducido, se navega directo.

En el menú, los ítems entran escalonados (30 ms entre ítems), la "S" se dibuja con `stroke-dashoffset` y el activo se corre 4 px. En el lector, la sidebar y los controles del header entran con un fundido corto.

### Reader Echo
La ilustración de la materia queda detrás del lector, quieta, desenfocada (18 px) y a `--eco-opacity`. Se ve solo arriba y en el borde de la sidebar, según `--eco-mask`; la columna de texto queda sobre fondo liso. Con efectos apagados no hay eco.

### Loading Line
Una línea naranja de 2 px arriba de todo, indeterminada. Aparece solo si una carga o un chunk pendiente supera los 150 ms. El skeleton entra con un fundido.

## Do's and Don'ts

### Do:
- **Do** sacar cada color de `tokens.css` y derivar acentos dinámicos con `color-mix`.
- **Do** usar un único `TitleMenu` con su banda de luz y la marca "S" en toda pantalla de título.
- **Do** separar el marco del contenido con `.material-top` y `.material-side` (velo, tinte, desenfoque y máscara).
- **Do** mantener el texto largo en la columna de 42 rem, a 17 px con interlineado 1,75.
- **Do** animar solo `transform` y `opacity` con la curva de salida `cubic-bezier(0.22, 1, 0.36, 1)`, un momento de entrada por vista y fundidos cortos con movimiento reducido.
- **Do** garantizar 44 px táctiles con `.tap`, `pointer-coarse:` o `min-h-11`.
- **Do** poner la ilustración de materia a sangre bajo `--backdrop-shade` y dejar visible el ambiente cuando no hay imagen.

### Don't:
- **Don't** usar el naranja para nada que no sea interacción o identidad, ni el cian o el ámbar fuera de "completado" y "apunte personal".
- **Don't** separar header, navegación y contenido con bordes de 1 px de lado a lado.
- **Don't** poner etiquetas en mayúsculas encima de un título.
- **Don't** usar tarjetas en las pantallas de título.
- **Don't** repetir el progreso: una barra y un "n de N completados" por vista.
- **Don't** usar la ilustración de fondo ni nada animado detrás del texto del lector.
- **Don't** usar Instrument Serif fuera de títulos cortos, ni ligaduras en código.
- **Don't** usar caracteres Unicode sueltos como íconos de teclas; van dentro de keycaps.
