# Trabajo práctico 3 — Ejercicio 6

## Enunciado y objetivo

Se cuenta con una estructura tipo LES a cuyo inicio apunta ↑c. Se deben borrar todos los elementos, pero se borrará en el lado en el que se encuentre el menor valor.

**Objetivo:** Vaciar la lista eliminando en cada paso el menor de sus extremos.

## Supuestos y función de las variables

↑c es la cabeza; ↑A busca el último; ↑N guarda el penúltimo; ↑P conserva el nodo retirado. Con extremos iguales se retira el primero. Si el último es estrictamente menor, hay al menos dos nodos y ↑N existe.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑c ← cabeza de la lista existente`; `↑A ← NIL`; `↑N ← NIL`; `↑P ← NIL`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑c <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑A ← ↑c`; `↑N ← NIL`.
  - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A.PS <> NIL`. Por **Sí**, a la derecha, ejecutá:
    - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
    - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
  - **Rombo IF:** `↑c.dato <= ↑A.dato`.
    - **No (izquierda):**
      - **Rectángulo:** `↑P ← ↑A`; `↑N.PS ← NIL`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← ↑c`; `↑c ← ↑c.PS`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rectángulo:** `↑P.PS ← NIL`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑c <> NIL`.
- Círculo 2: regresa justo antes de `↑A.PS <> NIL`.

## Ejemplo

En 4 → 9 → 2 se retiran sucesivamente 2, 4 y 9; ↑c termina en NIL.

[Ver diagrama SVG](ejercicio-06.svg) · [Ver diagrama PNG](ejercicio-06.png)
