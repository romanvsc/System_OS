# Trabajo práctico 5 — Ejercicio 7

## Enunciado y objetivo

Se cuenta con dos estructuras tipo Les a cuyos inicios apuntan ^T y ^L respectivamente. Se debe generar una LDES con los elementos intercalados de las estructuras anteriores, tener presente un elemento de T luego uno de L y así sucesivamente. Las estructuras no son necesariamente iguales en cuanto a la cantidad de elementos. Si una llega al fin antes que la otra se continúa con la carga hasta terminar las dos.

**Objetivo:** Intercalar dos listas simples en una LDES nueva.

## Supuestos y función de las variables

↑T y ↑L conservan las cabezas originales; ↑A y ↑B recorren; ↑C y ↑F son cabeza y último de la LDES nueva; ↑P crea el nodo y seguir detiene ante falta de memoria. Se toma primero T, después L; al agotarse una se agregan los sobrantes de la otra.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑T ← cabeza de la primera LES`; `↑L ← cabeza de la segunda LES`; `↑A ← ↑T`; `↑B ← ↑L`; `↑C ← NIL`; `↑F ← NIL`; `↑P ← NIL`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `(↑A <> NIL O ↑B <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A <> NIL`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(LDES)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← ↑A.dato`; `↑P.PA ← ↑F`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑C = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑F.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑C ← ↑P`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - **Rectángulo:** `↑F ← ↑P`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - **Rombo IF:** `seguir = 1`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑A ← ↑A.PS`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `↑B <> NIL Y seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(LDES)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← ↑B.dato`; `↑P.PA ← ↑F`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑C = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑F.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑C ← ↑P`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - **Rectángulo:** `↑F ← ↑P`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - **Rombo IF:** `seguir = 1`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑B ← ↑B.PS`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `(↑A <> NIL O ↑B <> NIL) Y seguir = 1`.

## Ejemplo

T = 1 → 2 → 3 y L = 8 producen NIL ← 1 ⇄ 8 ⇄ 2 ⇄ 3 → NIL.

[Ver diagrama SVG](ejercicio-07.svg) · [Ver diagrama PNG](ejercicio-07.png)
