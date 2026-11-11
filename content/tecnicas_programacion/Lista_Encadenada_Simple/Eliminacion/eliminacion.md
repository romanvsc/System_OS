# Lista simplemente enlazada — eliminacion

## Enunciado y objetivo

Eliminar la primera coincidencia.

**Objetivo:** Eliminar la primera coincidencia.

## Supuestos y función de las variables

↑A apunta al encontrado, ↑N al anterior, ↑C a la cabeza, DATO es el buscado y b indica si se encontró.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la lista existente`; `↑A ← NIL`; `↑N ← NIL`; `DATO ← 0`; `b ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `↑A ← ↑C`; `↑N ← NIL`; `b ← 0`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.dato = DATO`.
    - **No (izquierda):**
      - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
    - **Sí (derecha):**
      - **Rectángulo:** `b ← 1`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
- **Rombo IF:** `b = 1`.
  - **No (izquierda):**
    - **Documento de salida:** `“Dato no encontrado”`.
  - **Sí (derecha):**
    - **Rombo IF:** `↑N = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑N.PS ← ↑A.PS`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C ← ↑A.PS`.
      - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - **Rectángulo:** `↑A.PS ← NIL`.
    - **Documento de salida:** `“Dato eliminado”`.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

Eliminar 20 de 10 → 20 → 30 deja 10 → 30; eliminar 10 cambia la cabeza.

[Ver diagrama SVG](eliminacion.svg) · [Ver diagrama PNG](eliminacion.png)
