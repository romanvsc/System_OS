# Lista doblemente enlazada simple — eliminacion

## Enunciado y objetivo

Eliminar la primera coincidencia.

**Objetivo:** Eliminar la primera coincidencia.

## Supuestos y función de las variables

↑C es la cabeza; ↑A señala el encontrado; ↑N y ↑S conservan el anterior y el siguiente; DATO es el buscado y b indica coincidencia. Al retirar el primero se actualiza la cabeza.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LDES existente`; `↑A ← NIL`; `↑N ← NIL`; `↑S ← NIL`; `DATO ← 0`; `b ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑A ← ↑C`; `b ← 0`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.dato = DATO`.
    - **No (izquierda):**
      - **Rectángulo:** `↑A ← ↑A.PS`.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 1`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **Rombo IF:** `b = 1`.
  - **No (izquierda):**
    - **Documento de salida:** `“Dato no encontrado”`.
  - **Sí (derecha):**
    - **Rectángulo:** `↑N ← ↑A.PA`; `↑S ← ↑A.PS`.
    - **Rombo IF:** `↑N = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑N.PS ← ↑S`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C ← ↑S`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - **Rombo IF:** `↑S <> NIL`.
      - **No (izquierda):** va directamente a la unión.
      - **Sí (derecha):**
        - **Rectángulo:** `↑S.PA ← ↑N`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - **Rectángulo:** `↑A.PA ← NIL`; `↑A.PS ← NIL`.
    - **Documento de salida:** `“Dato eliminado”`.
  - Uní las ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

Eliminar 20 de 10 ⇄ 20 ⇄ 30 enlaza 10 y 30 en ambos sentidos.

[Ver diagrama SVG](eliminacion.svg) · [Ver diagrama PNG](eliminacion.png)
