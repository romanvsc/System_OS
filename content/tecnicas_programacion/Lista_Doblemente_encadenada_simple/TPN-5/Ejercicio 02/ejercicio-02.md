# Trabajo práctico 5 — Ejercicio 2

## Enunciado y objetivo

Determinar si un elemento ingresado por teclado existe en una estructura tipo lista doblemente encadenada simple a cuyo inicio apunta la variable ^f.

**Objetivo:** Determinar si el valor se encuentra.

## Supuestos y función de las variables

↑f conserva la cabeza; ↑A recorre; DATO es el valor buscado y b = 1 indica coincidencia.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑f ← cabeza de la LDES existente`; `↑A ← NIL`; `DATO ← 0`; `b ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑A ← ↑f`; `b ← 0`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.dato = DATO`.
    - **No (izquierda):**
      - **Rectángulo:** `↑A ← ↑A.PS`.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 1`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **Rombo IF:** `b = 1`.
  - **No (izquierda):**
    - **Documento de salida:** `“Elemento no encontrado”`.
  - **Sí (derecha):**
    - **Documento de salida:** `“Elemento encontrado”`.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

En 1 ⇄ 2, buscar 2 lo encuentra; si la lista está vacía informa que no existe.

[Ver diagrama SVG](ejercicio-02.svg) · [Ver diagrama PNG](ejercicio-02.png)
