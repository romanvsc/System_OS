# Trabajo práctico 4 — Ejercicio 4

## Enunciado y objetivo

Se cuenta con una estructura lec a cuyo inicio apunta ^L. El operador ingresa por teclado números los cuales deben ser insertados en la estructura manteniendo el orden de la misma (ascendente) el fin viene dado por un numero ingresado =0.

**Objetivo:** Insertar números en orden ascendente hasta ingresar 0.

## Supuestos y función de las variables

La LEC inicial se supone ordenada ascendentemente; se permiten repetidos, insertados después de los iguales. ↑L es cabeza; ↑U busca el último; ↑A busca la posición; ↑P es el nodo nuevo. DATO = 0 es corte y no se inserta. Aunque se evalúen ambos términos del ciclo, ↑A.PS siempre señala un nodo porque la LEC no está vacía.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑L ← cabeza de la LEC existente`; `↑U ← NIL`; `↑A ← NIL`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `DATO <> 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑P ← New(LESC)`.
  - **Rombo IF:** `↑P <> NIL`.
    - **No (izquierda):**
      - **Documento de salida:** `“No hay lugar”`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P.dato ← DATO`.
      - **Rombo IF:** `↑L = NIL`.
        - **No (izquierda):**
          - **Rectángulo:** `↑U ← ↑L`.
          - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑U.PS <> ↑L`. Por **Sí**, a la derecha, ejecutá:
            - **Rectángulo:** `↑U ← ↑U.PS`.
            - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
          - **Rombo IF:** `DATO < ↑L.dato`.
            - **No (izquierda):**
              - **Rectángulo:** `↑A ← ↑L`.
              - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `↑A.PS <> ↑L Y ↑A.PS.dato <= DATO`. Por **Sí**, a la derecha, ejecutá:
                - **Rectángulo:** `↑A ← ↑A.PS`.
                - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
              - **Rectángulo:** `↑P.PS ← ↑A.PS`; `↑A.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P.PS ← ↑L`; `↑U.PS ← ↑P`; `↑L ← ↑P`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.PS ← ↑P`; `↑L ← ↑P`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Paralelogramo de entrada:** `DATO`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `DATO <> 0`.
- Círculo 2: regresa justo antes de `↑U.PS <> ↑L`.
- Círculo 3: regresa justo antes de `↑A.PS <> ↑L Y ↑A.PS.dato <= DATO`.

## Ejemplo

De 2 → 4 → 4 → 2, insertar 4 conserva 2 → 4 → 4 → 4 → 2; insertar 1 cambia la cabeza a 1.

[Ver diagrama SVG](ejercicio-04.svg) · [Ver diagrama PNG](ejercicio-04.png)
