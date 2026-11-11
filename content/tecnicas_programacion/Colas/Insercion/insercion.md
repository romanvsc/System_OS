# Colas — insercion

## Enunciado y objetivo

Insertar al final de una cola existente.

**Objetivo:** Insertar al final de una cola existente.

## Supuestos y variables

↑C señala el primero y ↑U el último. Si está vacía, ambos son NIL; si tiene un solo nodo, ambos apuntan a él.

**Función de las variables:** `↑C` y `↑U` son los extremos, `↑P` señala el nodo nuevo y `DATO` es el valor ingresado.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑C ← primero de la cola existente`; `↑U ← último de la cola existente`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑P ← New(COLA)`.
- **Rombo IF:** `↑P <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“No hay lugar”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← NIL`.
    - **Rombo IF:** `↑C = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑U.PS ← ↑P`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C ← ↑P`.
      - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - **Rectángulo:** `↑U ← ↑P`.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

No hay conectores numerados.

## Ejemplo

Con 10 → 20, insertar 30 produce 10 → 20 → 30.

[Ver diagrama SVG](insercion.svg) · [Ver diagrama PNG](insercion.png)
