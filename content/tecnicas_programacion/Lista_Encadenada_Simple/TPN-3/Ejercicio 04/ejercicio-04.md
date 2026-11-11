# Trabajo práctico 3 — Ejercicio 4

## Enunciado y objetivo

Se ingresa un elemento por teclado. Se debe verificar que exista en una estructura LES. En caso de existir eliminarlo; en caso de no existir imprimir el mensaje correspondiente.

**Objetivo:** Buscar y borrar la primera coincidencia.

## Supuestos y función de las variables

↑C es la cabeza; ↑A señala la coincidencia; ↑N el anterior; DATO es el valor ingresado y b indica si se encontró.

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
    - **Documento de salida:** `“Elemento no encontrado”`.
  - **Sí (derecha):**
    - **Rombo IF:** `↑N = NIL`.
      - **No (izquierda):**
        - **Rectángulo:** `↑N.PS ← ↑A.PS`.
      - **Sí (derecha):**
        - **Rectángulo:** `↑C ← ↑A.PS`.
      - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - **Rectángulo:** `↑A.PS ← NIL`.
    - **Documento de salida:** `“Elemento eliminado”`.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

En 1 → 2 → 3, borrar 2 deja 1 → 3. Si se borra 1 se actualiza ↑C.

[Ver diagrama SVG](ejercicio-04.svg) · [Ver diagrama PNG](ejercicio-04.png)
