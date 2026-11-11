# Árboles — recorrido ird

## Enunciado y objetivo

Mostrar los datos de un árbol binario en orden IRD.

**Objetivo:** Mostrar los datos de un árbol binario en orden IRD.

## Supuestos y función de las variables

↑R conserva la raíz; ↑A recorre; ↑H es el tope de una pila auxiliar de referencias y ↑P crea o retira un nodo de esa pila. seguir = 0 detiene ante falta de memoria. Cada nodo auxiliar tiene ref y PS.

La notación de árboles se supone didácticamente: un nodo binario tiene `dato`, `IZQ` y `DER`; un nodo general tiene `HIJO` y `HERMANO`, más el dato indicado. Una pila auxiliar enlazada usa `↑H` o `↑G` como tope y nodos con `ref` (referencia al nodo del árbol) y `PS`; cuando se guarda un nivel, también usa `nivel`. `New(ARBOL)` y `New(PILA)` son supuestos, no sintaxis atribuida a la profesora. Desconectar un nodo auxiliar no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑R ← raíz del árbol binario existente`; `↑A ← ↑R`; `↑H ← NIL`; `↑P ← NIL`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A <> NIL`.
    - **No (izquierda):**
      - **Rectángulo:** `↑P ← ↑H`; `↑H ← ↑P.PS`; `↑A ← ↑P.ref`; `↑P.ref ← NIL`; `↑P.PS ← NIL`.
      - **Documento de salida:** `↑A.dato`.
      - **Rectángulo:** `↑A ← ↑A.DER`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(PILA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; recorrido incompleto”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.ref ← ↑A`; `↑P.PS ← ↑H`; `↑H ← ↑P`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - **Rombo IF:** `seguir = 1`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑A ← ↑A.IZQ`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`.

## Ejemplo

Para raíz 8, hijo izquierdo 3 e hijo derecho 5, se muestran 3, 8, 5. IRD no implica que los valores estén ordenados.

[Ver diagrama SVG](recorrido_ird.svg) · [Ver diagrama PNG](recorrido_ird.png)
