# Trabajo práctico 2 — Ejercicio 2

## Enunciado y objetivo

Secuenta con una estructura tipo cola a cuyo inicio apunta ^F. El operador ingresa por
teclado un número el cuál debe ser borrado en caso de no poder hacerlo se debe imprimir
el mensaje correspondiente.

**Objetivo:** Eliminar la primera coincidencia y mantener el orden.

## Supuestos y variables

↑F/↑U son los extremos de la cola; ↑H/↑V son los extremos auxiliares; ↑Q conserva el nodo retirado y b señala si se encontró. Primero se identifica el último a partir del primero.

**Función de las variables:** `↑F` y `↑U` son los extremos; `↑B` busca el último; `↑H` y `↑V` son los extremos de la auxiliar; `↑P` mueve nodos; `↑Q` guarda el retirado; `DATO` es el buscado y `b` indica si fue retirado.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑F ← primero de la cola existente`; `↑U ← NIL`; `↑B ← NIL`; `↑H ← NIL`; `↑V ← NIL`; `↑P ← NIL`; `↑Q ← NIL`; `DATO ← 0`; `b ← 0`.
- **Rectángulo:** `↑B ← ↑F`; `↑U ← NIL`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑B <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑U ← ↑B`; `↑B ← ↑B.PS`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑H ← NIL`; `↑V ← NIL`; `↑Q ← NIL`; `b ← 0`.
- **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑F <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑P ← ↑F`; `↑F ← ↑P.PS`; `↑P.PS ← NIL`.
  - **Rombo IF:** `↑F = NIL`.
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
  - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Rectángulo:** `↑F ← ↑H`; `↑U ← ↑V`; `↑H ← NIL`; `↑V ← NIL`.
- **Rombo IF:** `b = 0`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Documento de salida:** `“Elemento no encontrado; no se puede borrar”`.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑B <> NIL`.
- Círculo 2: regresa justo antes de `↑F <> NIL`.

## Ejemplo

Para 3 → 5 → 7, borrar 5 deja 3 → 7. Si no existe, se conserva la cola.

[Ver diagrama SVG](ejercicio-02.svg) · [Ver diagrama PNG](ejercicio-02.png)
