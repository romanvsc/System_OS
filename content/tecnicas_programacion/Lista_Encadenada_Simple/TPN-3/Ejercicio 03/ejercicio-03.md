# Trabajo práctico 3 — Ejercicio 3

## Enunciado y objetivo

En el archivo original los números 2 y 3 aparecen juntos antes de los dos enunciados; se asignó el primero al ejercicio 2 y el segundo al 3.

Determinar si un elemento ingresado por teclado existe en una estructura tipo lista encadenada simple a cuyo inicio apunta la variable ↑f.

**Objetivo:** Determinar si un dato existe.

## Supuestos y función de las variables

↑f conserva la cabeza; ↑A busca y ↑N es el anterior; DATO es el valor buscado; b = 1 indica coincidencia.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑f ← cabeza de la lista existente`; `↑A ← NIL`; `↑N ← NIL`; `DATO ← 0`; `b ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑A ← ↑f`; `↑N ← NIL`; `b ← 0`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.dato = DATO`.
    - **No (izquierda):**
      - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 1`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
- **Rombo IF:** `b = 1`.
  - **No (izquierda):**
    - **Documento de salida:** `“Elemento no encontrado”`.
  - **Sí (derecha):**
    - **Documento de salida:** `“Elemento encontrado”`.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

En 2 → 4, buscar 4 muestra «Elemento encontrado».

[Ver diagrama SVG](ejercicio-03.svg) · [Ver diagrama PNG](ejercicio-03.png)
