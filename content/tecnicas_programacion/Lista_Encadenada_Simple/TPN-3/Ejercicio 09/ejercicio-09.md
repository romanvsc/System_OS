# Trabajo práctico 3 — Ejercicio 9

## Enunciado y objetivo

Se cuenta con dos estructuras tipo LES ALFA y BETA, a cuyo inicio apuntan ↑pria y ↑prib. Generar una LES llamada ↑chi con aquellos elementos que aparecen en ambas listas, manteniendo el orden ascendente.

**Objetivo:** Generar la intersección ascendente sin repetidos.

## Supuestos y función de las variables

Se supone que ALFA y BETA ya están ordenadas ascendentemente. ↑A y ↑B recorren; ↑chi y ↑U son cabeza y último del resultado; ↑P crea nodos; seguir detiene ante falta de memoria. Las originales se conservan.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑pria ← cabeza de ALFA existente`; `↑prib ← cabeza de BETA existente`; `↑A ← ↑pria`; `↑B ← ↑prib`; `↑chi ← NIL`; `↑U ← NIL`; `↑P ← NIL`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y ↑B <> NIL Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.dato < ↑B.dato`.
    - **No (izquierda):**
      - **Rombo IF:** `↑A.dato > ↑B.dato`.
        - **No (izquierda):**
          - **Rombo IF:** `↑chi = NIL`.
            - **No (izquierda):**
              - **Rombo IF:** `↑U.dato <> ↑A.dato`.
                - **No (izquierda):** va directamente a la unión.
                - **Sí (derecha):**
                  - **Rectángulo:** `↑P ← New(LES)`.
                  - **Rombo IF:** `↑P <> NIL`.
                    - **No (izquierda):**
                      - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
                      - **Rectángulo:** `seguir ← 0`.
                    - **Sí (derecha):**
                      - **Rectángulo:** `↑P.dato ← ↑A.dato`; `↑P.PS ← NIL`; `↑U.PS ← ↑P`; `↑U ← ↑P`.
                    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
                - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P ← New(LES)`.
              - **Rombo IF:** `↑P <> NIL`.
                - **No (izquierda):**
                  - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
                  - **Rectángulo:** `seguir ← 0`.
                - **Sí (derecha):**
                  - **Rectángulo:** `↑P.dato ← ↑A.dato`; `↑P.PS ← NIL`; `↑chi ← ↑P`; `↑U ← ↑P`.
                - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
          - **Rombo IF:** `seguir = 1`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Rectángulo:** `↑A ← ↑A.PS`; `↑B ← ↑B.PS`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - **Sí (derecha):**
          - **Rectángulo:** `↑B ← ↑B.PS`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑A.PS`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y ↑B <> NIL Y seguir = 1`.

## Ejemplo

ALFA 1 → 2 → 2 → 5 y BETA 2 → 2 → 4 → 5 producen 2 → 5.

[Ver diagrama SVG](ejercicio-09.svg) · [Ver diagrama PNG](ejercicio-09.png)
