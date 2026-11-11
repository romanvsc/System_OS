# Lista simplemente enlazada — insercion principio

## Enunciado y objetivo

Insertar un nodo al principio.

**Objetivo:** Insertar un nodo al principio.

## Supuestos y función de las variables

↑C es la cabeza, ↑P el nodo nuevo y DATO es el ingreso. Si falla la creación la lista queda igual.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la lista existente`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑P ← New(LES)`.
- **Rombo IF:** `↑P <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“No hay lugar”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← ↑C`; `↑C ← ↑P`.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

No hay conectores numerados.

## Ejemplo

Insertar 5 en 10 → 20 produce 5 → 10 → 20.

[Ver diagrama SVG](insercion_principio.svg) · [Ver diagrama PNG](insercion_principio.png)
