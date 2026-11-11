# Lista doblemente enlazada circular — insercion principio

## Enunciado y objetivo

Insertar un nodo al principio.

**Objetivo:** Insertar un nodo al principio.

## Supuestos y función de las variables

↑C es la cabeza; ↑N conserva el último; ↑P es el nuevo nodo y DATO el ingreso. Si la lista estaba vacía ambos enlaces del nuevo se apuntan a sí mismo.

Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LDEC y LDESC nombran la misma estructura. Los nodos LDESC usan `PA` y `PS`. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LDESC existente`; `↑N ← NIL`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑P ← New(LDESC)`.
- **Rombo IF:** `↑P <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“No hay lugar”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P.dato ← DATO`.
    - **Rombo IF:** `↑C = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑N ← ↑C.PA`; `↑P.PA ← ↑N`; `↑P.PS ← ↑C`; `↑N.PS ← ↑P`; `↑C.PA ← ↑P`; `↑C ← ↑P`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑P.PA ← ↑P`; `↑P.PS ← ↑P`; `↑C ← ↑P`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

No hay conectores numerados.

## Ejemplo

Al insertar 5 antes de la circular 10, 20, la cabeza pasa a 5 y el último 20 enlaza con 5 en ambos sentidos.

[Ver diagrama SVG](insercion_principio.svg) · [Ver diagrama PNG](insercion_principio.png)
