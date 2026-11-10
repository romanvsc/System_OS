# Trabajo práctico 1 — Ejercicio 7

## Enunciado

Se cuenta con una pila llamada "carga" a cuyo inicio apunta ↑E, se debe ingresar por teclado dos pares de valores, uno indica la acción y el segundo el valor en cuestión.

Acciones posibles:
1. Insertar.
2. Buscar.
3. Eliminar.
Por ejemplo, ingresa 1,5 significa que se debe insertar el 5 a la pila, los pares 3,9 significa que se debe eliminar el 9 de la pila.

Tener en cuenta si acción =
2. Informar si no hay ningún elemento que coincida en la pila.
3. Informar que no se puede borrar si no existe.

## Supuestos y variables

Se ingresan exactamente dos pares. Si hay duplicados, buscar o eliminar actúa sobre la primera coincidencia desde el tope. `New(PILA)` es didáctico; no se inventa una instrucción para liberar memoria.

↑E es el tope; ↑A busca; ↑N conserva el anterior; ↑P es el nodo nuevo; b indica coincidencia; cantidad cuenta pares procesados.

Se usa una pila enlazada con campo `PS`. Los punteros a pilas existentes se inicializan con su tope actual; `NIL` representa ausencia de nodo. La notación es didáctica y deberá adaptarse si la profesora indica otra para pilas.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y, debajo, **un único rectángulo inicial** con las asignaciones del primer bloque. Después seguí las instrucciones en orden. En todos los rombos, **No sale a la izquierda y Sí a la derecha**; las ramas vacías se dibujan como líneas que saltean los bloques de la otra rama.

- **Rectángulo:** `↑E ← tope de pila carga`; `↑A ← NIL`; `↑N ← NIL`; `↑P ← NIL`; `ACCION ← 0`; `DATO ← 0`; `b ← 0`; `cantidad ← 0`.
- **WHILE, círculo 1:** colocar el primer círculo 1 justo antes del rombo `cantidad < 2`. Por **Sí**, a la derecha, ejecutar el cuerpo:
  - **Paralelogramo de entrada:** `ACCION, DATO`.
  - **Rombo IF:** `ACCION = 1`.
    - **No (izquierda):** seguir directamente hasta la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(PILA)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar”`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.dato ← DATO`; `↑P.PS ← ↑E`; `↑E ← ↑P`.
        - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - **Rombo IF:** `ACCION = 2 O ACCION = 3`.
    - **No (izquierda):** seguir directamente hasta la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑E`; `↑N ← NIL`; `b ← 0`.
      - **WHILE, círculo 2:** colocar el primer círculo 2 justo antes del rombo `↑A <> NIL Y b = 0`. Por **Sí**, a la derecha, ejecutar el cuerpo:
        - **Rombo IF:** `↑A.dato = DATO`.
          - **No (izquierda):**
            - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
          - **Sí (derecha):**
            - **Rectángulo:** `b ← 1`.
          - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
        - Al terminar el cuerpo, llegar al segundo círculo 2, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.
      - **Rombo IF:** `b = 1`.
        - **No (izquierda):**
          - **Rombo IF:** `ACCION = 2`.
            - **No (izquierda):**
              - **Documento de salida:** `“No se puede borrar: no existe”`.
            - **Sí (derecha):**
              - **Documento de salida:** `“Elemento no encontrado”`.
            - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
        - **Sí (derecha):**
          - **Rombo IF:** `ACCION = 2`.
            - **No (izquierda):**
              - **Rombo IF:** `↑N = NIL`.
                - **No (izquierda):**
                  - **Rectángulo:** `↑N.PS ← ↑A.PS`.
                - **Sí (derecha):**
                  - **Rectángulo:** `↑E ← ↑A.PS`.
                - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
              - **Rectángulo:** `↑A.PS ← NIL`.
            - **Sí (derecha):**
              - **Documento de salida:** `“Elemento encontrado”`.
            - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
        - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - **Rombo IF:** `ACCION <> 1 Y ACCION <> 2 Y ACCION <> 3`.
    - **No (izquierda):** seguir directamente hasta la unión.
    - **Sí (derecha):**
      - **Documento de salida:** `“Acción inválida”`.
    - Unir físicamente las dos ramas por debajo de sus operaciones y continuar con el siguiente bloque.
  - **Rectángulo:** `cantidad ← cantidad + 1`.
  - Al terminar el cuerpo, llegar al segundo círculo 1, que retorna al primero. Por **No**, a la izquierda del rombo, salir del ciclo hacia el siguiente bloque.

Desde la salida del último bloque, conectá un único óvalo `Fin`. Los números que identifican ejercicios o pasos de esta explicación no son conectores.

## Conectores reales

- Círculo 1: vuelve justo antes del rombo `cantidad < 2`.
- Círculo 2: vuelve justo antes del rombo `↑A <> NIL Y b = 0`.

## Ejemplo

En `[9] → [3]`, los pares (3, 9) y (1, 5) dejan `[5] → [3]`.

Desconectar un nodo no libera su memoria; si se debe liberar, hay que usar la operación enseñada en clase.

[Ver SVG](ejercicio-07.svg) · [Ver PNG](ejercicio-07.png)
