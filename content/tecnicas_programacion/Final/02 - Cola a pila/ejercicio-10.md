# Trabajo práctico 2 — Ejercicio 10

## Enunciado y objetivo

Se cuenta con una cola a cuyo inicio apunta ^i cargada con valores numéricos dichos
valores deben ser cargados en una pila a cuyo inicio apunta ^l y posteriormente borrar
toda la cola.

**Objetivo:** Copiar la cola a una pila y después vaciar la cola.

## Supuestos y variables

La pila empieza vacía. Cada copia se inserta al tope, por lo que el orden queda invertido. La cola solo se desconecta después de copiar todos los nodos; si falla memoria queda intacta y se informa que la pila es parcial. Desconectar no libera memoria.

**Función de las variables:** `↑i` y `↑U` son los extremos de la cola; `↑A` recorre; `↑l` es el tope de la pila nueva; `↑P` es el nodo nuevo; `↑Q` conserva temporalmente el nodo desconectado; `seguir` indica si la copia puede continuar.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑i ← primero de la cola existente`; `↑U ← NIL`; `↑A ← NIL`; `↑l ← NIL`; `↑P ← NIL`; `↑Q ← NIL`; `seguir ← 1`.
- **Rectángulo:** `↑A ← ↑i`; `↑U ← NIL`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑U ← ↑A`; `↑A ← ↑A.PS`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Rectángulo:** `↑A ← ↑i`.
- **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A <> NIL Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑P ← New(PILA)`.
  - **Rombo IF:** `↑P <> NIL`.
    - **No (izquierda):**
      - **Documento de salida:** `“No hay lugar; cola conservada y pila incompleta”`.
      - **Rectángulo:** `seguir ← 0`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P.dato ← ↑A.dato`; `↑P.PS ← ↑l`; `↑l ← ↑P`; `↑A ← ↑A.PS`.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Rombo IF:** `seguir = 1`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `↑i <> NIL`. Por **Sí**, a la derecha, ejecutá:
      - **Rectángulo:** `↑Q ← ↑i`; `↑i ← ↑i.PS`; `↑Q.PS ← NIL`.
      - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
    - **Rectángulo:** `↑U ← NIL`.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.
- Círculo 2: regresa justo antes de `↑A <> NIL Y seguir = 1`.
- Círculo 3: regresa justo antes de `↑i <> NIL`.

## Ejemplo

La cola 1 → 2 → 3 genera la pila 3 → 2 → 1; luego la cola queda vacía.

[Ver diagrama SVG](ejercicio-10.svg) · [Ver diagrama PNG](ejercicio-10.png)
