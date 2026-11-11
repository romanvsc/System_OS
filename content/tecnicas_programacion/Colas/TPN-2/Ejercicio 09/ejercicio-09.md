# Trabajo práctico 2 — Ejercicio 9

## Enunciado y objetivo

Sedebe generar una cola a cuyo inicio apuntará ^d. Se ingresa por teclado números que
deberán ser insertados en dicha cola. El fin viene dado por un cero. Luego de terminada
la carga el operador ingresará nuevamente dos números y se deberán buscar en la
estructura e imprimir cuántos elementos existen entre ambos. Tener en cuenta que los
números ingresados no pueden repetirse.

**Objetivo:** Cargar sin duplicados y contar nodos entre dos números.

## Supuestos y variables

El corte 0 no se inserta. Si un número está repetido se informa y se pide otro. Las posiciones se cuentan desde 1; pos1 o pos2 igual a 0 indica ausencia. Los extremos se excluyen. Si falla memoria, la búsqueda posterior usa la cola parcial informada.

**Función de las variables:** `↑d` y `↑U` son los extremos de la cola nueva; `↑A` recorre; `↑P` es el nodo nuevo; `DATO` es el ingreso de carga; `N1` y `N2` son los valores buscados; `posicion` cuenta nodos y `pos1`/`pos2` guardan sus posiciones; `cantidad` es el resultado; `b` detecta duplicados y `seguir` detiene la carga por falta de memoria.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑d ← NIL`; `↑U ← NIL`; `↑A ← NIL`; `↑P ← NIL`; `DATO ← 0`; `N1 ← 0`; `N2 ← 0`; `posicion ← 0`; `pos1 ← 0`; `pos2 ← 0`; `cantidad ← 0`; `b ← 0`; `seguir ← 1`.
- **Paralelogramo de entrada:** `DATO`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `DATO <> 0 Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑A ← ↑d`; `b ← 0`.
  - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
    - **Rombo IF:** `↑A.dato = DATO`.
      - **No (izquierda):**
        - **Rectángulo:** `↑A ← ↑A.PS`.
      - **Sí (derecha):**
        - **Rectángulo:** `b ← 1`.
      - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
  - **Rombo IF:** `b = 1`.
    - **No (izquierda):**
      - **Rectángulo:** `↑P ← New(COLA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; carga incompleta”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑d = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑U.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑d ← ↑P`.
            - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
          - **Rectángulo:** `↑U ← ↑P`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - **Sí (derecha):**
      - **Documento de salida:** `“Número repetido”`.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rombo IF:** `seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Paralelogramo de entrada:** `DATO`.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Paralelogramo de entrada:** `N1, N2`.
- **Rectángulo:** `↑A ← ↑d`; `posicion ← 0`; `pos1 ← 0`; `pos2 ← 0`.
- **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `posicion ← posicion + 1`.
  - **Rombo IF:** `↑A.dato = N1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `pos1 ← posicion`.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rombo IF:** `↑A.dato = N2`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `pos2 ← posicion`.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rectángulo:** `↑A ← ↑A.PS`.
  - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Rombo IF:** `pos1 <> 0 Y pos2 <> 0`.
  - **No (izquierda):**
    - **Documento de salida:** `“Uno o ambos números no existen”`.
  - **Sí (derecha):**
    - **Rombo IF:** `pos1 = pos2`.
      - **No (izquierda):**
        - **Rombo IF:** `pos1 < pos2`.
          - **No (izquierda):**
            - **Rectángulo:** `cantidad ← pos1 - pos2 - 1`.
          - **Sí (derecha):**
            - **Rectángulo:** `cantidad ← pos2 - pos1 - 1`.
          - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
      - **Sí (derecha):**
        - **Rectángulo:** `cantidad ← 0`.
      - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - **Documento de salida:** `cantidad`.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `DATO <> 0 Y seguir = 1`.
- Círculo 2: regresa justo antes de `↑A <> NIL Y b = 0`.
- Círculo 3: regresa justo antes de `↑A <> NIL`.

## Ejemplo

En 4 → 7 → 9 → 12, buscar 12 y 4 devuelve 2; buscar 7 y 7 devuelve 0.

[Ver diagrama SVG](ejercicio-09.svg) · [Ver diagrama PNG](ejercicio-09.png)
