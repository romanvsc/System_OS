# Trabajo práctico 5 — Ejercicio 4

## Enunciado y objetivo

Se cuenta con una estructura tipo ldes a cuyo inicio apunta la variable ^c. Se deben borrar los nombres de los pacientes del Dr Francis ingresados por teclado. El fin viene dado por un valor = 0.

**Objetivo:** Eliminar todas las coincidencias de cada nombre.

## Supuestos y función de las variables

Cada nodo tiene nombre, PA y PS. ↑c es cabeza; ↑A recorre; ↑N y ↑S guardan los vecinos; NOMBRE se ingresa como texto y "0" termina; borrados cuenta las coincidencias. Guardar ↑S antes de desconectar evita perder el resto.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑c ← cabeza de la LDES existente`; `↑A ← NIL`; `↑N ← NIL`; `↑S ← NIL`; `NOMBRE ← ""`; `borrados ← 0`.
- **Paralelogramo de entrada:** `NOMBRE`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `NOMBRE <> "0"`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑A ← ↑c`; `borrados ← 0`.
  - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
    - **Rectángulo:** `↑S ← ↑A.PS`.
    - **Rombo IF:** `↑A.nombre = NOMBRE`.
      - **No (izquierda):** va directamente a la unión.
      - **Sí (derecha):**
        - **Rectángulo:** `↑N ← ↑A.PA`.
        - **Rombo IF:** `↑N = NIL`.
          - **No (izquierda):**
            - **Rectángulo:** `↑N.PS ← ↑S`.
          - **Sí (derecha):**
            - **Rectángulo:** `↑c ← ↑S`.
          - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - **Rombo IF:** `↑S <> NIL`.
          - **No (izquierda):** va directamente a la unión.
          - **Sí (derecha):**
            - **Rectángulo:** `↑S.PA ← ↑N`.
          - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - **Rectángulo:** `↑A.PA ← NIL`; `↑A.PS ← NIL`; `borrados ← borrados + 1`.
      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - **Rectángulo:** `↑A ← ↑S`.
    - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
  - **Rombo IF:** `borrados = 0`.
    - **No (izquierda):**
      - **Documento de salida:** `“Coincidencias eliminadas”`; `borrados`.
    - **Sí (derecha):**
      - **Documento de salida:** `“Nombre no encontrado”`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Paralelogramo de entrada:** `NOMBRE`.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `NOMBRE <> "0"`.
- Círculo 2: regresa justo antes de `↑A <> NIL`.

## Ejemplo

Ana ⇄ Luis ⇄ Ana, al ingresar Ana, queda Luis. Ingresar 0 finaliza.

[Ver diagrama SVG](ejercicio-04.svg) · [Ver diagrama PNG](ejercicio-04.png)
