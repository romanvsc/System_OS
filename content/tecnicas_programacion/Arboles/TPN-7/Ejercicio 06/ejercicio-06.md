# Trabajo práctico 7 — Ejercicio 6

## Enunciado y objetivo

Se ingresa un número por teclado. Se debe agregar a la estructura tipo árbol.

**Objetivo:** Insertar un número en un árbol binario de búsqueda.

## Supuestos y función de las variables

Se supone árbol binario de búsqueda: menores a IZQ y mayores a DER; no se admiten repetidos. ↑R es raíz, ↑A recorre, ↑N guarda el padre, ↑P crea el nodo y b señala si existe DATO. New(ARBOL) es una notación didáctica, no atribuida a la profesora.

La notación de árboles se supone didácticamente: un nodo binario tiene `dato`, `IZQ` y `DER`; un nodo general tiene `HIJO` y `HERMANO`, más el dato indicado. Una pila auxiliar enlazada usa `↑H` o `↑G` como tope y nodos con `ref` (referencia al nodo del árbol) y `PS`; cuando se guarda un nivel, también usa `nivel`. `New(ARBOL)` y `New(PILA)` son supuestos, no sintaxis atribuida a la profesora. Desconectar un nodo auxiliar no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑R ← raíz del árbol de búsqueda existente`; `↑A ← NIL`; `↑N ← NIL`; `↑P ← NIL`; `DATO ← 0`; `b ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑A ← ↑R`; `↑N ← NIL`; `b ← 0`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `DATO = ↑A.dato`.
    - **No (izquierda):**
      - **Rectángulo:** `↑N ← ↑A`.
      - **Rombo IF:** `DATO < ↑A.dato`.
        - **No (izquierda):**
          - **Rectángulo:** `↑A ← ↑A.DER`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑A ← ↑A.IZQ`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 1`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **Rombo IF:** `b = 1`.
  - **No (izquierda):**
    - **Rectángulo:** `↑P ← New(ARBOL)`.
    - **Rombo IF:** `↑P <> NIL`.
      - **No (izquierda):**
        - **Documento de salida:** `“No hay lugar”`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑P.dato ← DATO`; `↑P.IZQ ← NIL`; `↑P.DER ← NIL`.
        - **Rombo IF:** `↑N = NIL`.
          - **No (izquierda):**
            - **Rombo IF:** `DATO < ↑N.dato`.
              - **No (izquierda):**
                - **Rectángulo:** `↑N.DER ← ↑P`.
              - **Sí (derecha):**
                - **Rectángulo:** `↑N.IZQ ← ↑P`.
              - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - **Sí (derecha):**
            - **Rectángulo:** `↑R ← ↑P`.
          - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - **Documento de salida:** `“Dato insertado”`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Sí (derecha):**
    - **Documento de salida:** `“Dato repetido”`.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

Si la raíz es 8 y su hijo izquierdo es 3, insertar 6 lo conecta como hijo derecho de 3. Insertar 8 informa repetido.

[Ver diagrama SVG](ejercicio-06.svg) · [Ver diagrama PNG](ejercicio-06.png)
