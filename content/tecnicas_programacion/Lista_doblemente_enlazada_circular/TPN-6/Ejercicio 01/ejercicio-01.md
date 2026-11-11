# Trabajo práctico 6 — Ejercicio 1

## Enunciado y objetivo

Se cuenta con una estructura tipo LDESC a cuyo inicio apunta ^x cargada con valores numéricos. El operador ingresa por teclado números que deben ser insertados en la estructura manteniendo el orden.

**Objetivo:** Insertar en orden ascendente hasta ingresar 0.

## Supuestos y función de las variables

Se supone que la LDESC inicial está ordenada; se admiten repetidos después de los iguales. ↑x es cabeza; ↑A busca posición; ↑N es vecino; ↑P es nodo nuevo y DATO es la entrada. 0 termina y no se inserta. ↑A.PS siempre es un nodo dentro del ciclo de posición porque la lista no está vacía.

Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LDEC y LDESC nombran la misma estructura. Los nodos LDESC usan `PA` y `PS`. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑x ← cabeza de la LDESC existente`; `↑A ← NIL`; `↑N ← NIL`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `DATO <> 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑P ← New(LDESC)`.
  - **Rombo IF:** `↑P <> NIL`.
    - **No (izquierda):**
      - **Documento de salida:** `“No hay lugar”`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P.dato ← DATO`.
      - **Rombo IF:** `↑x = NIL`.
        - **No (izquierda):**
          - **Rombo IF:** `DATO < ↑x.dato`.
            - **No (izquierda):**
              - **Rectángulo:** `↑A ← ↑x`.
              - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A.PS <> ↑x Y ↑A.PS.dato <= DATO`. Por **Sí**, a la derecha, ejecutá:
                - **Rectángulo:** `↑A ← ↑A.PS`.
                - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
              - **Rectángulo:** `↑N ← ↑A.PS`; `↑P.PA ← ↑A`; `↑P.PS ← ↑N`; `↑A.PS ← ↑P`; `↑N.PA ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑N ← ↑x.PA`; `↑P.PA ← ↑N`; `↑P.PS ← ↑x`; `↑N.PS ← ↑P`; `↑x.PA ← ↑P`; `↑x ← ↑P`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.PA ← ↑P`; `↑P.PS ← ↑P`; `↑x ← ↑P`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Paralelogramo de entrada:** `DATO`.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `DATO <> 0`.
- Círculo 2: regresa justo antes de `↑A.PS <> ↑x Y ↑A.PS.dato <= DATO`.

## Ejemplo

En 2, 4, 4, ingresar 4 y luego 1 produce desde la cabeza 1, 2, 4, 4, 4; ingresar 0 termina.

[Ver diagrama SVG](ejercicio-01.svg) · [Ver diagrama PNG](ejercicio-01.png)
