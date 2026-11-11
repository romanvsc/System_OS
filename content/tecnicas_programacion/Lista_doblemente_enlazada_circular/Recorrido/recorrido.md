# Lista doblemente enlazada circular — recorrido

## Enunciado y objetivo

Recorrer una vez hacia adelante y otra hacia atrás.

**Objetivo:** Recorrer una vez hacia adelante y otra hacia atrás.

## Supuestos y función de las variables

↑C conserva la cabeza; ↑A recorre. detener = 1 cierra cada vuelta completa. Para el recorrido inverso se empieza en ↑C.PA, el último; ↑C no cambia. Una lista vacía saltea ambos recorridos.

Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LDEC y LDESC nombran la misma estructura. Los nodos LDESC usan `PA` y `PS`. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LDESC existente`; `↑A ← NIL`; `detener ← 0`.
- **Rombo IF:** `↑C <> NIL`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Rectángulo:** `↑A ← ↑C`; `detener ← 0`.
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
      - **Documento de salida:** `↑A.dato`.
      - **Rectángulo:** `↑A ← ↑A.PS`.
      - **Rombo IF:** `↑A = ↑C`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `detener ← 1`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
    - **Rectángulo:** `↑A ← ↑C.PA`; `detener ← 0`.
    - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
      - **Documento de salida:** `↑A.dato`.
      - **Rectángulo:** `↑A ← ↑A.PA`.
      - **Rombo IF:** `↑A = ↑C.PA`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `detener ← 1`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `detener = 0`.
- Círculo 2: regresa justo antes de `detener = 0`.

## Ejemplo

Con cabeza 10 y nodos 10 ⇄ 20 ⇄ 30 circulares, se muestran 10, 20, 30 y luego 30, 20, 10.

[Ver diagrama SVG](recorrido.svg) · [Ver diagrama PNG](recorrido.png)
