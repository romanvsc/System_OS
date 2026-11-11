# Trabajo práctico 4 — Ejercicio 2

## Enunciado y objetivo

Se cuenta con una estructura tipo lista encadenada simple a cuyo inicio apunta ^m cargada con nombres. Se debe generar una lec con elementos intercalados de la lista. Es decir el primer elemento de la lista si , el segundo no, y asi sucesivamente.

**Objetivo:** Generar una LEC con los nombres en posiciones impares de la LES.

## Supuestos y función de las variables

↑m conserva la lista no circular y ↑A la recorre hasta NIL; ↑C y ↑U son cabeza y último de la LEC nueva; ↑P es el nodo nuevo; elegir alterna 1 y 0, y seguir se apaga si falla la reserva. Cada nodo guarda nombre y PS.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑m ← cabeza de la LES existente`; `↑A ← ↑m`; `↑C ← NIL`; `↑U ← NIL`; `↑P ← NIL`; `elegir ← 1`; `seguir ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y seguir = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `elegir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑P ← New(LESC)`.
      - **Rombo IF:** `↑P <> NIL`.
        - **No (izquierda):**
          - **Documento de salida:** `“No hay lugar; resultado incompleto”`.
          - **Rectángulo:** `seguir ← 0`.
        - **Sí (derecha):**
          - **Rectángulo:** `↑P.nombre ← ↑A.nombre`.
          - **Rombo IF:** `↑C = NIL`.
            - **No (izquierda):**
              - **Rectángulo:** `↑P.PS ← ↑C`; `↑U.PS ← ↑P`; `↑U ← ↑P`.
            - **Sí (derecha):**
              - **Rectángulo:** `↑P.PS ← ↑P`; `↑C ← ↑P`; `↑U ← ↑P`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `elegir = 1`.
    - **No (izquierda):**
      - **Rectángulo:** `elegir ← 1`.
    - **Sí (derecha):**
      - **Rectángulo:** `elegir ← 0`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - **Rombo IF:** `seguir = 1`.
    - **No (izquierda):** va directamente a la unión.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑A.PS`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y seguir = 1`.

## Ejemplo

De Ana → Beto → Cora → NIL se obtiene Ana → Cora → Ana. La lista original no cambia.

[Ver diagrama SVG](ejercicio-02.svg) · [Ver diagrama PNG](ejercicio-02.png)
