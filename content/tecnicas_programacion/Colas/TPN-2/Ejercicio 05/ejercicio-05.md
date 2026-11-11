# Trabajo práctico 2 — Ejercicio 5

## Enunciado y objetivo

Secuenta con una cola a cuyo inicio apunta ^h cargada con nombres y apellido de los 10
mejores alumnos los cuales no están repetidos y se encuentran ordenados por orden de
promedio es decir el primero en la cola es el mejor alumno. El operador ingresa por
teclado un número del 1 al 10 y se debe imprimir el nombre correspondiente a esa
posisión. Por ejemplo ingresa el 3 y se debe imprimir el nombre del 3º mejor promedio.

**Objetivo:** Mostrar el alumno de una posición determinada.

## Supuestos y variables

Se supone que cada nodo tiene nombre, apellido y PS. La primera posición es 1; si la cola tiene menos nodos de los esperados se informa.

**Función de las variables:** `↑h` conserva el primero, `↑A` recorre, `POSICION` es el lugar solicitado e `indice` cuenta desde 1.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑h ← primero de la cola existente`; `↑A ← ↑h`; `POSICION ← 0`; `indice ← 1`.
- **Paralelogramo de entrada:** `POSICION`.
- **Rombo IF:** `POSICION >= 1 Y POSICION <= 10`.
  - **No (izquierda):**
    - **Documento de salida:** `“Posición inválida”`.
  - **Sí (derecha):**
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y indice < POSICION`. Por **Sí**, a la derecha, ejecutá:
      - **Rectángulo:** `↑A ← ↑A.PS`; `indice ← indice + 1`.
      - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
    - **Rombo IF:** `↑A <> NIL`.
      - **No (izquierda):**
        - **Documento de salida:** `“No existe esa posición”`.
      - **Sí (derecha):**
        - **Documento de salida:** `↑A.nombre`; `↑A.apellido`.
      - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y indice < POSICION`.

## Ejemplo

Para Ana, Bruno, Carla, la posición 3 muestra Carla.

[Ver diagrama SVG](ejercicio-05.svg) · [Ver diagrama PNG](ejercicio-05.png)
