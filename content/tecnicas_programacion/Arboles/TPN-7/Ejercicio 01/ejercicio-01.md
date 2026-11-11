# Trabajo práctico 7 — Ejercicio 1

## Enunciado y objetivo

Se cuenta con una estructura tipo árbol binario en orden IRD, cuyo contenido corresponde a edades de los alumnos de un curso. Imprimir la edad del mayor alumno.

**Objetivo:** Recorrer en IRD y hallar la mayor edad.

## Supuestos y función de las variables

↑R conserva raíz; ↑A recorre; ↑H es tope de pila auxiliar y ↑P crea o retira sus nodos; mayor se inicializa con el primer dato visitado; primero indica si falta ese dato; seguir detiene ante falta de memoria. IRD no implica árbol de búsqueda.

La notación de árboles se supone didácticamente: un nodo binario tiene `dato`, `IZQ` y `DER`; un nodo general tiene `HIJO` y `HERMANO`, más el dato indicado. Una pila auxiliar enlazada usa `↑H` o `↑G` como tope y nodos con `ref` (referencia al nodo del árbol) y `PS`; cuando se guarda un nivel, también usa `nivel`. `New(ARBOL)` y `New(PILA)` son supuestos, no sintaxis atribuida a la profesora. Desconectar un nodo auxiliar no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑R ← raíz del árbol binario existente`; `↑A ← ↑R`; `↑H ← NIL`; `↑P ← NIL`; `mayor ← 0`; `primero ← 1`; `seguir ← 1`.
- **Rombo IF:** `↑R <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“Árbol vacío”`.
  - **Sí (derecha):**
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
      - **Rombo IF:** `↑A <> NIL`.
        - **No (izquierda):**
          - **Rectángulo:** `↑P ← ↑H`; `↑H ← ↑P.PS`; `↑A ← ↑P.ref`; `↑P.ref ← NIL`; `↑P.PS ← NIL`.
          - **Rombo IF:** `primero = 1`.
            - **No (izquierda):**
              - **Rombo IF:** `↑A.dato > mayor`.
                - **No (izquierda):** va directamente a la unión.
                - **Sí (derecha):**
                  - **Rectángulo:** `mayor ← ↑A.dato`.
                - Uní las ramas físicamente debajo de sus bloques antes de continuar.
            - **Sí (derecha):**
              - **Rectángulo:** `mayor ← ↑A.dato`; `primero ← 0`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
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
    - **Rombo IF:** `seguir = 1`.
      - **No (izquierda):** va directamente a la unión.
      - **Sí (derecha):**
        - **Documento de salida:** `mayor`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `(↑A <> NIL O ↑H <> NIL) Y seguir = 1`.

## Ejemplo

En raíz 8, izquierda 3 y derecha 5, IRD visita 3, 8, 5 y la mayor edad es 8.

[Ver diagrama SVG](ejercicio-01.svg) · [Ver diagrama PNG](ejercicio-01.png)
