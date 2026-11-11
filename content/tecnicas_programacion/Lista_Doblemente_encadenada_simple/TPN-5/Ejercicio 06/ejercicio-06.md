# Trabajo práctico 5 — Ejercicio 6

## Enunciado y objetivo

Se cuenta con una estructura ldes cargada con datos de una agenda pero se encuentra desordenada. Se deben ordenar (a-z) utilizando cualquiera de las estructuras que conocen.

**Objetivo:** Ordenar la agenda ascendentemente por nombre.

## Supuestos y función de las variables

Se representa cada dato completo de la agenda como registro, con campo nombre y los demás campos originales; auxRegistro guarda una copia completa. Es notación didáctica: al conocer los campos reales se deben copiar todos. ↑C conserva cabeza; ↑A/↑B comparan vecinos; cantidad cuenta nodos y pasada controla cantidad − 1 pasadas. Los enlaces PA y PS no se alteran.

La LDES no es circular y usa `PA` y `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. Se utiliza `New(LDES)` para crear nodos. Desconectar un nodo no libera su memoria; no se inventa una instrucción de liberación.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En cada rombo **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la agenda existente`; `↑A ← ↑C`; `↑B ← NIL`; `cantidad ← 0`; `pasada ← 0`; `auxRegistro ← registro vacío`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `cantidad ← cantidad + 1`; `↑A ← ↑A.PS`.
  - El segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
- **WHILE, círculo 2:** poné el primer círculo 2 antes del rombo `pasada < cantidad - 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rectángulo:** `↑A ← ↑C`.
  - **Rombo IF:** `↑A <> NIL`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑B ← ↑A.PS`.
      - **WHILE, círculo 3:** poné el primer círculo 3 antes del rombo `↑B <> NIL`. Por **Sí**, a la derecha, ejecutá:
        - **Rombo IF:** `↑A.registro.nombre > ↑B.registro.nombre`.
          - **No (izquierda):** va directamente a la unión.
          - **Sí (derecha):**
            - **Rectángulo:** `auxRegistro ← ↑A.registro`; `↑A.registro ← ↑B.registro`; `↑B.registro ← auxRegistro`.
          - Uní las ramas físicamente debajo de sus bloques antes de continuar.
        - **Rectángulo:** `↑A ← ↑B`; `↑B ← ↑B.PS`.
        - El segundo círculo 3 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.
    - Uní las ramas físicamente debajo de sus bloques antes de continuar.
  - **Rectángulo:** `pasada ← pasada + 1`.
  - El segundo círculo 2 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el bloque siguiente.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL`.
- Círculo 2: regresa justo antes de `pasada < cantidad - 1`.
- Círculo 3: regresa justo antes de `↑B <> NIL`.

## Ejemplo

Zoe con teléfono 111 y Ana con teléfono 222 pasan a Ana/222 ⇄ Zoe/111.

[Ver diagrama SVG](ejercicio-06.svg) · [Ver diagrama PNG](ejercicio-06.png)
