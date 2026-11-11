# Trabajo práctico 2 — Ejercicio 4

## Enunciado y objetivo

Secuenta con una estructura tipo pila a cuyo inicio apunta ^T, cardada con valores
numéricos se deben ingresar los elementos impares de la pila a una estructura tipo cola a
cuyo inicio apunta ^R.

**Objetivo:** Copiar los valores impares de la pila a una cola nueva.

## Supuestos y variables

Los valores se suponen enteros; MOD 2 <> 0 incluye impares negativos. ↑T conserva la pila y ↑R/↑U son los extremos de la cola nueva. Si falla una reserva se informa y queda una copia parcial.

**Función de las variables:** `↑T` conserva el tope de la pila y `↑A` la recorre; `↑R` y `↑U` son primero y último de la cola nueva; `↑P` es el nodo nuevo; `seguir` detiene el recorrido ante falta de memoria.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑T ← tope de la pila existente`; `↑A ← ↑T`; `↑R ← NIL`; `↑U ← NIL`; `↑P ← NIL`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.dato MOD 2 <> 0`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(COLA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; cola incompleta”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← ↑A.dato`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑R = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑U.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑R ← ↑P`.
            - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
          - **Rectángulo:** `↑U ← ↑P`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rectángulo:** `↑A ← ↑A.PS`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y seguir = 1`.

## Ejemplo

Desde el tope 3 → 4 → 5 resulta la cola 3 → 5; la pila no cambia.

[Ver diagrama SVG](ejercicio-04.svg) · [Ver diagrama PNG](ejercicio-04.png)
