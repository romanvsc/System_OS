# Trabajo práctico 4 — Ejercicio 3

## Enunciado y objetivo

Se cuenta con una estructura tipo pila a cuyo inicio apunta^u cargada con números se deben cargar los elementos de la pila a la lec siempre que los mismos no se encuentren en la lec.

**Objetivo:** Copiar los valores distintos de la pila a una LEC nueva.

## Supuestos y función de las variables

↑u conserva el tope; ↑S recorre la pila lineal; ↑C y ↑U son cabeza y último de la LEC nueva; ↑A busca; ↑P crea el nodo; b indica coincidencia; detener cierra la búsqueda circular y seguir termina ante fallo.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑u ← tope de la pila existente`; `↑S ← ↑u`; `↑C ← NIL`; `↑U ← NIL`; `↑P ← NIL`; `↑A ← NIL`; `b ← 0`; `detener ← 0`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑S <> NIL Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `b ← 0`; `detener ← 0`.
  - **Rombo IF:** `↑C <> NIL`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑C`.
      - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑A.dato = ↑S.dato`.
          - **No (izquierda):**
            - **Rectángulo:** `↑A ← ↑A.PS`.
            - **Rombo IF:** `↑A = ↑C`.
              - **No (izquierda):** va directamente a la unión.
              - **Sí (derecha):**
                - **Rectángulo:** `detener ← 1`.
              - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
          - **Sí (derecha):**
            - **Rectángulo:** `b ← 1`; `detener ← 1`.
          - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `b = 0`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(LESC)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← ↑S.dato`.
          - **Rombo IF:** `↑C = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑P.PS ← ↑C`; `↑U.PS ← ↑P`; `↑U ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P.PS ← ↑P`; `↑C ← ↑P`; `↑U ← ↑P`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑S ← ↑S.PS`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑S <> NIL Y seguir = 1`.
- Círculo 2: regresa justo antes de `detener = 0`.

## Ejemplo

Pila 3 → 2 → 3 → NIL genera LEC 3 → 2 → 3; el último 3 representa el regreso al primer nodo, no una segunda copia.

[Ver diagrama SVG](ejercicio-03.svg) · [Ver diagrama PNG](ejercicio-03.png)
