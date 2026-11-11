# Colas — extraccion

## Enunciado y objetivo

Extraer y mostrar el primero de una cola existente.

**Objetivo:** Extraer y mostrar el primero de una cola existente.

## Supuestos y variables

↑C y ↑U señalan el primero y el último. Desconectar el nodo no libera su memoria.

**Función de las variables:** `↑C` y `↑U` son los extremos; `↑P` conserva el nodo extraído.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑C ← primero de la cola existente`; `↑U ← último de la cola existente`; `↑P ← NIL`.
- **Rombo IF:** `↑C <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“Cola vacía”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P ← ↑C`; `↑C ← ↑C.PS`.
    - **Rombo IF:** `↑C = NIL`.
      - **No (izquierda):** va directamente a la unión.
      - **Sí (derecha):**
        - **Rectángulo:** `↑U ← NIL`.
      - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - **Documento de salida:** `↑P.dato`.
    - **Rectángulo:** `↑P.PS ← NIL`.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

No hay conectores numerados.

## Ejemplo

De 10 → 20 sale 10 y queda 20. Si solo había un nodo, ambos extremos quedan en NIL.

[Ver diagrama SVG](extraccion.svg) · [Ver diagrama PNG](extraccion.png)
