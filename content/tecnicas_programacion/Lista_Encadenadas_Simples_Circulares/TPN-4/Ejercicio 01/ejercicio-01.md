# Trabajo práctico 4 — Ejercicio 1

## Enunciado y objetivo

Se cuenta con una estructura tipo lec a cuyo inicio apunta ^y. Cargada con valores numéricos. Se debe hallar el mejor, peor y el promedio.

**Objetivo:** Hallar el mayor, el menor y el promedio.

## Supuestos y función de las variables

↑y conserva la cabeza; ↑A recorre; cantidad y suma permiten calcular promedio; mejor y peor guardan los extremos; detener se activa al regresar a ↑y. Si está vacía no se divide.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑y ← cabeza de la LEC existente`; `↑A ← NIL`; `cantidad ← 0`; `suma ← 0`; `promedio ← 0`; `mejor ← 0`; `peor ← 0`; `detener ← 0`.
- **Rombo IF:** `↑y <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“Lista vacía”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑A ← ↑y`; `mejor ← ↑A.dato`; `peor ← ↑A.dato`; `detener ← 0`.
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
      - **Rectángulo:** `cantidad ← cantidad + 1`; `suma ← suma + ↑A.dato`.
      - **Rombo IF:** `↑A.dato > mejor`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `mejor ← ↑A.dato`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
      - **Rombo IF:** `↑A.dato < peor`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `peor ← ↑A.dato`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
      - **Rectángulo:** `↑A ← ↑A.PS`.
      - **Rombo IF:** `↑A = ↑y`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `detener ← 1`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
      - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
    - **Rectángulo:** `promedio ← suma / cantidad`.
    - **Documento de salida:** `mejor`; `peor`; `promedio`.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `detener = 0`.

## Ejemplo

Con 4 → 8 → 6 → 4, mejor 8, peor 4 y promedio 6.

[Ver diagrama SVG](ejercicio-01.svg) · [Ver diagrama PNG](ejercicio-01.png)
