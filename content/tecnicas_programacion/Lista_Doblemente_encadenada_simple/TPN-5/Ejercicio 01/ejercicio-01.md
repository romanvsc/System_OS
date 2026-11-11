# Trabajo práctico 5 — Ejercicio 1

## Enunciado y objetivo

Agregar un dato leído por teclado a una estructura tipo lista doblemente encadenada simple.

**Objetivo:** Agregar un valor al final.

## Supuestos y función de las variables

Se elige insertar al final. ↑C es cabeza; ↑A recorre, ↑F conserva el último, ↑P crea el nodo y DATO es el valor ingresado.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LDES existente`; `↑A ← NIL`; `↑F ← NIL`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑A ← ↑C`; `↑F ← NIL`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑F ← ↑A`; `↑A ← ↑A.PS`.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **Rectángulo:** `↑P ← New(LDES)`.
- **Rombo IF:** `↑P <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“No hay lugar”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PA ← ↑F`; `↑P.PS ← NIL`.
    - **Rombo IF:** `↑C = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑F.PS ← ↑P`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C ← ↑P`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - **Rectángulo:** `↑F ← ↑P`.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.

## Ejemplo

Agregar 3 a 1 ⇄ 2 produce 1 ⇄ 2 ⇄ 3. En una lista vacía, el nuevo nodo es la cabeza.

[Ver diagrama SVG](ejercicio-01.svg) · [Ver diagrama PNG](ejercicio-01.png)
