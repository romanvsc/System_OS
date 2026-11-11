# Trabajo práctico 6 — Ejercicio 4

## Enunciado y objetivo

Se cuenta con una estructura tipo LDEC a cuyo inicio apunta ^M. El operador ingresa pares de valores acción, dato. Las acciones posibles son: insertar, eliminar y buscar. El fin viene dado por un par 0 0.

**Objetivo:** Procesar pares acción-dato hasta el par 0,0.

## Supuestos y función de las variables

1 inserta al final, 2 busca y 3 elimina la primera coincidencia. ↑M es cabeza; ↑A recorre; ↑N/↑S son vecinos; ↑P es el nodo nuevo; b indica coincidencia y detener termina búsquedas. Solo el par 0,0 es corte; un cero aislado no lo es.

Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LDEC y LDESC nombran la misma estructura. Los nodos LDESC usan `PA` y `PS`. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑M ← cabeza de la LDESC existente`; `↑A ← NIL`; `↑N ← NIL`; `↑S ← NIL`; `↑P ← NIL`; `ACCION ← 0`; `DATO ← 0`; `b ← 0`; `detener ← 0`.
- **Paralelogramo de entrada:** `ACCION, DATO`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `ACCION <> 0 O DATO <> 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `ACCION = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(LDESC)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar”`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← DATO`.
          - **Rombo IF:** `↑M = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑N ← ↑M.PA`; `↑P.PA ← ↑N`; `↑P.PS ← ↑M`; `↑N.PS ← ↑P`; `↑M.PA ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P.PA ← ↑P`; `↑P.PS ← ↑P`; `↑M ← ↑P`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - **Documento de salida:** `“Elemento insertado”`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `ACCION = 2`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 0`; `detener ← 0`.
      - **Rombo IF:** `↑M <> NIL`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑A ← ↑M`.
          - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
            - **Rombo IF:** `↑A.dato = DATO`.
              - **No (izquierda):**
                - **Rectángulo:** `↑A ← ↑A.PS`.
                - **Rombo IF:** `↑A = ↑M`.
                  - **No (izquierda):** va directamente a la unión.
                  - **Sí (derecha):**
                    - **Rectángulo:** `detener ← 1`.
                  - Uní las ramas físicamente debajo de sus bloques antes de continuar.
              - **Sí (derecha):**
                - **Rectángulo:** `b ← 1`; `detener ← 1`.
              - Uní las ramas físicamente debajo de sus bloques antes de continuar.
            - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - **Rombo IF:** `b = 1`.
        - **No (izquierda):**
          - **Documento de salida:** `“Elemento no encontrado”`.
        - **Sí (derecha):**
          - **Documento de salida:** `“Elemento encontrado”`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `ACCION = 3`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 0`; `detener ← 0`.
      - **Rombo IF:** `↑M <> NIL`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑A ← ↑M`.
          - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
            - **Rombo IF:** `↑A.dato = DATO`.
              - **No (izquierda):**
                - **Rectángulo:** `↑A ← ↑A.PS`.
                - **Rombo IF:** `↑A = ↑M`.
                  - **No (izquierda):** va directamente a la unión.
                  - **Sí (derecha):**
                    - **Rectángulo:** `detener ← 1`.
                  - Uní las ramas físicamente debajo de sus bloques antes de continuar.
              - **Sí (derecha):**
                - **Rectángulo:** `b ← 1`; `detener ← 1`.
              - Uní las ramas físicamente debajo de sus bloques antes de continuar.
            - El segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - **Rombo IF:** `b = 1`.
        - **No (izquierda):**
          - **Documento de salida:** `“No se puede borrar; no existe”`.
        - **Sí (derecha):**
          - **Rombo IF:** `↑A.PS = ↑A`.
            - **No (izquierda):**
              - **Rectángulo:** `↑N ← ↑A.PA`; `↑S ← ↑A.PS`; `↑N.PS ← ↑S`; `↑S.PA ← ↑N`.
              - **Rombo IF:** `↑A = ↑M`.
                - **No (izquierda):** va directamente a la unión.
                - **Sí (derecha):**
                  - **Rectángulo:** `↑M ← ↑S`.
                - Uní las ramas físicamente debajo de sus bloques antes de continuar.
            - **Sí (derecha):**
              - **Rectángulo:** `↑M ← NIL`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - **Rectángulo:** `↑A.PA ← NIL`; `↑A.PS ← NIL`.
          - **Documento de salida:** `“Elemento eliminado”`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `ACCION <> 1 Y ACCION <> 2 Y ACCION <> 3`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Documento de salida:** `“Acción inválida”`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Paralelogramo de entrada:** `ACCION, DATO`.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `ACCION <> 0 O DATO <> 0`.
- Círculo 2: regresa justo antes de `detener = 0`.
- Círculo 3: regresa justo antes de `detener = 0`.

## Ejemplo

Desde lista vacía, (1, 5), (2, 5), (3, 5), (0, 0) inserta, encuentra y elimina 5.

[Ver diagrama SVG](ejercicio-04.svg) · [Ver diagrama PNG](ejercicio-04.png)
