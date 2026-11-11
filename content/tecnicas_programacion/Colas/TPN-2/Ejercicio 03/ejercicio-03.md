# Trabajo práctico 2 — Ejercicio 3

## Enunciado y objetivo

Secuenta con una cola a cuyo inicio apunta ^i cargada con notas de los alumnos de 5to
grado se debe imprimir la mejor y peor nota como así también el promedio y la moda de
ese grado.

**Objetivo:** Calcular mejor nota, peor nota, promedio y todas las modas.

## Supuestos y variables

↑A y ↑B recorren la misma cola sin modificarla. frecuencia cuenta coincidencias; maxFrecuencia guarda la mayor; repetido evita mostrar una nota dos veces. Si todas son diferentes, todas tienen frecuencia máxima 1.

**Función de las variables:** `↑i` conserva el primero; `↑A` selecciona cada nota y `↑B` recorre para contar o detectar apariciones anteriores; `cantidad` y `suma` calculan `promedio`; `mejor` y `peor` son los extremos; `frecuencia` y `maxFrecuencia` permiten hallar modas; `repetido` evita volver a mostrarlas.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑i ← primero de la cola existente`; `↑A ← ↑i`; `↑B ← NIL`; `cantidad ← 0`; `suma ← 0`; `promedio ← 0`; `mejor ← 0`; `peor ← 0`; `maxFrecuencia ← 0`; `frecuencia ← 0`; `repetido ← 0`.
- **Rombo IF:** `↑A <> NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“Cola vacía”`.
  - **Sí (derecha):**
    - **Rectángulo:** `mejor ← ↑A.dato`; `peor ← ↑A.dato`.
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
      - **Rectángulo:** `cantidad ← cantidad + 1`; `suma ← suma + ↑A.dato`.
      - **Rombo IF:** `↑A.dato > mejor`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `mejor ← ↑A.dato`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
      - **Rombo IF:** `↑A.dato < peor`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `peor ← ↑A.dato`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
      - **Rectángulo:** `↑B ← ↑i`; `frecuencia ← 0`.
      - **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑B <> NIL`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑B.dato = ↑A.dato`.
          - **No (izquierda):** va directamente a la unión.
          - **Sí (derecha):**
            - **Rectángulo:** `frecuencia ← frecuencia + 1`.
          - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
        - **Rectángulo:** `↑B ← ↑B.PS`.
        - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
      - **Rombo IF:** `frecuencia > maxFrecuencia`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `maxFrecuencia ← frecuencia`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
      - **Rectángulo:** `↑A ← ↑A.PS`.
      - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
    - **Rectángulo:** `promedio ← suma / cantidad`.
    - **Documento de salida:** `mejor`; `peor`; `promedio`.
    - **Rectángulo:** `↑A ← ↑i`.
    - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
      - **Rectángulo:** `↑B ← ↑i`; `repetido ← 0`.
      - **WHILE, círculo 4:** poné el primer círculo 4 antes del rombo `↑B <> ↑A`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑B.dato = ↑A.dato`.
          - **No (izquierda):** va directamente a la unión.
          - **Sí (derecha):**
            - **Rectángulo:** `repetido ← 1`.
          - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
        - **Rectángulo:** `↑B ← ↑B.PS`.
        - Al terminar, el segundo círculo 4 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
      - **Rombo IF:** `repetido = 0`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑B ← ↑i`; `frecuencia ← 0`.
          - **WHILE, círculo 5:** poné el primer círculo 5 antes del rombo `↑B <> NIL`. Por **Sí**, a la derecha, ejecutá:
            - **Rombo IF:** `↑B.dato = ↑A.dato`.
              - **No (izquierda):** va directamente a la unión.
              - **Sí (derecha):**
                - **Rectángulo:** `frecuencia ← frecuencia + 1`.
              - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
            - **Rectángulo:** `↑B ← ↑B.PS`.
            - Al terminar, el segundo círculo 5 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
          - **Rombo IF:** `frecuencia = maxFrecuencia`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Documento de salida:** `↑A.dato`.
            - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
      - **Rectángulo:** `↑A ← ↑A.PS`.
      - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.
- Círculo 2: regresa justo antes de `↑B <> NIL`.
- Círculo 3: regresa justo antes de `↑A <> NIL`.
- Círculo 4: regresa justo antes de `↑B <> ↑A`.
- Círculo 5: regresa justo antes de `↑B <> NIL`.

## Ejemplo

Con 6, 8, 6, 8, el promedio es 7 y las modas son 6 y 8.

[Ver diagrama SVG](ejercicio-03.svg) · [Ver diagrama PNG](ejercicio-03.png)
