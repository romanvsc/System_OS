# Trabajo práctico 5 — Ejercicio 5

## Enunciado y objetivo

Dada una estructura tipo ldes a cuyo inicio apunta ^g y una estructura tipo cola a cuyo inicio apunta ^u, cargada con los nombres de los trabajos listos para impresión, se deben cargar los archivos listos para impresión de la cola a la ldes.

**Objetivo:** Copiar los trabajos de la cola al final de la LDES.

## Supuestos y función de las variables

Se supone que cada nodo de la cola y cada nodo de destino guarda el campo nombre del trabajo, sin otros campos especificados. ↑g es la cabeza; ↑u conserva la cola; ↑A busca el último ↑F; ↑Q recorre la cola; ↑P crea nodos; seguir detiene la copia si falta memoria. La cola no se vacía.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑g ← cabeza de la LDES existente`; `↑u ← primero de la cola existente`; `↑A ← NIL`; `↑F ← NIL`; `↑Q ← ↑u`; `↑P ← NIL`; `seguir ← 1`.
- **Rectángulo:** `↑A ← ↑g`; `↑F ← NIL`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑F ← ↑A`; `↑A ← ↑A.PS`.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `↑Q <> NIL Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑P ← New(LDES)`.
  - **Rombo IF:** `↑P <> NIL`.
    - **No (izquierda):**
      - **Documento de salida:** `“No hay lugar; copia incompleta”`.
      - **Rectángulo:** `seguir ← 0`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P.nombre ← ↑Q.nombre`; `↑P.PA ← ↑F`; `↑P.PS ← NIL`.
      - **Rombo IF:** `↑g = NIL`.
        - **No (izquierda):**
          - **Rectángulo:** `↑F.PS ← ↑P`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑g ← ↑P`.
        - Uní las ramas físicamente debajo de sus bloques antes de continuar.
      - **Rectángulo:** `↑F ← ↑P`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑Q ← ↑Q.PS`.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.
- Círculo 2: regresa justo antes de `↑Q <> NIL Y seguir = 1`.

## Ejemplo

Con LDES A y cola B → C, queda A ⇄ B ⇄ C; la cola continúa B → C.

[Ver diagrama SVG](ejercicio-05.svg) · [Ver diagrama PNG](ejercicio-05.png)
