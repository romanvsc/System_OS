# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Roman, estudiante del iAes, estudiando solo en su computadora. Su trabajo es leer teoría, consultar trabajos prácticos y repasar ejercicios resueltos (con diagramas de flujo), tomar apuntes y llevar su avance. Uso diario y personal; no hay otros usuarios.

## Product Purpose

System OS es su espacio de estudio personal: local, offline y privado. Descubre las materias desde sus carpetas (`iAes/<materia>/` con `materia.json`) sin modificar los archivos originales, y guarda aparte los datos personales (apuntes, progreso, últimos accesos). El éxito es que lo quiera usar todos los días.

## Positioning

Lee el material real tal como Roman lo organiza en disco, sin plataforma ni cuenta de por medio. Es una herramienta personal con identidad propia, no una plataforma educativa comercial.

## Operating Context

- Contenido real en Markdown, con diagramas SVG/PNG por ejercicio y las convenciones de diagramas de la profesora (`pautas.md`).
- Se inicia con `npm run dev` en `http://127.0.0.1:4317`.
- Se usa con mouse y teclado (atajos), y también en tablet y celular.

## Capabilities and Constraints

- Prioridad fija: **claridad de lectura > navegación > funcionalidad > rendimiento > animaciones decorativas**.
- Sin autenticación, cuentas, nube, sincronización, IA externa, chatbots, gamificación compleja, rankings ni analytics.
- Durante el uso no se hacen peticiones externas: fuentes, librerías e imágenes son locales.
- Nunca se inventa contenido académico, soluciones ni métricas: el progreso sale de lo que Roman marca.
- Los archivos originales no se modifican. El único archivo que la app agrega en una materia es su `materia.json`.

## Brand Commitments

Nombre: **System OS**. Interfaz en español rioplatense (voseo). La norma visual vigente está en `docs/auditoria-visual.md`.

## Evidence on Hand

Una materia real: Técnicas de Programación (tema Pilas: teoría, 3 subtemas y el TP 1 con 10 ejercicios resueltos con diagramas). Las otras carpetas de `iAes/` (Sistemas, estadística, Redes) todavía no son materias en la app. Las ilustraciones de fondo de cada materia las genera Roman: no existen hasta que él las agregue.

## Product Principles

1. Leer primero: nada compite con el texto académico.
2. Lo original es sagrado: se lee, nunca se reescribe.
3. Datos reales o ninguno.
4. Rápido con el teclado y cómodo con el mouse.
5. Personal y agradable: identidad propia, nunca un dashboard genérico.

## Accessibility & Inclusion

WCAG AA: foco visible, navegación completa por teclado, `prefers-reduced-motion` respetado y áreas táctiles de 44 px.
