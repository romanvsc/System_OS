# Lista simplemente enlazada — insercion final

## Enunciado y objetivo

Insertar un nodo al final.

**Objetivo:** Insertar un nodo al final.

## Supuestos y función de las variables

↑C es la cabeza; ↑A recorre hasta el último; ↑P es el nodo nuevo y DATO es el valor a insertar.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la lista existente`; `↑A ← NIL`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑P ← New(LES)`.
- **Rombo IF:** `↑P <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“No hay lugar”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← NIL`.
    - **Rombo IF:** `↑C = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑A ← ↑C`.
        - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A.PS <> NIL`. Por **Sí**, a la derecha, ejecutá:
          - **Rectángulo:** `↑A ← ↑A.PS`.
          - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
        - **Rectángulo:** `↑A.PS ← ↑P`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C ← ↑P`.
      - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A.PS <> NIL`.

## Ejemplo

Insertar 30 en 10 → 20 produce 10 → 20 → 30.

[Ver diagrama SVG](insercion_final.svg) · [Ver diagrama PNG](insercion_final.png)
