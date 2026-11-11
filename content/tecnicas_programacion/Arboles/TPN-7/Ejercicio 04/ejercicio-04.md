# Trabajo práctico 7 — Ejercicio 4

## Enunciado y objetivo

Se dice que un árbol está balanceado si la cantidad de nodos de la rama izquierda es igual a la cantidad de nodos de la rama derecha. Determinar si el árbol está balanceado.

**Objetivo:** Comparar las cantidades de nodos de ambas ramas de la raíz.

## Supuestos y función de las variables

Se usa exactamente la definición del enunciado: cantidad total del subárbol izquierdo igual a la del derecho de la raíz; no se comprueba una condición de altura ni se repite en cada nodo. ↑R conserva raíz; ↑A recorre; ↑H es pila auxiliar; ↑P crea o retira elementos; izquierda y derecha cuentan; seguir detiene ante fallo. Un árbol vacío tiene dos ramas de 0 nodos.

La notación de árboles se supone didácticamente: un nodo binario tiene `dato`, `IZQ` y `DER`; un nodo general tiene `HIJO` y `HERMANO`, más el dato indicado. Una pila auxiliar enlazada usa `↑H` o `↑G` como tope y nodos con `ref` (referencia al nodo del árbol) y `PS`; cuando se guarda un nivel, también usa `nivel`. `New(ARBOL)` y `New(PILA)` son supuestos, no sintaxis atribuida a la profesora. Desconectar un nodo auxiliar no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑R ← raíz del árbol binario existente`; `↑A ← NIL`; `↑H ← NIL`; `↑P ← NIL`; `izquierda ← 0`; `derecha ← 0`; `seguir ← 1`.
- **Rombo IF:** `↑R <> NIL`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Rectángulo:** `↑A ← ↑R.IZQ`.
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
      - **Rombo IF:** `↑A <> NIL`.
        - **No (izquierda):**
          - **Rectángulo:** `↑P ← ↑H`; `↑H ← ↑P.PS`; `↑A ← ↑P.ref`; `↑P.ref ← NIL`; `↑P.PS ← NIL`.
        - **Sí (derecha):**
          - **Rectángulo:** `izquierda ← izquierda + 1`.
          - **Rombo IF:** `↑A.DER <> NIL`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P ← New(PILA)`.
              - **Rombo IF:** `↑P <> NIL`.
                - **No (izquierda):**
                  - **Documento de salida:** `“No hay lugar; recorrido incompleto”`.
                  - **Rectángulo:** `seguir ← 0`.
                - **Sí (derecha):**
                  - **Rectángulo:** `↑P.ref ← ↑A.DER`; `↑P.PS ← ↑H`; `↑H ← ↑P`.
                - Uní las ramas físicamente debajo de sus bloques antes de continuar.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - **Rombo IF:** `seguir = 1`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Rectángulo:** `↑A ← ↑A.IZQ`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
    - **Rombo IF:** `seguir = 1`.
      - **No (izquierda):** va directamente a la unión.
      - **Sí (derecha):**
        - **Rectángulo:** `↑A ← ↑R.DER`.
        - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
          - **Rombo IF:** `↑A <> NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑P ← ↑H`; `↑H ← ↑P.PS`; `↑A ← ↑P.ref`; `↑P.ref ← NIL`; `↑P.PS ← NIL`.
            - **Sí (derecha):**
              - **Rectángulo:** `derecha ← derecha + 1`.
              - **Rombo IF:** `↑A.DER <> NIL`.
                - **No (izquierda):** va directamente a la unión.
                - **Sí (derecha):**
                  - **Rectángulo:** `↑P ← New(PILA)`.
                  - **Rombo IF:** `↑P <> NIL`.
                    - **No (izquierda):**
                      - **Documento de salida:** `“No hay lugar; recorrido incompleto”`.
                      - **Rectángulo:** `seguir ← 0`.
                    - **Sí (derecha):**
                      - **Rectángulo:** `↑P.ref ← ↑A.DER`; `↑P.PS ← ↑H`; `↑H ← ↑P`.
                    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
                - Uní las ramas físicamente debajo de sus bloques antes de continuar.
              - **Rombo IF:** `seguir = 1`.
                - **No (izquierda):** va directamente a la unión.
                - **Sí (derecha):**
                  - **Rectángulo:** `↑A ← ↑A.IZQ`.
                - Uní las ramas físicamente debajo de sus bloques antes de continuar.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.
- **Rombo IF:** `seguir = 1`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Rombo IF:** `izquierda = derecha`.
      - **No (izquierda):**
        - **Documento de salida:** `“No está balanceado”`.
      - **Sí (derecha):**
        - **Documento de salida:** `“Está balanceado”`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`.
- Círculo 2: regresa justo antes de `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`.

## Ejemplo

Si la raíz tiene dos nodos a la izquierda y uno a la derecha, informa que no está balanceado.

[Ver diagrama SVG](ejercicio-04.svg) · [Ver diagrama PNG](ejercicio-04.png)
