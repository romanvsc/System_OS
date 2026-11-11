# Trabajo práctico 3 — Ejercicio 2

## Enunciado y objetivo

En el archivo original los números 2 y 3 aparecen juntos antes de los dos enunciados; se asignó el primero al ejercicio 2 y el segundo al 3.

Agregar un dato leído por teclado a una estructura tipo lista encadenada simple.

**Objetivo:** Agregar al final el dato leído.

## Supuestos y función de las variables

Se supone inserción al final. ↑C es la cabeza, ↑A recorre, ↑P es el nodo nuevo y DATO es el ingreso.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la lista existente`; `↑A ← NIL`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑P ← New(LES)`.
- **Rombo IF:** `↑P <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“No hay lugar”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← NIL`.
    - **Rombo IF:** `↑C = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑A ← ↑C`.
        - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A.PS <> NIL`. Por **Sí**, a la derecha, ejecutá:
          - **Rectángulo:** `↑A ← ↑A.PS`.
          - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
        - **Rectángulo:** `↑A.PS ← ↑P`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C ← ↑P`.
      - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A.PS <> NIL`.

## Ejemplo

Agregar 9 a 2 → 4 da 2 → 4 → 9; en una lista vacía queda 9 → NIL.

[Ver diagrama SVG](ejercicio-02.svg) · [Ver diagrama PNG](ejercicio-02.png)
