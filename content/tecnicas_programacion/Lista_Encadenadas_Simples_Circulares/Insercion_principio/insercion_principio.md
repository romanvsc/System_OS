# Lista simple circular — insercion principio

## Enunciado y objetivo

Insertar un dato al principio.

**Objetivo:** Insertar un dato al principio.

## Supuestos y función de las variables

↑C es la cabeza; ↑U busca el último; ↑P es el nodo nuevo y DATO es el ingreso. Si estaba vacía, el nuevo nodo apunta a sí mismo.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LEC existente`; `↑U ← NIL`; `↑P ← NIL`; `DATO ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑P ← New(LESC)`.
- **Rombo IF:** `↑P <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“No hay lugar”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑P.dato ← DATO`.
    - **Rombo IF:** `↑C = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑U ← ↑C`.
        - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑U.PS <> ↑C`. Por **Sí**, a la derecha, ejecutá:
          - **Rectángulo:** `↑U ← ↑U.PS`.
          - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
        - **Rectángulo:** `↑P.PS ← ↑C`; `↑U.PS ← ↑P`; `↑C ← ↑P`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑P.PS ← ↑P`; `↑C ← ↑P`.
      - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑U.PS <> ↑C`.

## Ejemplo

Insertar 5 antes de 10 → 20 → 10 da 5 → 10 → 20 → 5.

[Ver diagrama SVG](insercion_principio.svg) · [Ver diagrama PNG](insercion_principio.png)
