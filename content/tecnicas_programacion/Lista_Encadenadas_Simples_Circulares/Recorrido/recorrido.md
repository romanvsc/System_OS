# Lista simple circular — recorrido

## Enunciado y objetivo

Recorrer una LEC y mostrar sus datos.

**Objetivo:** Recorrer una LEC y mostrar sus datos.

## Supuestos y función de las variables

↑C conserva la cabeza; ↑A recorre y detener vale 1 al regresar a la cabeza. La rama vacía no accede a nodos.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LEC existente`; `↑A ← NIL`; `detener ← 0`.
- **Rombo IF:** `↑C <> NIL`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Rectángulo:** `↑A ← ↑C`; `detener ← 0`.
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
      - **Documento de salida:** `↑A.dato`.
      - **Rectángulo:** `↑A ← ↑A.PS`.
      - **Rombo IF:** `↑A = ↑C`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `detener ← 1`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
      - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `detener = 0`.

## Ejemplo

Para 10 → 20 → 10, se muestran 10 y 20 una vez cada uno.

[Ver diagrama SVG](recorrido.svg) · [Ver diagrama PNG](recorrido.png)
