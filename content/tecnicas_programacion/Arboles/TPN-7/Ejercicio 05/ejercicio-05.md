# Trabajo práctico 7 — Ejercicio 5

## Enunciado y objetivo

Se cuenta con un árbol genealógico. Se ingresa por teclado un nombre y se debe imprimir sus descendientes.

**Objetivo:** Mostrar todos los descendientes de la primera persona encontrada.

## Supuestos y función de las variables

Se supone una única raíz con HERMANO = NIL; cada persona tiene nombre, HIJO y HERMANO. El recorrido de búsqueda es preorden: persona, descendientes y luego hermanos. ↑A busca y ↑H guarda hermanos pendientes; b = 1 indica coincidencia. ↑D comienza en el primer hijo de la persona hallada y ↑G guarda sus hermanos pendientes: así se recorren solo descendientes, no los hermanos de la persona. ↑P es auxiliar y seguir detiene ante falta de memoria; si falla tras imprimir algunos nombres, el mensaje advierte que el recorrido está incompleto.

La notación de árboles se supone didácticamente: un nodo binario tiene `dato`, `IZQ` y `DER`; un nodo general tiene `HIJO` y `HERMANO`, más el dato indicado. Una pila auxiliar enlazada usa `↑H` o `↑G` como tope y nodos con `ref` (referencia al nodo del árbol) y `PS`; cuando se guarda un nivel, también usa `nivel`. `New(ARBOL)` y `New(PILA)` son supuestos, no sintaxis atribuida a la profesora. Desconectar un nodo auxiliar no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑R ← raíz del árbol genealógico existente`; `↑A ← ↑R`; `↑D ← NIL`; `↑H ← NIL`; `↑G ← NIL`; `↑P ← NIL`; `NOMBRE ← ""`; `b ← 0`; `seguir ← 1`.
- **Paralelogramo de entrada:** `NOMBRE`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `(↑A <> NIL O ↑H <> NIL) Y b = 0 Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A <> NIL`.
    - **No (izquierda):**
      - **Rectángulo:** `↑P ← ↑H`; `↑H ← ↑P.PS`; `↑A ← ↑P.ref`; `↑P.ref ← NIL`; `↑P.PS ← NIL`.
    - **Sí (derecha):**
      - **Rombo IF:** `↑A.nombre = NOMBRE`.
        - **No (izquierda):**
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
        - **Sí (derecha):**
          - **Rectángulo:** `b ← 1`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **Rombo IF:** `seguir = 1`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Rombo IF:** `b = 1`.
      - **No (izquierda):**
        - **Documento de salida:** `“Persona no encontrada”`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑D ← ↑A.HIJO`.
        - **Rombo IF:** `↑D <> NIL`.
          - **No (izquierda):**
            - **Documento de salida:** `“No tiene descendientes”`.
          - **Sí (derecha):**
            - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `(↑D <> NIL O ↑G <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
              - **Rombo IF:** `↑D <> NIL`.
                - **No (izquierda):**
                  - **Rectángulo:** `↑P ← ↑G`; `↑G ← ↑P.PS`; `↑D ← ↑P.ref`; `↑P.ref ← NIL`; `↑P.PS ← NIL`.
                - **Sí (derecha):**
                  - **Documento de salida:** `↑D.nombre`.
                  - **Rombo IF:** `↑D.HERMANO <> NIL`.
                    - **No (izquierda):** va directamente a la unión.
                    - **Sí (derecha):**
                      - **Rectángulo:** `↑P ← New(PILA)`.
                      - **Rombo IF:** `↑P <> NIL`.
                        - **No (izquierda):**
                          - **Documento de salida:** `“No hay lugar; recorrido incompleto”`.
                          - **Rectángulo:** `seguir ← 0`.
                        - **Sí (derecha):**
                          - **Rectángulo:** `↑P.ref ← ↑D.HERMANO`; `↑P.PS ← ↑G`; `↑G ← ↑P`.
                        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
                    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
                  - **Rombo IF:** `seguir = 1`.
                    - **No (izquierda):** va directamente a la unión.
                    - **Sí (derecha):**
                      - **Rectángulo:** `↑D ← ↑D.HIJO`.
                    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
                - Uní las ramas físicamente debajo de sus bloques antes de continuar.
              - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
          - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `(↑A <> NIL O ↑H <> NIL) Y b = 0 Y seguir = 1`.
- Círculo 2: regresa justo antes de `(↑D <> NIL O ↑G <> NIL) Y seguir = 1`.

## Ejemplo

Si Ana tiene hijos Beto y Cora y Beto tiene hija Dora, buscar Ana muestra Beto, Dora y Cora; no muestra a Ana ni a sus hermanos.

[Ver diagrama SVG](ejercicio-05.svg) · [Ver diagrama PNG](ejercicio-05.png)
