# Trabajo práctico 3 — Ejercicio 8

## Enunciado y objetivo

Se cuenta con dos estructuras tipo LES a cuyo inicio apuntan ↑e y ↑h, cargadas con valores. Se debe verificar que las listas sean idénticas.

**Objetivo:** Comparar contenido, orden y longitud.

## Supuestos y función de las variables

↑e y ↑h conservan ambas cabezas; ↑A y ↑B recorren a la vez; iguales pasa a 0 ante una diferencia. Ambas vacías son idénticas.

Se usan nodos con `dato` y `PS`. Una cabeza existente se inicializa con su referencia actual; `NIL` indica ausencia de nodo. `New(LES)` es la sintaxis acordada para crear nodos. La notación deberá ajustarse si la profesora enseña otra. Desconectar un nodo no libera su memoria; no se inventa una instrucción para liberarla.

## Cómo dibujar el diagrama completo

Dibujá un óvalo `Inicio` y debajo un **único rectángulo inicial** con las asignaciones del primer bloque. Después seguí los bloques en orden. En todos los rombos **No sale por la izquierda y Sí por la derecha**. Una rama vacía saltea los bloques de la otra.

- **Rectángulo:** `↑e ← cabeza de la primera lista`; `↑h ← cabeza de la segunda lista`; `↑A ← ↑e`; `↑B ← ↑h`; `iguales ← 1`.
- **WHILE, círculo 1:** poné el primer círculo 1 antes del rombo `↑A <> NIL Y ↑B <> NIL Y iguales = 1`. Por **Sí**, a la derecha, ejecutá:
  - **Rombo IF:** `↑A.dato = ↑B.dato`.
    - **No (izquierda):**
      - **Rectángulo:** `iguales ← 0`.
    - **Sí (derecha):**
      - **Rectángulo:** `↑A ← ↑A.PS`; `↑B ← ↑B.PS`.
    - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.
  - Al terminar, el segundo círculo 1 retorna al primero. Por **No**, a la izquierda, salí del ciclo hacia el siguiente bloque.
- **Rombo IF:** `iguales = 1 Y ↑A = NIL Y ↑B = NIL`.
  - **No (izquierda):**
    - **Documento de salida:** `“Las listas son diferentes”`.
  - **Sí (derecha):**
    - **Documento de salida:** `“Las listas son idénticas”`.
  - Uní las dos ramas físicamente debajo de sus bloques antes de continuar.

Desde la salida del último bloque conectá un único óvalo `Fin`. Los números de esta explicación no son conectores; los conectores reales se indican a continuación.

## Conectores reales

- Círculo 1: regresa justo antes de `↑A <> NIL Y ↑B <> NIL Y iguales = 1`.

## Ejemplo

1 → 2 y 1 → 2 son idénticas; 1 → 2 y 1 → 2 → 3 no lo son.

[Ver diagrama SVG](ejercicio-08.svg) · [Ver diagrama PNG](ejercicio-08.png)
