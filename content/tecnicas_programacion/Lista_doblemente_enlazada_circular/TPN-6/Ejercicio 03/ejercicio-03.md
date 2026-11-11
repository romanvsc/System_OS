# Trabajo práctico 6 — Ejercicio 3

## Enunciado y objetivo

Se cuenta con una estructura tipo pila a cuyo inicio apunta ^l cargada con notas y nombres de alumnos de tercer grado. Se debe generar una LDEC con los nombres de los alumnos que no aprobaron.

**Objetivo:** Copiar a una LDESC nueva los nombres de notas menores que 6.

## Supuestos y función de las variables

La pila tiene campos nombre, nota y PS; la LDESC guarda nombre, PA y PS. ↑l conserva el tope; ↑A recorre; ↑C es la cabeza nueva; ↑N es el último; ↑P crea el nodo y seguir detiene ante fallo. Se conservan nombres repetidos y orden de recorrido.

Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LDEC y LDESC nombran la misma estructura. Los nodos LDESC usan `PA` y `PS`. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑l ← tope de la pila existente`; `↑A ← ↑l`; `↑C ← NIL`; `↑N ← NIL`; `↑P ← NIL`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.nota < 6`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(LDESC)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.nombre ← ↑A.nombre`.
          - **Rombo IF:** `↑C = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑N ← ↑C.PA`; `↑P.PA ← ↑N`; `↑P.PS ← ↑C`; `↑N.PS ← ↑P`; `↑C.PA ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P.PA ← ↑P`; `↑P.PS ← ↑P`; `↑C ← ↑P`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑A.PS`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y seguir = 1`.

## Ejemplo

Pila Ana/4 → Luis/6 → Ana/3 genera la circular Ana, Ana; la pila permanece igual.

[Ver diagrama SVG](ejercicio-03.svg) · [Ver diagrama PNG](ejercicio-03.png)
