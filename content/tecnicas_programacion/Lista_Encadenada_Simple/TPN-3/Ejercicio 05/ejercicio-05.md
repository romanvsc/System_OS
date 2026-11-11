# Trabajo práctico 3 — Ejercicio 5

## Enunciado y objetivo

Se leen pares de valores cuyo fin viene dado por un par 0,0. El primero indica la acción y el segundo el dato; las acciones posibles son agregar, borrar o verificar que exista. Imprimir el resultado de cada operación sabiendo que se cuenta con una LES a cuyo inicio apunta ↑i.

**Objetivo:** Ejecutar las operaciones hasta el par 0,0.

## Supuestos y función de las variables

1 agrega al final, 2 busca y 3 borra la primera coincidencia. ACCION y DATO forman el par; ↑i es cabeza; ↑A, ↑N y ↑P son auxiliares; b indica coincidencia. Un cero aislado no es corte. Ante falta de memoria se informa y se sigue con otro par.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑i ← cabeza de la lista existente`; `↑A ← NIL`; `↑N ← NIL`; `↑P ← NIL`; `ACCION ← 0`; `DATO ← 0`; `b ← 0`.
- **Paralelogramo de entrada:** `ACCION, DATO`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `ACCION <> 0 O DATO <> 0`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `ACCION = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(LES)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; no se agregó”`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← NIL`.
          - **Rombo IF:** `↑i = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑A ← ↑i`.
              - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A.PS <> NIL`. Por **Sí**, a la derecha, ejecutá:
                - **Rectángulo:** `↑A ← ↑A.PS`.
                - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
              - **Rectángulo:** `↑A.PS ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑i ← ↑P`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
          - **Documento de salida:** `“Elemento agregado”`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `ACCION = 2`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑i`; `↑N ← NIL`; `b ← 0`.
      - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑A.dato = DATO`.
          - **No (izquierda):**
            - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
          - **Sí (derecha):**
            - **Rectángulo:** `b ← 1`.
          - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
      - **Rombo IF:** `b = 1`.
        - **No (izquierda):**
          - **Documento de salida:** `“Elemento no encontrado”`.
        - **Sí (derecha):**
          - **Documento de salida:** `“Elemento encontrado”`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `ACCION = 3`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑i`; `↑N ← NIL`; `b ← 0`.
      - **WHILE, círculo 4:** poné el primer círculo 4 antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑A.dato = DATO`.
          - **No (izquierda):**
            - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
          - **Sí (derecha):**
            - **Rectángulo:** `b ← 1`.
          - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - Al terminar, el segundo círculo 4 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
      - **Rombo IF:** `b = 1`.
        - **No (izquierda):**
          - **Documento de salida:** `“No se puede borrar; no existe”`.
        - **Sí (derecha):**
          - **Rombo IF:** `↑N = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑N.PS ← ↑A.PS`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑i ← ↑A.PS`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
          - **Rectángulo:** `↑A.PS ← NIL`.
          - **Documento de salida:** `“Elemento eliminado”`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `ACCION <> 1 Y ACCION <> 2 Y ACCION <> 3`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Documento de salida:** `“Acción inválida”`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Paralelogramo de entrada:** `ACCION, DATO`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `ACCION <> 0 O DATO <> 0`.
- Círculo 2: regresa justo antes de `↑A.PS <> NIL`.
- Círculo 3: regresa justo antes de `↑A <> NIL Y b = 0`.
- Círculo 4: regresa justo antes de `↑A <> NIL Y b = 0`.

## Ejemplo

Los pares (1, 5), (2, 5), (3, 5), (0, 0) agregan, encuentran y eliminan el 5.

[Ver diagrama SVG](ejercicio-05.svg) · [Ver diagrama PNG](ejercicio-05.png)
