---
version: 1
slug: "src-features-home-home-tsx"
primary_target: "src/features/home/Home.tsx"
related_targets: ["src/features/subject/SubjectOverview.tsx"]
---

# Pantallas de título (Inicio, intro y menú de materia)

Alcance: Inicio (`/`), intro de materia y menú de materia (`/m/:materia`). Modo: Experience en la entrada; la lectura (`/m/:materia/d/*`) sigue en el modo Read y no forma parte de este brief.
Público y tarea: Roman entra a estudiar; elige una materia y retoma o navega a un documento en dos o tres pulsaciones de teclado.
Restricciones: se respeta la norma de docs/auditoria-visual.md; offline; sin copiar arte, íconos ni tipografía del juego de referencia; las ilustraciones las aporta Roman (hasta entonces, respaldo con el ambiente actual).

## Direction contract

THESIS: Entrar a estudiar como se entra a un juego: una pantalla de título con un único menú que se recorre con el teclado, en lugar de una grilla de tarjetas de dashboard.

OWN-WORLD: Penumbra azul-grafito (#0B0D12 y #131720) sobre la ilustración de cada materia; un solo foco cálido naranja. Selección: una banda de luz cálida que se desvanece en sus extremos, más la marca "S" en trazo. Instrument Serif para los nombres, Geist para el menú, keycaps propios. Sin tarjetas, sin bordes de 1 px de lado a lado.

STORY: Roman reconoce sus materias como mundos propios, elige una, ve su intro y en un paso continúa donde dejó o entra a Teoría o Trabajos prácticos.

FIRST VIEWPORT: Fondo a sangre. Marca grande abajo a la izquierda (serif, 9–11 vw). Menú alineado a la derecha, en el tercio inferior derecho, con ítems de 24–28 px. Debajo del menú, una sola línea de progreso de la selección. Ayudas de teclas en la base. La acción principal es el ítem seleccionado.

FORM: Pantalla de título de videojuego (forma fijada por la referencia de Roman, posición 1). Interacción insignia: la banda que se desliza con las flechas y el fondo que cambia con un fundido según la materia. seed: none (pinned by Roman) — no se hizo sorteo: la forma la fijó Roman con su referencia, y new-work.md establece que "a user- or brief-pinned direction beats the roll, always".

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
