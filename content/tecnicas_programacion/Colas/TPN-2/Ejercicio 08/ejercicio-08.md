# Trabajo práctico 2 — Ejercicio 8

## Enunciado y objetivo

Secuenta con una cola a cuyo inicio apunta ^u. Se ingresa por teclado dos pares de
valores que indican acción , dato.
Las acciones posibles son insertar, borrar, buscar .
Por ejemplo el par insertar 5 significa que se debe insertar el 5 en la estructura. Tener
presente las restricciones que posee este tipo de estructuras, en caso de no ser posible la
acción informar al usuario con un mensaje.

**Objetivo:** Procesar exactamente dos acciones sobre una cola.

## Supuestos y variables

Se adopta 1 insertar, 2 buscar y 3 borrar. En borrado se mueven nodos a una cola auxiliar en orden, omitiendo la primera coincidencia; se restaura la cola y se actualizan ambos extremos.

**Función de las variables:** `↑u` y `↑U` son los extremos de la cola; `↑A` recorre; `↑H` y `↑V` son los extremos auxiliares; `↑P` señala el nodo nuevo o movido; `↑Q` guarda el retirado; `ACCION` y `DATO` son el par ingresado; `b` señala coincidencia y `pares` cuenta ingresos.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑u ← primero de la cola existente`; `↑U ← NIL`; `↑A ← NIL`; `↑H ← NIL`; `↑V ← NIL`; `↑P ← NIL`; `↑Q ← NIL`; `ACCION ← 0`; `DATO ← 0`; `b ← 0`; `pares ← 0`.
- **Rectángulo:** `↑A ← ↑u`; `↑U ← NIL`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑U ← ↑A`; `↑A ← ↑A.PS`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `pares < 2`. Por **Sí**, a la derecha, ejecutá:
  - **Paralelogramo de entrada:** `ACCION, DATO`.
  - **Rombo IF:** `ACCION = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(COLA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar”`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑u = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑U.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑u ← ↑P`.
            - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
          - **Rectángulo:** `↑U ← ↑P`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rombo IF:** `ACCION = 2`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑u`; `b ← 0`.
      - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑A.dato = DATO`.
          - **No (izquierda):**
            - **Rectángulo:** `↑A ← ↑A.PS`.
          - **Sí (derecha):**
            - **Rectángulo:** `b ← 1`.
          - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
        - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
      - **Rombo IF:** `b = 1`.
        - **No (izquierda):**
          - **Documento de salida:** `“Elemento no encontrado”`.
        - **Sí (derecha):**
          - **Documento de salida:** `“Elemento encontrado”`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rombo IF:** `ACCION = 3`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑H ← NIL`; `↑V ← NIL`; `↑Q ← NIL`; `b ← 0`.
      - **WHILE, círculo 4:** poné el primer círculo 4 antes del rombo `↑u <> NIL`. Por **Sí**, a la derecha, ejecutá:
        - **Rectángulo:** `↑P ← ↑u`; `↑u ← ↑P.PS`; `↑P.PS ← NIL`.
        - **Rombo IF:** `↑u = NIL`.
          - **No (izquierda):** va directamente a la unión.
          - **Sí (derecha):**
            - **Rectángulo:** `↑U ← NIL`.
          - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
        - **Rombo IF:** `↑P.dato = DATO Y b = 0`.
          - **No (izquierda):**
            - **Rombo IF:** `↑H = NIL`.
              - **No (izquierda):**
                - **Rectángulo:** `↑V.PS ← ↑P`.
              - **Sí (derecha):**
                - **Rectángulo:** `↑H ← ↑P`.
              - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
            - **Rectángulo:** `↑V ← ↑P`.
          - **Sí (derecha):**
            - **Rectángulo:** `↑Q ← ↑P`; `b ← 1`.
          - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
        - Al terminar, el segundo círculo 4 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
      - **Rectángulo:** `↑u ← ↑H`; `↑U ← ↑V`; `↑H ← NIL`; `↑V ← NIL`.
      - **Rombo IF:** `b = 0`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Documento de salida:** `“Elemento no encontrado; no se puede borrar”`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rombo IF:** `ACCION <> 1 Y ACCION <> 2 Y ACCION <> 3`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Documento de salida:** `“Acción inválida”`.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rectángulo:** `pares ← pares + 1`.
  - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.
- Círculo 2: regresa justo antes de `pares < 2`.
- Círculo 3: regresa justo antes de `↑A <> NIL Y b = 0`.
- Círculo 4: regresa justo antes de `↑u <> NIL`.

## Ejemplo

En 1 → 2, los pares (3, 2) y (1, 5) dejan 1 → 5.

[Ver diagrama SVG](ejercicio-08.svg) · [Ver diagrama PNG](ejercicio-08.png)
