# Trabajo práctico 2 — Ejercicio 6

## Enunciado y objetivo

Secuenta con una cola a cuyo inicio apunta ^u cargada con nombres de los integrantes de
la delegación de fútbol infantil de escuela de comercio se debe verificar que la misma
esté en orden ascendente caso contrario utilizar cualquier estructura que conozca para
lograrlo.

**Objetivo:** Comprobar y ordenar alfabéticamente la cola.

## Supuestos y variables

Cada nodo contiene solo el dato nombre y PS: se intercambia el nombre completo, no letras. Si hay más campos asociados hay que intercambiar el registro completo. La comparación alfabética es la de clase. El ordenamiento realiza cantidad menos uno pasadas.

**Función de las variables:** `↑u` conserva el primero; `↑A` y `↑B` comparan vecinos; `cantidad` cuenta nodos; `pasada` controla las pasadas; `ordenada` indica si ya estaba ordenada; `auxNombre` conserva temporalmente un nombre durante el intercambio.

Los nodos de cola tienen `dato` y `PS`, salvo cuando se indiquen otros campos. Los punteros a estructuras existentes se inicializan con sus referencias actuales. La notación de punteros y `New(COLA)` es didáctica: adaptala si la profesora indica otra. Desconectar un nodo y liberar su memoria son acciones distintas; no se inventa una operación de liberación.

## Cómo dibujar el diagrama completo

Dibujá `Inicio` en un óvalo y, debajo, un único rectángulo inicial con todas las asignaciones del primer bloque. Continuá siguiendo los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama sin operaciones saltea los bloques de la otra.

- **Rectángulo:** `↑u ← primero de la cola existente`; `↑A ← ↑u`; `↑B ← NIL`; `cantidad ← 0`; `pasada ← 0`; `ordenada ← 1`; `auxNombre ← ""`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `cantidad ← cantidad + 1`; `↑A ← ↑A.PS`.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Rectángulo:** `↑A ← ↑u`.
- **Rombo IF:** `↑A <> NIL`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Rectángulo:** `↑B ← ↑A.PS`.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
- **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑B <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.nombre > ↑B.nombre`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `ordenada ← 0`.
    - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
  - **Rectángulo:** `↑A ← ↑B`; `↑B ← ↑B.PS`.
  - Al terminar, el segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
- **Rombo IF:** `ordenada = 1`.
  - **No (izquierda):**
    - **Documento de salida:** `“No estaba ordenada; se ordenará”`.
    - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `pasada < cantidad - 1`. Por **Sí**, a la derecha, ejecutá:
      - **Rectángulo:** `↑A ← ↑u`.
      - **Rombo IF:** `↑A <> NIL`.
        - **No (izquierda):** va directamente a la unión.
        - **Sí (derecha):**
          - **Rectángulo:** `↑B ← ↑A.PS`.
        - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
      - **WHILE, círculo 4:** poné el primer círculo 4 antes del rombo `↑B <> NIL`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑A.nombre > ↑B.nombre`.
          - **No (izquierda):** va directamente a la unión.
          - **Sí (derecha):**
            - **Rectángulo:** `auxNombre ← ↑A.nombre`; `↑A.nombre ← ↑B.nombre`; `↑B.nombre ← auxNombre`.
          - Uní ambas ramas físicamente por debajo de sus bloques y continuá.
        - **Rectángulo:** `↑A ← ↑B`; `↑B ← ↑B.PS`.
        - Al terminar, el segundo círculo 4 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
      - **Rectángulo:** `pasada ← pasada + 1`.
      - Al terminar, el segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo y seguí con el próximo bloque.
  - **Sí (derecha):**
    - **Documento de salida:** `“Ya está ordenada”`.
  - Uní ambas ramas físicamente por debajo de sus bloques y continuá.

Conectá la salida del último bloque a un único óvalo `Fin`. Los números de la explicación identifican ejercicios; solo los círculos indicados abajo son conectores dibujados.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.
- Círculo 2: regresa justo antes de `↑B <> NIL`.
- Círculo 3: regresa justo antes de `pasada < cantidad - 1`.
- Círculo 4: regresa justo antes de `↑B <> NIL`.

## Ejemplo

Zoe → Ana → Luz pasa a Ana → Luz → Zoe. Vacía y un nodo ya están ordenadas.

[Ver diagrama SVG](ejercicio-06.svg) · [Ver diagrama PNG](ejercicio-06.png)
