# Lista simple circular — eliminacion

## Enunciado y objetivo

Eliminar la primera coincidencia de una LEC.

**Objetivo:** Eliminar la primera coincidencia de una LEC.

## Supuestos y función de las variables

↑C es cabeza; ↑U busca el último; ↑A recorre y ↑N conserva el anterior; ↑P guarda el retirado; b indica coincidencia y detener corta la búsqueda. Se desengancha el nodo sin inventar una instrucción de liberación.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LEC existente`; `↑U ← NIL`; `↑A ← NIL`; `↑N ← NIL`; `↑P ← NIL`; `DATO ← 0`; `b ← 0`; `detener ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rombo IF:** `↑C <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“Dato no encontrado”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑U ← ↑C`.
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑U.PS <> ↑C`. Por **Sí**, a la derecha, ejecutá:
      - **Rectángulo:** `↑U ← ↑U.PS`.
      - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
    - **Rectángulo:** `↑A ← ↑C`; `↑N ← ↑U`; `b ← 0`; `detener ← 0`.
    - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
      - **Rombo IF:** `↑A.dato = DATO`.
        - **No (izquierda):**
          - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
          - **Rombo IF:** `↑A = ↑C`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Rectángulo:** `detener ← 1`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - **Sí (derecha):**
          - **Rectángulo:** `b ← 1`; `detener ← 1`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
      - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
    - **Rombo IF:** `b = 1`.
      - **No (izquierda):**
        - **Documento de salida:** `“Dato no encontrado”`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑P ← ↑A`.
        - **Rombo IF:** `↑A.PS = ↑A`.
          - **No (izquierda):**
            - **Rectángulo:** `↑N.PS ← ↑A.PS`.
            - **Rombo IF:** `↑A = ↑C`.
              - **No (izquierda):** va directamente a la unión.
              - **Sí (derecha):**
                - **Rectángulo:** `↑C ← ↑A.PS`.
              - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
          - **Sí (derecha):**
            - **Rectángulo:** `↑C ← NIL`.
          - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - **Rectángulo:** `↑P.PS ← NIL`.
        - **Documento de salida:** `“Dato eliminado”`.
      - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑U.PS <> ↑C`.
- Círculo 2: regresa justo antes de `detener = 0`.

## Ejemplo

En 10 → 20 → 30 → 10, eliminar 10 deja 20 → 30 → 20; si había solo 10, la cabeza queda NIL.

[Ver diagrama SVG](eliminacion.svg) · [Ver diagrama PNG](eliminacion.png)
