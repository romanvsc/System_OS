# Trabajo práctico 5 — Ejercicio 3

## Enunciado y objetivo

Se ingresa un elemento por teclado. Se debe verificar que exista en una estructura ldes. En caso de existir eliminarlo, en caso de no existir imprimir el mensaje correspondiente.

**Objetivo:** Buscar y borrar la primera coincidencia.

## Supuestos y función de las variables

↑C es la cabeza; ↑A busca; ↑N y ↑S son el anterior y el siguiente del nodo hallado; DATO es el valor y b indica coincidencia.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LDES existente`; `↑A ← NIL`; `↑N ← NIL`; `↑S ← NIL`; `DATO ← 0`; `b ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑A ← ↑C`; `b ← 0`.
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
    - **Rectángulo:** `↑N ← ↑A.PA`; `↑S ← ↑A.PS`.
    - **Rombo IF:** `↑N = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑N.PS ← ↑S`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C ← ↑S`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - **Rombo IF:** `↑S <> NIL`.
      - **No (izquierda):** va directamente a la unión.
      - **Sí (derecha):**
        - **Rectángulo:** `↑S.PA ← ↑N`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - **Rectángulo:** `↑A.PA ← NIL`; `↑A.PS ← NIL`.
    - **Documento de salida:** `“Elemento eliminado”`.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

Borrar 2 de 1 ⇄ 2 ⇄ 3 deja 1 ⇄ 3 con los dos enlaces actualizados.

[Ver diagrama SVG](ejercicio-03.svg) · [Ver diagrama PNG](ejercicio-03.png)
