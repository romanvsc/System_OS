# Árboles — busqueda

## Enunciado y objetivo

Buscar un valor en un árbol binario de búsqueda.

**Objetivo:** Buscar un valor en un árbol binario de búsqueda.

## Supuestos y función de las variables

Se supone que menores están a la izquierda y mayores a la derecha, sin repetidos. ↑R conserva raíz, ↑A recorre, ↑N conserva el padre, DATO es el valor y b = 1 indica hallazgo.

La notación de árboles se supone didácticamente: un nodo binario tiene `dato`, `IZQ` y `DER`; un nodo general tiene `HIJO` y `HERMANO`, más el dato indicado. Una pila auxiliar enlazada usa `↑H` o `↑G` como tope y nodos con `ref` (referencia al nodo del árbol) y `PS`; cuando se guarda un nivel, también usa `nivel`. `New(ARBOL)` y `New(PILA)` son supuestos, no sintaxis atribuida a la profesora. Desconectar un nodo auxiliar no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑R ← raíz del árbol de búsqueda existente`; `↑A ← NIL`; `↑N ← NIL`; `DATO ← 0`; `b ← 0`.
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
    - **Documento de salida:** `“Dato no encontrado”`.
  - **Sí (derecha):**
    - **Documento de salida:** `“Dato encontrado”`.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

En raíz 8 con hijos 3 y 10, buscar 10 avanza a la derecha y lo encuentra.

[Ver diagrama SVG](busqueda.svg) · [Ver diagrama PNG](busqueda.png)
