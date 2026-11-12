# Trabajo práctico 3 — Ejercicio 7

## Enunciado y objetivo

Dada una estructura tipo LES a cuyo inicio apunta ↑g y una estructura tipo cola a cuyo inicio apunta ↑o, agregar los elementos de la cola a la lista siempre que los mismos no se encuentren en la lista.

**Objetivo:** Agregar los datos de la cola que aún no figuren en la lista.

## Supuestos y función de las variables

↑g es la cabeza de la lista; ↑o conserva la cola y ↑T la recorre; DATO es el dato actual; ↑A y ↑N buscan; b indica coincidencia; ↑P crea el nodo y seguir detiene en falta de memoria. Los nuevos se agregan al final.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑g ← cabeza de la lista existente`; `↑o ← primero de la cola existente`; `↑T ← ↑o`; `↑A ← NIL`; `↑N ← NIL`; `↑P ← NIL`; `DATO ← 0`; `b ← 0`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑T <> NIL Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `DATO ← ↑T.dato`.
  - **Rectángulo:** `↑A ← ↑g`; `↑N ← NIL`; `b ← 0`.
  - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
    - **Rombo IF:** `↑A.dato = DATO`.
      - **No (izquierda):**
        - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
      - **Sí (derecha):**
        - **Rectángulo:** `b ← 1`.
      - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
  - **Rombo IF:** `b = 0`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(LES)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; incorporación incompleta”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑g = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑A ← ↑g`.
              - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `↑A.PS <> NIL`. Por **Sí**, a la derecha, ejecutá:
                - **Rectángulo:** `↑A ← ↑A.PS`.
                - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
              - **Rectángulo:** `↑A.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑g ← ↑P`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑T ← ↑T.PS`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑T <> NIL Y seguir = 1`.
- Círculo 2: regresa justo antes de `↑A <> NIL Y b = 0`.
- Círculo 3: regresa justo antes de `↑A.PS <> NIL`.

## Ejemplo

Lista 1 → 2 y cola 2 → 3 → 3 producen lista 1 → 2 → 3; la cola no cambia.

[Ver diagrama SVG](ejercicio-07.svg) · [Ver diagrama PNG](ejercicio-07.png)
