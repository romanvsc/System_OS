# Trabajo práctico 7 — Ejercicio 2

## Enunciado y objetivo

Se cuenta con una estructura tipo árbol cuyo contenido son números. Determinar la cantidad de nodos hojas.

**Objetivo:** Contar las hojas de un árbol general.

## Supuestos y función de las variables

Se supone representación primer HIJO y siguiente HERMANO, con una única raíz cuyo HERMANO es NIL. ↑R conserva raíz; ↑A recorre; ↑H guarda hermanos pendientes; ↑P es nodo auxiliar; cantidad cuenta nodos sin hijo y seguir detiene ante error. El árbol vacío tiene 0 hojas.

La notación de árboles se supone didácticamente: un nodo binario tiene `dato`, `IZQ` y `DER`; un nodo general tiene `HIJO` y `HERMANO`, más el dato indicado. Una pila auxiliar enlazada usa `↑H` o `↑G` como tope y nodos con `ref` (referencia al nodo del árbol) y `PS`; cuando se guarda un nivel, también usa `nivel`. `New(ARBOL)` y `New(PILA)` son supuestos, no sintaxis atribuida a la profesora. Desconectar un nodo auxiliar no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑R ← raíz del árbol general existente`; `↑A ← ↑R`; `↑H ← NIL`; `↑P ← NIL`; `cantidad ← 0`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A <> NIL`.
    - **No (izquierda):**
      - **Rectángulo:** `↑P ← ↑H`; `↑H ← ↑P.PS`; `↑A ← ↑P.ref`; `↑P.ref ← NIL`; `↑P.PS ← NIL`.
    - **Sí (derecha):**
      - **Rombo IF:** `↑A.HIJO = NIL`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `cantidad ← cantidad + 1`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - **Rombo IF:** `↑A.HERMANO <> NIL`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P ← New(PILA)`.
          - **Rombo IF:** `↑P <> NIL`.
            - **No (izquierda):**
              - **Documento de salida:** `“No hay lugar; recorrido incompleto”`.
              - **Rectángulo:** `seguir ← 0`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P.ref ← ↑A.HERMANO`; `↑P.PS ← ↑H`; `↑H ← ↑P`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - **Rombo IF:** `seguir = 1`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑A ← ↑A.HIJO`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **Rombo IF:** `seguir = 1`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Documento de salida:** `cantidad`.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`.

## Ejemplo

Una raíz con tres hijos, cada uno sin hijos, tiene 3 hojas.

[Ver diagrama SVG](ejercicio-02.svg) · [Ver diagrama PNG](ejercicio-02.png)
