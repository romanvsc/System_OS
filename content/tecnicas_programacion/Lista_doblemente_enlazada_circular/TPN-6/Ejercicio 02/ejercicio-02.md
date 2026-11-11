# Trabajo práctico 6 — Ejercicio 2

## Enunciado y objetivo

Se cuenta con una estructura tipo LDESC a cuyo inicio apunta ^T, cargada con nombres de un curso de inglés. El operador ingresa nombres los cuales deben ser eliminados de la estructura e insertados en una estructura tipo cola.

**Objetivo:** Transferir todas las coincidencias de cada nombre a una cola nueva.

## Supuestos y función de las variables

Cada nodo de la LDESC y de la cola guarda nombre. ↑T es la cabeza de origen; ↑C y ↑U son primero y último de la cola; ↑A recorre; ↑N/↑S guardan vecinos; ↑P conserva el nodo retirado y ↑Q es la copia creada. pendientes cuenta los nodos presentes al iniciar cada búsqueda; transferidos cuenta los copiados y seguir detiene al fallar memoria. Se enlaza la copia en la cola antes de retirar el original. El corte es NOMBRE = "fin".

Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LDEC y LDESC nombran la misma estructura. Los nodos LDESC usan `PA` y `PS`. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑T ← cabeza de la LDESC existente`; `↑C ← NIL`; `↑U ← NIL`; `↑A ← NIL`; `↑N ← NIL`; `↑S ← NIL`; `↑P ← NIL`; `↑Q ← NIL`; `NOMBRE ← ""`; `pendientes ← 0`; `transferidos ← 0`; `seguir ← 1`.
- **Paralelogramo de entrada:** `NOMBRE`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `NOMBRE <> "fin" Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑T <> NIL`.
    - **No (izquierda):**
      - **Documento de salida:** `“Nombre no encontrado”`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑T`; `pendientes ← 1`.
      - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑A.PS <> ↑T`. Por **Sí**, a la derecha, ejecutá:
        - **Rectángulo:** `↑A ← ↑A.PS`; `pendientes ← pendientes + 1`.
        - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
      - **Rectángulo:** `↑A ← ↑T`; `transferidos ← 0`.
      - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `pendientes > 0 Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑A.nombre = NOMBRE`.
          - **No (izquierda):**
            - **Rectángulo:** `↑A ← ↑A.PS`.
          - **Sí (derecha):**
            - **Rectángulo:** `↑Q ← New(COLA)`.
            - **Rombo IF:** `↑Q <> NIL`.
              - **No (izquierda):**
                - **Documento de salida:** `“No hay lugar; transferencia incompleta”`.
                - **Rectángulo:** `seguir ← 0`.
              - **Sí (derecha):**
                - **Rectángulo:** `↑Q.nombre ← ↑A.nombre`; `↑Q.PS ← NIL`.
                - **Rombo IF:** `↑C = NIL`.
                  - **No (izquierda):**
                    - **Rectángulo:** `↑U.PS ← ↑Q`.
                  - **Sí (derecha):**
                    - **Rectángulo:** `↑C ← ↑Q`.
                  - Uní las ramas físicamente debajo de sus bloques antes de continuar.
                - **Rectángulo:** `↑U ← ↑Q`.
                - **Rectángulo:** `↑P ← ↑A`.
                - **Rombo IF:** `↑A.PS = ↑A`.
                  - **No (izquierda):**
                    - **Rectángulo:** `↑N ← ↑A.PA`; `↑S ← ↑A.PS`; `↑N.PS ← ↑S`; `↑S.PA ← ↑N`.
                    - **Rombo IF:** `↑A = ↑T`.
                      - **No (izquierda):** va directamente a la unión.
                      - **Sí (derecha):**
                        - **Rectángulo:** `↑T ← ↑S`.
                      - Uní las ramas físicamente debajo de sus bloques antes de continuar.
                    - **Rectángulo:** `↑A ← ↑S`.
                  - **Sí (derecha):**
                    - **Rectángulo:** `↑T ← NIL`; `↑A ← NIL`.
                  - Uní las ramas físicamente debajo de sus bloques antes de continuar.
                - **Rectángulo:** `↑P.PA ← NIL`; `↑P.PS ← NIL`; `transferidos ← transferidos + 1`.
              - Uní las ramas físicamente debajo de sus bloques antes de continuar.
          - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - **Rectángulo:** `pendientes ← pendientes - 1`.
        - El segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
      - **Rombo IF:** `seguir = 1`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rombo IF:** `transferidos = 0`.
            - **No (izquierda):**
              - **Documento de salida:** `“Coincidencias transferidas”`; `transferidos`.
            - **Sí (derecha):**
              - **Documento de salida:** `“Nombre no encontrado”`.
            - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Paralelogramo de entrada:** `NOMBRE`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `NOMBRE <> "fin" Y seguir = 1`.
- Círculo 2: regresa justo antes de `↑A.PS <> ↑T`.
- Círculo 3: regresa justo antes de `pendientes > 0 Y seguir = 1`.

## Ejemplo

En Ana, Luis, Ana, ingresar Ana deja Luis en la LDESC y Ana → Ana en la cola. Si falla la segunda reserva, queda una Ana en cada estructura junto con Luis.

[Ver diagrama SVG](ejercicio-02.svg) · [Ver diagrama PNG](ejercicio-02.png)
