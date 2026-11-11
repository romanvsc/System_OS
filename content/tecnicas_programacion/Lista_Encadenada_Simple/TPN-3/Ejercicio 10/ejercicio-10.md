# Trabajo práctico 3 — Ejercicio 10

## Enunciado y objetivo

Determinar la cantidad de elementos que existen entre dos números ingresados por teclado, existentes y únicos, en una estructura tipo LES a cuyo inicio apunta ↑v.

**Objetivo:** Contar los nodos que están entre los dos valores.

## Supuestos y función de las variables

↑v conserva la cabeza, ↑A recorre; N1 y N2 son los valores únicos ingresados; posicion cuenta; pos1 y pos2 guardan las posiciones o 0 si faltan; cantidad es el resultado. Los extremos no se cuentan.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑v ← cabeza de la lista existente`; `↑A ← ↑v`; `N1 ← 0`; `N2 ← 0`; `posicion ← 0`; `pos1 ← 0`; `pos2 ← 0`; `cantidad ← 0`.
- **Paralelogramo de entrada:** `N1, N2`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `posicion ← posicion + 1`.
  - **Rombo IF:** `↑A.dato = N1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `pos1 ← posicion`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `↑A.dato = N2`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `pos2 ← posicion`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rectángulo:** `↑A ← ↑A.PS`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
- **Rombo IF:** `pos1 <> 0 Y pos2 <> 0`.
  - **No (izquierda):**
    - **Documento de salida:** `“Uno o ambos números no existen”`.
  - **Sí (derecha):**
    - **Rombo IF:** `pos1 = pos2`.
      - **No (izquierda):**
        - **Rombo IF:** `pos1 < pos2`.
          - **No (izquierda):**
            - **Rectángulo:** `cantidad ← pos1 - pos2 - 1`.
          - **Sí (derecha):**
            - **Rectángulo:** `cantidad ← pos2 - pos1 - 1`.
          - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
      - **Sí (derecha):**
        - **Rectángulo:** `cantidad ← 0`.
      - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - **Documento de salida:** `cantidad`.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.

## Ejemplo

En 1 → 4 → 7 → 9, entre 9 y 1 hay 2 nodos; si ambos ingresos son 4 hay 0.

[Ver diagrama SVG](ejercicio-10.svg) · [Ver diagrama PNG](ejercicio-10.png)
