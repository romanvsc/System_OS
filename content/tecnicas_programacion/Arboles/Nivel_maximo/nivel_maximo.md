# Árboles — nivel maximo

## Enunciado y objetivo

Calcular el nivel máximo de un árbol binario.

**Objetivo:** Calcular el nivel máximo de un árbol binario.

## Supuestos y función de las variables

La raíz está en nivel 0. ↑R conserva raíz; ↑A recorre; ↑H guarda nodos derechos pendientes con su nivel; ↑P es el auxiliar; nivel corresponde a ↑A y maximo guarda el mayor; seguir detiene ante fallo.

La notación de árboles se supone didácticamente: un nodo binario tiene `dato`, `IZQ` y `DER`; un nodo general tiene `HIJO` y `HERMANO`, más el dato indicado. Una pila auxiliar enlazada usa `↑H` o `↑G` como tope y nodos con `ref` (referencia al nodo del árbol) y `PS`; cuando se guarda un nivel, también usa `nivel`. `New(ARBOL)` y `New(PILA)` son supuestos, no sintaxis atribuida a la profesora. Desconectar un nodo auxiliar no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑R ← raíz del árbol binario existente`; `↑A ← ↑R`; `↑H ← NIL`; `↑P ← NIL`; `nivel ← 0`; `maximo ← 0`; `seguir ← 1`.
- **Rombo IF:** `↑R <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“Árbol vacío; no hay nivel máximo”`.
  - **Sí (derecha):**
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
      - **Rombo IF:** `↑A <> NIL`.
        - **No (izquierda):**
          - **Rectángulo:** `↑P ← ↑H`; `↑H ← ↑P.PS`; `↑A ← ↑P.ref`; `nivel ← ↑P.nivel`; `↑P.ref ← NIL`; `↑P.PS ← NIL`.
        - **Sí (derecha):**
          - **Rombo IF:** `nivel > maximo`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Rectángulo:** `maximo ← nivel`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - **Rombo IF:** `↑A.DER <> NIL`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P ← New(PILA)`.
              - **Rombo IF:** `↑P <> NIL`.
                - **No (izquierda):**
                  - **Documento de salida:** `“No hay lugar; recorrido incompleto”`.
                  - **Rectángulo:** `seguir ← 0`.
                - **Sí (derecha):**
                  - **Rectángulo:** `↑P.ref ← ↑A.DER`; `↑P.nivel ← nivel + 1`; `↑P.PS ← ↑H`; `↑H ← ↑P`.
                - Uní las ramas físicamente debajo de sus bloques antes de continuar.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - **Rombo IF:** `seguir = 1`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Rectángulo:** `↑A ← ↑A.IZQ`; `nivel ← nivel + 1`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
    - **Rombo IF:** `seguir = 1`.
      - **No (izquierda):** va directamente a la unión.
      - **Sí (derecha):**
        - **Documento de salida:** `maximo`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`.

## Ejemplo

Una raíz con un hijo y un nieto tiene nivel máximo 2; una raíz sola tiene nivel máximo 0.

[Ver diagrama SVG](nivel_maximo.svg) · [Ver diagrama PNG](nivel_maximo.png)
