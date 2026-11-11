# Trabajo práctico 4 — Ejercicio 5

## Enunciado y objetivo

Se cuenta con una estructura lec a cuyo inicio apunta ^J cargada con nombres de los alumnos de una grado. El operador ingresa nombres los cuales deben ser borrados de la lec. El fin viene dado por un nombre=fin.

**Objetivo:** Eliminar todas las coincidencias de cada nombre ingresado.

## Supuestos y función de las variables

Cada nodo tiene nombre y PS. ↑J es la cabeza; ↑U cuenta y ubica el último; ↑A es el nodo actual; ↑N el anterior; ↑T conserva el siguiente; ↑P es el nodo retirado. pendientes se inicializa con el número de nodos al comenzar cada búsqueda y baja una vez por nodo revisado. borrados cuenta coincidencias. Al retirar el único nodo, pendientes pasa a 0 y no se vuelve a acceder a ↑A. NOMBRE = “fin” es solo corte.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑J ← cabeza de la LEC existente`; `↑U ← NIL`; `↑A ← NIL`; `↑N ← NIL`; `↑T ← NIL`; `↑P ← NIL`; `NOMBRE ← ""`; `pendientes ← 0`; `borrados ← 0`.
- **Paralelogramo de entrada:** `NOMBRE`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `NOMBRE <> "fin"`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑J <> NIL`.
    - **No (izquierda):**
      - **Documento de salida:** `“Nombre no encontrado”`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑U ← ↑J`; `pendientes ← 1`.
      - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑U.PS <> ↑J`. Por **Sí**, a la derecha, ejecutá:
        - **Rectángulo:** `↑U ← ↑U.PS`; `pendientes ← pendientes + 1`.
        - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
      - **Rectángulo:** `↑A ← ↑J`; `↑N ← ↑U`; `borrados ← 0`.
      - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `pendientes > 0`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑A.nombre = NOMBRE`.
          - **No (izquierda):**
            - **Rectángulo:** `↑N ← ↑A`; `↑A ← ↑A.PS`.
          - **Sí (derecha):**
            - **Rectángulo:** `↑P ← ↑A`.
            - **Rombo IF:** `↑A.PS = ↑A`.
              - **No (izquierda):**
                - **Rectángulo:** `↑T ← ↑A.PS`; `↑N.PS ← ↑T`.
                - **Rombo IF:** `↑A = ↑J`.
                  - **No (izquierda):** va directamente a la unión.
                  - **Sí (derecha):**
                    - **Rectángulo:** `↑J ← ↑T`.
                  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
                - **Rectángulo:** `↑A ← ↑T`.
              - **Sí (derecha):**
                - **Rectángulo:** `↑J ← NIL`; `↑A ← NIL`; `↑N ← NIL`.
              - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
            - **Rectángulo:** `↑P.PS ← NIL`; `borrados ← borrados + 1`.
          - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - **Rectángulo:** `pendientes ← pendientes - 1`.
        - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
      - **Rombo IF:** `borrados = 0`.
        - **No (izquierda):**
          - **Documento de salida:** `“Coincidencias eliminadas”`; `borrados`.
        - **Sí (derecha):**
          - **Documento de salida:** `“Nombre no encontrado”`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Paralelogramo de entrada:** `NOMBRE`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `NOMBRE <> "fin"`.
- Círculo 2: regresa justo antes de `↑U.PS <> ↑J`.
- Círculo 3: regresa justo antes de `pendientes > 0`.

## Ejemplo

En Ana → Luis → Ana → Ana, ingresar Ana elimina ambos nodos Ana y deja Luis → Luis; luego ingresar fin termina.

[Ver diagrama SVG](ejercicio-05.svg) · [Ver diagrama PNG](ejercicio-05.png)
