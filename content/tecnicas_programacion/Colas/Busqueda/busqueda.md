# Colas — busqueda

## Enunciado y objetivo

Buscar un dato sin modificar la cola.

**Objetivo:** Buscar un dato sin modificar la cola.

## Supuestos y variables

↑A es un auxiliar y b = 1 indica que hubo coincidencia. Se permite recorrer enlaces; si la clase usa solo operaciones FIFO, hay que adaptar el método.

**Función de las variables:** `↑C` conserva el primero, `↑A` recorre, `DATO` es el buscado y `b` indica si apareció.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑C ← primero de la cola existente`; `↑A ← ↑C`; `DATO ← 0`; `b ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.dato = DATO`.
    - **No (izquierda):**
      - **Rectángulo:** `↑A ← ↑A.PS`.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 1`.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Rombo IF:** `b = 1`.
  - **No (izquierda):**
    - **Documento de salida:** `“Dato no encontrado”`.
  - **Sí (derecha):**
    - **Documento de salida:** `“Dato encontrado”`.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

En 10 → 20 → 30, buscar 20 lo encuentra y deja la cola igual.

[Ver diagrama SVG](busqueda.svg) · [Ver diagrama PNG](busqueda.png)
