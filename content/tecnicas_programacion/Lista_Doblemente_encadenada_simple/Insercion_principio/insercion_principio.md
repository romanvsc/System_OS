# Lista doblemente enlazada simple — insercion principio

## Enunciado y objetivo

Insertar un nodo al principio.

**Objetivo:** Insertar un nodo al principio.

## Supuestos y función de las variables

↑C es la cabeza, ↑P es el nodo nuevo y DATO es el valor ingresado. Si la lista estaba vacía se saltea la actualización del anterior de la cabeza vieja.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LDES existente`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑P ← New(LDES)`.
- **Rombo IF:** `↑P <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“No hay lugar”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PA ← NIL`; `↑P.PS ← ↑C`.
    - **Rombo IF:** `↑C <> NIL`.
      - **No (izquierda):** va directamente a la unión.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C.PA ← ↑P`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - **Rectángulo:** `↑C ← ↑P`.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

No hay conectores numerados.

## Ejemplo

Insertar 5 en 10 ⇄ 20 produce NIL ← 5 ⇄ 10 ⇄ 20 → NIL.

[Ver diagrama SVG](insercion_principio.svg) · [Ver diagrama PNG](insercion_principio.png)
