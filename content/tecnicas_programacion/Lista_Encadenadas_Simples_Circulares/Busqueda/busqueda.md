# Lista simple circular — busqueda

## Enunciado y objetivo

Buscar un dato sin modificar la LEC.

**Objetivo:** Buscar un dato sin modificar la LEC.

## Supuestos y función de las variables

↑C es cabeza; ↑A recorre; DATO es el valor buscado; b = 1 indica coincidencia y detener = 1 cierra el recorrido.

Se supone una lista simple circular con `PS`. Una cabeza existente se inicializa con su referencia actual y una lista nueva comienza en `NIL`. En este práctico LEC y LESC nombran la misma estructura. Se utiliza `New(LESC)` para crear nodos; la notación se ajustará si la profesora indica otra. Desconectar un nodo no libera su memoria y no se inventa la instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑C ← cabeza de la LEC existente`; `↑A ← NIL`; `DATO ← 0`; `b ← 0`; `detener ← 0`.
- **Paralelogramo de entrada:** `DATO`.
- **Rectángulo:** `b ← 0`; `detener ← 0`.
- **Rombo IF:** `↑C <> NIL`.
  - **No (izquierda):** va directamente a la unión.
  - **Sí (derecha):**
    - **Rectángulo:** `↑A ← ↑C`.
    - **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `detener = 0`. Por **Sí**, a la derecha, ejecutá:
      - **Rombo IF:** `↑A.dato = DATO`.
        - **No (izquierda):**
          - **Rectángulo:** `↑A ← ↑A.PS`.
          - **Rombo IF:** `↑A = ↑C`.
            - **No (izquierda):** va directamente a la unión.
            - **Sí (derecha):**
              - **Rectángulo:** `detener ← 1`.
            - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
        - **Sí (derecha):**
          - **Rectángulo:** `b ← 1`; `detener ← 1`.
        - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
      - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
- **Rombo IF:** `b = 1`.
  - **No (izquierda):**
    - **Documento de salida:** `“Dato no encontrado”`.
  - **Sí (derecha):**
    - **Documento de salida:** `“Dato encontrado”`.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `detener = 0`.

## Ejemplo

En 10 → 20 → 10, buscar 20 lo encuentra; buscar 30 vuelve a la cabeza y termina.

[Ver diagrama SVG](busqueda.svg) · [Ver diagrama PNG](busqueda.png)
