# Trabajo práctico 2 — Ejercicio 7

## Enunciado y objetivo

Secuenta con dos estructuras tipo cola a cuyo inicio apuntan ^o y ^t respectivamente. Se
debe generar una tercer cola a cuyo inicio apunta ^E que tendrá los elementos
intercalados de la primer y segunda cola.

**Objetivo:** Intercalar dos colas en una tercera sin modificar las originales.

## Supuestos y variables

↑A y ↑B recorren; ↑E/↑U son primero y último del resultado. Cada iteración copia un elemento de cada cola disponible; al terminar una, se copian los sobrantes. Un fallo deja la cola parcial y se informa.

**Función de las variables:** `↑o` y `↑t` son los primeros originales; `↑A` y `↑B` recorren; `↑E` y `↑U` son los extremos de la nueva cola; `↑P` señala el nuevo nodo; `seguir` detiene la copia ante falta de memoria.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑o ← primero de la primera cola`; `↑t ← primero de la segunda cola`; `↑A ← ↑o`; `↑B ← ↑t`; `↑E ← NIL`; `↑U ← NIL`; `↑P ← NIL`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `(↑A <> NIL O ↑B <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A <> NIL`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(COLA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; cola incompleta”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← ↑A.dato`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑E = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑U.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑E ← ↑P`.
            - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
          - **Rectángulo:** `↑U ← ↑P`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
      - **Rombo IF:** `seguir = 1`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑A ← ↑A.PS`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rombo IF:** `↑B <> NIL Y seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(COLA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; cola incompleta”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← ↑B.dato`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑E = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑U.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑E ← ↑P`.
            - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
          - **Rectángulo:** `↑U ← ↑P`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
      - **Rombo IF:** `seguir = 1`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑B ← ↑B.PS`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `(↑A <> NIL O ↑B <> NIL) Y seguir = 1`.

## Ejemplo

Con 1 → 2 → 3 y 8, resulta 1 → 8 → 2 → 3.

[Ver diagrama SVG](ejercicio-07.svg) · [Ver diagrama PNG](ejercicio-07.png)
