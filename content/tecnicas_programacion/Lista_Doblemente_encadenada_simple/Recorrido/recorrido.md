# Lista doblemente enlazada simple — recorrido

## Enunciado y objetivo

Recorrer y mostrar hacia adelante y hacia atrás.

**Objetivo:** Recorrer y mostrar hacia adelante y hacia atrás.

## Supuestos y función de las variables

↑C conserva la cabeza; ↑A recorre; ↑F guarda el último mientras se avanza. Se muestran los datos una vez desde el primero y otra desde el último. Si está vacía no se accede a nodos.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LDES existente`; `↑A ← ↑C`; `↑F ← NIL`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Documento de salida:** `↑A.dato`.
  - **Rectángulo:** `↑F ← ↑A`; `↑A ← ↑A.PS`.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **Rectángulo:** `↑A ← ↑F`.
- **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Documento de salida:** `↑A.dato`.
  - **Rectángulo:** `↑A ← ↑A.PA`.
  - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.
- Círculo 2: regresa justo antes de `↑A <> NIL`.

## Ejemplo

En NIL ← 10 ⇄ 20 → NIL se muestra 10, 20 y luego 20, 10.

[Ver diagrama SVG](recorrido.svg) · [Ver diagrama PNG](recorrido.png)
